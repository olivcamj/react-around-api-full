const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/not-found-err.js');
const BadRequestError = require('../errors/bad-request-err.js');
const UnauthorizedError = require('../errors/unauthorized-err.js');

const { NODE_ENV, JWT_SECRET } = process.env;
const SALT_ROUNDS = 10;

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

const getOneUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      console.log(user);
      if (!user) {
        throw new NotFoundError('No user with matching ID found');
      }
      res.status(200).send(user);
    })
    .catch(next);
};

const createUser = (req, res) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  if (!password || !email) return res.status(400).send({ message: 'Email and password fields should not be empty' });

  console.log('1st createUser: ', email, password);

  return bcrypt.hash(password, SALT_ROUNDS, (err, hash) => {
    console.log('2nd!!! createUser: ', email, password);

    return User.findOne({ email }).select('+password')
      .then((userExists) => {
        if (userExists) return res.status(403).send({ message: 'a user with this email already exists' });

        return User.create(
          {
            name,
            about,
            avatar,
            email,
            password: hash,
          },
        )
          .then((user) => res.send({ id: user._id, email: user.email }))
          .catch(() => {
            if (err.name === 'CastError') {
              throw new BadRequestError('User cannot be created'); // message: 'User cannot be created
            }
          });
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Incorrect password or email');
      }
      // authentication successful! user is in the user variable
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'practicum',
        { expiresIn: '7d' },
      );
      res.cookie('token', token, { httpOnly: true });
      res.send({ token });
    })
    .catch((err) => {
      // authentication error
      if (err.name === 'CastError') {
        throw new BadRequestError('Invalid data');
      }
      next(err);
    })
    .catch(next);
};

const updateProfile = (req, res, next) => {
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
        throw new BadRequestError('Invalid data');
      }
      next(err);
    })
    .catch(next);
};

const updateAvatar = (req, res, next) => {
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
        throw new BadRequestError('Invalid data');
      }
      next(err);
    })
    .catch(next);
};

module.exports = {
  getUsers,
  getOneUser,
  createUser,
  login,
  updateProfile,
  updateAvatar,
};
