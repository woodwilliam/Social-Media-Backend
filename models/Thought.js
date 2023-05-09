const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
          type: String,
          required: true,
          min_length: 1,
          max_length: 280,
        },
        createdAt: {
          type: Date,
          default: () => Date.now(),
        },
        username: {
          type: String,
          required: true
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);

thoughtSchema.virtual('reactionCount').get(function() {
  return `This thought has ${this.reactions.length} reactions`
});

const Thought = model("thoughts", thoughtSchema)

module.exports = Thought;