const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId: {},
        reactionBody: {
          type: String,
          required: true,
          max_length: 280,
        },
        username: {
          type: String,
          required: true
        },
        createdAt: {
          type: Date,
          default: () => Date.now(),
        }
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
      }
);


module.exports = reactionSchema;