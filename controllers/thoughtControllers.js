const Thought = require("../models/Thought");
const Reaction = require("../models/Reaction");

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughtInfo) => res.json(thoughtInfo))
      .catch((err) => res.status(500).json(err));
  },
  // Get a thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((oneThoughtOnly) =>
        !oneThoughtOnly
          ? res.status(404).json({ message: "No thought with that ID" })
          : res.json(oneThoughtOnly)
      )
      .catch((err) => res.status(500).json(err));
  },
  // Create a thought
  createThought(req, res) {
    Thought.create(req.body)
      .then((nuThought) => res.json(nuThought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((forgetfullness) =>
        !forgetfullness
          ? res.status(404).json({ message: "No thought with that ID" })
          : Reaction.deleteMany({ _id: { $in: forgetfullness.reactions } })
      )
      .then(() => res.json({ message: "Thought and Reaction removed" }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a thought
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "No thought with this id!" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // add a reaction
  plusReacto(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { new: true }
    )
      .then((helloReacto) =>
        !helloReacto
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(helloReacto)
      )
      .catch((err) => res.status(500).json(err));
  },
  // remove a reaction
  sansReacto(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: req.body } },
      { runValidators: true, new: true }
    )
      .then((byeByeReacto) =>
        !byeByeReacto
          ? res.status(404).json({ message: "No user with this id!" })
          : res.json(byeByeReacto)
      )
      .catch((err) => res.status(500).json(err));
  },
};
