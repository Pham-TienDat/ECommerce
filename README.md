# E-Commerce Web Application

A full-stack e-commerce web application built with React, Node.js, Express, and MySQL.  
This project simulates a real-world online shopping system with authentication, cart management, order processing, and product reviews.

---

## ⚙️ Installation Guide

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/ecommerce.git
cd ecommerce
```

---

### 2️⃣ Setup Database

Create database:

```sql
CREATE DATABASE ECommerce;
```

Import structure and data:

```bash
mysql -u root -p < database.sql
```

---

### 3️⃣ Cấu hình môi trường (Backend)

Tạo file `.env` trong thư mục `backend` và thêm nội dung sau:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=ECommerce              
PORT=3000
JWT_SECRET=your_secret_key
JWT_EXPIRE=1d
```

> Hãy tham khảo file `.env.example` nếu có.

---

### 4️⃣ Run Backend

```bash
cd backend
npm install
npm run dev
```

Server chạy tại:  
http://localhost:3000
---

### 5️⃣ Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:  
http://localhost:5173
---
## 🧪 Test Accounts
- Role User:
username: user; password:12345
- Role Admin:
username: admin; password:12345
---

## 🚀 Project Overview

The purpose of this project is to practice:

- Building RESTful APIs
- Implementing JWT authentication
- Connecting frontend and backend
- Managing application state
- Enforcing business logic (e.g., one review per purchased product)

This project focuses on backend architecture and clean API structure.

---

## 🧱 Tech Stack

### Frontend
- React
- Axios
- Bootstrap

### Backend
- Node.js
- Express
- JWT Authentication
- RESTful API design

### Database
MySQL


---

## ✨ Features

### 👤 User Features
- Browse product list
- Add products to cart
- Place orders
- View order history
- Review purchased products after order completion

### 🛠 Admin Features
- Create / Update / Delete products
- Manage orders
- Update order status

---

## 🔐 Authentication

- JWT-based authentication
- Protected routes using middleware
- Token validation before accessing secured endpoints

---

## Future Improvements

- Payment integration
- Docker deployment
- Role-based access control
- Unit testing
- Image upload and cloud storage
- CI/CD pipeline

## 📸 Demo

### Trang chủ
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.46.49.png" width="800">
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.47.01.png" width="800">

### Trang chi tiết sản phẩm
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.50.43.png" width="800">

### Giỏ hàng
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.49.19.png" width="800">

### Xác nhận đơn hàng
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.49.54.png" width="800">

<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.50.02.png" width="800">

### Lịch sử mua hàng
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.48.34.png" width="800">

### Thông tin tài khoản
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.47.12.png" width="800">

### Admin
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.51.15.png" width="800">
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.51.25.png" width="800">
<img src="assets/Ảnh màn hình 2026-02-23 lúc 22.51.33.png" width="800">