const { Schema, Types } = require('mongoose');
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()// Set the default value to a new ObjectId
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: function(createdAt) {
                return new Date(createdAt).toISOString();
            },
        },
    },
    {
        toJSON: {
          getters: true,
        },
        id: false,
    }
);

module.exports = reactionSchema;