package posts

type CreatePostReq struct {
	YoutubeURL  string `json:"youtubeURL"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type BaseRes struct {
	Message string      `json:"message"`
	Data    interface{} `json:"data"`
}

var SuccessMessage = "Success"
var ErrInternal = "Internal error"
