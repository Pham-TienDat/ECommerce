-- MySQL dump 10.13  Distrib 9.6.0, for macos14.8 (arm64)
--
-- Host: localhost    Database: ECommerce
-- ------------------------------------------------------
-- Server version	9.0.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_name` varchar(45) NOT NULL,
  `quantity` int NOT NULL,
  `price` int NOT NULL,
  `user_id` int NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `product_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=167 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (7,'Bàn phím cơ Keychron K6 RGB',1,2490000,2,NULL,NULL),(9,'Tủ lạnh Samsung Inverter 236L',1,7190000,2,NULL,NULL),(31,'Điện thoại iPhone 15 Pro Max 256GB',1,32990000,3,NULL,NULL),(32,'Laptop ASUS Vivobook 15 OLED',1,18990000,3,NULL,NULL),(33,'Máy lọc không khí Xiaomi Air Purifier 4',1,3290000,3,NULL,NULL),(34,'Tai nghe Bluetooth Sony WH-1000XM5',3,8990000,3,NULL,NULL),(66,'Tai nghe Bluetooth Sony WH-1000XM5',0,8990000,2,NULL,NULL),(95,'Chuột không dây Logitech M331 Silent',1,399000,20,NULL,NULL),(96,'Đồng hồ thông minh Apple Watch Series 9',1,10990000,20,NULL,NULL),(97,'Laptop ASUS Vivobook 15 OLED',2,18990000,20,NULL,NULL),(98,'Điện thoại iPhone 15 Pro Max 256GB',1,32990000,20,NULL,NULL),(99,'Bình giữ nhiệt Lock&Lock 500ml',1,299000,20,NULL,NULL),(116,'Laptop ASUS Vivobook 15 OLED',1,18990000,1,'/src/assets/products/shopping-3.jpeg',NULL),(120,'Tai nghe Bluetooth không dây',1,599000,1,'/src/assets/products/shopping-13.jpeg',NULL),(149,'Chuột không dây Logitech M331 Silent',1,399000,24,'/src/assets/products/shopping-7.jpeg',NULL),(150,'Bình giữ nhiệt inox 500ml',1,179000,24,'/src/assets/products/shopping-14.jpeg',NULL);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `description` varchar(45) DEFAULT NULL,
  `images` varchar(150) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Thời Trang Nam',NULL,'src/assets/categories/687f3967b7c2fe6a134a2c11894eea4b@resize_w640_nl.webp'),(2,'Phụ Kiện & Điện Thoại',NULL,'src/assets/categories/31234a27876fb89cd522d7e3db1ba5ca@resize_w640_nl.webp'),(3,'Thiết Bị Điện Tử',NULL,'src/assets/categories/978b9e4cb61c611aaaf58664fae133c5@resize_w640_nl.webp'),(4,'Máy Tính & Laptop',NULL,'src/assets/categories/c3f3edfaa9f6dafc4825b77d8449999d@resize_w640_nl.webp'),(5,'Máy Ảnh & Máy Quay Phim',NULL,'src/assets/categories/ec14dd4fc238e676e43be2a911414d4d@resize_w640_nl.webp'),(6,'Đồng Hồ',NULL,'src/assets/categories/86c294aae72ca1db5f541790f7796260@resize_w640_nl.webp'),(7,'Giày Dép Nam',NULL,'src/assets/categories/74ca517e1fa74dc4d974e5d03c3139de@resize_w640_nl.webp'),(8,'Thiết Bị Gia Dụng',NULL,'src/assets/categories/7abfbfee3c4844652b4a8245e473d857@resize_w640_nl.webp'),(9,'Thể Thao & Du Lịch',NULL,'src/assets/categories/6cb7e633f8b63757463b676bd19a50e4@resize_w640_nl.webp'),(10,'Ôtô & Xe Máy & Xe Đạp',NULL,'src/assets/categories/3fb459e3449905545701b418e8220334@resize_w640_nl.webp'),(11,'Balô & Túi Ví Nam',NULL,'src/assets/categories/18fd9d878ad946db2f1bf4e33760c86f@resize_w640_nl.webp'),(12,'Đồ Chơi',NULL,'src/assets/categories/ce8f8abc726cafff671d0e5311caa684@resize_w640_nl.webp'),(13,'Chăm Sóc Thú Cưng',NULL,'src/assets/categories/cdf21b1bf4bfff257efe29054ecea1ec@resize_w640_nl.webp'),(14,'Dụng Cụ & Thiết Bị Tiện Ích',NULL,'src/assets/categories/e4fbccba5e1189d1141b9d6188af79c0@resize_w640_nl.webp'),(15,'Thời Trang Nữ',NULL,'src/assets/categories/75ea42f9eca124e9cb3cde744c060e4d@resize_w640_nl.webp'),(16,'Mẹ & Bé',NULL,'src/assets/categories/099edde1ab31df35bc255912bab54a5e@resize_w640_nl.webp'),(17,'Nhà Cửa & Đời Sống',NULL,'src/assets/categories/24b194a695ea59d384768b7b471d563f@resize_w640_nl.webp'),(18,'Sắc Đẹp',NULL,'src/assets/categories/ef1f336ecc6f97b790d5aae9916dcb72@resize_w640_nl.webp'),(19,'Sức Khỏe',NULL,'src/assets/categories/49119e891a44fa135f5f6f5fd4cfc747@resize_w640_nl.webp'),(20,'Giày Dép Nữ',NULL,'src/assets/categories/48630b7c76a7b62bc070c9e227097847@resize_w640_nl.webp'),(21,'Túi Ví Nữ',NULL,'src/assets/categories/fa6ada2555e8e51f369718bbc92ccc52@resize_w640_nl.webp'),(22,'Phụ Kiện & Trang Sức Nữ',NULL,'src/assets/categories/8e71245b9659ea72c1b4e737be5cf42e@resize_w640_nl.webp'),(23,'Bách Hóa Online',NULL,'src/assets/categories/c432168ee788f903f1ea024487f2c889@resize_w640_nl.webp'),(24,'Nhà Sách Online',NULL,'src/assets/categories/36013311815c55d303b0e6c62d6a8139@resize_w640_nl.webp'),(25,'Thời Trang Trẻ Em',NULL,'src/assets/categories/4540f87aa3cbe99db739f9e8dd2cdaf0@resize_w640_nl.webp'),(26,'Giặt Giũ & Chăm Sóc Nhà Cửa',NULL,'src/assets/categories/cd8e0d2e6c14c4904058ae20821d0763@resize_w640_nl.webp'),(27,'Voucher & Dịch Vụ',NULL,'src/assets/categories/b0f78c3136d2d78d49af71dd1c3f38c1@resize_w640_nl.webp');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `flashsale`
