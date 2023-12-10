// const sqlite3 = require('sqlite3');
// const { open } = require('sqlite');

// async function initializeDatabase() {
//   const db = await open({
//     filename: 'database.db',
//     driver: sqlite3.Database
//   });

//   // 创建用户表（如果尚未存在）
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS user (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       username TEXT UNIQUE,
//       password TEXT
//     )
//   `);

//   // 创建搜索记录表
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS search_records (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       username TEXT,
//       search_record TEXT,
//       FOREIGN KEY (username) REFERENCES user(username)
//     )
//   `);

//   // 创建评论记录表
//   await db.exec(`
//     CREATE TABLE IF NOT EXISTS comment_records (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       username TEXT,
//       comment TEXT,
//       comment_time TEXT,
//       movie_id INTEGER,
//       FOREIGN KEY (username) REFERENCES user(username)
//     )
//   `);

//   return db;
// }

// // ...之前的代码...

// async function addSearchRecord(username, searchRecord) {
//     const db = await openDb();
//     await db.run('INSERT INTO search_records (username, search_record) VALUES (?, ?)', [username, searchRecord]);
//   }
  
//   async function getSearchRecordsByUsername(username) {
//     const db = await openDb();
//     return db.all('SELECT * FROM search_records WHERE username = ?', username);
//   }
  
//   async function addCommentRecord(username, comment, commentTime, movieId) {
//     const db = await openDb();
//     await db.run('INSERT INTO comment_records (username, comment, comment_time, movie_id) VALUES (?, ?, ?, ?)', [username, comment, commentTime, movieId]);
//   }
  
//   async function getCommentRecordsByUsername(username) {
//     const db = await openDb();
//     return db.all('SELECT * FROM comment_records WHERE username = ?', username);
//   }
  
//   module.exports = {
//     initializeDatabase,
//     addSearchRecord,
//     getSearchRecordsByUsername,
//     addCommentRecord,
//     getCommentRecordsByUsername
//   };
  
