package youtube

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
)

type Service struct {
}

func NewService() *Service {
	return &Service{}
}

func (s *Service) Detail(youtubeId string) (GetYouTubeDetailResp, error) {
	apiKey := os.Getenv("YOUTUBE_API_KEY")
	url := "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + youtubeId + "&fields=items/id,items/snippet/title,items/snippet/description&key=" + apiKey
	fmt.Println(url)
	response, err := http.Get(url)
	if err != nil {
		return GetYouTubeDetailResp{}, ErrCallingThirdParty
	}
	defer func(Body io.ReadCloser) {
		err := Body.Close()
		if err != nil {

		}
	}(response.Body)

	body, err := io.ReadAll(response.Body)
	if err != nil {
		return GetYouTubeDetailResp{}, err
	}

	var data CallingYouTubeDetailResp
	err = json.Unmarshal(body, &data)
	if err != nil {
		return GetYouTubeDetailResp{}, err
	}

	if len(data.Items) == 0 {
		return GetYouTubeDetailResp{}, ErrYoutubeNotFound
	}
	title := data.Items[0].Snippet.Title
	description := data.Items[0].Snippet.Description

	fmt.Println(title, description)

	return GetYouTubeDetailResp{
		Title:       title,
		Description: description,
	}, nil
}
