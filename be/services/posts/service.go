package posts

import (
	"github.com/youtubeSharing/connectors/mysql"
	"github.com/youtubeSharing/models"
	postrepo "github.com/youtubeSharing/repo/post"
	"github.com/youtubeSharing/services/common"
)

type Service struct {
	repo postrepo.IRepo
}

func NewService() *Service {
	return &Service{
		repo: postrepo.NewRepo(mysql.GetMySQLInstance()),
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

func (s *Service) List(req common.PaginationReq) (ListPostResp, error) {
	posts, total, err := s.repo.List(req.Page, req.PageSize)
	if err != nil {
		return ListPostResp{}, common.ErrExecuteIntoDB
	}

	var resp []PostItem
	for _, post := range posts {
		resp = append(resp, toPostItem(post))
	}

	return ListPostResp{
		Posts: resp,
		Total: total,
	}, nil
}

func toPostItem(post models.PostDetail) PostItem {
	return PostItem{
		Id:          post.Id,
		UserEmail:   post.Email,
		UserId:      post.UserId,
		YoutubeURL:  post.YoutubeURL,
		Title:       post.Title,
		Description: post.Description,
	}
}
