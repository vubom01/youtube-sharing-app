package userrepo

import (
	_ "github.com/go-sql-driver/mysql"
	"github.com/jmoiron/sqlx"
	"github.com/youtubeSharing/models"
	"log"
)

//go:generate moq -out repo_mocks.go . IRepo

type IRepo interface {
	InsertUser(user models.User) error
	GetUserByEmail(email string) (models.User, error)
}

type Repo struct {
	conn *sqlx.DB
}

func NewRepo(conn *sqlx.DB) IRepo {
	return &Repo{
		conn: conn,
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

func (r *Repo) GetUserByEmail(email string) (models.User, error) {
	query := `SELECT * FROM users WHERE email = ?`
	var user models.User
	err := r.conn.Get(&user, query, email)
	if err != nil {
		log.Printf("Error get user by email: %s", err.Error())
	}
	return user, err
}
