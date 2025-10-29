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

app.listen(process.env.PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${process.env.PORT}`);
});