const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // importing bcrypt
const User = require('../models/user');

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

  bcrypt.hash(password, SALT_ROUNDS)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      });
    })
    // returns the recorded data
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(400).send({ message: err }); // 'Error: data not recorded'
      }
      res.status(500).send({ message: err });
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
  updateProfile,
  updateAvatar,
};
