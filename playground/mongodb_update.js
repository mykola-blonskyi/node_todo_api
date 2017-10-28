// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('err: ', err);
  }

  console.log('Connected to MongoDB server');

  // db.collection('Todos').findOneAndUpdate({
  //   _id: ObjectID("59f4442b28c28bf5ad823d27")
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((res) => console.log(res));

  db.collection('Users').findOneAndUpdate({
    _id: ObjectID('59f08fa90fb63812e45deaa1')
  }, {
    $set: {
      name: 'Test'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((res) => console.log(res));

  // db.close();
});