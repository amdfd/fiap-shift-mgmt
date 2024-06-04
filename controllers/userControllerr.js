const express = require('express');
const router = express.Router();
const User = require('../models/User.js');

router.post('/users', async (req, res) => {
  const { name, email } = req.body;
  const result = await User.createUser(name, email);
  res.json(result);
});

router.get('/users', async (req, res) => {
  const users = await User.getUsers();
  res.json(users);
});

router.get('/users/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.getUserById(id);
  res.json(user);
});

router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const result = await User.updateUser(id, name, email);
  res.json(result);
});

router.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  const result = await User.deleteUser(id);
  res.json(result);
});

module.exports = router;
