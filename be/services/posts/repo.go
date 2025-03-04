package posts

import (
	"github.com/jmoiron/sqlx"
	"github.com/youtubeSharing/connectors/mysql"
	"github.com/youtubeSharing/models"
	"log"
)

type Repo struct {
	conn *sqlx.DB
}

func NewRepo() *Repo {
	return &Repo{
		conn: mysql.GetMySQLInstance(),
	}
}

func (r *Repo) CreatePost(post models.Post) error {
	query := `
		INSERT INTO posts(user_id, youtube_url, title, description) 
		    VALUE(:user_id, :youtube_url, :title, :description)
	`
	_, err := r.conn.NamedExec(query, post)
	if err != nil {
		log.Printf("Error create post: %s", err.Error())
	}
	return err
}
