package auth

import (
	"database/sql"
	"errors"
	"github.com/youtubeSharing/helper/jwt"
	"github.com/youtubeSharing/models"
	userrepo "github.com/youtubeSharing/repo/user"
	"github.com/youtubeSharing/services/common"
	"golang.org/x/crypto/bcrypt"
)

type Service struct {
	repo *userrepo.Repo
}

func NewService() *Service {
	return &Service{
		repo: userrepo.NewRepo(),
	}
}

func (s *Service) Login(req LoginReq) (LoginResp, error) {
	user, err := s.repo.GetUserByEmail(req.Email)
	if err != nil && !errors.Is(err, sql.ErrNoRows) {
		return LoginResp{}, common.ErrQueryIntoDB
	}

	if errors.Is(err, sql.ErrNoRows) {
		err = s.register(req)
		if err != nil {
			return LoginResp{}, err
		}

		user, err = s.repo.GetUserByEmail(req.Email)
		if err != nil && !errors.Is(err, sql.ErrNoRows) {
			return LoginResp{}, common.ErrQueryIntoDB
		}
	}

	err = validatePassword(user.Password, req.Password)
	if err != nil {
		return LoginResp{}, ErrInvalidEmailOrPassword
	}

	accessToken, err := jwt.GenerateToken(user.Id, user.Email)
	if err != nil {
		return LoginResp{}, ErrGenerateTokenFailed
	}

	return LoginResp{AccessToken: accessToken}, nil
}

func (s *Service) register(req LoginReq) error {
	password, err := hashPassword(req.Password)
	if err != nil {
		return common.ErrBadRequest
	}
	req.Password = password

	err = s.repo.InsertUser(toUserModel(req))
	if err != nil {
		return common.ErrExecuteIntoDB
	}

	return nil
}

func hashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	return string(bytes), err
}

func toUserModel(req LoginReq) models.User {
	return models.User{
		Email:    req.Email,
		Password: req.Password,
	}
}

func validatePassword(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}
