DROP TABLE IF EXISTS `DIARY`;

CREATE TABLE `DIARY` (
	`diary_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL,
	`content`	varchar(255)	NOT NULL,
	`category`	enum('Mom', 'Baby') DEFAULT 'Mom',
	`emoji`	int	NOT NULL	DEFAULT 0,
	`created_date`	timestamp	NOT NULL,
	`updated_date`	timestamp	NULL
);

DROP TABLE IF EXISTS `USER`;

CREATE TABLE `USER` (
	`user_id`	INT	NOT NULL,
	`password`	varchar(20)	NULL,
	`nickname`	varchar(20)	NULL,
	`intro`	varchar(255)	NULL,
	`email`	varchar(50)	NULL,
	`gender`	enum('Male','Female') DEFAULT 'Female',
	`role`	enum('Common','Doctor','Admin') DEFAULT 'Common',
	`created_date`	timestamp	NOT NULL,
	`updated_date`	timestamp	NULL,
    `profile_photo` varchar(255) NULL,
    `background_photo` varchar(255) NULL
);

DROP TABLE IF EXISTS `USER_INFO`;

CREATE TABLE `USER_INFO` (
	`SSN`	char(13)	NOT NULL, # 암호화 시켜서 저장할 예정 -> 타입 달라짐
	`user_id`	INT	NOT NULL,
	`name`	varchar(15)	NULL,
	`phone`	char(11)	NULL,
	`status`	enum('Pregnant', 'Mother', 'None') default 'None',
	`extra`	varchar(255)	NULL,
	`diary_open`	boolean	NULL default false,
	`agree_date`	timestamp	NULL
);

DROP TABLE IF EXISTS `DOCTOR`;

CREATE TABLE `DOCTOR` (
	`doctor_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL,
	`department`	varchar(30)	NULL,
	`location`	varchar(100)	NULL,
	`vaild_time`	varchar(200)	NULL
);

DROP TABLE IF EXISTS `COMMENT`;

CREATE TABLE `COMMENT` (
	`comment_id`	INT	NOT NULL,
	`board_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL,
	`content`	varchar(255)	NOT NULL,
	`created_date`	timestamp	NOT NULL,
	`updated_date`	timestamp	NULL
);

DROP TABLE IF EXISTS `COMMENT_LIKE`;

CREATE TABLE `COMMENT_LIKE` (
	`comment_like_id`	INT	NOT NULL,
	`comment_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL
);

DROP TABLE IF EXISTS `BOARD`;

CREATE TABLE `BOARD` (
	`board_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL,
	`content`	varchar(255)	NOT NULL,
	`access`	enum('All','Follower','Nobody') DEFAULT 'All',
	`created_date`	timestamp	NOT NULL,
	`updated_date`	timestamp	NULL
);

DROP TABLE IF EXISTS `BOARD_LIKE`;

CREATE TABLE `BOARD_LIKE` (
	`board_like_id`	INT	NOT NULL,
	`board_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL
);

DROP TABLE IF EXISTS `DIRECT_MESSAGE`;

CREATE TABLE `DIRECT_MESSAGE` (
	`dm_id`	INT	NOT NULL,
	`sender_id`	INT	NOT NULL,
	`receiver_id`	INT	NOT NULL,
	`content`	varchar(255)	NOT NULL,
	`created_date`	timestamp	NOT NULL
);

DROP TABLE IF EXISTS `CONSULT`;

