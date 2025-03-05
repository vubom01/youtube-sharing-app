import { YOUTUBE_REGEX } from 'src/constants/youtube';

export const getYoutubeId = (url: string) => {
  const match = url.match(YOUTUBE_REGEX);
  return match && match[7].length === 11 ? match[7] : null;
};
