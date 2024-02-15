drop table if exists board_like cascade;

drop table if exists comment_like cascade;

drop table if exists comment cascade;

drop table if exists consult cascade;

drop table if exists direct_message cascade;

drop table if exists emotion_emoticon cascade;

drop table if exists family_emoticon cascade;

drop table if exists follow cascade;

drop table if exists hashtag cascade;

drop table if exists health_emoticon cascade;

drop table if exists history cascade;

drop table if exists people_emoticon cascade;

drop table if exists photo cascade;

drop table if exists board cascade;

drop table if exists profile cascade;

drop table if exists reserve cascade;

drop table if exists doctor cascade;

drop table if exists user_dm_group cascade;

drop table if exists dm_group cascade;

drop table if exists user_info cascade;

drop table if exists weather_emoticon cascade;

drop table if exists emoticon cascade;

drop table if exists diary cascade;

drop table if exists user cascade;


create table if not exists user
(
    user_id      int auto_increment
        primary key,
    password     varchar(200)                                                   null,
    nickname     varchar(200) charset utf8                                      null,
    intro        varchar(255)                                                   null,
    email        varchar(50)                                                    null,
    gender       enum ('Male', 'Female')            default 'Female'            null,
    role         enum ('Common', 'Doctor', 'Admin') default 'Common'            null,
    created_date timestamp                          default current_timestamp() not null on update current_timestamp(),
    updated_date timestamp                                                      null
);

create table if not exists board
(
    board_id     int auto_increment
        primary key,
    user_id      int                                                            not null,
    content      varchar(255)                                                   not null,
    access       enum ('All', 'Follower', 'Nobody') default 'All'               null,
    category     enum ('One', 'Two', 'Three')       default 'One'               null,
    created_date timestamp                          default current_timestamp() not null on update current_timestamp(),
    updated_date timestamp                                                      null,
    constraint board_ibfk_1
        foreign key (user_id) references user (user_id)
);

create index if not exists user_id
    on board (user_id);

create table if not exists board_like
(
    board_like_id bigint auto_increment
        primary key,
    board_id      int not null,
    user_id       int not null,
    constraint board_like_ibfk_1
        foreign key (board_id) references board (board_id),
    constraint board_like_ibfk_2
        foreign key (user_id) references user (user_id)
);

create index if not exists board_id
    on board_like (board_id);

create index if not exists user_id
    on board_like (user_id);

create table if not exists comment
(
    comment_id   int auto_increment
        primary key,
    board_id     int                                   not null,
    user_id      int                                   not null,
    content      varchar(255)                          not null,
    created_date timestamp default current_timestamp() not null on update current_timestamp(),
    updated_date timestamp                             null,
    constraint comment_ibfk_1
        foreign key (board_id) references board (board_id),
    constraint comment_ibfk_2
        foreign key (user_id) references user (user_id)
);

create index if not exists board_id
    on comment (board_id);

create index if not exists user_id
    on comment (user_id);

create table if not exists comment_like
(
    comment_like_id bigint auto_increment
        primary key,
    comment_id      int not null,
    user_id         int not null,
    constraint comment_like_ibfk_1
        foreign key (comment_id) references comment (comment_id),
    constraint comment_like_ibfk_2
        foreign key (user_id) references user (user_id)
);

create index if not exists comment_id
    on comment_like (comment_id);

create index if not exists user_id
    on comment_like (user_id);

create table if not exists diary
(
    diary_id     int auto_increment
        primary key,
    user_id      int                                              not null,
    content      varchar(255)                                     not null,
    category     enum ('Mom', 'Baby') default 'Mom'               null,
    emoji        int                  default 0                   not null,
    created_date timestamp            default current_timestamp() not null on update current_timestamp(),
    constraint diary_ibfk_1
        foreign key (user_id) references user (user_id)
);

create index if not exists user_id
    on diary (user_id);

