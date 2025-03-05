package auth

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

// Login godoc
// @Summary      Login
// @Tags         Authentication
// @Accept       json
// @Produce      json
// @Param        loginRequest  body LoginReq true "Login"
// @Success      200 {object} common.BaseRes
// @Router       /api/v1/login [post]
func (h *Handler) Login(c *gin.Context) {
	var req LoginReq
	if err := c.BindJSON(&req); err != nil {
		common.WriteError(c, common.ErrBadRequest)
		return
	}

	res, err := h.service.Login(req)
	if err != nil {
		common.WriteError(c, err)
		return
	}
	common.WriteSuccess(c, res)
}
