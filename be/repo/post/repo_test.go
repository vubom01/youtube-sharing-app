package postrepo

import (
	"github.com/stretchr/testify/assert"
	"github.com/youtubeSharing/helper/integration"
	"github.com/youtubeSharing/models"
	userrepo "github.com/youtubeSharing/repo/user"
	"testing"
)

func prepare() (IRepo, userrepo.IRepo) {
	tc := integration.NewTestCase()
	tc.Truncate("posts")
	tc.Truncate("users")
	repo := NewRepo(tc.DB)
	userRepo := userrepo.NewRepo(tc.DB)
	return repo, userRepo
}

func Test_InsertPost(t *testing.T) {
	repo, _ := prepare()

	input := models.Post{
		UserId:      1,
		YoutubeURL:  "https://www.youtube.com",
		Title:       "Test Post",
		Description: "Test Description",
	}
	err := repo.InsertPost(input)
	assert.Nil(t, err)
}

func Test_List(t *testing.T) {
	repo, userRepo := prepare()

	userInput := models.User{
		Email:    "test@example.com",
		Password: "password",
	}
	err := userRepo.InsertUser(userInput)
	assert.Nil(t, err)

	user, err := userRepo.GetUserByEmail(userInput.Email)
	assert.Nil(t, err)

	postInput := models.Post{
		UserId:      user.Id,
		YoutubeURL:  "https://www.youtube.com",
		Title:       "Test Post",
		Description: "Test Description",
	}
	err = repo.InsertPost(postInput)
	assert.Nil(t, err)

	posts, total, err := repo.List(1, 1)
	assert.Nil(t, err)
	assert.Equal(t, user.Id, posts[0].Id)
	assert.Equal(t, user.Email, posts[0].Email)
	assert.Equal(t, int64(1), total)
}
