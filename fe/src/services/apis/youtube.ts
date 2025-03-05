import { getData } from 'helpers/request';
import { IYouTubeInfo } from 'interfaces/youtube';
import { requestServices } from 'services/index';

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
