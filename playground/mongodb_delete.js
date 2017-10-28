// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if(err){
    return console.log('err: ', err);
  }

  console.log('Connected to MongoDB server');

  //delete many
  // db.collection('Todos').deleteMany({text: 'some to1do 1'}).then((res) => console.log(res));
  //delete one
  // db.collection('Todos').deleteOne({text: 'some to1do 1'}).then((res) => console.log(res));
  //find one and delete
  // db.collection('Todos').findOneAndDelete({completed: false}).then((res) => console.log(res));

  db.collection('Users').deleteMany({name: 'Test2'}).then((res) => console.log(res));
  db.collection('Users').findOneAndDelete({_id: ObjectID('59f43ed128c28bf5ad823ba6')}).then((res) => console.log(res));

  // db.close();
});