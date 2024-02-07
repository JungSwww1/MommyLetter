-- Insert data into USER table
INSERT INTO `USER` (`user_id`, `password`, `nickname`, `email`, `gender`, `role`, `created_date`, `updated_date`)
VALUES
    (101, 'password1', 'User1', 'user1@example.com', 'Male', 'Common', '2024-01-17 12:00:00', '2024-01-17 12:30:00'),
    (102, 'password2', 'User2', 'user2@example.com', 'Female', 'Doctor', '2024-01-17 13:00:00', '2024-01-17 13:30:00'),
    (103, 'password3', 'User3', 'user3@example.com', 'Male', 'Admin', '2024-01-17 14:00:00', '2024-01-17 14:30:00'),
    (104, 'password4', 'User4', 'user4@example.com', 'Female', 'Common', '2024-01-17 15:00:00', '2024-01-17 15:30:00'),
    (105, 'password5', 'User5', 'user5@example.com', 'Male', 'Doctor', '2024-01-17 16:00:00', '2024-01-17 16:30:00'),
    (106, 'password6', 'User6', 'user6@example.com', 'Female', 'Admin', '2024-01-17 17:00:00', '2024-01-17 17:30:00'),
    (107, 'password7', 'User7', 'user7@example.com', 'Male', 'Common', '2024-01-17 18:00:00', '2024-01-17 18:30:00'),
    (108, 'password8', 'User8', 'user8@example.com', 'Female', 'Doctor', '2024-01-17 19:00:00', '2024-01-17 19:30:00'),
    (109, 'password9', 'User9', 'user9@example.com', 'Male', 'Admin', '2024-01-17 20:00:00', '2024-01-17 20:30:00'),
    (110, 'password10', 'User10', 'user10@example.com', 'Female', 'Common', '2024-01-17 21:00:00', '2024-01-17 21:30:00'),
    (111, 'password11', 'User11', 'user11@example.com', 'Male', 'Doctor', '2024-01-17 22:00:00', '2024-01-17 22:30:00'),
    (112, 'password12', 'User12', 'user12@example.com', 'Female', 'Admin', '2024-01-17 23:00:00', '2024-01-17 23:30:00'),
    (113, 'password13', 'User13', 'user13@example.com', 'Male', 'Common', '2024-01-18 00:00:00', '2024-01-18 00:30:00'),
    (114, 'password14', 'User14', 'user14@example.com', 'Female', 'Doctor', '2024-01-18 01:00:00', '2024-01-18 01:30:00'),
    (115, 'password15', 'User15', 'user15@example.com', 'Male', 'Admin', '2024-01-18 02:00:00', '2024-01-18 02:30:00');
-- Insert data into USER_INFO table
INSERT INTO `USER_INFO` (`SSN`, `user_id`, `name`, `phone`, `pregnancy_status`, `extra`, `diary_open`, `agree_date`)
VALUES
    ('1234567890123', 101, 'User1 Name', '12345678901', 'Pregnant', 'Extra Info 1', TRUE, '2024-01-17 12:00:00'),
    ('9876543210987', 102, 'User2 Name', '98765432109', 'Mother', 'Extra Info 2', FALSE, '2024-01-17 13:00:00'),
    ('1231231231231', 103, 'User3 Name', '12312312312', 'None', 'Extra Info 3', TRUE, '2024-01-17 14:00:00'),
    ('4564564564564', 104, 'User4 Name', '45645645645', 'Pregnant', 'Extra Info 4', FALSE, '2024-01-17 15:00:00'),
    ('7897897897897', 105, 'User5 Name', '78978978978', 'Mother', 'Extra Info 5', TRUE, '2024-01-17 16:00:00'),
    ('1010101010101', 106, 'User6 Name', '10101010101', 'None', 'Extra Info 6', FALSE, '2024-01-17 17:00:00'),
    ('1111111111111', 107, 'User7 Name', '11111111111', 'Pregnant', 'Extra Info 7', TRUE, '2024-01-17 18:00:00'),
    ('1212121212121', 108, 'User8 Name', '12121212121', 'Mother', 'Extra Info 8', FALSE, '2024-01-17 19:00:00'),
    ('1313131313131', 109, 'User9 Name', '13131313131', 'None', 'Extra Info 9', TRUE, '2024-01-17 20:00:00'),
    ('1414141414141', 110, 'User10 Name', '14141414141', 'Pregnant', 'Extra Info 10', FALSE, '2024-01-17 21:00:00'),
    ('1515151515151', 111, 'User11 Name', '15151515151', 'Mother', 'Extra Info 11', TRUE, '2024-01-17 22:00:00'),
    ('1616161616161', 112, 'User12 Name', '16161616161', 'None', 'Extra Info 12', FALSE, '2024-01-17 23:00:00'),
    ('1717171717171', 113, 'User13 Name', '17171717171', 'Pregnant', 'Extra Info 13', TRUE, '2024-01-18 00:00:00'),
    ('1818181818181', 114, 'User14 Name', '18181818181', 'Mother', 'Extra Info 14', FALSE, '2024-01-18 01:00:00'),
    ('1919191919191', 115, 'User15 Name', '19191919191', 'None', 'Extra Info 15', TRUE, '2024-01-18 02:00:00');
