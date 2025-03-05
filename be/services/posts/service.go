package posts

import (
	"github.com/youtubeSharing/models"
	postrepo "github.com/youtubeSharing/repo/post"
	"github.com/youtubeSharing/services/common"
)

type Service struct {
	repo *postrepo.Repo
}

func NewService() *Service {
	return &Service{
		repo: postrepo.NewRepo(),
	}
}

func (s *Service) CreatePost(userId int64, req CreatePostReq) error {
	err := s.repo.InsertPost(toPostModel(userId, req))
	if err != nil {
		return common.ErrExecuteIntoDB
	}
	return nil
}

func toPostModel(userId int64, req CreatePostReq) models.Post {
	return models.Post{
		UserId:      userId,
		YoutubeURL:  req.YoutubeURL,
		Title:       req.Title,
		Description: req.Description,
	}
}