--

DROP TABLE IF EXISTS `flashsale`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `flashsale` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `discount` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_flashsale_idx` (`product_id`),
  CONSTRAINT `fk_flashsale` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `flashsale`
--

LOCK TABLES `flashsale` WRITE;
/*!40000 ALTER TABLE `flashsale` DISABLE KEYS */;
INSERT INTO `flashsale` VALUES (1,12,10),(2,20,20),(3,27,10),(4,18,20),(5,22,30),(6,30,20),(8,25,25),(9,26,15);
/*!40000 ALTER TABLE `flashsale` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `product_id` int NOT NULL,
  `price` int NOT NULL,
  `quantity` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (1,2,123,399000,1,NULL),(2,2,125,320000,1,NULL),(10,6,128,8990000,1,NULL),(11,6,129,129000,2,NULL),(12,7,126,8990000,1,'Tai nghe Bluetooth Sony WH-1000XM5'),(13,7,127,18990000,1,'Laptop ASUS Vivobook 15 OLED'),(14,7,130,3290000,1,'Máy lọc không khí Xiaomi Air Purifier 4'),(15,8,131,7190000,1,'Tủ lạnh Samsung Inverter 236L'),(16,9,132,420000,1,'Loa Bluetooth mini'),(17,10,133,129000,1,'Quạt mini để bàn USB'),(18,10,134,179000,1,'Bình giữ nhiệt inox 500ml'),(19,11,135,14990000,1,'Laptop văn phòng 14 inch'),(20,11,136,1890000,1,'Nồi chiên không dầu 5L'),(21,12,137,890000,1,'Bàn phím cơ RGB'),(22,13,138,2490000,1,'Bàn phím cơ Keychron K6 RGB'),(23,14,139,420000,1,'Loa Bluetooth mini'),(24,15,140,3290000,1,'Máy lọc không khí Xiaomi Air Purifier 4'),(25,16,140,3290000,1,'Máy lọc không khí Xiaomi Air Purifier 4'),(26,17,140,3290000,1,'Máy lọc không khí Xiaomi Air Purifier 4'),(27,18,141,399000,1,'Áo hoodie unisex form rộng'),(28,19,142,599000,1,'Tai nghe Bluetooth không dây'),(29,20,142,599000,1,'Tai nghe Bluetooth không dây'),(30,21,143,590000,1,'Sạc dự phòng 20000mAh'),(31,22,144,199000,1,'Áo thun nam cotton basic'),(32,23,145,320000,1,'Kem dưỡng da mặt ban đêm'),(33,24,146,14990000,1,'Laptop văn phòng 14 inch'),(34,25,147,670000,1,'Webcam Full HD 1080p'),(35,26,148,17490000,1,'Máy ảnh Canon EOS M50 Mark II'),(36,27,151,299000,1,'Bình giữ nhiệt Lock&Lock 500ml'),(37,28,152,299000,1,'Bình giữ nhiệt Lock&Lock 500ml'),(38,28,153,8990000,3,'Tai nghe Bluetooth Sony WH-1000XM5'),(39,32,156,450000,1,'Giày thể thao nữ phong cách Hàn Quốc'),(40,33,157,199000,1,'Áo thun nam cotton basic'),(41,34,158,599000,1,'Tai nghe Bluetooth không dây'),(42,35,159,17490000,1,'Máy ảnh Canon EOS M50 Mark II'),(43,36,162,129000,1,'Quạt mini để bàn USB'),(44,37,30,670000,1,'Webcam Full HD 1080p'),(45,37,10,18990000,1,'Laptop ASUS Vivobook 15 OLED'),(46,37,21,599000,1,'Tai nghe Bluetooth không dây'),(47,38,23,14990000,1,'Laptop văn phòng 14 inch');
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` varchar(45) DEFAULT NULL,
  `user_id` varchar(45) NOT NULL,
  `note` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `total_price` int DEFAULT NULL,
  `payment_method` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (7,'2026-02-10 03:36:42','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',31270000,NULL),(8,'2026-02-10 03:42:40','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',7190000,NULL),(9,'2026-02-11 19:08:52','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',420000,NULL),(10,'2026-02-11 19:19:22','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',308000,NULL),(11,'2026-02-11 19:27:00','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',16880000,NULL),(12,'2026-02-12 15:18:08','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',890000,NULL),(13,'2026-02-12 15:20:23','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',2490000,NULL),(14,'2026-02-12 15:21:09','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',420000,NULL),(15,'2026-02-12 15:25:32','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',3290000,NULL),(16,'2026-02-12 15:26:10','completed','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',3290000,NULL),(17,'2026-02-12 15:27:11','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',3290000,NULL),(18,'2026-02-13 02:53:32','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',399000,NULL),(19,'2026-02-13 02:56:04','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',599000,NULL),(20,'2026-02-13 03:02:25','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',599000,NULL),(21,'2026-02-13 03:03:29','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',590000,NULL),(22,'2026-02-13 03:53:00','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',199000,NULL),(23,'2026-02-13 04:01:01','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',320000,NULL),(24,'2026-02-13 04:25:43','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',14990000,'COD'),(25,'2026-02-13 04:28:18','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',670000,'bank'),(26,'2026-02-14 02:16:34','pending','24','','Đạt','0234567899','abcdef',17490000,'cod'),(27,'2026-02-14 02:47:48','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',299000,'cod'),(28,'2026-02-19 05:56:48','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',27269000,'cod'),(32,'2026-02-19 06:52:46','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',450000,'cod'),(33,'2026-02-19 06:55:45','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',199000,'cod'),(34,'2026-02-20 06:21:19','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',599000,'cod'),(35,'2026-02-22 22:24:39','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',17490000,'cod'),(36,'2026-02-23 07:36:40','pending','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',129000,'cod'),(37,'2026-02-23 07:48:16','completed','22','','Phạm Tiến Đạt','0123456789','số 1, ngõ 2, đường A, thành phố B',20259000,'cod'),(38,'2026-02-23 08:19:03','completed','34','','user','user','Ngõ A, Đường B, Thành phố C',14990000,'cod');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `idpayments` int NOT NULL,
  PRIMARY KEY (`idpayments`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `price` varchar(255) NOT NULL,
  `description` text,
  `image` varchar(255) DEFAULT NULL,
  `shop` varchar(45) DEFAULT NULL,
  `categories` int DEFAULT NULL,
  `stock` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `categories_idx` (`categories`),
  CONSTRAINT `categories` FOREIGN KEY (`categories`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (9,'Điện thoại iPhone 15 Pro Max 256GB','32990000','iPhone 15 Pro Max sở hữu thiết kế khung titanium cao cấp, màn hình Super Retina XDR sắc nét, chip A17 Pro mạnh mẽ cho hiệu năng vượt trội, camera chuyên nghiệp và pin bền bỉ cho cả ngày dài sử dụng.','/src/assets/products/shopping-2.jpeg','FPT Shop',2,1000),(10,'Laptop ASUS Vivobook 15 OLED','18990000','Laptop ASUS Vivobook 15 trang bị màn hình OLED sống động, hiệu năng ổn định cho học tập và làm việc văn phòng, thiết kế mỏng nhẹ, bàn phím thoải mái, phù hợp sinh viên và nhân viên văn phòng.','/src/assets/products/shopping-3.jpeg','CellphoneS',4,999),(11,'Máy lọc không khí Xiaomi Air Purifier 4','3290000','Máy lọc không khí Xiaomi Air Purifier 4 giúp loại bỏ bụi mịn PM2.5, khử mùi và vi khuẩn hiệu quả, vận hành êm ái, phù hợp cho phòng ngủ và phòng khách gia đình.','/src/assets/products/shopping-4.jpeg','Shopee',3,1000),(12,'Tai nghe Bluetooth Sony WH-1000XM5','8990000','Tai nghe Sony WH-1000XM5 nổi bật với công nghệ chống ồn hàng đầu, âm thanh chất lượng cao, thiết kế ôm tai thoải mái và thời lượng pin dài, lý tưởng cho làm việc và giải trí.','/src/assets/products/shopping-5.jpeg','Tiki',2,1000),(13,'Đồng hồ thông minh Apple Watch Series 9','10990000','Apple Watch Series 9 hỗ trợ theo dõi sức khỏe toàn diện, đo nhịp tim, nồng độ oxy, tập luyện thể thao và kết nối liền mạch với iPhone, thiết kế hiện đại và cao cấp.','/src/assets/products/shopping-6.jpeg','Thế Giới Di Động',6,1000),(14,'Chuột không dây Logitech M331 Silent','399000','Chuột không dây Logitech M331 Silent có thiết kế nhỏ gọn, thao tác êm ái giảm tiếng ồn, kết nối ổn định, pin sử dụng lâu dài, phù hợp cho học tập và làm việc văn phòng.','/src/assets/products/shopping-7.jpeg','Lazada',3,1000),(15,'Bình giữ nhiệt Lock&Lock 500ml','299000','Bình giữ nhiệt Lock&Lock dung tích 500ml làm từ inox cao cấp, giữ nóng và lạnh hiệu quả, thiết kế kín chống rò rỉ, tiện lợi mang theo khi đi học, đi làm.','/src/assets/products/shopping-8.jpeg','Shopee',8,1000),(16,'Máy ảnh Canon EOS M50 Mark II','17490000','Canon EOS M50 Mark II là máy ảnh mirrorless nhỏ gọn, chất lượng ảnh sắc nét, quay video Full HD/4K, phù hợp cho vlog, du lịch và người mới bắt đầu chụp ảnh.','/src/assets/products/shopping-9.jpeg','GearVN',5,999),(17,'Bàn phím cơ Keychron K6 RGB','2490000','Bàn phím cơ Keychron K6 RGB có thiết kế nhỏ gọn, switch cơ bền bỉ, đèn RGB nhiều chế độ, hỗ trợ kết nối không dây và có dây, phù hợp cho lập trình viên và game thủ.','/src/assets/products/shopping-10.jpeg','Phúc Anh',4,1000),(18,'Tủ lạnh Samsung Inverter 236L','7190000','Tủ lạnh Samsung Inverter dung tích 236L tiết kiệm điện, làm lạnh nhanh và ổn định, thiết kế hiện đại, phù hợp cho gia đình nhỏ hoặc căn hộ.','/src/assets/products/shopping-11.jpeg','Điện Máy Xanh',8,1000),(19,'Áo thun nam cotton basic','199000','Áo thun nam chất liệu cotton 100%, mềm mại, thấm hút mồ hôi tốt, form regular dễ phối đồ, phù hợp mặc hằng ngày.','/src/assets/products/shopping-12.jpeg','FashionMen Store',1,999),(20,'Giày thể thao nữ phong cách Hàn Quốc','450000','Giày sneaker nữ thiết kế trẻ trung, đế cao su êm nhẹ, phù hợp đi học, đi chơi hoặc dạo phố.','/src/assets/products/sg-11134201-824j3-mf83aqfkugp8c9.webp','Pink Shoes',20,1000),(21,'Tai nghe Bluetooth không dây','599000','Tai nghe Bluetooth âm thanh sống động, kết nối nhanh, pin sử dụng liên tục đến 6 giờ, hỗ trợ Android và iOS.','/src/assets/products/shopping-13.jpeg','TechZone',2,998),(22,'Bình giữ nhiệt inox 500ml','179000','Bình giữ nhiệt inox 304 cao cấp, giữ nóng và lạnh đến 12 giờ, thiết kế nhỏ gọn tiện mang theo.','/src/assets/products/shopping-14.jpeg','LifeStyle Home',8,1000),(23,'Laptop văn phòng 14 inch','14990000','Laptop phù hợp cho học tập và làm việc văn phòng, màn hình Full HD, pin bền bỉ, trọng lượng nhẹ.','/src/assets/products/top-cac-mau-laptop-van-phong-14-inch-mong-nhe-nhat-hien-nay-1.jpg','Laptop Center',4,999),(24,'Kem dưỡng da mặt ban đêm','320000','Kem dưỡng da chiết xuất thiên nhiên, giúp cấp ẩm sâu, tái tạo làn da và giảm khô ráp khi ngủ.','/src/assets/products/2_2469feacc4be47008b1ecabd7e49cf19_84e02eb76a48478392de7eeb0265f18b_grande.jpg','Beauty Care',19,1000),(25,'Bàn phím cơ RGB','890000','Bàn phím cơ switch bền bỉ, đèn RGB nhiều chế độ, phù hợp cho game thủ và lập trình viên.','/src/assets/products/shopping-15.jpeg','Gaming Gear',4,1000),(26,'Áo hoodie unisex form rộng','399000','Áo hoodie unisex chất liệu nỉ dày dặn, giữ ấm tốt, phong cách trẻ trung, dễ phối đồ.','/src/assets/products/shopping-16.jpeg','Street Wear',1,1000),(27,'Balo laptop chống nước','520000','Balo laptop thiết kế hiện đại, chống nước tốt, nhiều ngăn tiện lợi, phù hợp đi học và đi làm.','/src/assets/products/shopping-17.jpeg','Bag Store',11,1000),(28,'Nồi chiên không dầu 5L','1890000','Nồi chiên không dầu dung tích 5L, công suất lớn, giúp chế biến món ăn ít dầu mỡ, tốt cho sức khỏe.','/src/assets/products/noi-chien-khong-dau-bluestone-AFB5871-ava.jpg','Home Kitchen',8,1000),(29,'Sách lập trình C++ cơ bản','145000','Sách hướng dẫn lập trình C++ từ cơ bản đến nâng cao, phù hợp cho sinh viên và người mới bắt đầu.','/src/assets/products/image-20240813100811341.jpg','Book World',24,1000),(30,'Webcam Full HD 1080p','670000','Webcam độ phân giải Full HD 1080p, hình ảnh rõ nét, phù hợp học online, họp trực tuyến.','/src/assets/products/20a49ae01c8bd363b1afbc2840b2efb0.webp','Digital Store',3,999),(31,'Quạt mini để bàn USB','129000','Quạt mini để bàn sử dụng cổng USB, nhỏ gọn, gió mát, phù hợp dùng trong văn phòng hoặc phòng ngủ.','/src/assets/products/vn-11134207-7r98o-ltqd1kp140lmd6.webp','Home Office',3,999),(32,'Sạc dự phòng 20000mAh','590000','Pin sạc dự phòng dung lượng lớn 20000mAh, hỗ trợ sạc nhanh, an toàn cho thiết bị di động.','/src/assets/products/pin-sac-du-phong-20000mah-type-c-pd-45w-samsung-eb-p4520-thumb-600x600.jpg','Power Tech',2,1000),(33,'Áo sơ mi nam công sở','329000','Áo sơ mi nam chất liệu vải mềm, ít nhăn, thiết kế lịch sự, phù hợp môi trường công sở.','/src/assets/products/vn-11134207-7ra0g-m8n128p728p38a_tn.jpeg','Gentleman Shop',1,1000),(34,'Váy nữ dáng dài','489000','Váy nữ dáng dài phong cách thanh lịch, chất liệu nhẹ, thoáng mát, phù hợp đi làm và đi chơi.','/src/assets/products/sg-11134201-82596-mfwesv98y32n7a.webp','Lady Fashion',15,1000),(35,'Loa Bluetooth mini','420000','Loa Bluetooth mini âm thanh to rõ, pin bền, thiết kế nhỏ gọn tiện mang theo khi du lịch.','/src/assets/products/apple-homepod-2-white.jpg.webp','Sound House',3,1000),(36,'Bàn làm việc gỗ công nghiệp','2190000','Bàn làm việc gỗ công nghiệp MDF, thiết kế hiện đại, chắc chắn, phù hợp cho văn phòng và gia đình.','/src/assets/products/ban-lam-viec-at120shl3df.jpg','Furniture Pro',17,1000),(37,'Đèn LED để bàn học','275000','Đèn LED ánh sáng dịu, bảo vệ mắt, có thể điều chỉnh độ sáng, phù hợp cho học sinh và sinh viên.','/src/assets/products/shopping-18.jpeg','Smart Home',3,1000),(38,'Thảm tập yoga chống trượt','310000','Thảm tập yoga chất liệu cao su tự nhiên, độ bám tốt, chống trơn trượt khi tập luyện.','/src/assets/products/tham_tap_yoga_adidas_mau_den_vien_xanh_duong__6___1__7e16da058ced4c65aebaa3936d531842_grande.png','Healthy Life',19,1000);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ratings`
--

DROP TABLE IF EXISTS `ratings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ratings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `user_id` int NOT NULL,
  `comment_text` text NOT NULL,
  `rating` tinyint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `rt_user_id_idx` (`user_id`),
  KEY `rt_product_id_idx` (`product_id`),
  CONSTRAINT `rt_product_id` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `rt_user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ratings`
--

LOCK TABLES `ratings` WRITE;
/*!40000 ALTER TABLE `ratings` DISABLE KEYS */;
INSERT INTO `ratings` VALUES (1,10,1,'Sản phẩm tốt',5,'2025-12-10 00:41:19','2025-12-10 00:41:19'),(2,10,2,'Quá tuyệt vời',4,'2025-12-10 00:41:57','2025-12-10 00:41:57'),(3,11,1,'abc',5,'2025-12-12 08:45:35','2025-12-12 08:45:35'),(4,11,2,'def',4,'2025-12-12 08:46:14','2025-12-12 08:46:14'),(5,13,2,'Sản phẩm chất lượng',5,'2025-12-14 10:09:05','2025-12-14 10:09:05'),(6,10,1,'',5,'2025-12-23 10:36:36','2025-12-23 10:36:36'),(7,15,1,'',5,'2026-01-15 10:56:01','2026-01-15 10:56:01'),(8,10,1,'<script>alert(1)</script>',5,'2026-01-16 01:41:59','2026-01-16 01:41:59'),(9,10,1,'sản phẩm tốt',5,'2026-01-17 04:59:49','2026-01-17 04:59:49'),(10,12,1,'sản phẩm tốt',5,'2026-01-17 05:13:15','2026-01-17 05:13:15'),(11,16,22,'sản phẩm tốt',4,'2026-02-22 20:44:50','2026-02-22 20:44:50'),(12,25,22,'Tốt',5,'2026-02-22 20:51:58','2026-02-22 20:51:58'),(13,25,22,'Tốt',5,'2026-02-22 20:52:49','2026-02-22 20:52:49');
/*!40000 ALTER TABLE `ratings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `phonenumber` varchar(45) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `role` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dat','123','1','1','1',NULL,NULL),(2,'tien','456','1','1','1',NULL,NULL),(3,'pham','789','1','1','1',NULL,NULL),(4,'hehe','1234','1','1','1',NULL,NULL),(5,'xinchao','123','1','1','1',NULL,NULL),(6,'un','123','1','1','1',NULL,NULL),(7,'hehehe','0000','1','1','1',NULL,NULL),(9,'data','1','1','1','1',NULL,NULL),(16,'yeyeye','1234','1','1','1',NULL,NULL),(18,'date','345','1','1','1',NULL,NULL),(19,'hádg','123','1','1','1',NULL,NULL),(20,'new','12345','1','1','1',NULL,NULL),(21,'tiendat','123456','1','1','1',NULL,NULL),(22,'abcdef','$2b$10$ZttzVxxM8mtqlCylwAIWYuxs3KHzuMixZ0UZ74bqEgPOB1ec4wXCW','0123456789','số 1, ngõ 2, đường A, thành phố B','Phạm Tiến Đạt',NULL,NULL),(23,NULL,'$2b$10$EQAMT7HRfqBlpow8WW7qoeQv0fNO9mdcy34bammulpCR3URxDVBr.','0999999999',NULL,'Phạm Trường Sơn',NULL,NULL),(24,'datpham','$2b$10$P67qf0Cp0ZFbZ2poUx2dpuwWRRp11L7KdYSj4Xbp/oW2EY5QRoB1O','0234567899',NULL,'Đạt',NULL,'admin'),(28,'jgtown','$2b$10$SxVO1rL1oA7NeVetkDXhsecavGKEol2N74DsFRBpYnF.M.ZcYluHO','',NULL,'Tiến',NULL,NULL),(30,'ilwjhg','$2b$10$otC7d0FeU8QsdcDfQlYG3.DNIExxMqljkxuz/XYZ0o1kFOIFblWQO','',NULL,'aieugh',NULL,NULL),(33,'admin','$2b$10$SGRUVjHdyUWQSTQ098vlIe/7uJ7rVz64mXXw.tye8meOHCqcDJHz2','',NULL,'',NULL,'admin'),(34,'user','$2b$10$8YMPHidsZvUNu24E/5QuH.YnG9zbDzQByl1PkcUMAkjVPkb/b186K','user',NULL,'user',NULL,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-23  9:00:27
