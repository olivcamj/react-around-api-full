const express = require('express');
const { celebrate, Joi } = require('celebrate');

const userRouter = express.Router();
const {
  getUsers, getOneUser, updateProfile, updateAvatar,
} = require('../controllers/users.js');

userRouter.get('/', getUsers);

userRouter.get('/:id', getOneUser);

userRouter.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
  }),
}), updateProfile);

userRouter.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string(),
  }),
}), updateAvatar);

module.exports = userRouter;
