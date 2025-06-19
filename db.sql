CREATE DATABASE  IF NOT EXISTS `web` /*!40100 DEFAULT CHARACTER SET utf8mb3 COLLATE utf8mb3_unicode_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `web`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: web
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart_detail`
--

DROP TABLE IF EXISTS `cart_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `brand` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `cart_id` bigint NOT NULL,
  `product_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_cart_id` (`cart_id`),
  KEY `idx_product_id` (`product_id`),
  CONSTRAINT `FKbql1m2v2po7hcawonqsgqex88` FOREIGN KEY (`cart_id`) REFERENCES `carts` (`id`),
  CONSTRAINT `FKclb1c0wg3mofxnpgidib1t987` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_detail`
--

LOCK TABLES `cart_detail` WRITE;
/*!40000 ALTER TABLE `cart_detail` DISABLE KEYS */;
INSERT INTO `cart_detail` VALUES (10,'Adidas',3800000,1,'44',8,40),(16,'Addidas',2100000,1,'41',8,41),(17,'Adidas',3800000,1,'44',6,40);
/*!40000 ALTER TABLE `cart_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `sum` double NOT NULL,
  `user_id` bigint DEFAULT NULL,
  `total` double DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK64t7ox312pqal3p7fg9o503c2` (`user_id`),
  KEY `idx_user_id` (`user_id`),
  CONSTRAINT `FKb5o626f86h46m4s7ms6ginnop` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (6,0,3,NULL),(7,0,14,NULL),(8,0,18,NULL);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `order_id` bigint DEFAULT NULL,
  `product_id` bigint DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `size` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKrws2q0si6oyd6il8gqe2aennc` (`order_id`),
  KEY `FKc7q42e9tu0hslx6w4wxgomhvn` (`product_id`),
  CONSTRAINT `FKc7q42e9tu0hslx6w4wxgomhvn` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `FKrws2q0si6oyd6il8gqe2aennc` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
INSERT INTO `order_detail` VALUES (3,149.99,2,3,28,NULL,NULL),(5,120.99,1,3,27,NULL,NULL),(6,149.99,1,4,28,NULL,NULL),(7,2000000,4,5,28,NULL,NULL),(9,1600000,2,6,73,NULL,NULL),(10,3800000,3,7,40,NULL,NULL),(11,2100000,1,7,41,NULL,NULL),(14,3800000,2,9,40,NULL,NULL),(15,2100000,1,9,41,NULL,NULL),(16,3800000,1,10,40,NULL,NULL);
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_history`
--

DROP TABLE IF EXISTS `order_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_history` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `note` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `status` enum('CANCELLED','DELIVERED','PENDING','PROCESSING','RETURNED','SHIPPED') COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `changed_by` bigint DEFAULT NULL,
  `order_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKg92c0lo2t94pmm26fcuf791me` (`changed_by`),
  KEY `FKnw2ljd8jnpdc9y2ild52e79t2` (`order_id`),
  CONSTRAINT `FKg92c0lo2t94pmm26fcuf791me` FOREIGN KEY (`changed_by`) REFERENCES `users` (`id`),
  CONSTRAINT `FKnw2ljd8jnpdc9y2ild52e79t2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_history`
--

LOCK TABLES `order_history` WRITE;
/*!40000 ALTER TABLE `order_history` DISABLE KEYS */;
INSERT INTO `order_history` VALUES (3,'2025-06-03 15:45:08.802493','Đơn hàng được tạo','PENDING',3,3),(4,'2025-06-05 13:31:38.830900','Đơn hàng được tạo','PENDING',14,4),(9,'2025-06-14 20:46:43.947041','Đơn hàng được tạo','PENDING',3,5),(10,'2025-06-15 22:45:22.589771','Đơn hàng được tạo','PENDING',18,6),(11,'2025-06-16 20:56:21.419508','Đơn hàng được tạo','PENDING',18,7),(13,'2025-06-18 09:51:00.670999','Đơn hàng được tạo','PENDING',3,9),(14,'2025-06-18 10:12:10.092039','Đơn hàng được tạo','PENDING',3,10);
/*!40000 ALTER TABLE `order_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_date` datetime(6) DEFAULT NULL,
  `order_code` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `payment_method` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `receiver_address` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `receiver_name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `receiver_note` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `receiver_phone` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `shipping_fee` double NOT NULL,
  `status` enum('CANCELLED','DELIVERED','PENDING','PROCESSING','RETURNED','SHIPPED') COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `total_price` double NOT NULL,
  `version` bigint DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKdhk2umg8ijjkg4njg6891trit` (`order_code`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (3,'2025-06-03 15:45:08.781101','DH-20254936945','CASH','123 street, england',' ta qunag thang','giao nhanh','84901234567',0,'DELIVERED',480.96000000000004,0,3),(4,'2025-06-05 13:31:38.804569','DH-20256962668','CASH','123 street, england','drake bigD','giao nhanh','876543245678',0,'DELIVERED',149.99,0,14),(5,'2025-06-14 20:46:43.908716','DH-202515382354','CASH','12345 street,','ta quang thang','giao nhanh','864315678',0,'PROCESSING',8000119.98,1,3),(6,'2025-06-15 22:45:22.499906','DH-20253213871','CASH','123 street, england','drake bigD','','84901234567',0,'PENDING',3200000,0,18),(7,'2025-06-16 20:56:21.385573','DH-20256208497','CASH','123 street, england',' ta qunag thang','giao nhanh','84901234567',0,'PENDING',13500000,0,18),(9,'2025-06-18 09:51:00.651085','DH-202513625220','CASH','123 street, england','thang','giao nhanh','84901234567',0,'PROCESSING',9700000,1,3),(10,'2025-06-18 10:12:10.055097','DH-20259927369','CASH','123 stereet','sadf','ádfsdaf','8763214567',0,'PENDING',3800000,0,3);
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `brand` varchar(50) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `color` varchar(255) COLLATE utf8mb3_unicode_ci NOT NULL,
  `description` varchar(500) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `image_url` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `name` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `size` varchar(10) COLLATE utf8mb3_unicode_ci NOT NULL,
  `sold` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=99 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (27,'Addidas','Đen','Giày thể thao AdidasUltraBoost với đệm Boost giúp mang lại cảm giác êm ái và hỗ trợ tối đa khi chạy.','/uploads/8d000236-5725-4c5e-9bed-ed428778c5c8_0882-CON162050C00004H-1.webp','Giày Thể Thao Adidas UltraBoost',211111111,100,'42',0),(28,'Addidas','Đen','Giày chạy bộ cao cấp với công nghệ Boost','/uploads/38aefc76-01c2-4ba3-87bc-26fbae263f5f_0882-CONA15097CNAV007-1.webp','Adidas Ultraboost 22',2000000,96,'43',0),(36,'Nike','Trắng/Đen','Giày chạy bộ Air Zoom Pegasus 40 với đệm React mềm mại','/uploads/241a018e-8714-4d45-9660-d7b6de19ed5d_0882-CON162065C000007-1.webp','Nike Air Zoom Pegasus 40',3200000,50,'41',0),(37,'Jordan','Đỏ/Đen','Giày bóng rổ Air Jordan 1 Retro High OG','/uploads/78a089fb-798b-4254-95dd-26e052247a36_0882-CONA14836C00O010-1.webp','Air Jordan 1 Retro High OG',4500000,30,'42',0),(38,'Nike','Xám/Trắng','Giày tập gym Free Metcon 5','/uploads/56a04d6a-446d-4a3a-a200-b2f90196e065_0882-CON168816C000009-1.webp','Nike Free Metcon 5',2800000,40,'43',0),(39,'Adidas','Xanh/Trắng','Giày đá bóng Predator Edge.3','/uploads/1db11191-b68a-4145-9459-46bb7647c5bc_0882-CONA12558C12W09H-1.webp','Adidas Predator Edge.3',2500000,35,'42',0),(40,'Adidas','Trắng/Xanh','Giày chạy bộ Adizero Adios Pro 3','/uploads/20951d29-41ef-4927-a393-995cf0f6c30c_0882-CONA00916C00503H-1.webp','Adidas Adizero Adios Pro 3',3800000,18,'44',7),(41,'Addidas','Đen/Cam','Giày tập luyện Alphatorsion Boost','/uploads/5ac93a4f-7f2e-4973-b0a9-e658f1f91362_0882-CONA04689C00503H-1.webp','Adidas Alphatorsion Boost',2100000,43,'41',1),(42,'Vans','Đen/Trắng','Giày trượt ván Classic Slip-On','/uploads/bc3fc863-84e9-48e5-b822-a165cf6ff6c9_0882-CON162053C000005-1.webp','Vans Classic Slip-On',1500000,60,'39',0),(43,'Vans','Checkboard','Giày Vans Old Skool họa tiết ca rô','/uploads/d3d054c6-4b5d-43f2-a6ca-32da9bad89f0_0882-CONA08147C005010-1.webp','Vans Old Skool Checkboard',1800000,55,'40',0),(44,'Vans','Xanh rêu','Giày Sk8-Hi cổ cao','/uploads/7f26676e-6a7f-46e5-8490-dde7d56e6303_0882-CONA08148C00W010-1.webp','Vans Sk8-Hi',1700000,40,'42',0),(45,'Converse','Đen','Giày Chuck Taylor All Star cổ điển','/uploads/9ab5ee56-9cc7-4183-8b33-ebb38ebd2623_0882-CONA08149C005010-1.webp','Converse Chuck Taylor All Star',1200000,70,'41',0),(46,'Converse','Trắng','Giày Run Star Motion phong cách retro','/uploads/94ab1a73-c35d-471f-b751-01dcf236feba_0882-CONA08262C00W004-1.webp','Converse Run Star Motion',2200000,30,'43',0),(47,'Converse','Đỏ','Giày One Star cổ thấp','/uploads/4b5a11be-ac5c-4c33-b179-eec47396fd03_0882-CONA08263C005004-1.webp','Converse One Star',1900000,35,'42',0),(48,'Jordan','Đen/Xám','Giày Air Jordan 4 Retro','/uploads/a6c0572e-09d5-4443-8655-d879214213b5_0882-CONA08792C00W010-11.webp','Air Jordan 4 Retro',5000000,20,'44',0),(49,'Jordan','Trắng/Đỏ','Giày Air Jordan 1 Mid','/uploads/0178ef58-a99a-4e18-acdc-43b833e8f95d_0882-CONA09467C00G09H-1.webp','Air Jordan 1 Mid',3500000,25,'42',0),(50,'Jordan','Xanh/Đen','Giày Jordan Delta 2','/uploads/b380eaf7-6129-4ff5-96de-5ef804090338_0882-CON162065C000007-1.webp','Jordan Delta 2',2900000,30,'43',0),(51,'Nike','Hồng/Trắng','Giày Air Force 1 phiên bản Valentine','/uploads/f0ec7ded-9830-42c1-8970-c4ef55ea3c0c_0882-CONA09470C00G09H-1.webp','Nike Air Force 1 Valentine',2800000,40,'39',0),(52,'Adidas','Trắng/Xanh','Giày Stan Smith bản giới hạn','/uploads/9fc3a29b-be8b-47fc-a369-45ea6b9f1d16_0882-CONA09467C00G09H-1.webp','Adidas Stan Smith Limited',2200000,32,'41',3),(53,'Vans','Vàng/Nâu','Giày Era Vintage','/uploads/d7c216f5-c3af-489e-9727-1959d661f83e_0882-CONA12219C0MI09H-1__1_.webp','Vans Era Vintage',1600000,45,'40',0),(54,'Converse','Tím/Trắng','Giày Chuck 70 cao cổ','/uploads/b8c83c02-a6ad-413f-8c2e-665e6add8e21_0882-CONA12335C00W007-1.webp','Converse Chuck 70 High Top',2500000,25,'44',0),(55,'Jordan','Đen/Vàng','Giày Jordan Why Not Zer0.4','/uploads/27f3e4d7-74a8-40b2-ac09-51e74a33b8cf_0882-CONA12558C12W09H-1.webp','Jordan Why Not Zer0.4',4200000,15,'42',0),(56,'Nike','Xanh/Trắng','Giày Dunk Low Retro','/uploads/2e82a65e-c34f-4793-ac4e-3f840e01f724_0882-CONA12219C0MI09H-1.webp','Nike Dunk Low Retro',3000000,30,'43',0),(57,'Addidas','Xám/Đen','Giày NMD_R1 Primeblue','/uploads/4337ebb9-743b-4d43-9f3e-57edb6db135a_0882-CONA13378C00509H-1.webp','Adidas NMD_R1 Primeblue',3400000,28,'41',0),(58,'Vans','Đen/Hồng','Giày Authentic','/uploads/6e5653d6-822e-4bd4-9d8f-9e74d6dbe7ac_0882-CONA13463C00P007-1.webp','Vans Authentic',1400000,50,'39',0),(59,'Converse','Xanh/Trắng','Giày Pro Leather','/uploads/af7d0b2c-163c-4e12-abba-ed1cd644923c_0882-CONA12558C12W09H-1.webp','Converse Pro Leather',2700000,22,'42',0),(60,'Jordan','Nâu/Trắng','Giày Jordan Zion 1','/uploads/7b1eb0a4-c220-403b-b6f6-1d2d5bda42c3_0882-CONA13271C70009H-1.webp','Jordan Zion 1',3900000,18,'44',0),(61,'Nike','Đen/Bạc','Giày Air Max 270','/uploads/87439244-bde4-4f33-9eea-edabecf2c69f_0882-CONA13464C12W007-1.webp','Nike Air Max 270',3200000,35,'42',0),(62,'Adidas','Trắng/Đen','Giày Superstar','/uploads/afa6efe2-82a6-40d2-979a-516fc2762abb_0882-CONA11489C005006-1.webp','Adidas Superstar',2000000,45,'40',0),(63,'Vans','Nâu/Be','Giày Ultrarange Exo','/uploads/299eea78-ec1b-4456-aa9a-d566acc0260f_0882-CONA13467C00W007-1__1_.webp','Vans Ultrarange Exo',2300000,30,'43',0),(64,'Converse','Đen/Trắng','Giày Jack Purcell','/uploads/12b5ea8e-953d-47b9-8e54-0f7fd75cd7cd_0882-CON162058C000004-1.webp','Converse Jack Purcell',1800000,40,'41',0),(65,'Jordan','Xám/Đỏ','Giày Jordan React Elevation','/uploads/d713f818-3e30-4cde-889c-5c9d140f0058_0882-CONA13608C700007-1.webp','Jordan React Elevation',3600000,20,'42',0),(66,'Nike','Hồng/Trắng','Giày Air Max 97 với thiết kế sóng nước iconic','/uploads/2c8b7c30-614d-4485-bf9e-3adfa3d45c2e_0882-CONA15069C0PK004-1.webp','Nike Air Max 97',3500000,28,'42',0),(67,'Vans','Hồng/Trắng','Giày Blazer Mid phiên bản cổ điển','/uploads/b9c8628c-f8bb-43c7-83bd-5aea81ea6ab8_0882-CONA13649C0PK06H-1.webp','Vans Blazer Mid 77',2200000,35,'40',0),(68,'Nike','Đen/Trắng','Giày thể thao đa năng Air Monarch IV','/uploads/92b9dddf-501a-47fd-800d-aa8707f73d2c_0882-CONA13378C00509H-1.webp','Nike Air Monarch IV',1800000,45,'44',0),(69,'Nike','Trắng','Giày React Vision dành cho nữ','/uploads/bc03db4d-eddc-4ce0-b7b0-19cd5e44220a_0882-CONA15023CLGY010-1.webp','Nike React Vision',2600000,30,'38',0),(70,'Vans','Cam','Giày Zoom Freak 4 bóng rổ','/uploads/b50fd35c-9a8f-4a63-92e5-b7da92c0d1de_0882-CONA14836C00O010-1.webp','Vans Zoom Freak 4',3300000,22,'43',0),(71,'Nike','Xám/Gum','Giày Air Max 90 bản phối màu vintage','/uploads/35c62eaa-78de-4322-aaf4-ba449827fb83_0882-CONA13470CGRE007-1.webp','Nike Air Max 90',2900000,40,'41',0),(72,'Adidas','Trắng/Xám','Giày Forum Low phiên bản streetwear','/uploads/5595c5e0-3de1-469d-9c0a-53ff68206158_0882-CONA15190C0SV010-1.webp','Adidas Forum Low',2400000,33,'42',0),(73,'Adidas','Xanh/Trắng','Giày Grand Court 2.0 cổ điển','/uploads/70cf9a40-79a4-43e1-b3ee-e9d01e5f512e_0882-CONA12558C12W09H-1.webp','Adidas Grand Court 2.0',1600000,48,'39',2),(74,'Addidas','Đen/Đỏ','Giày chạy bộ Solar Glide 5','/uploads/bee4fedb-fad9-41de-8031-e4fbafda4a6e_0882-CONA12558C12W09H-1.webp','Adidas Solar Glide 5',2700000,25,'43',0),(75,'Adidas','Trắng/Kem','Giày Continental 80 phong cách retro','/uploads/34e87896-e545-42e2-b5bb-0fd85e2fed60_0882-CON162058C000004-1.webp','Adidas Continental 80',2100000,38,'40',0),(76,'Adidas','Xanh/Trắng','Giày Copa Sense.3 đá bóng','/uploads/0fc75914-9397-4c76-8672-94fa8253add5_0882-CONA00916C00503H-1.webp','Adidas Copa Sense.3',3100000,18,'44',0),(77,'Addidas','Hồng/Xám','Giày Ultraboost Light phiên bản mới','/uploads/49296caa-5df2-491a-948a-366e78db2df3_0882-CONA13463C00P007-1.webp','Adidas Ultraboost Light',4200000,15,'41',0),(78,'Jordan','Đen/Xanh','Giày Air Jordan 6 Retro','/uploads/c55c5c0b-c422-43c4-a779-3a1ffb90d4bf_0882-CONA13608C700007-1.webp','Air Jordan 6 Retro',4800000,12,'42',0),(79,'Jordan','Trắng/Đen/','Giày Jordan MA2 phong cách futuristic','/uploads/c5d69001-a2dd-4962-baa4-e961188fa96a_0882-CONA15097CNAV007-1.webp','Jordan MA2',3700000,20,'43',0),(80,'Jordan','Xám/Tím','Giày Jordan Series ES','/uploads/dcbd7c53-840d-48be-a45a-cb9da589a71c_0882-CONA15069C0PK004-1.webp','Jordan Series ES',2500000,30,'40',0),(81,'Jordan','Đỏ/Đen','Giày Air Jordan 13 Retro','/uploads/2b5cabd6-b5d3-4048-9575-0f487ef6c127_0882-CONA15024C00507H-1.webp','Air Jordan 13 Retro',5200000,10,'44',0),(82,'Jordan','Trắng/Xanh','Giày Jordan One Take 4','/uploads/503bae64-ee37-4ee7-a4f2-a7f4fd562d87_0882-CONA15041C00W09H-1.webp','Jordan One Take 4',3400000,25,'41',0),(83,'Jordan','Đen/Bạc','Giày Jordan Air 200E','/uploads/53f9b097-2e5f-4d4e-a4fd-1c21b7b31132_0882-CONA15069C0PK004-1.webp','Jordan Air 200E',2900000,18,'42',0),(84,'Vans','Xanh/Hồng','Giày Sk8-Hi MTE mùa đông','/uploads/0e095d5c-3c55-4b8f-99e0-05fba43ef790_0882-CONA15090C00G06H-1.webp','Vans Sk8-Hi MTE',1900000,40,'42',0),(85,'Vans','Trắng/Xám','Giày Authentic phiên bản mùa hè','/uploads/1dd997bd-2b70-4634-8693-fd4dafa5696f_0882-CONA15190C0SV010-1.webp','Vans Authentic Summer',1500000,55,'39',0),(86,'Vans','Đen','Giày Slip-On Checkerboard','/uploads/84951826-83a2-40ee-ac3e-9aa1c2004dd8_0882-CONA16197C00509H-1.webp','Vans Slip-On Checkerboard',1700000,60,'40',0),(87,'Vans','Nâu đất','Giày Ultrarange Rapidweld','/uploads/3d7f7e36-89e2-41d2-8fe9-35b978c5f7a4_0882-CONA15024C00507H-1.webp','Vans Ultrarange Rapidweld',2300000,30,'43',0),(88,'Vans','Đen/Trắng','Giày Old Skool Pro','/uploads/1df3f730-c2b7-4b25-a4c5-e7c2c93b3ebf_0882-CONA13378C00509H-1.webp','Vans Old Skool Pro',2000000,35,'41',0),(89,'Vans','Be Custom','Giày Era ComfyCush','/uploads/df616893-31ac-4dcc-ab86-2239fd5a4263_0882-CONA16307C00Y007-1.webp','Vans Era ComfyCush',1800000,45,'38',0),(90,'Converse','Trắng/Kem','Giày Chuck 70 Ox','/uploads/273c1a9b-d85c-480d-967d-52e4a430a041_0882-CONA16308C0CM004-1.webp','Converse Chuck 70 Ox',2000000,50,'40',0),(91,'Converse','Đen/Rằn ri','Giày Chuck Taylor All Star Military','/uploads/6353c035-727f-43f2-93bc-75df06478852_0882-CON162050C00004H-1.webp','Converse Military Boot',2400000,30,'42',0),(92,'Converse','Hồng','Giày Run Star Hike Platform','/uploads/0ae42e73-2030-4575-8129-7dac90d29d10_0882-CONA13649C0PK06H-1.webp','Converse Run Star Hike',2800000,25,'39',0),(93,'Converse','Xanh denim','Giày Chuck Taylor Denim','/uploads/59580f89-3ea4-4ec3-9905-45d59b6ea128_0882-CONA15090C00G06H-1.webp','Converse Denim Chuck',2200000,40,'41',0),(94,'Converse','Đỏ/Vàng','Giày Jack Purcell LTT','/uploads/cf5083d1-2928-4701-ad33-9dcaee8155b8_0882-CONA15190C0SV010-1.webp','Converse Jack Purcell LTT',2600000,22,'43',0),(95,'Converse','Trắng/Xanh','Giày Pro Break Ox','/uploads/c6327350-fefd-4a2c-92e5-f68107ce76cd_0882-CONA12219C0MI09H-1__1_.webp','Converse Pro Break Ox',1800000,35,'44',0),(96,'Addidas','Black','ádfasdf','/uploads/9ca99103-b36d-4665-b9aa-6fa7ef68d613_0882-CON162053C000005-1.webp','Adidas Air Max 90',1111111111,0,'XL',0),(97,'Addidas','Black','sadfasdfasdf','/uploads/cf308740-1a9d-4fae-9cbc-ca3367fbd610_0882-CON162065C000007-1.webp','Adidas Old Skoo thang',1121212221,0,'Xl',0),(98,'Converse','Black','thang','/uploads/71089cc2-9ff7-40e1-834a-3693d9ab6387_0882-CON162050C00004H-1.webp','ta quang thang',100000000,0,'XXL',0);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `description` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `name` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'admin full quyen','ADMIN'),(2,'khach hang','USER');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spring_session`
--

DROP TABLE IF EXISTS `spring_session`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spring_session` (
  `PRIMARY_ID` char(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `SESSION_ID` char(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `CREATION_TIME` bigint NOT NULL,
  `LAST_ACCESS_TIME` bigint NOT NULL,
  `MAX_INACTIVE_INTERVAL` int NOT NULL,
  `EXPIRY_TIME` bigint NOT NULL,
  `PRINCIPAL_NAME` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`PRIMARY_ID`),
  UNIQUE KEY `SPRING_SESSION_IX1` (`SESSION_ID`),
  KEY `SPRING_SESSION_IX2` (`EXPIRY_TIME`),
  KEY `SPRING_SESSION_IX3` (`PRINCIPAL_NAME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spring_session`
--

LOCK TABLES `spring_session` WRITE;
/*!40000 ALTER TABLE `spring_session` DISABLE KEYS */;
INSERT INTO `spring_session` VALUES ('4bf7cd57-afbb-478e-82e2-dbe1f97899b2','d5a3c8fe-4690-4652-af46-a16739513cd6',1748405480577,1748405681188,1800,1748407481188,NULL);
/*!40000 ALTER TABLE `spring_session` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `spring_session_attributes`
--

DROP TABLE IF EXISTS `spring_session_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `spring_session_attributes` (
  `SESSION_PRIMARY_ID` char(36) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ATTRIBUTE_NAME` varchar(200) COLLATE utf8mb3_unicode_ci NOT NULL,
  `ATTRIBUTE_BYTES` longblob NOT NULL,
  PRIMARY KEY (`SESSION_PRIMARY_ID`,`ATTRIBUTE_NAME`),
  CONSTRAINT `SPRING_SESSION_ATTRIBUTES_FK` FOREIGN KEY (`SESSION_PRIMARY_ID`) REFERENCES `spring_session` (`PRIMARY_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `spring_session_attributes`
--

LOCK TABLES `spring_session_attributes` WRITE;
/*!40000 ALTER TABLE `spring_session_attributes` DISABLE KEYS */;
INSERT INTO `spring_session_attributes` VALUES ('4bf7cd57-afbb-478e-82e2-dbe1f97899b2','org.springframework.security.web.csrf.HttpSessionCsrfTokenRepository.CSRF_TOKEN',_binary '�\�\0sr\06org.springframework.security.web.csrf.DefaultCsrfTokenZ\�\�/��\�\0L\0\nheaderNamet\0Ljava/lang/String;L\0\rparameterNameq\0~\0L\0tokenq\0~\0xpt\0X-CSRF-TOKENt\0_csrft\0$68f46aa3-4b7a-4865-8def-1632c00f1005');
/*!40000 ALTER TABLE `spring_session_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(200) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `email` varchar(100) COLLATE utf8mb3_unicode_ci NOT NULL,
  `full_name` varchar(100) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `phone` varchar(20) COLLATE utf8mb3_unicode_ci DEFAULT NULL,
  `refresh_token` mediumtext COLLATE utf8mb3_unicode_ci,
  `role_id` bigint DEFAULT NULL,
  `reset_password_token` mediumtext COLLATE utf8mb3_unicode_ci,
  `reset_password_token_expiry` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKp56c1712k691lhsyewcssf40f` (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,NULL,'admin@gmail.com','toi ten admin','$2a$10$TaSDCxfzumVOSZHrPh/i2.0t5xUin0mDlDcvkkvZfOk1DLzAvfFl6','8763214567','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJleHAiOjE3NTAzMTk0OTMsImlhdCI6MTc1MDIzMzA5MywidXNlciI6eyJpZCI6MywiZW1haWwiOiJhZG1pbkBnbWFpbC5jb20iLCJmdWxsTmFtZSI6InRvaSB0ZW4gYWRtaW4iLCJyb2xlIjoxfX0.VoypRjhuYVXI8KpJKHbCTnHcuPBhUmUC44BuwsvmAGJJort2RhJtwFt01IpzffxvcrEitSOFZhIsZeUbBTB6rQ',1,NULL,NULL),(9,'123 Test Street','user@gmail.com','Test Useraaaaa','$2a$10$mRRS5QKGf8pZTiTy6/eS0.B6xDBForXb2V.km/Sqsxeikg3Uy4q3O','1234567890',NULL,1,NULL,NULL),(11,'','user1@gmail.com','mai9hanaaaaa','$2a$10$30NNyTLBrW12aahZdPv96usOqvpzHZS2db11EHLjjx3UMcpYR9moW','0123456789',NULL,2,NULL,NULL),(12,'123 Test Streetsssss','han123@gmail.com','Test Useraaaaa','$2a$10$D/htfYqzc3h8vYoa3swN1uZRDoX1vp6V30HjgOgY.m0m3aOm/Y6n2','1234567890','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYW4xMjNAZ21haWwuY29tIiwiZXhwIjoxNzQ5MTA4MzY1LCJpYXQiOjE3NDkwMjE5NjUsInVzZXIiOnsiaWQiOjEyLCJlbWFpbCI6ImhhbjEyM0BnbWFpbC5jb20iLCJmdWxsTmFtZSI6IlRlc3QgVXNlciIsInJvbGUiOiJVU0VSIn19.ExRHpD9RsIuf_EFO8WrYyDC8x3riIcBqThSMX00tRexya2C6BbdQw0A7GPN8SdvFUfyG6S3cpWyclgrSFoPFgA',2,NULL,NULL),(14,'123 Nguyen Trai, Hanoi','abc@gmail.com','Nguyen Van B','123123','0123456789','eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYmNAZ21haWwuY29tIiwiZXhwIjoxNzQ5MjAxNTQ5LCJpYXQiOjE3NDkxMTUxNDksInVzZXIiOnsiaWQiOjE0LCJlbWFpbCI6ImFiY0BnbWFpbC5jb20iLCJmdWxsTmFtZSI6Im1haTloYW4iLCJyb2xlIjoiVVNFUiJ9fQ.mCTs0pAFs-3eiNefJBDLFduKaaDE5YB0xt_2sLX8q1zr0GTaaW4qA3w-pyQS9WzCqJlXoPKs70DLulw6tlc8Lw',1,'5c5d7c1e-9f98-4f7d-b3fc-5b5631a31d01','2025-06-14 07:57:04.763296'),(16,NULL,'maihan123@gmail.com','maihan123','$2a$10$GYQd.g1ppk0Oq4qn3H74zeXzxNV6hSvNqhZuDjftw2hE5KLOJw8OC',NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYWloYW4xMjNAZ21haWwuY29tIiwiZXhwIjoxNzQ5NTY1NzI4LCJpYXQiOjE3NDk0NzkzMjgsInVzZXIiOnsiaWQiOjE2LCJlbWFpbCI6Im1haWhhbjEyM0BnbWFpbC5jb20iLCJmdWxsTmFtZSI6Im1haWhhbjEyMyIsInJvbGVJZCI6Miwicm9sZSI6IlVTRVIifX0.wTiLbEv_f1lSOAdQRrR6iEJLJWK8lANEqLHULR791X_p2y-CrIcRo4AFs_iqkUTjYtFzV0ai_oNnyU0Hw0DECQ',2,NULL,NULL),(17,'','hancute@gmail.com','mai9han','$2a$10$VvP9ksFwuIskpYYXwVEsqumwSKo8vYcUOVUTDIGPELZC5aDIQRCaa','0123456789',NULL,NULL,NULL,NULL),(18,NULL,'thangmoi0031607@gmail.com','thangMoi','$2a$10$8oKcWse9hxcL5VDGMnF.DeyxIRMjqTqE30opNczlsUI432XiiZqnK',NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0aGFuZ21vaTAwMzE2MDdAZ21haWwuY29tIiwiZXhwIjoxNzUwMzE4MDc1LCJpYXQiOjE3NTAyMzE2NzUsInVzZXIiOnsiaWQiOjE4LCJlbWFpbCI6InRoYW5nbW9pMDAzMTYwN0BnbWFpbC5jb20iLCJmdWxsTmFtZSI6InRoYW5nTW9pIiwicm9sZSI6Mn19.jimPqiUyBKsqOs5LOB5NBcqFghWQq2PMPr1UQY4_dobW9LtrAdbjOED-1U9b3v1eXf99VjSuHC1SyGVFeStJZg',2,NULL,NULL),(19,NULL,'reckless@gmail.com','Reckless','$2a$10$Jaa0Ev4LfFiU11lR1thR9O6FFLT1YuDLI2Qgb1waSlTHKVkVKBFie',NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyZWNrbGVzc0BnbWFpbC5jb20iLCJleHAiOjE3NTAwODIyODksImlhdCI6MTc0OTk5NTg4OSwidXNlciI6eyJpZCI6MTksImVtYWlsIjoicmVja2xlc3NAZ21haWwuY29tIiwiZnVsbE5hbWUiOiJSZWNrbGVzcyIsInJvbGVJZCI6Miwicm9sZSI6IlVTRVIifX0.XjtZtP8icA-vYYxigEvJrWNgwZnVu7ls7D3OMT7QCEnKzMed-n4rGO2nBoVuBofhsh0Xo7NXbaA7diElHIJBPA',2,NULL,NULL),(22,'123 Nguyen Trai, Hanoi','adminisme123@gmail.com','Nguyen Van B','$2a$10$jYO..EKUlP7.C3GDMQCw8OCmfKTHcfcqp9uPw37OJgjkWAwSDkcOC','0123456789',NULL,1,NULL,NULL),(27,'123 Nguyen Trai, Hanoi','123@gmail.com','Nguyen Van B','$2a$10$LILGq3uu9NvOv9fvFuE/FevrspCOnUUY8Y7ayzlbOx/3CVg0S9Kfi','0123456789',NULL,2,NULL,NULL),(29,'','123abc@gmail.com','admin Ngoc','$2a$10$Mmnr38PeKtdRkKySfXnZz.bsKqzhcHzZtSQ88Z1t/zsNMknce4vKy','8763214567',NULL,2,NULL,NULL),(30,'','12345abc123@gmail.com','admin N','$2a$10$SMVwG/0hofCjAdA5YDq8PuDv532thUUdlb6XHGnERDuzeSLorERhe','8763214567',NULL,2,NULL,NULL),(32,NULL,'user3@gmail.com',NULL,'$2a$10$dFCvGDkZhbhSbqSx.gmrfeo3I8Z0t.cj9/bustT1Nggre8iCHObIG',NULL,NULL,2,NULL,NULL),(34,NULL,'user4@gmail.com',NULL,'$2a$10$kDG8oTBlWMvZKR3xUvWWXOD9hct2rIaBjGAGNfeB7RF6HST.PvHqy',NULL,NULL,2,NULL,NULL),(35,'123 street, england','user5@gmail.com','admin Ngoc','$2a$10$96jGYnm8XYByUqOoL2Sh3ebJpwa0S8/1hl24g8FtXMFKMAB0RgSD2','8654367890',NULL,1,NULL,NULL),(38,NULL,'thangmoi0031607123@gmail.com','thangMoi','$2a$10$erdPPzz92zHb9RpJCdqWOeXNSFlLRw76ZQSADn/Tg/oU3bYbJUon.',NULL,NULL,2,NULL,NULL),(39,NULL,'thangmoi00316071231@gmail.com','thangMoi','$2a$10$Vi3e8ctqkVRKNHc5jSeP0uqHk2PfVbxo.o0PekVQ/2sFnnGi1TPES',NULL,NULL,2,NULL,NULL),(40,NULL,'phuc@gmail.com','thangMoi','$2a$10$GYsbBJucn/9QVZA0fqsH9ufzolK3PGbPlrBj2gueQsS/Bpl3rnZbm',NULL,NULL,2,NULL,NULL),(41,NULL,'phuc123@gmail.com','phuc1@gmail.com','$2a$10$eycTvNrV8pgPgPEQcTwQSe8ccQVKAc52VX1J4wQXZQ88M3iDi3noy',NULL,'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwaHVjMTIzQGdtYWlsLmNvbSIsImV4cCI6MTc1MDMxNjY3MywiaWF0IjoxNzUwMjMwMjczLCJ1c2VyIjp7ImlkIjo0MSwiZW1haWwiOiJwaHVjMTIzQGdtYWlsLmNvbSIsImZ1bGxOYW1lIjoicGh1YzFAZ21haWwuY29tIiwicm9sZSI6Mn19.HAY_rGlAfnCXnZdivPecwAhxLU_dmn3It5-z61b772Z7QR5tDcsezLv5Gg7rtxsGtPmkCySymh4_2CSSBV2wxw',2,NULL,NULL);
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

-- Dump completed on 2025-06-19  9:58:29
