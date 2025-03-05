package auth

import "github.com/youtubeSharing/helper/errors"

var ErrInvalidEmailOrPassword = errors.New(401, 401, "Email or Password is invalid")

var ErrGenerateTokenFailed = errors.New(402, 401, "Generate token failed")
