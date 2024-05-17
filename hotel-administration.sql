-- MySQL dump 10.13  Distrib 8.0.25, for Win64 (x86_64)
--
-- Host: localhost    Database: hotel-administration
-- ------------------------------------------------------
-- Server version	8.0.25

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
-- Table structure for table `auth`
--

DROP TABLE IF EXISTS `auth`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auth` (
  `id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','user') NOT NULL DEFAULT 'user',
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `refreshToken` longtext,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auth`
--

LOCK TABLES `auth` WRITE;
/*!40000 ALTER TABLE `auth` DISABLE KEYS */;
INSERT INTO `auth` VALUES (1,'cristian.naranjo@outlook.es','Asdf1234.','admin','2024-05-12 16:31:05.209639','2024-05-16 14:55:42.000000','');
/*!40000 ALTER TABLE `auth` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotelId` int NOT NULL,
  `roomId` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `checkin` date NOT NULL,
  `checkout` date NOT NULL,
  `total` decimal(10,2) NOT NULL,
  `fullName` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_BookingsToHotels` (`hotelId`),
  KEY `FK_BookingsToRooms` (`roomId`),
  CONSTRAINT `FK_BookingsToHotels` FOREIGN KEY (`hotelId`) REFERENCES `hotels` (`id`),
  CONSTRAINT `FK_BookingsToRooms` FOREIGN KEY (`roomId`) REFERENCES `rooms` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (2,1,1,'2024-05-16 12:48:43.596001','2024-05-16 12:48:43.596001','2024-05-16','2024-05-18',190400.00,'Cristian Camilo Naranjo Valencia','3197845152'),(3,2,4,'2024-05-16 12:56:22.479921','2024-05-16 12:56:22.479921','2024-05-16','2024-05-18',190400.00,'Cristian Camilo Naranjo Valencia','3197845152');
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cities`
--

DROP TABLE IF EXISTS `cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cities` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cities`
--

LOCK TABLES `cities` WRITE;
/*!40000 ALTER TABLE `cities` DISABLE KEYS */;
INSERT INTO `cities` VALUES (1,'Medellín','2024-05-14 16:35:54.695758','2024-05-14 16:35:54.695758'),(2,'Bello','2024-05-15 13:04:09.632719','2024-05-15 13:04:09.632719'),(3,'Envigado','2024-05-15 13:04:09.832523','2024-05-15 13:04:09.832523'),(4,'Sabaneta','2024-05-15 13:04:09.844935','2024-05-15 13:04:09.844935'),(5,'Itagüi','2024-05-15 13:04:09.887792','2024-05-15 13:04:09.887792'),(6,'Barbosa','2024-05-15 13:04:09.888284','2024-05-15 13:04:09.888284'),(7,'Copacabana','2024-05-15 13:04:09.888730','2024-05-15 13:04:09.888730');
/*!40000 ALTER TABLE `cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `document-types`
--

DROP TABLE IF EXISTS `document-types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `document-types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `abbreviation` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `document-types`
--

