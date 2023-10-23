const connection = require('../config/connection');
const { Thought, User } = require('../models');
const { getRandomName, getRandomThought, getRandomFriends } = require('./data');

connection.on('error', (err) => {
    throw err;
});

connection.once('open', async () => {
    console.log('connected');

    // Delete collections if they exist
    await Thought.collection.drop(); // Drop the existing 'thoughts' collection
    await User.collection.drop();

    // Create empty array to hold users and their thoughts
    const users = [];

    // Loop 20 times -- add users to users array
    for (let i = 0; i < 20; i++) {
        const thoughts = getRandomThought(2);
        const username = getRandomName();

        // Generate random friends for the user (at least 3)
        // const friends = getRandomFriends(3, users.map((user) => user.username));
        
        users.push({
            username,
            thoughts,
            // friends,
        });
    }

    // Add users to the collection and await the results
    await User.collection.insertMany(users);

    // Create an array to hold the thoughts with their reactions
    const thoughtsWithReactions = [];

    // Iterate through each user to generate thoughts with reactions
    users.forEach((user) => {
        user.thoughts.forEach((thought) => {
            const thoughtWithReactions = {
                thoughtText: thought.thoughtText,
                username: user.username,
                reactions: getRandomThought(2), // Generate random reactions for each thought
            };
            thoughtsWithReactions.push(thoughtWithReactions);
        });
    });

    // Add thoughts to the 'thoughts' collection and await the results
    await Thought.collection.insertMany(thoughtsWithReactions);

    console.table(users);
    console.info('Seeding complete!');
    process.exit(0);
});


// *************************

// const connection = require('../config/connection');
// const { Thought, User } = require('../models');
// const { getRandomName, getRandomThought, getRandomFriends } = require('./data');

// connection.on('error', (err) => {
//     throw err;
// });

// connection.once('open', async () => {
//     console.log('connected');

//     // Delete collections if they exist
//     // await Thought.collection.drop();
//     // await User.collection.drop();

//     // Create empty array to hold users
//     const users = [];

//     // Loop 20 times -- add users to users array
//     for (let i = 0; i < 20; i++) {
//         // Use helper function to randomly assign objects that's imported from ./data.js
//         const thoughts = getRandomThought(2);
//         const username = getRandomName();

//         // Generate random friends for the user (at least 3)
//         // const friends = getRandomFriends(3, users.map((user) => user.username));

//         users.push({
//             username,
//             thoughts,
//             // friends,
//         });
//     }

//     // Add users to the collection and await the results
//     await User.collection.insertMany(users);

//     // Add a single thought to the collection and await the results
//     await Thought.collection.insertOne({
//         thoughtText: 'A sample thought',
//         username: 'sampleUser', // Provide a valid username here
//         reactions: [], // Initialize reactions as an empty array
//     });

//     // Log out the seed data to indicate what should appear in the database
//     console.table(users);
//     console.info('Seeding complete!');
//     process.exit(0);
// });

// ************

// const connection = require('../config/connection');
// const { Thought, User } = require('../models');
// const { getRandomName, getRandomThought } = require('./data');

// connection.on('error', (err) => {
//     throw err
// });

// connection.once ('open', async () => {
//     console.log ('connected');

//     // Delete if they exist
//     let thoughtCheck = await connection.db.listCollections({ name: 'thought' }).toArray();
//     if (thoughtCheck.length) {
//         await connection.dropCollection('thought');
//     }

//     let usersCheck = await connection.db.listCollections ({ name: 'users' }).toArray();
//     if (usersCheck.length) {
//         await connection.dropCollection('users');
//     }

//     // Create empty array to hold users
//     const users = [];

//     // Loop 20 times -- add users to users array
//     for (let i = 0; i < 20; i++) {
//         // Use helper function to randomly assign objects that's imported from ./data.js
//         const thought = getRandomThought(20);

//         const username = getRandomName();

//         users.push({
//             username,
//             thought,
//         });
//     }

//     // Add users to the collection and await the results
//     await User.collection.insertMany(users);

//     // Add thoughts to the collection and await the results
//     await Thought.collection.insertOne({
//         thoughtText: 'UCLA',
//         username: true,
//         reaction: [],
//     });

//     // Log out the seed data to indicate what should appear in the database
//     console.table(users);
//     console.info('Seeding complete!');
//     process.exit(0);
// });