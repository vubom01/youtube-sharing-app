import { getData } from 'src/helpers/request';
import { IYouTubeInfo } from 'src/interfaces/youtube';
import { requestServices } from 'src/services/index';

const { baseClient } = requestServices;

const getYoutubeMetadata = async (youtubeId: string): Promise<IYouTubeInfo> => {
  const response = await baseClient.get('/youtube', {
    params: { youtubeId: youtubeId },
  });
  return getData(response);
};

export default {
  getYoutubeMetadata,
};
