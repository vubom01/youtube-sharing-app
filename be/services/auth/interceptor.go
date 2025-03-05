package auth

import (
	"database/sql"
	"errors"
	"github.com/gin-gonic/gin"
	"github.com/youtubeSharing/connectors/mysql"
	"github.com/youtubeSharing/helper/jwt"
	userrepo "github.com/youtubeSharing/repo/user"
	"github.com/youtubeSharing/services/common"
)

type Interceptor struct {
	repo userrepo.IRepo
}

func NewInterceptor() *Interceptor {
	return &Interceptor{
		repo: userrepo.NewRepo(mysql.GetMySQLInstance()),
	}
}

func (s *Interceptor) Authentication() gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := getBearerToken(c)
		if err != nil {
			common.WriteError(c, err)
			c.Abort()
			return
		}

		_, claims, err := jwt.ValidateToken(token)
		if err != nil {
			common.WriteError(c, common.ErrUnauthenticated)
			c.Abort()
			return
		}

		email := claims["email"].(string)
		user, err := s.repo.GetUserByEmail(email)
		if err != nil && !errors.Is(err, sql.ErrNoRows) {
			common.WriteError(c, common.ErrQueryIntoDB)
			c.Abort()
			return
		}
		if errors.Is(err, sql.ErrNoRows) {
			common.WriteError(c, common.ErrUnauthenticated)
			c.Abort()
			return
		}

		c.Set("user", user)
		c.Next()
	}
}

func getBearerToken(c *gin.Context) (string, error) {
	header := c.GetHeader("authorization")
	if len(header) < len("Bearer ") {
		return "", common.ErrUnauthenticated
	}

	if header[:len("Bearer ")] != "Bearer " {
		return "", common.ErrUnauthenticated
	}

	return header[len("Bearer "):], nil
}
