package postrepo

import (
	"github.com/jmoiron/sqlx"
	"github.com/youtubeSharing/models"
	"log"
)

//go:generate moq -out repo_mocks.go . IRepo

type IRepo interface {
	InsertPost(post models.Post) (int64, error)
	List(page int64, pageSize int64) ([]models.PostDetail, int64, error)
}

type Repo struct {
	conn *sqlx.DB
}

func NewRepo(conn *sqlx.DB) IRepo {
	return &Repo{
		conn: conn,
	}
}

func (r *Repo) InsertPost(post models.Post) (int64, error) {
	query := `INSERT INTO posts(user_id, youtube_url, title, description) VALUE(:user_id, :youtube_url, :title, :description)`
	result, err := r.conn.NamedExec(query, post)
	if err != nil {
		log.Printf("Error inserting post: %s", err.Error())
		return 0, err
	}

	postId, err := result.LastInsertId()
	if err != nil {
		log.Printf("Error getting last insert ID: %s", err.Error())
		return 0, err
	}

	return postId, err
}

const listQuery = `
	SELECT p.id, p.user_id, u.email, p.youtube_url, p.title, p.description 
	FROM posts p JOIN users u ON p.user_id = u.id ORDER BY p.id DESC
	LIMIT ?, ?
`

const listTotalQuery = `
	SELECT count(*) FROM posts
`

func (r *Repo) List(page int64, pageSize int64) ([]models.PostDetail, int64, error) {
	offset := (page - 1) * pageSize

	var posts []models.PostDetail
	err := r.conn.Select(&posts, listQuery, offset, pageSize)
	if err != nil {
		return posts, 0, err
	}

	var total int64
	err = r.conn.Get(&total, listTotalQuery)
	return posts, total, err
}
