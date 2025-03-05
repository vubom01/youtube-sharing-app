package posts

type CreatePostReq struct {
	YoutubeURL  string `json:"youtubeURL"`
	Title       string `json:"title"`
	Description string `json:"description"`
}
