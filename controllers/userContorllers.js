const User = require("../models/User");

module.exports = {
  // Get all users
  getUsers(req, res) {
    User.find()
      .populate({ path: "thoughts", select: "-__v" })
      .then((userInfo) => res.json(userInfo))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Get a user by ID
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .populate({ path: "thoughts", select: "-__v" })
      .then((singleUserInfo) =>
        !singleUserInfo
          ? res.status(404).json({ message: "No user with that ID" })
          : res.json(singleUserInfo)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a user
  createUser(req, res) {
    User.create(req.body)
      .then((nuser) => res.json(nuser))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a user
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((byeByeBaybee) =>
        !byeByeBaybee
          ? res.status(404).json({ message: "No user with that ID" })
          : Thought.deleteMany({ _id: { $in: byeByeBaybee.thoughts } })
      )
      .then(() => res.json({ message: "User and Thots removed" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a user
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: req.body },
      { runValidators: true, new: true }
    )
      .then((userUpdate) =>
        !userUpdate
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(userUpdate)
      )
      .catch((err) => res.status(500).json(err));
  },
  // add a friend
  plusFriendo(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { friends: req.params.friendId } },
      { new: true }
    )
      .then((helloFriend) =>
        !helloFriend
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(helloFriend)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a friend
  sansFriendo(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { runValidators: true, new: true }
    )
      .then((laterLoser) =>
        !laterLoser
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(laterLoser)
      )
      .catch((err) => res.status(500).json(err));
  },
};
