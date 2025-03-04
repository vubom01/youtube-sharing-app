package auth

import (
	"github.com/gin-gonic/gin"
	"github.com/youtubeSharing/models"
	"net/http"
	"strings"
)

type Handler struct {
	service *Service
}

func NewHandler() *Handler {
	return &Handler{
		service: NewService(),
	}
}

// Signup godoc
// @Summary      Register an account
// @Tags         Authentication
// @Accept       json
// @Produce      json
// @Param        signupRequest  body SignupReq true "Signup"
// @Success      200 {object} BaseRes
// @Router       /api/v1/auth/signup [post]
func (h *Handler) Signup(c *gin.Context) {
	var req SignupReq
	err := c.BindJSON(&req)
	if err != nil {
		c.JSON(http.StatusBadRequest, BaseRes{
			Message: err.Error(),
		})
		return
	}
	user := transformSignupRequestToUserModel(req)
	message := h.service.Signup(user)
	res := BaseRes{
		Message: message,
	}
	c.JSON(http.StatusOK, res)
}

func transformSignupRequestToUserModel(req SignupReq) models.User {
	return models.User{
		Email:    strings.TrimSpace(req.Email),
		Password: strings.TrimSpace(req.Password),
	}
}
