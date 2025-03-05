package posts

type CreatePostReq struct {
	YoutubeURL  string `json:"youtubeURL"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type PostItem struct {
	Id          int64  `json:"id"`
	UserId      int64  `json:"userId"`
	UserEmail   string `json:"userEmail"`
	YoutubeURL  string `json:"youtubeURL"`
	Title       string `json:"title"`
	Description string `json:"description"`
}

type ListPostResp struct {
	Posts []PostItem `json:"posts"`
}