LOCK TABLES `document-types` WRITE;
/*!40000 ALTER TABLE `document-types` DISABLE KEYS */;
INSERT INTO `document-types` VALUES (1,'TI','Tarjeta de Identidad','2024-05-14 16:40:18.845793','2024-05-14 16:40:18.845793'),(2,'CC','Cédula de Ciudadanía','2024-05-14 16:40:18.846610','2024-05-14 16:40:18.846610'),(3,'CE','Cédula de Extrangería','2024-05-14 16:40:18.847063','2024-05-14 16:40:18.847063');
/*!40000 ALTER TABLE `document-types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genders`
--

DROP TABLE IF EXISTS `genders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genders`
--

LOCK TABLES `genders` WRITE;
/*!40000 ALTER TABLE `genders` DISABLE KEYS */;
INSERT INTO `genders` VALUES (1,'Masculino','2024-05-14 16:39:01.935265','2024-05-14 16:39:01.935265'),(2,'Femenino','2024-05-14 16:39:01.936419','2024-05-14 16:39:01.936419'),(3,'N/A','2024-05-14 16:39:01.936898','2024-05-14 16:39:01.936898');
/*!40000 ALTER TABLE `genders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `guests`
--

DROP TABLE IF EXISTS `guests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `guests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `document` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `bookingId` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `genderId` int NOT NULL,
  `documentTypeId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_GuestsToGenders` (`genderId`),
  KEY `FK_GuestsToDocumentTypes` (`documentTypeId`),
  KEY `FK_GuestsToBookings` (`bookingId`),
  CONSTRAINT `FK_GuestsToBookings` FOREIGN KEY (`bookingId`) REFERENCES `bookings` (`id`),
  CONSTRAINT `FK_GuestsToDocumentTypes` FOREIGN KEY (`documentTypeId`) REFERENCES `document-types` (`id`),
  CONSTRAINT `FK_GuestsToGenders` FOREIGN KEY (`genderId`) REFERENCES `genders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `guests`
--

LOCK TABLES `guests` WRITE;
/*!40000 ALTER TABLE `guests` DISABLE KEYS */;
INSERT INTO `guests` VALUES (2,'Cristian Camilo','Naranjo Valencia','1020415284','cristian.naranjo@outlook.es','3197845152',2,'2024-05-16 12:48:43.614463','2024-05-16 12:48:43.614463',1,2),(3,'Cristian Camilo','Naranjo Valencia','1020415284','cristian.naranjo@outlook.es','3197845152',3,'2024-05-16 12:56:22.499186','2024-05-16 12:56:22.499186',1,2);
/*!40000 ALTER TABLE `guests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hotels`
--

DROP TABLE IF EXISTS `hotels`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hotels` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `address` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` tinyint NOT NULL DEFAULT '1',
  `cityId` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_HotelsToCities` (`cityId`),
  CONSTRAINT `FK_HotelsToCities` FOREIGN KEY (`cityId`) REFERENCES `cities` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hotels`
--

LOCK TABLES `hotels` WRITE;
/*!40000 ALTER TABLE `hotels` DISABLE KEYS */;
INSERT INTO `hotels` VALUES (1,'Conquistadores I','2024-05-13 02:30:57.700047','2024-05-14 16:36:14.629184','Av 44 # 56-50','3197845152','conquistadores@outlook.es',1,1),(2,'Conquistadores II','2024-05-13 02:30:57.750892','2024-05-14 16:36:14.635155','Av 44 # 56-50','3197845152','conquistadores@outlook.es',1,1),(3,'Ibiza','2024-05-13 02:30:57.752886','2024-05-14 16:36:14.635920','Av 44 # 56-50','3197845152','conquistadores@outlook.es',1,1),(9,'Conquistadores III','2024-05-14 02:44:49.355434','2024-05-14 16:36:14.636559','Av 44 # 56-40','3197845152','cristian.naranjo@outlook.es',1,1),(10,'Conquistadores IV','2024-05-16 02:07:20.084410','2024-05-16 02:07:20.084410','Av 44 # 56-40','3197845152','cristian.naranjo@outlook.es',1,2),(11,'Conquistadores V','2024-05-16 02:20:29.746047','2024-05-16 02:20:29.746047','Av 44 # 56-40','3197845152','cristian.naranjo@outlook.es',1,3);
/*!40000 ALTER TABLE `hotels` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `room-types`
--

DROP TABLE IF EXISTS `room-types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `room-types` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `minimum` int NOT NULL,
  `maximum` int NOT NULL,
  `price` decimal(11,1) NOT NULL,
  `tax` decimal(3,1) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room-types`
--

LOCK TABLES `room-types` WRITE;
/*!40000 ALTER TABLE `room-types` DISABLE KEYS */;
INSERT INTO `room-types` VALUES (1,'Suite','habitación doble con baño, jacuzzi y salón de 20 m² de superficie mínima.','2024-05-13 17:04:01.262502','2024-05-13 18:01:27.110656',2,4,200000.0,19.0),(2,'Individuales','Habitación sencilla para una o dos personas de 10 m².','2024-05-13 17:04:01.282483','2024-05-13 18:01:27.116517',1,2,80000.0,19.0),(3,'Dobles','Habitación doble para dos o cuatro personas de 14.5 m².','2024-05-13 17:04:01.284334','2024-05-13 18:01:27.116924',2,4,120000.0,19.0),(4,'Cuádruples','Habitación cuádruple para cuatro u ocho personas de 18 m².','2024-05-13 17:04:01.286068','2024-05-16 03:58:59.816135',4,8,160000.0,19.0);
/*!40000 ALTER TABLE `room-types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rooms`
--

DROP TABLE IF EXISTS `rooms`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rooms` (
  `id` int NOT NULL AUTO_INCREMENT,
  `hotelId` int NOT NULL,
  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),
  `busy` tinyint NOT NULL DEFAULT '0',
  `status` tinyint NOT NULL DEFAULT '1',
  `roomTypeId` int NOT NULL,
  `number` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_RoomsToHotels` (`hotelId`),
  KEY `FK_RoomsToRoomTypes` (`roomTypeId`),
  CONSTRAINT `FK_RoomsToHotels` FOREIGN KEY (`hotelId`) REFERENCES `hotels` (`id`),
  CONSTRAINT `FK_RoomsToRoomTypes` FOREIGN KEY (`roomTypeId`) REFERENCES `room-types` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rooms`
--

LOCK TABLES `rooms` WRITE;
/*!40000 ALTER TABLE `rooms` DISABLE KEYS */;
INSERT INTO `rooms` VALUES (1,1,'2024-05-13 23:15:17.545597','2024-05-16 13:27:57.000000',0,1,2,'101'),(2,1,'2024-05-13 23:15:17.608895','2024-05-16 13:27:57.000000',0,1,2,'102'),(4,2,'2024-05-13 23:16:10.672439','2024-05-16 13:28:33.000000',0,1,2,'101'),(5,2,'2024-05-13 23:16:10.674658','2024-05-16 13:28:33.000000',0,1,2,'102'),(6,2,'2024-05-13 23:16:10.675119','2024-05-16 13:28:33.000000',0,1,3,'103'),(7,3,'2024-05-13 23:16:10.675496','2024-05-16 13:28:51.000000',0,1,2,'101'),(8,3,'2024-05-13 23:16:10.675935','2024-05-16 13:28:51.000000',0,1,2,'102'),(9,3,'2024-05-13 23:16:10.676319','2024-05-16 13:28:51.000000',0,1,3,'103'),(10,1,'2024-05-14 02:28:20.798470','2024-05-16 13:27:57.000000',0,1,2,'103'),(14,1,'2024-05-14 02:36:36.315910','2024-05-16 13:27:57.000000',0,1,3,'201'),(15,9,'2024-05-14 02:44:49.362118','2024-05-16 13:32:08.000000',0,1,2,'101'),(16,9,'2024-05-16 01:35:27.272279','2024-05-16 13:32:08.000000',0,1,2,'102'),(17,9,'2024-05-16 01:35:54.622458','2024-05-16 13:32:08.000000',0,1,3,'103'),(20,9,'2024-05-16 01:38:07.594630','2024-05-16 13:32:08.000000',0,1,4,'201'),(22,9,'2024-05-16 01:40:53.267251','2024-05-16 13:32:08.000000',0,1,4,'202'),(25,1,'2024-05-16 01:49:39.580792','2024-05-16 13:27:57.000000',0,1,3,'202'),(26,2,'2024-05-16 01:50:36.703865','2024-05-16 13:28:33.000000',0,1,4,'201'),(28,2,'2024-05-16 01:54:38.067088','2024-05-16 13:28:33.000000',0,1,4,'202'),(29,1,'2024-05-16 02:02:07.239029','2024-05-16 13:27:57.000000',0,1,4,'301'),(31,10,'2024-05-16 02:07:20.284304','2024-05-16 13:32:27.000000',0,1,2,'101'),(32,10,'2024-05-16 02:07:20.354987','2024-05-16 13:32:27.000000',0,1,2,'102'),(33,10,'2024-05-16 02:11:13.714384','2024-05-16 13:32:27.000000',0,1,3,'103'),(34,10,'2024-05-16 02:12:40.308658','2024-05-16 13:32:27.000000',0,1,4,'201'),(35,10,'2024-05-16 02:15:25.047762','2024-05-16 13:32:27.000000',0,1,4,'202'),(37,11,'2024-05-16 02:20:29.892263','2024-05-16 13:33:50.000000',0,1,2,'101'),(40,11,'2024-05-16 02:28:38.215949','2024-05-16 13:33:50.000000',0,1,2,'102'),(41,11,'2024-05-16 02:28:38.226964','2024-05-16 13:33:50.000000',0,1,2,'103'),(44,11,'2024-05-16 02:31:06.564468','2024-05-16 13:33:50.000000',0,1,3,'201'),(45,11,'2024-05-16 02:31:06.571004','2024-05-16 13:33:50.000000',0,1,3,'202'),(46,11,'2024-05-16 02:31:06.573468','2024-05-16 13:33:50.000000',0,1,4,'203'),(47,3,'2024-05-16 02:38:51.903229','2024-05-16 13:28:51.000000',0,1,4,'201'),(48,3,'2024-05-16 02:38:51.919781','2024-05-16 13:28:51.000000',0,1,4,'202'),(49,3,'2024-05-16 02:38:51.928257','2024-05-16 13:28:51.000000',0,1,1,'301'),(50,2,'2024-05-16 02:39:32.971205','2024-05-16 13:28:33.000000',0,1,1,'301'),(51,2,'2024-05-16 02:39:33.015182','2024-05-16 13:28:33.000000',0,1,1,'302'),(52,2,'2024-05-16 02:39:33.037477','2024-05-16 13:28:33.000000',0,1,1,'303'),(53,9,'2024-05-16 02:40:01.649430','2024-05-16 13:32:08.000000',0,1,1,'301'),(54,9,'2024-05-16 02:40:01.657527','2024-05-16 13:32:08.000000',0,1,1,'302'),(63,11,'2024-05-16 02:40:33.584970','2024-05-16 13:33:50.000000',0,1,1,'301'),(64,11,'2024-05-16 02:40:33.725355','2024-05-16 13:33:50.000000',0,1,1,'302');
/*!40000 ALTER TABLE `rooms` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-05-16 19:42:16
