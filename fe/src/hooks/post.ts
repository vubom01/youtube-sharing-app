import { DEFAULT_PARAMS } from 'constants/common';
import { ICreatePost, IListPostsReq, IPost } from 'interfaces/post';
import { useEffect, useState } from 'react';
import { postServices } from 'services';

const useCreatePost = () => {
  const [loading, setLoading] = useState(false);

  const createPost = async (req: ICreatePost) => {
    try {
      setLoading(true);
      await postServices.createPost(req);
    } catch (e) {
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
        setPosts(posts);
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
