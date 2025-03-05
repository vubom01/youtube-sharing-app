package models

import "database/sql"

type Post struct {
	Id          int64        `db:"id"`
	UserId      int64        `db:"user_id"`
	YoutubeURL  string       `db:"youtube_url"`
	Title       string       `db:"title"`
	Description string       `db:"description"`
	CreatedAt   sql.NullTime `db:"created_at"`
}

type PostDetail struct {
	Id          int64  `db:"id"`
	Email       string `db:"email"`
	UserId      int64  `db:"user_id"`
	YoutubeURL  string `db:"youtube_url"`
	Title       string `db:"title"`
	Description string `db:"description"`
}
