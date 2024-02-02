CREATE TABLE `USER`
(
    `user_id`      INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `password`     VARCHAR(200)  NULL,
    `nickname`     VARCHAR(200) CHARACTER SET utf8 NULL,
    `intro`        VARCHAR(255) NULL,
    `email`        VARCHAR(50)  NULL,
    `gender`       ENUM ('Male', 'Female')            DEFAULT 'Female',
    `role`         ENUM ('Common', 'Doctor', 'Admin') DEFAULT 'Common',
    `created_date` TIMESTAMP    NOT NULL,
    `updated_date` TIMESTAMP    NULL
);

CREATE TABLE `DIARY`
(
    `diary_id`     INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id`      INT          NOT NULL,
    `content`      VARCHAR(255) NOT NULL,
    `category`     ENUM ('Mom', 'Baby')  DEFAULT 'Mom',
    `emoji`        INT          NOT NULL DEFAULT 0,
    `created_date` TIMESTAMP    NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `BOARD`
(
    `board_id`     INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id`      INT          NOT NULL,
    `content`      VARCHAR(255) NOT NULL,
    `access`       ENUM ('All', 'Follower', 'Nobody') DEFAULT 'All',
    `category`     ENUM ('One', 'Two', 'Three')       DEFAULT 'One',
    `created_date` TIMESTAMP    NOT NULL,
    `updated_date` TIMESTAMP    NULL,
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);


CREATE TABLE USER_INFO
(
    user_info_id     BIGINT   NOT NULL AUTO_INCREMENT, -- 새로운 기본 키
    user_id          INT      NOT NULL,                -- 외래 키
    SSN              CHAR(13) NOT NULL,
    name             VARCHAR(15),
    phone            CHAR(11),
    pregnancy_status ENUM ('Pregnant', 'Mother', 'None') DEFAULT 'None',
    extra            VARCHAR(255),
    diary_open       BOOLEAN                             DEFAULT FALSE,
    agree_date       TIMESTAMP,
    PRIMARY KEY (user_info_id),                        -- 기본 키 지정
    FOREIGN KEY (user_id) REFERENCES USER (user_id)    -- 외래 키 제약 조건
);

CREATE TABLE `DOCTOR`
(
    `doctor_id`  INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id`    INT          NOT NULL,
    `name`       VARCHAR(10)  NOT NULL,
    `department` VARCHAR(30)  NULL,
    `location`   VARCHAR(100) NULL,
    `valid_time` VARCHAR(200) NULL,
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE IF NOT EXISTS `PROFILE`
(
    `profile_id`       INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id`          INT          NOT NULL,
    `profile_photo`    VARCHAR(255) NULL,
    `background_photo` VARCHAR(255) NULL,
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);


