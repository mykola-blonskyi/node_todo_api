const _ = require('lodash');
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

let UserSchema = new mongoose.Schema({
  email: {
    required: true,
    trim: true,
    type: String,
    minlength: 1,
    unique: true,
    // validate: {
    //   validator: validator.isEmail,
    //     message: '{VALUE} is not a valid email!'
    // }
    validate: {
      validator: (value) => {
        return validator.isEmail(value);
      },
      message: '{VALUE} is not a valid email!'
    }
  },
  password: {
    type: String,
      required: true,
      minlength: 3
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  let user = this;
  let user_obj = user.toObject();

  return _.pick(user_obj, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  let user = this;
  let access = 'auth';
  let token = jwt.sign({_id: user._id.toHexString(), access}, 'zxc321').toString();

  user.tokens.push({access, token});

  return user.save().then(() => token);
};

UserSchema.statics.findByToken = function (token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, 'zxc321');
  } catch (err) {
    // return new Promise((resolve, reject) => reject());
    return Promise.reject();
  }

  return User.findOne({
    _id: decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.pre('save', function (next) {
  let user = this;

  if(user.isModified('password')){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      })
    });
  } else {
    next();
  }
});

let User = mongoose.model('User', UserSchema);

module.exports = {User};