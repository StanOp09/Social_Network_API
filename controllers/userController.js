const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

// Aggregate function to get the number of users overall
const headCount = async () => {
    const numberOfUsers = await User.aggregate()
        .count('userCount');
    return numberOfUsers;
}

module.exports = {
    // Get all users
    async getAllUsers (req, res) {
        try {
            const users = await User.find().select('-__v');

            const userObj = {
                users,
                headCount: await headCount(),
            };

            res.json (userObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single user
    async getSingleUser (req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .populate('thoughts')
                .populate('friends');
            
            if (!user) {
                return res.status(404).json({ message: 'No user with this ID' })
            }

            res.json (user);

        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a new user
    async createUser (req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update a user
    async updateUser (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body },
                { runValidators: true, new: true }
            );

            if (!user) {
                res.status(404).json({ message: 'No user with this id!' });
            }
            
            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user and their associated thoughts and friends
    async deleteUser (req, res) {
        try {
            const user = await User.findOneAndRemove ({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: 'No user with this ID' });
            }

            const thought = await Thought.updateMany(
                { users: req.params.userId },
                { $pull: { users: req.params.userId } },
                // { new: true }  
            );

            if (!thought || thought.nModified === 0 ) {
                return res.status(404).json({
                    message: 'User deleted, but no thoughts found'
                });
            }

            res.status(200).json({ message: 'User and related thoughts deleted' });

        } catch (err) {
            console.log(err);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    },

    // Add a thought to a user
    async addUserThought (req, res) {
        console.log('You are adding a thought');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate (
                { _id: req.params.userId },
                { $addToSet: { thoughts: req.body } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with this ID' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought from a user
    async deleteUserThought (req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { thought: { thoughtId: req.params.thoughtId } } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json(({ message: 'No user found with this ID' }))
            }
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Add friend to a user
    async addUserFriend (req, res) {
        console.log('You are adding a friend');
        console.log(req.body);

        try {
            const user = await User.findOneAndUpdate (
                { _id: req.params.userId },
                { $addToSet: { friends: req.body } },
                { runValidators: true, new: true }
            ).select('-__v');

            if (!user) {
                return res
                    .status(404)
                    .json({ message: 'No user found with this ID' });
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete friend from a user
    async deleteUserFriend (req, res) {
        try {
            const userId = req.params.userId; // Get the userId from the request
            const friendId = req.params.friendId; // Get the friendId from the request
    
            console.log('Received DELETE request for user:', userId);
            console.log('Deleting friend with friendId:', friendId);
            
            const user = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $pull: { friends: { friendId: req.params.friendId } } },
                { runValidators: true, new: true }
            );

            if (!user) {
                return res
                    .status(404)
                    .json(({ message: 'No user found with this ID' }))
            }

            res.json({ message: 'Friend successfully deleted!' })
        } catch (err) {
            res.status(500).json(err);
        }
    }
}