const { json } = require('body-parser');
const { Thought, User, Reaction } = require ('../models');
const { user } = require('../routes');

module.exports = {
    // Get all user thoughts
    async getAllThoughts (req, res) {
        try {
            const thoughts = await Thought.find().select('-__v');
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Get a thought
    async getSingleThought (req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId }).select('-__v');

        if (!thought) {
            return res.status(404).json({ message: 'No thought with that ID' });
        }
        
        res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Create thought
    async createThought (req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thought._id } },
                { new: true }
            );

            if (!user) {
                return res.status(404).json({
                    message: 'Thought created, but found no user with this ID',
                });
            }

            res.json('Thought created!');
        } catch (err) {
            console.log (err);
            res.status(500).json(err);
        }
    },

    // Update a thought
    async updateThought (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.userId },
                { set: req.body },
                { runValidators: true, new: true }
            );

            if (!thought) {
                res.status(404).json({ message: 'No thought with this id!' });
            }
            
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete thought
    async deleteThoughts(req, res) {
        try {
          const thought = await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    
          if (!thought) {
            res.status(404).json({ message: 'No thought with that ID' });
          }

          const user = await User.findOneAndUpdate(
            { thoughts: req.params.thoughtId },
            { $pull: { thoughts: req.params.thoughtId } },
            { new: true }
          );

          if (!user) {
            return res
                .status(400)
                .json({ message: 'Thought deleted but no user with this ID!' });
          }

          res.json({ message: 'Thought successfully deleted' });

        } catch (err) {
          res.status(500).json(err);
        }
      },

    // Create reaction for user
    async createReaction (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body }},
                { new: true }
            );

            if (!thought) {
                return res.status(404).json({
                    message: 'Reaction created, but found no thought with that ID',
                });
            }

            res.json('Created the reaction!');
        } catch(err) {
            res.status(500).json(err)
        }
    },

    // Delete a reaction
    async deleteReaction (req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { reactions: req.params.reactionId },
                { $pull: { reactions: req.params.reactionId } },
                { new: true }
                );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with that ID' })
            }

            res.json({ message: 'Reaction successfully deleted!' });

        } catch (err) {
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }
}