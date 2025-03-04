package posts

import "github.com/youtubeSharing/models"

type Service struct {
	repo *Repo
}

func NewService() *Service {
	return &Service{
		repo: NewRepo(),
	}
}

func (s *Service) CreatePost(post models.Post) string {
	post.UserId = 1
	err := s.repo.CreatePost(post)
	if err != nil {
		return ErrInternal
	}
	return SuccessMessage
}
