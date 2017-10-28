const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb')

const {app} = require('./../server');
const{Todo} = require('./../models/todo');

const todos = [
  {
    _id: new ObjectID(),
    text: 'first text'
  },
  {
    _id: new ObjectID(),
    text: 'second text'
  },
  {
    _id: new ObjectID(),
    text: 'third text',
    completed: true,
    completedAt: 132
  }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('Should create a new todo', (done) => {
    let text = 'test todo text';

    request(app)
      .post('/todos')
      .send({text: text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((err) => done(err));
      });
  });

  it('Should not create todo with not invalid data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(3);
          done();
        }).catch((err) => done(err));
      });
  });
});

describe('GET /todos', () => {
  it('Should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(todos.length);
      }).end(done)
  });
});

describe('GET /todos/:id', () => {
  it('Should return todo by id', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      }).end(done);
  });

  it('Should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for non-object id', (done) => {
    request(app)
      .get(`/todos/123`)
      .expect(404)
      .end(done);
  })
});

describe('DELETE /todos/:id', () => {
  it('Should remove todo by id', (done) => {
    request(app)
      .delete(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end((err, res) => {
        if(err){
          return done(err);
        }

        Todo.findById(todos[0]._id.toHexString()).then((todo) => {
          expect(todo).toNotExist();
          done();
        }).catch((err) => done(err));
    });
  });

  it('Should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString()}`)
      .expect(404)
      .end(done);
  });

  it('Should return 404 for non-object id', (done) => {
    request(app)
      .delete(`/todos/123`)
      .expect(404)
      .end(done);
  })
});

describe('PATCH /todos/:id', () => {
  it('Should update todo by id', (done) => {
    let id = todos[0]._id.toHexString();
    let text = 'updated text';

    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: true,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      }).end(done);
  });

  it('Should clear completedAt when todo is not completed', (done) => {
    let id = todos[2]._id.toHexString();
    let text = 'updated text 123';

    request(app)
      .patch(`/todos/${id}`)
      .send({
        completed: false,
        text
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      }).end(done);
  });
});