package common

import "github.com/youtubeSharing/helper/errors"

var ErrBadRequest = errors.New(400, 400, "bad request")

var ErrExecuteIntoDB = errors.New(501, 500, "error executing into database")

var ErrQueryIntoDB = errors.New(502, 500, "error querying in to database")

var ErrUnauthenticated = errors.New(401, 401, "unauthenticated")
