const {ObjectID} = require('mongodb');
const {Todo} = require('./../../models/todo');
const {User} =require('./../../models/user');
const jwt = require('jsonwebtoken');

const user_1_id = new ObjectID();
const user_2_id = new ObjectID();
const users = [
  {
    _id: user_1_id,
    email: 'test1@test.test',
    password: 'testpass1',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: user_1_id, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
  },
  {
    _id: user_2_id,
    email: 'test2@test.test',
    password: 'testpass2',
    tokens: [{
      access: 'auth',
      token: jwt.sign({_id: user_2_id, access: 'auth'}, process.env.JWT_SECRET).toString()
    }]
  },
];

const todos = [
  {
    _id: new ObjectID(),
    text: 'first text',
    _creator: user_1_id
  },
  {
    _id: new ObjectID(),
    text: 'second text',
    completed: true,
    completedAt: 132,
    _creator: user_2_id
  }
];

const populateUsers = (done) => {
  User.remove().then(() => {
    let user_1 = new User(users[0]).save();
    let user_2 = new User(users[1]).save();

    return Promise.all([user_1, user_2]);
  }).then(() => done());
};

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

module.exports = {users, todos, populateUsers, populateTodos};