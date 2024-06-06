const { openDb } = require('../dbConfig.js');

async function createShift(userId, shiftDate, shiftStart, shiftEnd) {
  const db = await openDb();
  const result = await db.run(
    'INSERT INTO shifts (user_id, shift_date, shift_start, shift_end) VALUES (?, ?, ?, ?)',
    [userId, shiftDate, shiftStart, shiftEnd],
  );
  return result;
}

async function getShifts(userId) {
  const db = await openDb();
  const shifts = await db.all('SELECT * FROM shifts WHERE user_id = ?', userId);
  return shifts;
}

module.exports = { createShift, getShifts };
