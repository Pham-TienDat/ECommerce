require('dotenv').config();
const express = require('express')
const app = express()
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const port = 3000
const SALT_ROUNDS = 10;

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
app.post('/user', async (req, res) => {
  try {
    
    const userId = req.body.user_id;
    const [rows] = await pool.execute('SELECT phonenumber, address, name FROM users WHERE id=?',[userId]);
    res.json({ ok: true, user: rows});
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
//Lấy danh sách đơn hàng từ cơ sở dữ liệu
app.get('/cart',auth, async (req, res) => {
  try {
    const userId = req.user.sub;
    const [rows] = await pool.execute('SELECT * FROM carts WHERE user_id = ?',[userId]);
    res.json({ ok: true, cart: rows,user_id:userId });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
//Lấy thông tin đăng nhập từ frontend và so sánh với cơ sở dữ liệu
app.post('/login', async(req, res) => {
  const { username, password } = req.body; // Lấy dữ liệu gửi lên
  const [rows] = await pool.execute('SELECT id, username, password, name, role FROM users WHERE username = ?', [username]);
  if (rows.length === 0) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  const user = rows[0];
  const isMatch = await bcrypt.compare(password, user.password);
  if(isMatch){
     // SINH JWT
    const token = jwt.sign(
      { sub: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE }
    );
    res.json({ message: "true" ,
      accessToken: token,
      user_id: user.id,
      name: user.name,
      role:user.role});
  }
  else res.json({ message: "false" });
});
//Lấy thông tin đăng ký từ backend và ghi vào cơ sở dữ liệu
app.post('/signup', async(req, res) => {
  const { phonenumber,username, password, name } = req.body; // Lấy dữ liệu gửi lên
  try{
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
  const [rows] = await pool.execute('INSERT INTO users(username,phonenumber,password,name) VALUES (?,?,?,?)', [username,phonenumber,passwordHash,name])
  res.json({ message: "true" });}
  catch(error){
    res.json({ message: "false" });
  }
});


//Lấy thông tin thêm đơn hàng ghi vào cơ sở dữ liệu
app.post('/cart', auth, async (req, res) => {
  try {
    const userId = req.user.sub;
    const { product_name, product_price, quantity, image } = req.body;

    await pool.execute(
      'INSERT INTO carts(product_name, quantity, price, user_id, image) VALUES (?,?,?,?,?)',
      [product_name, quantity, product_price, userId, image]
    );

    res.json({ message: "true" });
  } catch (error) {
    res.status(500).json({ message: "false", error: error.message });
  }
});
app.listen(process.env.PORT, () => {
  console.log(`✅ Server đang chạy tại http://localhost:${process.env.PORT}`);
});
//Xóa tất cả sản phẩm trong giỏ hàng
app.delete('/cart/all', auth, async (req, res) => {
  try {
    const userId = req.user.sub;
    await pool.execute(
      'DELETE FROM carts WHERE user_id = ?',
      [userId]
    );
    res.json({ message: 'Xóa thành công' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//Xóa sản phẩm cụ thể trong giỏ hàng
app.delete('/cart/:id',auth, (req, res) => {
  const cartId = req.params.id;
  const userId = req.user.sub;
  const result = pool.execute('DELETE FROM carts WHERE id = ? AND user_id = ?', [cartId, userId]);
  res.json({ message: 'Xóa thành công' });
});
//Lấy thông tin tìm kiếm từ cơ sở dữ liệu
app.post('/search', async (req, res) => {
  try {
    const search = req.body.search;
    const [rows] = await pool.execute(
      `SELECT * FROM products 
       WHERE name LIKE CONCAT('%', ?, '%') 
       LIMIT 50`,
      [search]
    );

    res.json({ ok: true, products: rows });

  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
//Lấy id danh mục được chọn và trả về các sản phẩm tương ứng
app.post('/cats', async (req, res) => {
  try {
    const id = req.body.categories_id;
    const [rows] = await pool.execute(
      `SELECT * FROM products 
       WHERE  categories = ?`,
      [id]
    );
    res.json({ ok: true, products: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});
//Lấy id sản phẩm rồi trả về đánh giá
app.post('/ratings', async (req, res) => {
  try {
    const id = req.body.product_id;
    const [rows] = await pool.execute(
      `SELECT * FROM ratings 
       WHERE  product_id = ?`,
      [id]
    );
    res.json({ ok: true, ratings: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

//Ghi đánh giá vào cơ sở dữ liệu
app.post('/rating', async (req, res) => {
  const { productId,userId,rating, comment } = req.body; // Lấy dữ liệu gửi lên
  try{
  const [rows] = await pool.execute('INSERT INTO ratings(product_id,user_id,comment_text,rating) VALUES (?,?,?,?)', [productId,userId,comment,rating])
  res.json({ message: "true" });}
  catch(error){
    res.json({ message: "false" });
  }
});
//Thông tin sản phẩm đang được giảm giá
app.get('/flashsale', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      'SELECT products.*,flashsale.discount FROM flashsale INNER JOIN products ON flashsale.product_id = products.id');
    res.json({ ok: true, flashsale: rows });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});


//Xử lý đơn hàng
app.post("/orders", auth, async (req, res) => {
  const userId = req.user.sub; // lấy từ JWT
  const { items, customer, total, payment_method } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Giỏ hàng trống" });
  }

  if (!customer?.name || !customer?.phone || !customer?.address) {
    return res.status(400).json({ message: "Thiếu thông tin khách hàng" });
  }

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();

    // 1. Tạo đơn hàng
    const [orderResult] = await conn.execute(
      `INSERT INTO orders (user_id, name, phone, address, note, total_price, status, payment_method)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        customer.name,
        customer.phone,
        customer.address,
        customer.note || "",
        total,
        "pending",
        payment_method 
      ]
    );

    const orderId = orderResult.insertId;

    // 2. Lưu từng sản phẩm
    for (const item of items) {
      await conn.execute(
        `INSERT INTO order_items (order_id, product_id, price, quantity,name)
         VALUES (?, ?, ?, ?, ?)`,
        [orderId, item.id, item.price, item.quantity, item.product_name]
      );
    }

    // 3. Xóa giỏ hàng
    for (const item of items){
    await conn.execute(
      "DELETE FROM carts WHERE user_id = ? AND id = ?",
      [userId,item.id]
    );
  }
    await conn.commit();

    res.json({
      ok: true,
      orderId,
      message: "Đặt hàng thành công"
    });

  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({ ok: false, message: "Lỗi tạo đơn hàng" });
  } finally {
    conn.release();
  }
});


// Lịch sử mua hàng
app.get("/orders", auth, async (req, res) => {
  try {
    const userId = req.user.sub; // 👈 lấy từ JWT

    // Lấy danh sách đơn hàng
    const [orders] = await pool.execute(
      `
      SELECT 
        id,
        total_price,
        status,
        date
      FROM orders
      WHERE user_id = ?
      ORDER BY date DESC
      `,
      [userId]
    );

    // Lấy sản phẩm cho từng đơn
    for (const order of orders) {
      const [items] = await pool.execute(
        `
        SELECT *
        FROM order_items oi
        WHERE oi.order_id = ?
        `,
        [order.id]
      );
      order.items = items;
    }

    res.json({
      ok: true,
      orders
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      ok: false,
      message: "Không thể lấy lịch sử mua hàng"
    });
  }
});




//Gửi về thông tin từng đơn hàng
app.get("/orders/:id", auth, async (req, res) => {
  try {
    const orderId = req.params.id;
    const userId = req.user.sub;

    // 1️⃣ Lấy thông tin đơn hàng (đảm bảo đúng user)
    const [orders] = await pool.execute(
      `
      SELECT 
        id,
        total_price,
        status,
        date,
        name,
        phone,
        address,
        note,
        payment_method
      FROM orders
      WHERE id = ? AND user_id = ?
      `,
      [orderId, userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({
        ok: false,
        message: "Không tìm thấy đơn hàng"
      });
    }

    const order = orders[0];

    // 2️⃣ Lấy danh sách sản phẩm trong đơn
    const [items] = await pool.execute(
      `
      SELECT 
        oi.id            AS order_item_id,
        oi.quantity,
        oi.price         AS order_price,
        oi.name           AS product_name
      FROM order_items oi
      WHERE oi.order_id = ?
      `,
      [orderId]
    );

    // 3️⃣ Trả dữ liệu cho frontend
    res.json({
      ok: true,
      order: {
        id: order.id,
        created_at: order.date,
        status: order.status,
        total_price: order.total_price,
        payment_method: order.payment_method,
        customer: {
          name: order.name,
          phone: order.phone,
          address: order.address,
          note: order.note
        },
        items
      }
    });

  } catch (err) {
    console.error("ORDER DETAIL ERROR:", err);
    res.status(500).json({
      ok: false,
      message: "Lỗi khi lấy chi tiết đơn hàng"
    });
  }
});


//PROFILE
app.get("/me", auth, async (req, res) => {
  const userId = req.user.sub;

  const [rows] = await pool.execute(
    "SELECT id, email, name, phonenumber, address FROM users WHERE id = ?",
    [userId]
  );

  res.json({ user: rows[0] });
});
app.put("/me", auth, async (req, res) => {
  const userId = req.user.sub;
  const { name, phone, address } = req.body;

  await pool.execute(
    `
    UPDATE users
    SET name = ?, phone = ?, address = ?
    WHERE id = ?
    `,
    [name || null, phone || null, address || null, userId]
  );

  res.json({ message: "Cập nhật thành công" });
});

app.put("/me/password", auth, async (req, res) => {
  const userId = req.user.sub;
  const { oldPassword, newPassword } = req.body;

  const [rows] = await pool.execute(
    "SELECT password FROM users WHERE id = ?",
    [userId]
  );

  const match = await bcrypt.compare(oldPassword, rows[0].password);
  if (!match) {
    return res.status(400).json({ message: "Sai mật khẩu cũ" });
  }

  const hashed = await bcrypt.hash(newPassword, 10);

  await pool.execute(
    "UPDATE users SET password = ? WHERE id = ?",
    [hashed, userId]
  );

  res.json({ message: "Đổi mật khẩu thành công" });
});