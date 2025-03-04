package models

type Post struct {
	UserId      int    `db:"user_id"`
	YoutubeURL  string `db:"youtube_url"`
	Title       string `db:"title"`
	Description string `db:"description"`
}
