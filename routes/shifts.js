var express = require('express');
var router = express.Router();
var Shift = require('../models/Shift.js');

router.get('/register-shift', (req, res) => {
  const userId = req.query.userId;
  if (!userId) {
    return res.status(400).send('User ID is required');
  }
  res.render('registerShift', { userId: userId });
});

router.get('/view-shifts', async (req, res) => {
  const { userId } = req.query;
  const shifts = await Shift.getShifts(userId);
  if (!shifts) {
    return res.status(404).send('Shifts not found');
  }
  res.render('viewShifts', { shifts });
});

router.post('/register-shift', async (req, res) => {
  const { userId, shiftDate, shiftStart, shiftEnd } = req.body;
  try {
    const result = await Shift.createShift(
      userId,
      shiftDate,
      shiftStart,
      shiftEnd,
    );
    if (result && result.lastID) {
      res.redirect(`/users/${userId}`);
    } else {
      res.status(400).json({ message: 'Failed to create shift' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
