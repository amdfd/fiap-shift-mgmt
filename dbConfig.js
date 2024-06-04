const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

// const { openDb } = require('./dbConfig.js');

async function openDb() {
  return open({
    filename: './data/database.db',
    driver: sqlite3.Database,
  });
}

module.exports = { openDb };
