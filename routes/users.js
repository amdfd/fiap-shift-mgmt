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

router.put('/update-user', async (req, res) => {
  const { name, email } = req.body;
  const id = req.query.userId;
  try {
    const result = await User.updateUser(id, name, email);
    if (result.changes === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send('User updated successfully');
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = router;
