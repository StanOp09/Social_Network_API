const names = [
  "Ethan",
  "Olivia",
  "Liam",
  "Emma",
  "Noah",
  "Ava",
  "William",
  "Sophia",
  "James",
  "Isabella",
  "Benjamin",
  "Mia",
  "Elijah",
  "Charlotte",
  "Oliver",
  "Amelia",
  "Henry",
  "Harper",
  "Alexander",
  "Evelyn"
];

const possibleThoughts = [
  "Life is what happens when you're busy making other plans.",
  "The only way to do great work is to love what you do.",
  "Success is not final, failure is not fatal: It is the courage to continue that counts.",
  "Don't count the days, make the days count.",
  "In three words I can sum up everything I've learned about life: it goes on.",
  "The journey of a thousand miles begins with one step.",
  "You miss 100% of the shots you don't take.",
  "Happiness is not something ready made. It comes from your own actions.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
  "Life is 10% what happens to us and 90% how we react to it.",
  "The only thing we have to fear is fear itself.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "The only limit to our realization of tomorrow will be our doubts of today.",
  "Believe you can and you're halfway there.",
  "Do not go where the path may lead, go instead where there is no path and leave a trail."
];

const possibleReactions = [
  "I agree!",
  "That's interesting.",
  "Great point!",
  "I'm not sure about that.",
  "I disagree.",
  "Tell me more.",
  "Wow!",
  "I've never thought of it that way.",
  "That's profound.",
  "I see what you mean.",
  "I'm not convinced.",
  "Exactly!",
  "Interesting perspective.",
  "I couldn't agree more.",
  "I respectfully disagree.",
  "Please elaborate.",
  "Fascinating!",
  "I need more information.",
  "Well said!",
  "I'm not so sure about that.",
  "You've got a point there.",
  "I'm on the fence about it.",
  "I have a different opinion.",
  "Can you clarify?",
  "I'm intrigued.",
  "I appreciate your input.",
  "I'm curious to learn more.",
  "I'm in complete accord.",
  "I'm open to changing my mind.",
  "I'm puzzled by that.",
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// Gets a random full name
const getRandomName = () =>
  `${getRandomArrItem(names)} ${getRandomArrItem(names)}`;

// Gets a random thought
const getRandomThought = (int) => {
    let results = [];
    for (let i=0; i < int; i++) {
        results.push({
            thoughtText: getRandomArrItem(possibleThoughts),
            // thought: getRandomArrItem(possibleThoughts),
            // reactions: getRandomArrItem(possibleReactions)
        })
    }
    return results;
};

// Gets random friends
const getRandomFriends = (int, existingUsernames) => {
  let results = [];

  for (let i = 0; i < int; i++) {
    // Ensure that the friend is not the same as the current user
    let randomFriend;
    do {
      randomFriend = getRandomArrItem(existingUsernames);
    } while (randomFriend === existingUsernames[i]);

    results.push(randomFriend);
  }

  return results;
};

module.exports = { getRandomName, getRandomThought, getRandomFriends };

// const getRandomThought = () => `${getRandomArrItem(possibleThoughts)}`

// Gets a random reaction
// const getRandomReaction = () => `${getRandomArrItem(possibleReactions)}`