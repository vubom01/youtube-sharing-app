package auth

import (
	"github.com/stretchr/testify/assert"
	"github.com/youtubeSharing/helper/integration"
	userrepo "github.com/youtubeSharing/repo/user"
	"testing"
)

func newTestService() Service {
	tc := integration.NewTestCase()
	repo := userrepo.NewRepo(tc.DB)
	tc.Truncate("users")
	return Service{
		repo: repo,
	}
}

func Test_Login_Without_User(t *testing.T) {
	s := newTestService()
	_, err := s.Login(LoginReq{
		Email:    "test@test.com",
		Password: "test",
	})
	assert.Nil(t, err)
}

func Test_Login_With_User(t *testing.T) {
	s := newTestService()

	// Register
	_, err := s.Login(LoginReq{
		Email:    "test@test.com",
		Password: "test",
	})
	assert.Nil(t, err)

	// Login
	_, err = s.Login(LoginReq{
		Email:    "test@test.com",
		Password: "test",
	})
	assert.Nil(t, err)
}

func Test_Login_WrongPassword(t *testing.T) {
	s := newTestService()

	// Register
	_, err := s.Login(LoginReq{
		Email:    "test@test.com",
		Password: "test",
	})
	assert.Nil(t, err)

	// Login
	_, err = s.Login(LoginReq{
		Email:    "test@test.com",
		Password: "123456",
	})
	assert.Equal(t, ErrInvalidEmailOrPassword, err)
}
