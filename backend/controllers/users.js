const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

const getUsers = (req, res) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

const getOneUser = (req, res) => {
  // Check if the User Id exists
  const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
  if (!isValidId) {
    res.status(404).send({ message: 'User Not Found - invalid id' });
  }

  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'User ID not found' });
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!password || !email) return res.status(400).send({ message: 'Email and password fields should not be empty' });

  console.log('1st createUser: ', email, password);

  return bcrypt
    .hash(password, SALT_ROUNDS, (err, hash) => {
      console.log('2nd!!! createUser: ', email, password);

      return User.findOne({ email }).select('+password')
        .then((userExists) => {
          if (userExists) return res.status(403).send({ message: 'a user with this email already exists' });

          return User.create({
            name,
            about,
            avatar,
            email,
            password: hash,
          })
            .then((user) => res.send({ id: user._id, email: user.email }))
            .catch(() => res.status(400).send(err)); // message: 'User cannot be created
        });
    });
};

const login = (req, res) => {
  const { email, password } = req.body;

  User.findUserByCredentials({ email, password })
    .then((user) => {
      // authentication successful! user is in the user variable
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'practicum', { expiresIn: '7d' });
      res.cookie('token', token, { httpOnly: true });
      res.send({ token });
    })
    .catch((err) => {
      // authentication error
      res.status(401).send({ message: err.message });
    });
};

const updateProfile = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.params._id,
    { name, about },
    {
      new: true, // the then handler receives the updated entry as input
      runValidators: true, // the data will be validated before the update
      upsert: true, // if the user entry wasn't found, it will be created
    },
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

const updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.params._id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(400).send({ message: err });
      } else {
        res.status(500).send({ message: err });
      }
    });
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  login,
  updateProfile,
  updateAvatar,
};
