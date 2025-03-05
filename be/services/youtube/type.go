package youtube

type CallingYouTubeDetailResp struct {
	Items []struct {
		Snippet struct {
			Title       string `json:"title"`
			Description string `json:"description"`
		} `json:"snippet"`
	} `json:"items"`
}

type GetYouTubeDetailResp struct {
	Title       string `json:"title"`
	Description string `json:"description"`
}
