package userrepo

import (
	"github.com/stretchr/testify/assert"
	"github.com/youtubeSharing/helper/integration"
	"github.com/youtubeSharing/models"
	"testing"
)

func prepare() IRepo {
	tc := integration.NewTestCase()
	tc.Truncate("users")
	repo := NewRepo(tc.DB)
	return repo
}

func Test_InsertUser(t *testing.T) {
	repo := prepare()

	input := models.User{
		Email:    "user@example.com",
		Password: "password",
	}
	err := repo.InsertUser(input)
	assert.Nil(t, err)
}

func Test_GetUserByEmail(t *testing.T) {
	repo := prepare()

	input := models.User{
		Email:    "user@example.com",
		Password: "password",
	}
	err := repo.InsertUser(input)
	assert.Nil(t, err)

	user, err := repo.GetUserByEmail("user@example.com")
	assert.Nil(t, err)
	assert.Equal(t, "user@example.com", user.Email)
}
