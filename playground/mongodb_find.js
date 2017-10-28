// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('err: ', err);
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('59f43ab128c28bf5ad823adc')
  // }).toArray().then((docs) => {
  //   console.log('Todos:');
  //   console.log(JSON.stringify(docs, null, 2));
  // }, (err) => console.log('unable to fetch todos: ', err));

  // db.collection('Todos').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err) => console.log('unable to fetch todos: ', err));

  db.collection('Users').find({location: 'Ukraine'}).toArray().then((docs) => {
    console.log('Users:');
    console.log(JSON.stringify(docs, null, 2));
  }, (err) => console.log('unable to fetch todos: ', err));

  // db.close();
});