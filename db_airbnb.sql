/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `comment` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `date` date NOT NULL,
  `content` varchar(250) DEFAULT NULL,
  `rate_comment` tinyint NOT NULL,
  `room_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `country` (
  `id` mediumint NOT NULL AUTO_INCREMENT,
  `country_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `location` (
  `id` int NOT NULL AUTO_INCREMENT,
  `location_name` varchar(200) NOT NULL,
  `province` int NOT NULL,
  `country` mediumint NOT NULL,
  `image` varchar(400) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `province` (`province`),
  KEY `country` (`country`),
  CONSTRAINT `location_ibfk_1` FOREIGN KEY (`province`) REFERENCES `province` (`id`),
  CONSTRAINT `location_ibfk_2` FOREIGN KEY (`country`) REFERENCES `country` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `province` (
  `id` int NOT NULL AUTO_INCREMENT,
  `province_name` varchar(200) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `permission` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `room` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_name` varchar(200) NOT NULL,
  `living_room` tinyint DEFAULT NULL,
  `bedroom` tinyint DEFAULT NULL,
  `bed` tinyint DEFAULT NULL,
  `bathroom` tinyint DEFAULT NULL,
  `description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `cost` float NOT NULL,
  `washing_machine` tinyint(1) DEFAULT NULL,
  `iron` tinyint(1) DEFAULT NULL,
  `televition` tinyint(1) DEFAULT NULL,
  `air_condition` tinyint(1) DEFAULT NULL,
  `wifi` tinyint(1) DEFAULT NULL,
  `parking` tinyint(1) DEFAULT NULL,
  `kitchen` tinyint(1) DEFAULT NULL,
  `image` varchar(400) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `location_id` int NOT NULL,
  `user_id` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `location_id` (`location_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `room_ibfk_1` FOREIGN KEY (`location_id`) REFERENCES `location` (`id`),
  CONSTRAINT `room_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `room_book` (
  `id` int NOT NULL AUTO_INCREMENT,
  `room_id` int NOT NULL,
  `start_day` date NOT NULL,
  `end_day` date NOT NULL,
  `guest_count` tinyint NOT NULL,
  `user_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `room_id` (`room_id`),
  CONSTRAINT `room_book_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `room_book_ibfk_2` FOREIGN KEY (`room_id`) REFERENCES `room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `full_name` varchar(200) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(500) NOT NULL,
  `birth_day` date DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` int DEFAULT '2',
  `gender` tinyint(1) NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `role` (`role`),
  CONSTRAINT `user_ibfk_1` FOREIGN KEY (`role`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `comment` (`id`, `user_id`, `date`, `content`, `rate_comment`, `room_id`) VALUES
(3, 21, '2023-10-29', 'Thân thiện với khách hàng!', 5, 10);
INSERT INTO `comment` (`id`, `user_id`, `date`, `content`, `rate_comment`, `room_id`) VALUES
(4, 12, '2023-10-30', 'Phục vụ tốt', 5, 10);
INSERT INTO `comment` (`id`, `user_id`, `date`, `content`, `rate_comment`, `room_id`) VALUES
(7, 20, '2023-10-31', 'Phòng đẹp, Nhân viên chu đáo!', 4, 10);
INSERT INTO `comment` (`id`, `user_id`, `date`, `content`, `rate_comment`, `room_id`) VALUES
(8, 20, '2023-10-31', 'Phòng đẹp, Nhân viên chu đáo!', 4, 13);

INSERT INTO `country` (`id`, `country_name`) VALUES
(1, 'Việt Nam');
INSERT INTO `country` (`id`, `country_name`) VALUES
(2, 'Thái Lan');
INSERT INTO `country` (`id`, `country_name`) VALUES
(3, 'Trung Quốc');
INSERT INTO `country` (`id`, `country_name`) VALUES
(4, 'Hoa Kỳ');

INSERT INTO `location` (`id`, `location_name`, `province`, `country`, `image`) VALUES
(1, 'Xã Hòa Khánh', 2, 1, 'image');
INSERT INTO `location` (`id`, `location_name`, `province`, `country`, `image`) VALUES
(2, 'Xã Diên Khánh', 2, 1, 'image');
INSERT INTO `location` (`id`, `location_name`, `province`, `country`, `image`) VALUES
(8, 'Quận 1', 1, 1, 'string');
INSERT INTO `location` (`id`, `location_name`, `province`, `country`, `image`) VALUES
(9, 'Quận 7', 1, 1, 'string'),
(10, 'Huyện Hóc Môn', 1, 1, 'string'),
(11, 'Quận Bình Thạnh', 1, 1, 'string'),
(12, 'Quận Tân Bình', 1, 1, 'string'),
(13, 'Huyện Củ Chi', 1, 1, 'string'),
(14, 'Quận Bình Chánh', 1, 1, 'string'),
(15, 'Thành phố Phúc Châu', 3, 3, 'string'),
(16, 'Thành phố Lan Châu', 4, 3, ''),
(17, 'Thạch Gia Trang', 6, 3, 'string');

INSERT INTO `province` (`id`, `province_name`) VALUES
(1, 'Hồ Chí Minh');
INSERT INTO `province` (`id`, `province_name`) VALUES
(2, 'Nha Trang');
INSERT INTO `province` (`id`, `province_name`) VALUES
(3, 'Phúc Kiến');
INSERT INTO `province` (`id`, `province_name`) VALUES
(4, 'Cam Túc'),
(5, 'Quảng Đông'),
(6, 'Hà Bắc');

INSERT INTO `role` (`id`, `role_name`, `permission`) VALUES
(1, 'admin', NULL);
INSERT INTO `role` (`id`, `role_name`, `permission`) VALUES
(2, 'guest', NULL);
INSERT INTO `role` (`id`, `role_name`, `permission`) VALUES
(3, 'leaser', NULL);

INSERT INTO `room` (`id`, `room_name`, `living_room`, `bedroom`, `bed`, `bathroom`, `description`, `cost`, `washing_machine`, `iron`, `televition`, `air_condition`, `wifi`, `parking`, `kitchen`, `image`, `location_id`, `user_id`) VALUES
(10, 'Trà My Home Stay', 1, 1, 2, 1, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 'string', 1, 12);
INSERT INTO `room` (`id`, `room_name`, `living_room`, `bedroom`, `bed`, `bathroom`, `description`, `cost`, `washing_machine`, `iron`, `televition`, `air_condition`, `wifi`, `parking`, `kitchen`, `image`, `location_id`, `user_id`) VALUES
(13, 'Hotel 24H', 1, 1, 1, 1, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 'string', 11, 12);
INSERT INTO `room` (`id`, `room_name`, `living_room`, `bedroom`, `bed`, `bathroom`, `description`, `cost`, `washing_machine`, `iron`, `televition`, `air_condition`, `wifi`, `parking`, `kitchen`, `image`, `location_id`, `user_id`) VALUES
(14, 'Điền Phong', 0, 1, 1, 1, 'string', 0, 1, 1, 1, 1, 1, 1, 1, 'string', 11, 12);
INSERT INTO `room` (`id`, `room_name`, `living_room`, `bedroom`, `bed`, `bathroom`, `description`, `cost`, `washing_machine`, `iron`, `televition`, `air_condition`, `wifi`, `parking`, `kitchen`, `image`, `location_id`, `user_id`) VALUES
(16, 'Hoàng Hà Hotel', 1, 1, 1, 1, '\'\'', 12, 1, 1, 1, 1, 1, 1, 1, NULL, 10, 12),
(17, 'Hoàng Hà Hotel', 1, 1, 1, 1, '\'\'', 12, 1, 1, 1, 1, 1, 1, 1, NULL, 10, 12),
(18, 'Phòng trọ cao cấp', 1, 1, 1, 1, 'Phòng trọ cao cấp Củ chi', 12, 1, 1, 1, 1, 1, 1, 1, '1698697972619phongtro.jpg', 10, 12),
(19, 'Trần Tiến Hotel', 1, 1, 2, 1, '\'\'', 1, 0, 0, 0, 0, 0, 0, 0, '1698762880430hotel.jpg', 12, 19),
(20, 'White Palace Hotel', 1, 1, 2, 2, '\'Khách sạn chất lượng 5 sao\'', 100, 1, 1, 1, 1, 1, 1, 1, '1698791047726hotel.jpg', 8, 12);

INSERT INTO `room_book` (`id`, `room_id`, `start_day`, `end_day`, `guest_count`, `user_id`) VALUES
(45, 10, '2023-10-17', '2023-10-17', 6, 16);
INSERT INTO `room_book` (`id`, `room_id`, `start_day`, `end_day`, `guest_count`, `user_id`) VALUES
(46, 10, '2023-10-31', '2023-10-31', 0, 16);
INSERT INTO `room_book` (`id`, `room_id`, `start_day`, `end_day`, `guest_count`, `user_id`) VALUES
(47, 10, '2023-10-15', '2023-10-15', 0, 20);
INSERT INTO `room_book` (`id`, `room_id`, `start_day`, `end_day`, `guest_count`, `user_id`) VALUES
(48, 10, '2023-10-19', '2023-10-19', 0, 16),
(49, 13, '2023-10-29', '2023-10-29', 2, 21);

INSERT INTO `user` (`id`, `full_name`, `email`, `password`, `birth_day`, `phone`, `role`, `gender`, `avatar`) VALUES
(12, 'admin', 'admin', '$2b$10$QMvipL91kcd1FWQkxR/iEOaQn8hotDKT0wG31nxIvuqTzvB4SGYzy', '1980-09-11', '0126798043', 1, 1, '1697292426753h___372.jpg');
INSERT INTO `user` (`id`, `full_name`, `email`, `password`, `birth_day`, `phone`, `role`, `gender`, `avatar`) VALUES
(15, 'Đình Toàn', 'dinhtoanlam@gmail.com', '$2b$10$Y1MRTq8skI8IWl1mZFZ/0O7BAI0UREJy6aNI5SDR.jPLfpNf9MLMW', '1997-10-01', '0843535343', 3, 1, NULL);
INSERT INTO `user` (`id`, `full_name`, `email`, `password`, `birth_day`, `phone`, `role`, `gender`, `avatar`) VALUES
(16, 'Xuân Mạnh', 'xuanmanh69@gmail.com', '$2b$10$6NsTbReHa5boL3fXlMQRWe2WpMWc6OEwZx3./TDDXckbyE2EqLYua', '1990-10-02', '0967456343', 2, 1, NULL);
INSERT INTO `user` (`id`, `full_name`, `email`, `password`, `birth_day`, `phone`, `role`, `gender`, `avatar`) VALUES
(19, 'Tuấn Dũng', 'tuandung@gmail.com', '$2b$10$90oXJQcacS6GH1Ap1viuWu.zrx7evPkX/OOBuo6vVDidO9adtvhlu', '1981-01-01', '0568763243', 3, 1, NULL),
(20, 'Hoàng Anh', 'hoanganh123@gmail.com', '$2b$10$GcrSeER4.0D0w5vXZ525MerK4TBZ6EeG/YsP0RzUQAqhMfbO4x1TK', '1978-06-03', '0732132144', 2, 1, NULL),
(21, 'test demo', 'test@gmail.com', '$2b$10$DGRah1N4vrEPOXhLYOygt.5pdYFSMRVL2jCb8JSszhSd0Qq/t9Ioe', '2000-10-29', '0313133243', 2, 1, '1698592202122h___372.jpg'),
(22, 'Hoàng', 'test123@gmail.com', '$2b$10$sDgAhDJ94B/bClvz7PLyXumuHzOCqy6qOMlEUtwk6bEGRl9euTm8.', '2001-10-30', '0962345678', 2, 1, '1698674050227h___372.jpg'),
(24, 'Hoàng Đỗ', 'testdemo@gmail.com', '$2b$10$1ZcASMSD.YmWa2GV0TsjfepuDhK8De42pKqGpxN9TAVYg.FoKPCii', '2001-10-31', '098763453', 2, 1, '1698790242813h___372.jpg');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;