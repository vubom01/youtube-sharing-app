import { ICreatePost } from 'interfaces/post';
import { useState } from 'react';
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

export default {
  useCreatePost,
};
