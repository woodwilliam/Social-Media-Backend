const connection = require('../config/connection');
const Users = require('../models/User');
const Thoughts = require('../models/Thought');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
await Users.deleteMany({});
await Thoughts.deleteMany({});
const users = [
  {
    userName: "Frank",
    email: "thisisanemail@email.mail"
  },
  {
    "userName": "Bob",
    "email": "thisalsoisanemail@email.mail"
  },
];

const thoughts = [
  {
    thoughtText: "This is thoughtteexthjkl;sdfjlhsdf;ljhsd",
    username: "Bob",
    reactions: {reactionBody: "This is a reaction",
                username: "Frank"}
  },
  {
    "thoughtText": "lk;jagklj;ljhsdfkljhsdf",
    "username": "Frank",
  }]
await Users.collection.insertMany(users);
await Thoughts.collection.insertMany(thoughts);
process.exit(0);
});