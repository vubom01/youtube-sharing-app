create table users
(
    id       int auto_increment primary key,
    email    varchar(255) not null,
    password text         not null
);