create table if not exists direct_message
(
    dm_id        int auto_increment
        primary key,
    room_id      varchar(255)                          not null,
    sender_id    int                                   not null,
    receiver_id  int                                   null,
    content      varchar(255)                          not null,
    created_date timestamp default current_timestamp() not null on update current_timestamp(),
    constraint direct_message_ibfk_1
        foreign key (sender_id) references user (user_id),
    constraint direct_message_ibfk_2
        foreign key (receiver_id) references user (user_id)
);

create index if not exists receiver_id
    on direct_message (receiver_id);

create index if not exists sender_id
    on direct_message (sender_id);

create table if not exists dm_group
(
    dm_group_id   int auto_increment
        primary key,
    dm_group_name varchar(255)                            not null,
    user_id       int                                     not null,
    created_date  timestamp default current_timestamp()   not null on update current_timestamp(),
    updated_date  timestamp default '0000-00-00 00:00:00' not null,
    constraint dm_group_ibfk_1
        foreign key (user_id) references user (user_id)
);

create index if not exists user_id
    on dm_group (user_id);

create table if not exists doctor
(
    doctor_id  int auto_increment
        primary key,
    user_id    int          not null,
    name       varchar(10)  not null,
    department varchar(30)  null,
    location   varchar(100) null,
    valid_time varchar(200) null,
    constraint doctor_ibfk_1
        foreign key (user_id) references user (user_id)
);

create index if not exists user_id
    on doctor (user_id);

create table if not exists emoticon
(
    emoticon_id int auto_increment
        primary key,
    diary_id    int not null,
    constraint emoticon_ibfk_1
        foreign key (diary_id) references diary (diary_id)
);

create index if not exists diary_id
    on emoticon (diary_id);

create table if not exists emotion_emoticon
(
    emotion_id  bigint auto_increment
        primary key,
    emoticon_id int                                                                                                                        not null,
    emotion     enum ('Joy', 'Delight', 'Excited', 'Happy', 'Surprise', 'Calm', 'Sad', 'Anxious', 'Tired', 'Irritated', 'Angry', 'Lonely') null,
    constraint emotion_emoticon_ibfk_1
        foreign key (emoticon_id) references emoticon (emoticon_id)
);

create index if not exists emoticon_id
    on emotion_emoticon (emoticon_id);

create table if not exists family_emoticon
(
    family_id   bigint auto_increment
        primary key,
    emoticon_id int                                                                  not null,
    family      enum ('Harmony', 'Quarrel', 'Reconcile', 'Uncomfortable', 'Discord') null,
    constraint family_emoticon_ibfk_1
        foreign key (emoticon_id) references emoticon (emoticon_id)
);

create index if not exists emoticon_id
    on family_emoticon (emoticon_id);

create table if not exists follow
(
    follow_id    bigint auto_increment
        primary key,
    following_id int not null,
    follower_id  int not null,
    constraint follow_ibfk_1
        foreign key (following_id) references user (user_id),
    constraint follow_ibfk_2
        foreign key (follower_id) references user (user_id)
);

create index if not exists follower_id
    on follow (follower_id);

create index if not exists following_id
    on follow (following_id);

create table if not exists hashtag
(
    hashtag_id bigint auto_increment
        primary key,
    board_id   int         not null,
    content    varchar(30) not null,
    constraint hashtag_ibfk_1
        foreign key (board_id) references board (board_id)
);

create index if not exists board_id
    on hashtag (board_id);

create table if not exists health_emoticon
(
    health_id   bigint auto_increment
        primary key,
    emoticon_id int                                                                  not null,
    health      enum ('Healthy', 'Sick', 'Medicine', 'Diagnosis', 'Hospitalization') null,
    constraint health_emoticon_ibfk_1
        foreign key (emoticon_id) references emoticon (emoticon_id)
);

create index if not exists emoticon_id
    on health_emoticon (emoticon_id);

create table if not exists history
(
    history_id bigint auto_increment
        primary key,
    doctor_id  int          not null,
    content    varchar(255) not null,
    constraint history_ibfk_1
        foreign key (doctor_id) references doctor (doctor_id)
);

