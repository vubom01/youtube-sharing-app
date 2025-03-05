package youtube

import (
	"github.com/youtubeSharing/helper/errors"
	"github.com/youtubeSharing/services/common"
)

var ErrCallingThirdParty = errors.New(501, 501, "Error calling third party")

var ErrYoutubeNotFound = errors.WithMessage(common.ErrNotFound, "youtube url not found")
