require('dotenv').config();
const express = require('express')
const app = express()
const mysql = require('mysql2/promise');
const cors = require('cors');
const port = 3000

//Kết nối tới cơ sở dữ liệu
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.get('/', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT NOW() AS time');
    res.json({ message: 'Kết nối thành công!', data: rows });
  } catch (error) {
    res.status(500).json({ message: 'Lỗi kết nối DB', error: error.message });
  }
});


app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    res.json({ ok: true, users: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.get('/categories', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories');
    res.json({ ok: true, categories: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

app.post('/login', async(req, res) => {
  const { username, password } = req.body; // Lấy dữ liệu gửi lên
  const [rows] = await pool.execute('SELECT username, password FROM users WHERE username = ?', [username]);
  if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  const user = rows[0];
  if(password===user.password){
    res.json({ message: "true" });
  }
  else res.json({ message: "false" });
});


app.listen(process.env.PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${process.env.PORT}`);
});