create index if not exists doctor_id
    on history (doctor_id);

create table if not exists people_emoticon
(
    people_id   bigint auto_increment
        primary key,
    emoticon_id int                                                           not null,
    people      enum ('Family', 'Friend', 'Acquaintance', 'Stranger', 'None') null,
    constraint people_emoticon_ibfk_1
        foreign key (emoticon_id) references emoticon (emoticon_id)
);

create index if not exists emoticon_id
    on people_emoticon (emoticon_id);

create table if not exists photo
(
    photo_id     bigint auto_increment
        primary key,
    path         varchar(255)                          not null,
    created_date timestamp default current_timestamp() not null on update current_timestamp(),
    updated_date timestamp                             null,
    board_id     int                                   null,
    diary_id     int                                   null,
    constraint photo_ibfk_1
        foreign key (board_id) references board (board_id),
    constraint photo_ibfk_2
        foreign key (diary_id) references diary (diary_id)
);

create index if not exists board_id
    on photo (board_id);

create index if not exists diary_id
    on photo (diary_id);

create table if not exists profile
(
    profile_id       int auto_increment
        primary key,
    user_id          int          not null,
    profile_photo    varchar(255) null,
    background_photo varchar(255) null,
    constraint profile_ibfk_1
        foreign key (user_id) references user (user_id)
);

create index if not exists user_id
    on profile (user_id);

create table if not exists reserve
(
    reserve_id   int auto_increment
        primary key,
    doctor_id    int       not null,
    user_id      int       not null,
    reserve_date timestamp null,
    constraint reserve_ibfk_1
        foreign key (doctor_id) references doctor (doctor_id),
    constraint reserve_ibfk_2
        foreign key (user_id) references user (user_id)
);

create table if not exists consult
(
    counseling_id     bigint auto_increment
        primary key,
    user_id           int          not null,
    reserve_id        int          not null,
    prescription_path varchar(255) null,
    constraint consult_ibfk_1
        foreign key (user_id) references user (user_id),
    constraint consult_ibfk_2
        foreign key (reserve_id) references reserve (reserve_id)
);

create index if not exists reserve_id
    on consult (reserve_id);

create index if not exists user_id
    on consult (user_id);

create index if not exists doctor_id
    on reserve (doctor_id);

create index if not exists user_id
    on reserve (user_id);

create table if not exists user_dm_group
(
    dm_group_id int not null,
    user_id     int not null,
    primary key (dm_group_id, user_id),
    constraint user_dm_group_ibfk_1
        foreign key (user_id) references user (user_id),
    constraint user_dm_group_ibfk_2
        foreign key (dm_group_id) references dm_group (dm_group_id)
);

create index if not exists user_id
    on user_dm_group (user_id);

create table if not exists user_info
(
    user_info_id     bigint auto_increment
        primary key,
    user_id          int                                                             not null,
    ssn              varchar(255)                                                    null,
    name             varchar(15)                                                     null,
    phone            varchar(255)                                                    null,
    pregnancy_status enum ('Pregnant', 'Mother', 'None') default 'None'              null,
    extra            varchar(255)                                                    null,
    diary_open       tinyint(1)                          default 0                   null,
    agree_date       timestamp                           default current_timestamp() not null on update current_timestamp(),
    constraint user_info_ibfk_1
        foreign key (user_id) references user (user_id)
);

create index if not exists user_id
    on user_info (user_id);

create table if not exists weather_emoticon
(
    weather_id  bigint auto_increment
        primary key,
    emoticon_id int                                                     not null,
    weather     enum ('Clear', 'Cloudy', 'Rain', 'Snow', 'Fog', 'Wind') null,
    constraint weather_emoticon_ibfk_1
        foreign key (emoticon_id) references emoticon (emoticon_id)
);

create index if not exists emoticon_id
    on weather_emoticon (emoticon_id);

