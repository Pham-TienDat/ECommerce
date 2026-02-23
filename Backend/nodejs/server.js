require('dotenv').config();
const express = require('express')
const app = express()
const mysql = require('mysql2/promise');
const cors = require('cors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const isAdmin = require("./isAdmin");
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
    const { product_name, product_price, quantity, image, product_id } = req.body;

    await pool.execute(
      'INSERT INTO carts(product_name, quantity, price, user_id, image, product_id) VALUES (?,?,?,?,?,?)',
      [product_name, quantity, product_price, userId, image,product_id]
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


// Xử lý đơn hàng
app.post("/orders", auth, async (req, res) => {
  const userId = req.user.sub;
  const { items, customer, payment_method } = req.body;

  if (!items || items.length === 0) {
    return res.status(400).json({ message: "Giỏ hàng trống" });
  }

  if (!customer?.name || !customer?.phone || !customer?.address) {
    return res.status(400).json({ message: "Thiếu thông tin khách hàng" });
  }

  const conn = await pool.getConnection();

  try {
    await conn.beginTransaction();

    let totalPrice = 0;

    // 1️⃣ Tạo order trước (total tạm thời = 0)
    const [orderResult] = await conn.execute(
      `INSERT INTO orders 
       (user_id, name, phone, address, note, total_price, status, payment_method)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        userId,
        customer.name,
        customer.phone,
        customer.address,
        customer.note || "",
        0,
        "pending",
        payment_method || "cod"
      ]
    );

    const orderId = orderResult.insertId;

    // 2️⃣ Xử lý từng sản phẩm (LOCK + CHECK + UPDATE)
    for (const item of items) {
      const quantity = Number(item.quantity);

      if (!quantity || quantity <= 0) {
        throw new Error("Số lượng không hợp lệ");
      }

      // Lock row sản phẩm
      const [rows] = await conn.execute(
        "SELECT stock, price, name FROM products WHERE id = ? FOR UPDATE",
        [item.product_id]
      );

      if (rows.length === 0) {
        throw new Error("Sản phẩm không tồn tại");
      }

      const product = rows[0];

      // ❌ Hết hàng
      if (product.stock < quantity) {
        throw new Error(`Sản phẩm "${product.name}" không đủ hàng`);
      }

      // ✅ Trừ tồn kho
      await conn.execute(
        "UPDATE products SET stock = stock - ? WHERE id = ?",
        [quantity, item.product_id]
      );

      // Lấy giá từ DB (không tin frontend)
      const price = product.price;
      totalPrice += price * quantity;

      // Insert order_items
      await conn.execute(
        `INSERT INTO order_items 
         (order_id, product_id, price, quantity, name)
         VALUES (?, ?, ?, ?, ?)`,
        [
          orderId,
          item.product_id,
          price,
          quantity,
          product.name
        ]
      );
    }

    // 3️⃣ Cập nhật total_price chính xác
    await conn.execute(
      "UPDATE orders SET total_price = ? WHERE id = ?",
      [totalPrice, orderId]
    );

    // 4️⃣ Xóa giỏ hàng
    for (const item of items) {
      await conn.execute(
        "DELETE FROM carts WHERE user_id = ? AND id = ?",
        [userId, item.id]
      );
    }

    await conn.commit();

    res.json({
      ok: true,
      orderId,
      total: totalPrice,
      message: "Đặt hàng thành công"
    });

  } catch (err) {
    await conn.rollback();
    console.error(err);
    res.status(500).json({
      ok: false,
      message: err.message || "Lỗi tạo đơn hàng"
    });
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
        oi.name           AS product_name,
        oi.product_id     AS product_id
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


//Admin Dashboard
app.get("/admin/dashboard", auth, async (req, res) => {
  try {
    // Tổng đơn hàng
    const [[ordersCount]] = await pool.execute(
      "SELECT COUNT(*) AS totalOrders FROM orders"
    );

    // Tổng doanh thu (chỉ tính đơn hoàn thành)
    const [[revenue]] = await pool.execute(
      "SELECT SUM(total_price) AS totalRevenue FROM orders WHERE status = 'completed'"
    );

    // Tổng sản phẩm
    const [[productsCount]] = await pool.execute(
      "SELECT COUNT(*) AS totalProducts FROM products"
    );

    // Tổng người dùng
    const [[usersCount]] = await pool.execute(
      "SELECT COUNT(*) AS totalUsers FROM users"
    );

    // Đơn hàng mới nhất
    const [latestOrders] = await pool.execute(
      `
      SELECT id, total_price, status, date
      FROM orders
      ORDER BY date DESC
      LIMIT 5
      `
    );

    res.json({
      ok: true,
      stats: {
        totalOrders: ordersCount.totalOrders,
        totalRevenue: revenue.totalRevenue || 0,
        totalProducts: productsCount.totalProducts,
        totalUsers: usersCount.totalUsers
      },
      latestOrders
    });

  } catch (err) {
    console.error("DASHBOARD ERROR:", err);
    res.status(500).json({ message: "Dashboard error" });
  }
});

//Admin Product Form
app.post("/admin/products", auth, async (req, res) => {
  try {
    const { name, price, image } = req.body;

    // Validate backend (KHÔNG tin frontend)
    if (!name || !price || !image) {
      return res.status(400).json({
        message: "Thiếu thông tin sản phẩm"
      });
    }

    if (price <= 0) {
      return res.status(400).json({
        message: "Giá phải lớn hơn 0"
      });
    }

    // Insert DB
    const [result] = await pool.execute(
      `
      INSERT INTO products (name, price, image)
      VALUES (?, ?, ?)
      `,
      [name.trim(), price, image.trim()]
    );

    res.status(201).json({
      message: "Tạo sản phẩm thành công",
      productId: result.insertId
    });

  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    res.status(500).json({
      message: "Lỗi server khi tạo sản phẩm"
    });
  }
});

//Admin Products
  app.get("/admin/products", auth, async (req, res) => {
  try {
    const [products] = await pool.execute(
      "SELECT id, name, price, image FROM products ORDER BY id DESC"
    );

    res.json(products); // trả về mảng trực tiếp
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});
app.put("/admin/products/:id", auth, async (req, res) => {
  try {
    const { name, price, image } = req.body;
    const { id } = req.params;

    const [existing] = await pool.execute(
      "SELECT id FROM products WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm"
      });
    }

    await pool.execute(
      `
      UPDATE products
      SET name = ?, price = ?, image = ?
      WHERE id = ?
      `,
      [name.trim(), price, image.trim(), id]
    );

    res.json({ message: "Cập nhật thành công" });

  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});
app.delete("/admin/products/:id", auth, async (req, res) => {
  try {
    const { id } = req.params;

    const [existing] = await pool.execute(
      "SELECT id FROM products WHERE id = ?",
      [id]
    );

    if (existing.length === 0) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm"
      });
    }

    await pool.execute(
      "DELETE FROM products WHERE id = ?",
      [id]
    );

    res.json({ message: "Xóa thành công" });

  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});

//Admin Order
app.get("/admin/orders", auth, async (req, res) => {
  try {
    const [orders] = await pool.execute(`
      SELECT 
        o.id,
        o.total_price,
        o.status,
        o.date,
        u.username
      FROM orders o
      JOIN users u ON o.user_id = u.id
      ORDER BY o.date DESC
    `);

    res.json(orders);

  } catch (err) {
    console.error("GET ORDERS ERROR:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});
app.put("/admin/orders/:id/status", auth, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatus = [
      "pending",
      "confirmed",
      "shipped",
      "completed",
      "cancelled"
    ];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({
        message: "Trạng thái không hợp lệ"
      });
    }

    const [[order]] = await pool.execute(
      "SELECT status FROM orders WHERE id = ?",
      [id]
    );

    if (!order) {
      return res.status(404).json({
        message: "Không tìm thấy đơn hàng"
      });
    }

    if (order.status === "completed") {
      return res.status(400).json({
        message: "Đơn đã hoàn tất, không thể thay đổi"
      });
    }

    await pool.execute(
      "UPDATE orders SET status = ? WHERE id = ?",
      [status, id]
    );

    res.json({ message: "Cập nhật thành công" });

  } catch (err) {
    console.error("UPDATE ORDER ERROR:", err);
    res.status(500).json({ message: "Lỗi server" });
  }
});