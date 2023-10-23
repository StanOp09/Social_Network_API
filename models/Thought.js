const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');

// Schema to create thought model
const thoughtSchema = new Schema(
    {
        thoughtText: { // Updated field name to thoughtText
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(createdAt) {
                return new Date(createdAt).toISOString();
            },
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [reactionSchema], // Updated field name to reactions
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;
