package posts

import (
	"github.com/gin-gonic/gin"
	"github.com/youtubeSharing/models"
	"net/http"
)

type Handler struct {
	service *Service
}

func NewHandler() *Handler {
	return &Handler{
		service: NewService(),
	}
}

// CreatePost godoc
// @Summary      Create new post
// @Tags         Posts
// @Accept       json
// @Produce      json
// @Param        createPostRequest body CreatePostReq true "CreatePost"
// @Success      200 {object} BaseRes
// @Router       /api/v1/posts [post]
func (h *Handler) CreatePost(c *gin.Context) {
	var req CreatePostReq
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, BaseRes{
			Message: err.Error(),
		})
		return
	}
	post := transformCreatePostRequestToPostModel(req)
	message := h.service.CreatePost(post)
	res := BaseRes{
		Message: message,
	}
	c.JSON(http.StatusOK, res)
}

func transformCreatePostRequestToPostModel(req CreatePostReq) models.Post {
	return models.Post{
		YoutubeURL:  req.YoutubeURL,
		Title:       req.Title,
		Description: req.Description,
	}
}
