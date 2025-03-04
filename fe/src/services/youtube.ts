import axios from 'axios';

const API_KEY = 'AIzaSyAAsD1UgvrsqEZnyaliLXuF9yzi8HftOvk';

export const getYoutubeMetadata = async (youtubeId: string) => {
  const response = await axios.get<Response>(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${youtubeId}&fields=items/id,items/snippet/title,items/snippet/description&key=${API_KEY}`
  );
  return response.data;
};
