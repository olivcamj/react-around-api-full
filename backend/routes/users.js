const express = require('express');

const router = express.Router();
const {
  getUsers, getOneUser, createUser, updateProfile, updateAvatar,
} = require('../controllers/users.js');

router.get('/users', getUsers);
router.get('/users/:id', getOneUser);
router.post('/users', createUser);
router.patch('/users/me', updateProfile);
router.patch('/users/me/avatar', updateAvatar);

module.exports = router;
