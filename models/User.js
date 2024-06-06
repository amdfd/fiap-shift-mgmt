const { openDb } = require('../dbConfig.js');

async function initializeDb() {
  const db = await openDb();
  await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT
    )
  `);

  await db.run(`
  CREATE TABLE IF NOT EXISTS shifts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    shift_start DATETIME,
    shift_end DATETIME,
    shift_date DATE,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
}

async function createUser(name, email) {
  const db = await openDb();
  const result = await db.run('INSERT INTO users (name, email) VALUES (?, ?)', [
    name,
    email,
  ]);
  const newUser = await db.get(
    'SELECT * FROM users WHERE id = ?',
    result.lastID,
  );
  return newUser;
}

async function getUsers() {
  const db = await openDb();
  const users = await db.all('SELECT * FROM users');
  return users;
}

async function getUserByNameAndEmail(name, email) {
  const db = await openDb();
  const user = await db.get(
    'SELECT * FROM users WHERE name = ? AND email = ?',
    [name, email],
  );
  return user;
}

async function getUserById(id) {
  const db = await openDb();
  const user = await db.get('SELECT * FROM users WHERE id = ?', id);
  return user;
}

async function updateUser(id, name, email) {
  const db = await openDb();
  const result = await db.run(
    'UPDATE users SET name = ?, email = ? WHERE id = ?',
    name,
    email,
    id,
  );
  return result;
}

async function deleteUser(id) {
  const db = await openDb();
  const result = await db.run('DELETE FROM users WHERE id = ?', id);
  return result;
}

module.exports = {
  initializeDb,
  createUser,
  getUsers,
  getUserByNameAndEmail,
  getUserById,
  updateUser,
  deleteUser,
};
