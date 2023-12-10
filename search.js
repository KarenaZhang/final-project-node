const sqlite3 = require('sqlite3');
const { open } = require('sqlite');

async function listTables() {
  const db = await open({
    filename: 'database.db',
    driver: sqlite3.Database
  });

  const tables = await db.all(
    "SELECT name FROM sqlite_master WHERE type='table'"
  );

  console.log('Tables in the database:', tables);
  db.close();
}

listTables().catch(console.error);
