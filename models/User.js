const { Schema, model } = require('mongoose');
const Thought = require('./Thought');
// const thoughtSchema = require('./Thought'); // Import the Thought schema

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            maxlength: 50, // Corrected field name to 'maxlength'
        },
        email: {
            type: String,
            unique: true,
            required: true,
            validate: {
                validator: function (value) {
                    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                    return emailRegex.test(value);
                },
                message: "Invalid email format",
            },
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }], // Corrected field name to 'thoughts' and use the imported schema
        // Define an array of ObjectIds to reference friends (self-reference)
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
        }]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
);

// Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