-- Insert data into DIARY table
INSERT INTO `DIARY` (`diary_id`, `user_id`, `content`, `category`, `emoji`, `created_date`)
VALUES
    (1, 101, 'Diary Content 1', 'Mom', 1, '2024-01-17 12:00:00'),
    (2, 102, 'Diary Content 2', 'Baby', 2, '2024-01-17 13:00:00'),
    (3, 103, 'Diary Content 3', 'Mom', 3, '2024-01-17 14:00:00'),
    (4, 104, 'Diary Content 4', 'Baby', 4, '2024-01-17 15:00:00'),
    (5, 105, 'Diary Content 5', 'Mom', 5, '2024-01-17 16:00:00'),
    (6, 106, 'Diary Content 6', 'Baby', 0, '2024-01-17 17:00:00'),
    (7, 107, 'Diary Content 7', 'Mom', 1, '2024-01-17 18:00:00'),
    (8, 108, 'Diary Content 8', 'Baby', 2, '2024-01-17 19:00:00'),
    (9, 109, 'Diary Content 9', 'Mom', 3, '2024-01-17 20:00:00'),
    (10, 110, 'Diary Content 10', 'Baby', 4, '2024-01-17 21:00:00'),
    (11, 111, 'Diary Content 11', 'Mom', 5, '2024-01-17 22:00:00'),
    (12, 112, 'Diary Content 12', 'Baby', 0, '2024-01-17 23:00:00'),
    (13, 113, 'Diary Content 13', 'Mom', 1, '2024-01-18 00:00:00'),
    (14, 114, 'Diary Content 14', 'Baby', 2, '2024-01-18 01:00:00'),
    (15, 115, 'Diary Content 15', 'Mom', 3, '2024-01-18 02:00:00');
-- Insert data into DOCTOR table
INSERT INTO `DOCTOR` (`doctor_id`, `user_id`, `name`, `department`, `location`, `valid_time`)
VALUES
    (1, 102, 'doctor1', 'Cardiology', 'Hospital A', 'Monday 9:00 AM - 5:00 PM'),
    (2, 105, 'doctor2', 'Pediatrics', 'Hospital B', 'Tuesday 10:00 AM - 6:00 PM');
-- Add 13 more rows...
-- Insert data into Profile table with NULL profile_photo and background_photo
INSERT INTO `PROFILE` (`profile_id`, `user_id`, `profile_photo`, `background_photo`)
VALUES
    (1, 101, NULL, NULL),
    (2, 102, NULL, NULL),
    (3, 103, NULL, NULL),
    (4, 104, NULL, NULL),
    (5, 105, NULL, NULL),
    (6, 106, NULL, NULL),
    (7, 107, NULL, NULL),
    (8, 108, NULL, NULL),
    (9, 109, NULL, NULL),
    (10, 110, NULL, NULL),
    (11, 111, NULL, NULL),
    (12, 112, NULL, NULL),
    (13, 113, NULL, NULL),
    (14, 114, NULL, NULL),
    (15, 115, NULL, NULL);
-- Insert data into BOARD table
INSERT INTO `BOARD` (`board_id`, `user_id`, `content`, `access`, `created_date`, `updated_date`, `category`)
VALUES
    (1, 101, 'Board Content 1', 'All', '2024-01-17 12:00:00', '2024-01-17 12:30:00', 'One'),
    (2, 101, 'Board Content 2', 'Follower', '2024-01-17 13:00:00', '2024-01-17 13:30:00', 'Two'),
    (3, 102, 'Board Content 3', 'All', '2024-01-17 14:00:00', '2024-01-17 14:30:00', 'Three'),
    (4, 102, 'Board Content 4', 'Nobody', '2024-01-17 15:00:00', '2024-01-17 15:30:00', 'One'),
    (5, 103, 'Board Content 5', 'Follower', '2024-01-17 16:00:00', '2024-01-17 16:30:00', 'Two'),
    (6, 103, 'Board Content 6', 'All', '2024-01-17 17:00:00', '2024-01-17 17:30:00', 'Three'),
    (7, 101, 'Board Content 7', 'Nobody', '2024-01-17 18:00:00', '2024-01-17 18:30:00', 'One'),
    (8, 102, 'Board Content 8', 'All', '2024-01-17 19:00:00', '2024-01-17 19:30:00', 'Two'),
    (9, 103, 'Board Content 9', 'Follower', '2024-01-17 20:00:00', '2024-01-17 20:30:00', 'Three'),
    (10, 101, 'Board Content 10', 'Nobody', '2024-01-17 21:00:00', '2024-01-17 21:30:00', 'One'),
    (11, 102, 'Board Content 11', 'All', '2024-01-17 22:00:00', '2024-01-17 22:30:00', 'Two'),
    (12, 103, 'Board Content 12', 'Follower', '2024-01-17 23:00:00', '2024-01-17 23:30:00', 'Three'),
    (13, 101, 'Board Content 13', 'All', '2024-01-18 00:00:00', '2024-01-18 00:30:00', 'One'),
    (14, 102, 'Board Content 14', 'Nobody', '2024-01-18 01:00:00', '2024-01-18 01:30:00', 'Two'),
    (15, 103, 'Board Content 15', 'Follower', '2024-01-18 02:00:00', '2024-01-18 02:30:00', 'Three'),
    (16, 101, 'Board Content 16', 'All', '2024-01-18 03:00:00', '2024-01-18 03:30:00', 'One'),
    (17, 101, 'Board Content 17', 'Follower', '2024-01-18 04:00:00', '2024-01-18 04:30:00', 'Two'),
    (18, 102, 'Board Content 18', 'All', '2024-01-18 05:00:00', '2024-01-18 05:30:00', 'Three');
