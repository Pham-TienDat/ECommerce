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

//Lấy thông tin người dùng từ cơ sở dữ liệu
app.get('/users', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM users');
    res.json({ ok: true, users: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
//Lấy danh sách danh mục từ cơ sở dữ liệu
app.get('/categories', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM categories');
    res.json({ ok: true, categories: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
//Lấy danh sách sản phẩm từ cơ sở dữ liệu
app.get('/products', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM products');
    res.json({ ok: true, products: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
//Lấy thông tin đăng nhập từ frontend và so sánh với cơ sở dữ liệu
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
//Lấy thông tin đăng ký từ backend và ghi vào cơ sở dữ liệu
app.post('/signup', async(req, res) => {
  const { username, password } = req.body; // Lấy dữ liệu gửi lên
  try{
  const [rows] = await pool.execute('INSERT INTO users(username,password) VALUES (?,?)', [username,password])
  res.json({ message: "true" });}
  catch(error){
    res.json({ message: "false" });
  }
});



app.listen(process.env.PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${process.env.PORT}`);
});