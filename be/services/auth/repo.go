package auth

import (
	_ "github.com/go-sql-driver/mysql"
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

func (r *Repo) InsertUser(user models.User) error {
	query := `INSERT INTO users(email, password) VALUE(:email, :password)`
	_, err := r.conn.NamedExec(query, user)
	if err != nil {
		log.Printf("Error inserting user: %s", err.Error())
	}
	return err
}
