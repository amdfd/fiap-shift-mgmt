var express = require('express');
var router = express.Router();
var User = require('../models/User.js');

router.get('/', async (req, res) => {
  const users = await User.getUsers();
  res.render('users', { users: users });
});

router.get('/create', (req, res) => {
  res.render('createUser');
});

router.get('/:id', async (req, res) => {
  const user = await User.getUserById(req.params.id);
  res.render('users', { user });
});

router.post('/', async (req, res) => {
  const { name, email } = req.body;
  const user = await User.getUserByNameAndEmail(name, email);
  if (user) {
    res.redirect(`/users/${user.id}`);
  } else {
    const newUser = await User.createUser(name, email);
    res.redirect(`/users/${newUser.id}`);
  }
});

router.get('/:id/edit', async (req, res) => {
  const user = await User.getUserById(req.params.id);
  res.render('updateUser', { user });
});

router.post('/:id/update', async (req, res) => {
  const { name, email } = req.body;
  const id = req.params.id;
  try {
    const result = await User.updateUser(id, name, email);
    if (result.changes === 0) {
      return res.status(404).send('User not found');
    }
    res.redirect(`/users/${id}`);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