-- Insert data into COMMENT table
INSERT INTO `COMMENT` (`comment_id`, `board_id`, `user_id`, `content`, `created_date`, `updated_date`)
VALUES
    (1, 1, 101, 'Comment 1', '2024-01-17 12:00:00', '2024-01-17 12:30:00'),
    (2, 2, 102, 'Comment 2', '2024-01-17 13:00:00', '2024-01-17 13:30:00'),
    (3, 2, 102, 'Comment 3', '2024-01-17 13:00:00', '2024-01-17 13:30:00');
-- Add 13 more rows...
-- Insert data into COMMENT_LIKE table
INSERT INTO `COMMENT_LIKE` (`comment_like_id`, `comment_id`, `user_id`)
VALUES
    (1, 1, 101),
    (2, 2, 104);
-- Add 13 more rows...
# -- Insert data into BOARD_LIKE table
# INSERT INTO `BOARD_LIKE` (`board_like_id`, `board_id`, `user_id`)
# VALUES
#     (1, 1, 101),
#     (2, 2, 102);
# -- Add 13 more rows...
#
# -- Insert data into DIRECT_MESSAGE table
# INSERT INTO `DIRECT_MESSAGE` (`dm_id`, `sender_id`, `receiver_id`, `content`, `created_date`)
# VALUES
#     (1, 101, 201, 'Message 1', '2024-01-17 12:00:00'),
#     (2, 102, 202, 'Message 2', '2024-01-17 13:00:00');
# -- Add 13 more rows...
#
# -- Insert data into CONSULT table
# INSERT INTO `CONSULT` (`counseling_id`, `user_id`, `reserve_id`, `prescription_path`)
# VALUES
#     (1, 101, 501, 'path/to/prescription1.pdf'),
#     (2, 102, 502, 'path/to/prescription2.pdf');
# -- Add 13 more rows...
#
# -- Insert data into FOLLOW table
INSERT INTO `FOLLOW` (`follow_id`, `following_id`, `follower_id`)
VALUES
    (1, 101, 102),
    (2, 102, 103);
# -- Add 13 more rows...
#
# -- Insert data into HISTORY table
# INSERT INTO `HISTORY` (`history_id`, `doctor_id`, `content`)
# VALUES
#     (1, 601, 'History Content 1'),
#     (2, 602, 'History Content 2');
# -- Add 13 more rows...
#
# -- Insert data into RESERVE table
# INSERT INTO `RESERVE` (`reserve_id`, `doctor_id`, `user_id`, `reserve_date`)
# VALUES
#     (501, 201, 101, '2024-01-18 10:00:00'),
#     (502, 202, 102, '2024-01-19 11:00:00');
# -- Add 13 more rows...
#
# -- Insert data into PHOTO table
# INSERT INTO `PHOTO` (`photo_id`, `path`, `created_date`, `updated_date`, `board_id`, `diary_id`)
# VALUES
#     (1, 'path/to/photo1.jpg', '2024-01-17 12:00:00', '2024-01-17 12:30:00', 1, 1),
#     (2, 'path/to/photo2.jpg', '2024-01-17 13:00:00', '2024-01-17 13:30:00', 2, 2);
# -- Add 13 more rows...
#
# -- Insert data into HASHTAG table
# INSERT INTO `HASHTAG` (`hashtag_id`, `board_id`, `content`)
# VALUES
#     (1, 401, 'Tag1'),
#     (2, 402, 'Tag2');
# -- Add 13 more rows...