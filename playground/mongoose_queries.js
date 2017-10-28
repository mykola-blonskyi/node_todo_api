const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

// const id = '59f48d2f6397eb08ac7829a4';
//
// if(!ObjectID.isValid(id)){
//   return console.log('id not valid');
// }

// Todo.find({_id: id}).then((todos) => {
//   console.log('todos: ', todos);
// });
//
// Todo.findOne({_id: id}).then((todo) => {
//   console.log('todo: ', todo);
// });

// Todo.findById(id).then((todo) => {
//   if(!todo){
//     return console.log('id not found');
//   }
//   console.log('find by id todo: ', todo);
// }).catch((err) => console.log(err));

User.findById('59f4745d4a43f9292430434d').then((user) => {
  if(!user){
    return console.log('no such user');
  }
  console.log('user: ', user);
}, (err) => console.log(err));