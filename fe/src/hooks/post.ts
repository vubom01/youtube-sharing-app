import { MessageInstance } from 'antd/es/message/interface';
import { DEFAULT_PARAMS } from 'constants/common';
import { getYoutubeId } from 'helpers/youtube';
import { ICreatePost, IListPostsReq, IPost } from 'interfaces/post';
import { useEffect, useState } from 'react';
import { postServices, youtubeServices } from 'services';

const useCreatePost = (messageApi: MessageInstance) => {
  const [loading, setLoading] = useState(false);

  const createPost = async (youtubeURL: string) => {
    try {
      setLoading(true);
      const youtubeLink = getYoutubeId(youtubeURL);
      const metadata = await youtubeServices.getYoutubeMetadata(youtubeLink!);
      console.log(metadata);
      const req: ICreatePost = {
        youtubeURL: youtubeURL,
        title: metadata.title,
        description: metadata.description,
      };
      await postServices.createPost(req);
      messageApi.success('Youtube URL shared successfully');
      return true;
    } catch (e: any) {
      messageApi.error(e.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    createPost,
  };
};

const useListPosts = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [params, setParams] = useState<IListPostsReq>(DEFAULT_PARAMS);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [total, setTotal] = useState<number>(0);

  const getListPosts = async () => {
    try {
      setLoading(true);
      const res = await postServices.getListPosts(params);
      if (res) {
        const { posts, total } = res;
        setPosts(posts ?? []);
        setTotal(total);
      }
    } catch (e) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListPosts().then();
  }, [params]);

  return {
    loading,
    setParams,
    posts,
    total,
    params,
  };
};

export default {
  useCreatePost,
  useListPosts,
};
