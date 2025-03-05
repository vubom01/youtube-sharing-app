package common

import (
	"github.com/gin-gonic/gin"
	"github.com/youtubeSharing/helper/errors"
	"net/http"
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