CREATE TABLE `COMMENT`
(
    `comment_id`   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `board_id`     INT          NOT NULL,
    `user_id`      INT          NOT NULL,
    `content`      VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP    NOT NULL,
    `updated_date` TIMESTAMP    NULL,
    FOREIGN KEY (`board_id`) REFERENCES `BOARD` (`board_id`),
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `COMMENT_LIKE`
(
    `comment_like_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `comment_id`      INT NOT NULL,
    `user_id`         INT NOT NULL,
    FOREIGN KEY (`comment_id`) REFERENCES `COMMENT` (`comment_id`),
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `BOARD_LIKE`
(
    `board_like_id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `board_id`      INT NOT NULL,
    `user_id`       INT NOT NULL,
    FOREIGN KEY (`board_id`) REFERENCES `BOARD` (`board_id`),
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `DIRECT_MESSAGE`
(
    `dm_id`        INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `room_id`      VARCHAR(255) NOT NULL,
    `sender_id`    INT          NOT NULL,
    `receiver_id`  INT,
    `content`      VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP    NOT NULL,
    FOREIGN KEY (`sender_id`) REFERENCES `USER` (`user_id`),
    FOREIGN KEY (`receiver_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `RESERVE`
(
    `reserve_id`   INT       NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `doctor_id`    INT       NOT NULL,
    `user_id`      INT       NOT NULL,
    `reserve_date` TIMESTAMP NULL,
    FOREIGN KEY (`doctor_id`) REFERENCES `DOCTOR` (`doctor_id`),
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `CONSULT`
(
    `counseling_id`     INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `user_id`           INT          NOT NULL,
    `reserve_id`        INT          NOT NULL,
    `prescription_path` VARCHAR(255) NULL,
    FOREIGN KEY (`user_id`) REFERENCES `USER` (`user_id`),
    FOREIGN KEY (`reserve_id`) REFERENCES `RESERVE` (`reserve_id`)
);

CREATE TABLE `FOLLOW`
(
    `follow_id`    INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `following_id` INT NOT NULL,
    `follower_id`  INT NOT NULL,
    FOREIGN KEY (`following_id`) REFERENCES `USER` (`user_id`),
    FOREIGN KEY (`follower_id`) REFERENCES `USER` (`user_id`)
);

CREATE TABLE `HISTORY`
(
    `history_id` INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `doctor_id`  INT          NOT NULL,
    `content`    VARCHAR(255) NOT NULL,
    FOREIGN KEY (`doctor_id`) REFERENCES `DOCTOR` (`doctor_id`)
);

CREATE TABLE `PHOTO`
(
    `photo_id`     INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `path`         VARCHAR(255) NOT NULL,
    `created_date` TIMESTAMP    NOT NULL,
    `updated_date` TIMESTAMP    NULL,
    `board_id`     INT          NULL,
    `diary_id`     INT          NULL,
    FOREIGN KEY (`board_id`) REFERENCES `BOARD` (`board_id`),
    FOREIGN KEY (`diary_id`) REFERENCES `DIARY` (`diary_id`)
);

CREATE TABLE `HASHTAG`
(
    `hashtag_id` INT         NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `board_id`   INT         NOT NULL,
    `content`    VARCHAR(30) NOT NULL,
    FOREIGN KEY (`board_id`) REFERENCES `BOARD` (`board_id`)
);

CREATE TABLE `EMOTICON`
(
    `emoticon_id` INT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `diary_id`    INT        NOT NULL,
    FOREIGN KEY (`diary_id`) REFERENCES `DIARY` (`diary_id`)
);

CREATE TABLE `EMOTION_EMOTICON`
(
    `emotion_id`  INT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `emoticon_id` INT        NOT NULL,
    `emotion`     ENUM ('Joy', 'Delight', 'Excited', 'Happy', 'Surprise', 'Calm'
                          , 'Sad', 'Anxious', 'Tired', 'Irritated', 'Angry', 'Lonely'),
    FOREIGN KEY (`emoticon_id`) REFERENCES `EMOTICON` (`emoticon_id`)
);

CREATE TABLE `FAMILY_EMOTICON`
(
    `family_id`   INT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `emoticon_id` INT        NOT NULL,
    `family`      ENUM ('Harmony', 'Quarrel', 'Reconcile', 'Uncomfortable', 'Discord'),
    FOREIGN KEY (`emoticon_id`) REFERENCES `EMOTICON` (`emoticon_id`)
);

CREATE TABLE `HEALTH_EMOTICON`
(
    `health_id`   INT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `emoticon_id` INT        NOT NULL,
    `health`      ENUM ('Healthy', 'Sick', 'Medicine', 'Diagnosis', 'Hospitalization'),
    FOREIGN KEY (`emoticon_id`) REFERENCES `EMOTICON` (`emoticon_id`)
);

CREATE TABLE `PEOPLE_EMOTICON`
(
    `people_id`   INT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `emoticon_id` INT        NOT NULL,
    `people`      ENUM ('Family', 'Friend', 'Acquaintance', 'Stranger', 'None'),
    FOREIGN KEY (`emoticon_id`) REFERENCES `EMOTICON` (`emoticon_id`)
);

CREATE TABLE `WEATHER_EMOTICON`
(
    `weather_id`   INT        NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `emoticon_id`  INT        NOT NULL,
    `weather`      ENUM ('Clear', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Wind'),
    FOREIGN KEY (`emoticon_id`) REFERENCES `EMOTICON` (`emoticon_id`)
);

CREATE TABLE `DM_GROUP`
(
    `dm_group_id`   INT          NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `dm_group_name` VARCHAR(255) NOT NULL,
    `user_id`       INT          NOT NULL,
    `created_date`  TIMESTAMP,
    `updated_date`  TIMESTAMP,
    FOREIGN KEY (`user_id`) REFERENCES User (`user_id`)
);

CREATE TABLE USER_DM_GROUP
(
    dm_group_id INT NOT NULL,
    user_id     INT NOT NULL,
    PRIMARY KEY (dm_group_id, user_id),
    FOREIGN KEY (user_id) REFERENCES User (user_id),
    FOREIGN KEY (dm_group_id) REFERENCES DM_GROUP (dm_group_id)
);

