const express = require('express');
const router = express.Router();
const Shift = require('../models/Shift.js');

router.post('/register-shift', async (req, res) => {
  const { userId, shiftDate, shiftStart, shiftEnd } = req.body;
  const result = await Shift.createShift(
    userId,
    shiftDate,
    shiftStart,
    shiftEnd,
  );
  res.json(result);
});

router.get('/shifts/:userId', async (req, res) => {
  const { userId } = req.params;
  const shifts = await Shift.getShifts(userId);
  res.json(shifts);
});

module.exports = router;
