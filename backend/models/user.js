const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // importing bcrypt
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator'); // prevent duplicates
const UnauthorizedError = require('../errors/unauthorized-err.js');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorer',
  },
  avatar: {
    type: String,
    validate: {
      validator: (v) => validator.isURL(v, [
        {
          protocols: ['http', 'https', 'ftp'],
          require_tld: true,
          require_protocol: true,
        },
      ]),
      message: "Sorry. The 'avatar' field must have a valid URL.",
    },
    default: 'https://pictures.s3.yandex.net/resources/avatar_1604080799.jpg',
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: "Sorry. The 'email' field must have a email address",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Incorrect email or password');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Incorrect email or password');
          }
          return user; // now user is available
        });
    });
};
userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
