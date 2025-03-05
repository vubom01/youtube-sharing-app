package postrepo

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

func (r *Repo) InsertPost(post models.Post) error {
	query := `INSERT INTO posts(user_id, youtube_url, title, description) VALUE(:user_id, :youtube_url, :title, :description)`
	_, err := r.conn.NamedExec(query, post)
	if err != nil {
		log.Printf("Error inserting post: %s", err.Error())
	}
	return err
}
