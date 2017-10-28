const mongoose = require('mongoose');
const validator = require('validator');

let User = mongoose.model('User', {
  email: {
    required: true,
    trim: true,
    type: String,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email!'
    }
    // validate: {
    //   validator: (value) => {
    //     return validator.isEmail(value);
    //   },
    //   message: '{VALUE} is not a valid email!'
    // }
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

module.exports = {User};