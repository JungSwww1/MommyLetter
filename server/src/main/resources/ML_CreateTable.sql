-- CREATE TABLE statements
CREATE TABLE `USER` (
                        `user_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                        `password` VARCHAR(20) NULL,
                        `nickname` VARCHAR(20) NULL,
                        `intro` VARCHAR(255) NULL,
                        `email` VARCHAR(50) NULL,
                        `gender` ENUM('Male', 'Female') DEFAULT 'Female',
                        `role` ENUM('Common', 'Doctor', 'Admin') DEFAULT 'Common',
                        `created_date` TIMESTAMP NOT NULL,
                        `updated_date` TIMESTAMP NULL,
                        `profile_photo` VARCHAR(255) NULL,
                        `background_photo` VARCHAR(255) NULL
);

CREATE TABLE `DIARY` (
                         `diary_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `user_id` INT NOT NULL,
                         `content` VARCHAR(255) NOT NULL,
                         `category` ENUM('Mom', 'Baby') DEFAULT 'Mom',
                         `emoji` INT NOT NULL DEFAULT 0,
                         `created_date` TIMESTAMP NOT NULL,
                         `updated_date` TIMESTAMP NULL,
                         FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `BOARD` (
                         `board_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `user_id` INT NOT NULL,
                         `content` VARCHAR(255) NOT NULL,
                         `access` ENUM('All', 'Follower', 'Nobody') DEFAULT 'All',
                         `created_date` TIMESTAMP NOT NULL,
                         `updated_date` TIMESTAMP NULL,
                         FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `USER_INFO` (
                             `SSN` CHAR(13) NOT NULL,
                             `user_id` INT NOT NULL PRIMARY KEY,
                             `name` VARCHAR(15) NULL,
                             `phone` CHAR(11) NULL,
                             `status` ENUM('Pregnant', 'Mother', 'None') DEFAULT 'None',
                             `extra` VARCHAR(255) NULL,
                             `diary_open` BOOLEAN NULL DEFAULT FALSE,
                             `agree_date` TIMESTAMP NULL,
                             FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `DOCTOR` (
                          `doctor_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `user_id` INT NOT NULL,
                          `department` VARCHAR(30) NULL,
                          `location` VARCHAR(100) NULL,
                          `vaild_time` VARCHAR(200) NULL,
                          FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `COMMENT` (
                           `comment_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `board_id` INT NOT NULL,
                           `user_id` INT NOT NULL,
                           `content` VARCHAR(255) NOT NULL,
                           `created_date` TIMESTAMP NOT NULL,
                           `updated_date` TIMESTAMP NULL,
                           FOREIGN KEY (`board_id`) REFERENCES `BOARD` (`board_id`),
                           FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `COMMENT_LIKE` (
                                `comment_like_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                `comment_id` INT NOT NULL,
                                `user_id` INT NOT NULL,
                                FOREIGN KEY (`comment_id`) REFERENCES `COMMENT` (`comment_id`),
                                FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `BOARD_LIKE` (
                              `board_like_id` INT NOT NULL PRIMARY KEY,
                              `board_id` INT NOT NULL,
                              `user_id` INT NOT NULL,
                              FOREIGN KEY (`board_id`) REFERENCES `BOARD` (`board_id`),
                              FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `DIRECT_MESSAGE` (
                                  `dm_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                                  `sender_id` INT NOT NULL,
                                  `receiver_id` INT NOT NULL,
                                  `content` VARCHAR(255) NOT NULL,
                                  `created_date` TIMESTAMP NOT NULL,
                                  FOREIGN KEY (`sender_id`) REFERENCES `USER` (`user_id`),
                                  FOREIGN KEY (`receiver_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `RESERVE` (
                           `reserve_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `doctor_id` INT NOT NULL,
                           `user_id` INT NOT NULL,
                           `reserve_date` TIMESTAMP NULL,
                           FOREIGN KEY (`doctor_id`) REFERENCES `DOCTOR` (`doctor_id`),
                           FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `CONSULT` (
                           `counseling_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `user_id` INT NOT NULL,
                           `reserve_id` INT NOT NULL,
                           `prescription_path` VARCHAR(255) NULL,
                           FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`),
                           FOREIGN KEY (`reserve_id`) REFERENCES `RESERVE` (`reserve_id`)
);

CREATE TABLE `FOLLOW` (
                          `follow_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          `following_id` INT NOT NULL,
                          `follower_id` INT NOT NULL,
                          FOREIGN KEY (`following_id`) REFERENCES `USER` (`user_id`),
                          FOREIGN KEY (`follower_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `HISTORY` (
                           `history_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `doctor_id` INT NOT NULL,
                           `content` VARCHAR(255) NOT NULL,
                           FOREIGN KEY (`doctor_id`) REFERENCES `DOCTOR` (`doctor_id`)
);

CREATE TABLE `PHOTO` (
                         `file_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                         `path` VARCHAR(255) NOT NULL,
                         `size` VARCHAR(255) NULL,
                         `created_date` TIMESTAMP NOT NULL,
                         `updated_date` TIMESTAMP NULL,
                         `board_id` INT NOT NULL,
                         `diary_id` INT NOT NULL,
                         FOREIGN KEY (`board_id`) REFERENCES `BOARD` (`board_id`),
                         FOREIGN KEY (`diary_id`) REFERENCES `DIARY` (`diary_id`)
);

CREATE TABLE `HASHTAG` (
                           `hashtag_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                           `board_id` INT NOT NULL,
                           `content` VARCHAR(30) NOT NULL,
                           FOREIGN KEY (`board_id`) REFERENCES `BOARD` (`board_id`)
);
