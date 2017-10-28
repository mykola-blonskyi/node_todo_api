// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('err: ', err);
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, res) => {
  //   if(err){
  //     return console.log('Unable to insert t0do ', err);
  //   } else {
  //     console.log(JSON.stringify(res.ops, null, 2));
  //   }
  // });

  // db.collection('Users').insertOne({
  //   name: 'Nick',
  //   age: 27,
  //   location: 'Ukraine'
  // }, (err, res) => {
  //   if(err){
  //     return console.log('Unable to insert user ', err);
  //   } else {
  //     console.log(JSON.stringify(res.ops, null, 2));
  //   }
  // });

  db.close();
});