package common

import (
	"github.com/gin-gonic/gin"
	"github.com/youtubeSharing/helper/errors"
	"github.com/youtubeSharing/helper/util"
	"github.com/youtubeSharing/models"
	"net/http"
	"strings"
)

// WriteError write error to response
func WriteError(c *gin.Context, err error) {
	httpCode := errors.GetHTTPCode(err)
	code := errors.GetCode(err)
	message := errors.GetMessage(err)
	c.JSON(httpCode, BaseRes{
		Code:    code,
		Message: message,
	})
}

// WriteSuccess write a success response
func WriteSuccess(c *gin.Context, data interface{}) {
	c.JSON(http.StatusOK, BaseRes{
		Code:    http.StatusOK,
		Message: "success",
		Data:    data,
	})
}

func GetCurrentUser(c *gin.Context) (models.User, error) {
	resp, exists := c.Get("user")
	if !exists {
		return models.User{}, ErrUnauthenticated
	}
	user := resp.(models.User)
	return user, nil
}

func GetPagination(c *gin.Context) (Pagination, error) {
	page := int64(1)
	pageSize := int64(20)
	var err error

	pageStr := strings.TrimSpace(c.Query("page"))
	if len(pageStr) > 0 {
		page, err = util.StringToInt64(pageStr)
		if err != nil {
			return Pagination{}, ErrInvalidPagination
		}
	}

	pageSizeStr := strings.TrimSpace(c.Query("pageSize"))
	if len(pageSizeStr) > 0 {
		pageSize, err = util.StringToInt64(pageSizeStr)
		if err != nil {
			return Pagination{}, ErrInvalidPagination
		}
	}

	if page < 0 || pageSize < 0 {
		return Pagination{}, ErrInvalidPagination
	}
	return Pagination{
		Page:     page,
		PageSize: pageSize,
	}, nil
}
