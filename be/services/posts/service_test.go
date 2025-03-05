package posts

import (
	"github.com/stretchr/testify/assert"
	"github.com/youtubeSharing/helper/integration"
	"github.com/youtubeSharing/models"
	postrepo "github.com/youtubeSharing/repo/post"
	"github.com/youtubeSharing/services/common"
	"testing"
)

func newTestService() Service {
	tc := integration.NewTestCase()
	repo := postrepo.NewRepo(tc.DB)
	tc.Truncate("posts")
	return Service{
		repo: repo,
	}
}

func Test_CreatePost(t *testing.T) {
	s := newTestService()
	err := s.CreatePost(999, CreatePostReq{
		YoutubeURL:  "https://www.youtube.com",
		Title:       "title post",
		Description: "description post",
	})
	assert.Nil(t, err)
}

func Test_List(t *testing.T) {
	repoMock := &postrepo.IRepoMock{}
	repoMock.ListFunc = func(page int64, pageSize int64) ([]models.PostDetail, int64, error) {
		return []models.PostDetail{
			{
				Id:          1,
				UserId:      10,
				Email:       "test@test.com",
				YoutubeURL:  "youtube://youtube.com/",
				Title:       "title",
				Description: "description",
			},
		}, 1, nil
	}

	s := Service{repo: repoMock}
	resp, err := s.List(common.PaginationReq{Page: 1, PageSize: 5})
	assert.Nil(t, err)
	assert.Equal(t, int64(1), resp.Total)
	assert.Equal(t, int64(1), resp.Posts[0].Id)
	assert.Equal(t, int64(10), resp.Posts[0].UserId)
	assert.Equal(t, "test@test.com", resp.Posts[0].UserEmail)
}
