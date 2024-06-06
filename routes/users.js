var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', async (req, res) => {
  const users = await User.getUsers();
  res.render('users', { users: users });
});

router.get('/create', (req, res) => {
  res.render('createUser');
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

router.get('/:id', async (req, res) => {
  const user = await User.getUserById(req.params.id);
  res.render('users', { user });
});

module.exports = router;
