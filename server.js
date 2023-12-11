const express = require('express');
const sqlite3 = require('sqlite3');
const { open } = require('sqlite');
const cors = require('cors'); // 引入cors

const app = express();
app.use(cors()); // 使用cors中间件
app.use(express.json());


const dbPromise = open({
  filename: 'database.db',
  driver: sqlite3.Database
});

// 检查user表是否存在并创建
async function initializeDatabase() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS user (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )
  `);
}

initializeDatabase();

// 定义其他数据库操作函数，使用 dbPromise
async function addSearchRecord(username, searchRecord) {
    const db = await dbPromise;
    await db.run('INSERT INTO search_records (username, search_record) VALUES (?, ?)', [username, searchRecord]);
  }
  
  async function getSearchRecordsByUsername(username) {
    const db = await dbPromise;
    return db.all('SELECT * FROM search_records WHERE username = ?', username);
  }
  
  async function addCommentRecord(username, comment, commentTime, movieId) {
    const db = await dbPromise;
    await db.run('INSERT INTO comment_records (username, comment, comment_time, movie_id) VALUES (?, ?, ?, ?)', [username, comment, commentTime, movieId]);
  }
  
  async function getCommentRecordsByUsername(username) {
    const db = await dbPromise;
    return db.all('SELECT * FROM comment_records WHERE username = ?', username);
  }

  async function getCommentRecordsByMovieId(movieId) {
    const db = await dbPromise;
    return db.all('SELECT * FROM comment_records WHERE movie_id = ?', movieId);
  }


  // 添加搜索记录
app.post('/add-search-record', async (req, res) => {
    const { username, searchRecord } = req.body;
    await addSearchRecord(username, searchRecord);
    res.send({ message: 'Search record added successfully.' });
});

app.get('/', async (req, res) => {

    res.send({ message: 'Send successfully.' });
});

// 根据用户名查询搜索记录
app.get('/search-records/:username', async (req, res) => {
    const username = req.params.username;
    const records = await getSearchRecordsByUsername(username);
    res.send(records);
});
  
// 添加评论记录
app.post('/add-comment-record', async (req, res) => {
    const { username, comment, commentTime, movieId } = req.body;
    await addCommentRecord(username, comment, commentTime, movieId);
    res.send({ message: 'Comment record added successfully.' });
});
  
// 根据用户名查询评论记录
app.get('/comment-records-user/:username', async (req, res) => {
    const username = req.params.username;
    const records = await getCommentRecordsByUsername(username);
    res.send(records);
});

app.get('/comment-records-movie/:movieId', async (req, res) => {
    const movieId = req.params.movieId;
    const records = await getCommentRecordsByMovieId(movieId);
    res.send(records);
})
  

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const db = await dbPromise;
  
    const existingUser = await db.get('SELECT id FROM user WHERE username = ?', username);
  
    if (existingUser) {
      return res.status(409).send({ message: 'Username already exists.' });
    }
  
    await db.run('INSERT INTO user (username, password) VALUES (?, ?)', [username, password]);
    res.status(201).send({ message: 'User registered successfully.' });
  });

  // 在server.js中继续

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const db = await dbPromise;
  
    const user = await db.get('SELECT id FROM user WHERE username = ? AND password = ?', [username, password]);
  
    if (user) {
      res.send({ message: 'Login successful.' });
    } else {
      res.status(401).send({ message: 'Invalid username or password.' });
    }
  });
  

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
