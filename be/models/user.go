package models

type User struct {
	Id       int64  `db:"id"`
	Email    string `db:"email"`
	Password string `db:"password"`
}
