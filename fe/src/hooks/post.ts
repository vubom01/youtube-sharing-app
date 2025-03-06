import { MessageInstance } from 'antd/es/message/interface';
import { useContext, useEffect, useState } from 'react';
import { WebSocketMessage } from 'react-use-websocket/src/lib/types';
import { DEFAULT_PARAMS } from 'src/constants/common';
import { StoreContext } from 'src/contexts';
import { getYoutubeId } from 'src/helpers/youtube';
import { ICreatePost, IListPostsReq, IPost } from 'src/interfaces/post';
import { postServices, youtubeServices } from 'src/services';

const useCreatePost = (
  messageApi: MessageInstance,
  sendMessage: (message: WebSocketMessage, keep?: boolean) => void
) => {
  const [loading, setLoading] = useState(false);
  const { currentUser } = useContext(StoreContext);

  const createPost = async (youtubeURL: string) => {
    try {
      setLoading(true);
      const youtubeLink = getYoutubeId(youtubeURL);
      const metadata = await youtubeServices.getYoutubeMetadata(youtubeLink!);
      const req: ICreatePost = {
        youtubeURL: youtubeURL,
        title: metadata.title,
        description: metadata.description,
      };
      const res = await postServices.createPost(req);
      if (res) {
        const newPost: IPost = {
          id: res.postId,
          userId: currentUser?.id ?? 0,
          userEmail: currentUser?.email ?? '',
          youtubeURL: youtubeURL,
          title: metadata.title,
          description: metadata.description,
        };
        sendMessage(JSON.stringify(newPost));
        messageApi.success('Youtube URL shared successfully');
        return true;
      }
      return false;
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
    setPosts,
    setTotal,
  };
};

export default {
  useCreatePost,
  useListPosts,
};
