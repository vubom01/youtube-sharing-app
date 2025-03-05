import { getData } from 'helpers/request';
import { ICreatePost, IListPostsReq, IListPostsResp } from 'interfaces/post';
import { requestServices } from 'services/index';

const { baseClient } = requestServices;

const createPost = async (req: ICreatePost) => {
  const response = await baseClient.post('/posts', req);
  return getData(response);
};

const getListPosts = async (req: IListPostsReq): Promise<IListPostsResp> => {
  const response = await baseClient.get('/posts', {
    params: req,
  });
  return getData(response);
};

export default {
  createPost,
  getListPosts,
};
