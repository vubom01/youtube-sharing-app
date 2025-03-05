package youtube

import (
	"github.com/gin-gonic/gin"
	"github.com/youtubeSharing/services/common"
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

// Detail godoc
// @Summary      Get YouTube info
// @Tags         YouTube
// @Accept       json
// @Produce      json
// @Param 		 youtubeId query string true "youtubeId"
// @Success      200 {object} common.BaseRes
// @Router       /api/v1/youtube [get]
func (h *Handler) Detail(c *gin.Context) {
	youtubeId := strings.TrimSpace(c.Query("youtubeId"))

	res, err := h.service.Detail(youtubeId)
	if err != nil {
		common.WriteError(c, err)
		return
	}
	common.WriteSuccess(c, res)
}
