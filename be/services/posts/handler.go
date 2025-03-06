package posts

import (
	"github.com/gin-gonic/gin"
	"github.com/youtubeSharing/services/common"
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
// @Param 		 Authorization header string true "Authorization"
// @Param        createPostRequest body CreatePostReq true "CreatePost"
// @Success      200 {object} common.BaseRes
// @Router       /api/v1/posts [post]
func (h *Handler) CreatePost(c *gin.Context) {
	user, err := common.GetCurrentUser(c)
	if err != nil {
		common.WriteError(c, err)
		return
	}

	var req CreatePostReq
	err = c.BindJSON(&req)
	if err != nil {
		common.WriteError(c, common.ErrBadRequest)
		return
	}
	res, err := h.service.CreatePost(user.Id, req)
	if err != nil {
		common.WriteError(c, err)
		return
	}
	common.WriteSuccess(c, res)
}

// List godoc
// @Summary      get list posts
// @Tags         Posts
// @Accept       json
// @Produce      json
// @Success      200
// @Router       /api/v1/posts [get]
// @Param 		 page query int false "page"
// @Param		 pageSize query int false "pageSize"
// @Success		 200 {object} ListOutput "Success"
func (h *Handler) List(c *gin.Context) {
	pagination, err := common.GetPagination(c)
	if err != nil {
		common.WriteError(c, err)
		return
	}

	res, err := h.service.List(pagination)
	if err != nil {
		common.WriteError(c, err)
		return
	}
	common.WriteSuccess(c, res)
}
