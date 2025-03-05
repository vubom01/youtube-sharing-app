import { getData } from 'helpers/request';
import { ICreatePost } from 'interfaces/post';
import { requestServices } from 'services/index';

const { baseClient } = requestServices;

const createPost = async (req: ICreatePost) => {
  const response = await baseClient.post('/posts', req);
  return getData(response);
};

export default {
  createPost,
};
