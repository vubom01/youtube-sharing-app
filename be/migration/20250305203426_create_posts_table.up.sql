create table posts
(
    id          int auto_increment primary key,
    user_id     int  not null,
    youtube_url text not null,
    title       varchar(255),
    description text,
    created_at  datetime default current_timestamp
)