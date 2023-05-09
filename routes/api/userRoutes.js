const router = require('express').Router();
const {getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    plusFriendo,
    sansFriendo} = require('../../controllers/userContorllers');

// /api/users
router.route('/').get(getUsers).post(createUser);

router.route('/:userId/:friendId').put(plusFriendo).delete(sansFriendo)
// /api/users/:userId
router.route('/:userId')
.get(getSingleUser)
.put(updateUser)
.delete(deleteUser);
module.exports = router;