const router = require('express').Router();

const {
    getAllUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    // addUserThought,
    // deleteUserThought,
    addUserFriend,
    deleteUserFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getAllUsers).post(createUser);

// /api/users/:userId
router.route('/:userId').get(getSingleUser).delete(deleteUser).put(updateUser);

// /api/users/:userId/friend/
router.route('/:userId/friend').post(addUserFriend);

// /api/users/:userId/friend/:friendId
router.route('/:userId/friend/:friendId').delete(deleteUserFriend);

module.exports = router;