CREATE TABLE `CONSULT` (
	`counseling_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL,
	`resesrve_id`	INT	NOT NULL,
	`prescription_path`	varchar(255)	NULL
);

DROP TABLE IF EXISTS `FOLLOW`;

CREATE TABLE `FOLLOW` (
	`follow_id`	INT	NOT NULL,
	`following_id`	INT	NOT NULL,
	`follower_id`	INT	NOT NULL
);

DROP TABLE IF EXISTS `HISTORY`;

CREATE TABLE `HISTORY` (
	`history_id`	INT	NOT NULL,
	`doctor_id`	INT	NOT NULL,
	`content`	varchar(255)	NOT NULL
);

DROP TABLE IF EXISTS `RESERVE`;

CREATE TABLE `RESERVE` (
	`resesrve_id`	INT	NOT NULL,
	`doctor_id`	INT	NOT NULL,
	`user_id`	INT	NOT NULL,
	`reserve_date`	timestamp	NULL
);

DROP TABLE IF EXISTS `PHOTO`;

CREATE TABLE `PHOTO` (
	`file_id`	INT	NOT NULL,
	`path`	varchar(255)	NOT NULL,
	`size`	varchar(255)	NULL,
	`created_date`	timestamp	NOT NULL,
	`updated_date`	timestamp	NULL,
	`board_id`	INT	NOT NULL,
	`diary_id`	INT	NOT NULL
);

DROP TABLE IF EXISTS `HASHTAG`;

CREATE TABLE `HASHTAG` (
	`hashtag_id`	INT	NOT NULL,
	`board_id`	INT	NOT NULL,
	`content`	varchar(30)	NOT NULL
);


ALTER TABLE `DIARY` ADD CONSTRAINT `PK_DIARY` PRIMARY KEY (
	`diary_id`,
	`user_id`
);

ALTER TABLE `USER` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`user_id`
);

ALTER TABLE `USER_INFO` ADD CONSTRAINT `PK_USER_INFO` PRIMARY KEY (
	`SSN`,
	`user_id`
);

ALTER TABLE `DOCTOR` ADD CONSTRAINT `PK_DOCTOR` PRIMARY KEY (
	`doctor_id`,
	`user_id`
);

ALTER TABLE `COMMENT` ADD CONSTRAINT `PK_COMMENT` PRIMARY KEY (
	`comment_id`,
	`board_id`,
	`user_id`
);

ALTER TABLE `COMMENT_LIKE` ADD CONSTRAINT `PK_COMMENT_LIKE` PRIMARY KEY (
	`comment_like_id`,
	`comment_id`,
	`user_id`
);

ALTER TABLE `BOARD` ADD CONSTRAINT `PK_BOARD` PRIMARY KEY (
	`board_id`,
	`user_id`
);

ALTER TABLE `BOARD_LIKE` ADD CONSTRAINT `PK_BOARD_LIKE` PRIMARY KEY (
	`board_like_id`,
	`board_id`,
	`user_id`
);

ALTER TABLE `DIRECT_MESSAGE` ADD CONSTRAINT `PK_DIRECT_MESSAGE` PRIMARY KEY (
	`dm_id`
);

ALTER TABLE `CONSULT` ADD CONSTRAINT `PK_CONSULT` PRIMARY KEY (
	`counseling_id`,
	`user_id`,
	`resesrve_id`
);

ALTER TABLE `FOLLOW` ADD CONSTRAINT `PK_FOLLOW` PRIMARY KEY (
	`follow_id`
);

ALTER TABLE `HISTORY` ADD CONSTRAINT `PK_HISTORY` PRIMARY KEY (
	`history_id`,
	`doctor_id`
);

ALTER TABLE `RESERVE` ADD CONSTRAINT `PK_RESERVE` PRIMARY KEY (
	`resesrve_id`
);

ALTER TABLE `PHOTO` ADD CONSTRAINT `PK_PHOTO` PRIMARY KEY (
	`file_id`
);

ALTER TABLE `HASHTAG` ADD CONSTRAINT `PK_HASHTAG` PRIMARY KEY (
	`hashtag_id`
);

ALTER TABLE `DIARY` ADD CONSTRAINT `FK_USER_TO_DIARY_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `USER_INFO` ADD CONSTRAINT `FK_USER_TO_USER_INFO_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `DOCTOR` ADD CONSTRAINT `FK_USER_TO_DOCTOR_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `COMMENT` ADD CONSTRAINT `FK_BOARD_TO_COMMENT_1` FOREIGN KEY (
	`board_id`
)
REFERENCES `BOARD` (
	`board_id`
);

ALTER TABLE `COMMENT` ADD CONSTRAINT `FK_USER_TO_COMMENT_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `COMMENT_LIKE` ADD CONSTRAINT `FK_COMMENT_TO_COMMENT_LIKE_1` FOREIGN KEY (
	`comment_id`
)
REFERENCES `COMMENT` (
	`comment_id`
);

ALTER TABLE `COMMENT_LIKE` ADD CONSTRAINT `FK_USER_TO_COMMENT_LIKE_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `BOARD` ADD CONSTRAINT `FK_USER_TO_BOARD_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `BOARD_LIKE` ADD CONSTRAINT `FK_BOARD_TO_BOARD_LIKE_1` FOREIGN KEY (
	`board_id`
)
REFERENCES `BOARD` (
	`board_id`
);

ALTER TABLE `BOARD_LIKE` ADD CONSTRAINT `FK_USER_TO_BOARD_LIKE_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `DIRECT_MESSAGE` ADD CONSTRAINT `FK_USER_TO_DIRECT_MESSAGE_1` FOREIGN KEY (
	`sender_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `DIRECT_MESSAGE` ADD CONSTRAINT `FK_USER_TO_DIRECT_MESSAGE_2` FOREIGN KEY (
	`receiver_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `CONSULT` ADD CONSTRAINT `FK_USER_TO_CONSULT_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `CONSULT` ADD CONSTRAINT `FK_RESERVE_TO_CONSULT_1` FOREIGN KEY (
	`resesrve_id`
)
REFERENCES `RESERVE` (
	`resesrve_id`
);

ALTER TABLE `FOLLOW` ADD CONSTRAINT `FK_USER_TO_FOLLOW_1` FOREIGN KEY (
	`following_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `FOLLOW` ADD CONSTRAINT `FK_USER_TO_FOLLOW_2` FOREIGN KEY (
	`follower_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `HISTORY` ADD CONSTRAINT `FK_DOCTOR_TO_HISTORY_1` FOREIGN KEY (
	`doctor_id`
)
REFERENCES `DOCTOR` (
	`doctor_id`
);

ALTER TABLE `RESERVE` ADD CONSTRAINT `FK_DOCTOR_TO_RESERVE_1` FOREIGN KEY (
	`doctor_id`
)
REFERENCES `DOCTOR` (
	`doctor_id`
);

ALTER TABLE `RESERVE` ADD CONSTRAINT `FK_USER_TO_RESERVE_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `USER` (
	`user_id`
);

ALTER TABLE `PHOTO` ADD CONSTRAINT `FK_BOARD_TO_PHOTO_1` FOREIGN KEY (
	`board_id`
)
REFERENCES `BOARD` (
	`board_id`
);

ALTER TABLE `PHOTO` ADD CONSTRAINT `FK_DIARY_TO_PHOTO_1` FOREIGN KEY (
	`diary_id`
)
REFERENCES `DIARY` (
	`diary_id`
);

ALTER TABLE `HASHTAG` ADD CONSTRAINT `FK_BOARD_TO_HASHTAG_1` FOREIGN KEY (
	`board_id`
)
REFERENCES `BOARD` (
	`board_id`
);
