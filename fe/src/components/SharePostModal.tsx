import { Input, Modal, Spin } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { getYoutubeId } from 'helpers/youtube';
import { postHooks } from 'hooks';
import { ICreatePost } from 'interfaces/post';
import React, { useState } from 'react';
import { youtubeServices } from 'services';

interface ISharePostModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  messageApi: MessageInstance;
}

const SharePostModal: React.FC<ISharePostModalProps> = (props) => {
  const { showModal, setShowModal, messageApi } = props;
  const [youtubeURL, setYouTubeURL] = useState<string>('');

  const { loading, createPost } = postHooks.useCreatePost();

  const onCloseModal = () => {
    setShowModal(false);
  };

  const isValidYouTubeUrl = (url: string) => {
    const regex =
      /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[a-zA-Z0-9_-]{11}$/;
    return regex.test(url);
  };

  const onCreatePost = async () => {
    if (!isValidYouTubeUrl(youtubeURL)) {
      messageApi.error('YouTube URL is invalid');
      return;
    }

    const youtubeLink = getYoutubeId(youtubeURL);
    await youtubeServices.getYoutubeMetadata(youtubeLink!).then((metadata) => {
      const req: ICreatePost = {
        youtubeURL: youtubeURL,
        title: metadata.items[0].snippet.title,
        description: metadata.items[0].snippet.description,
      };
      createPost(req).then(() => {
        messageApi.success('YouTube successfully shared');
        setShowModal(false);
      });
    });
  };

  return (
    <div>
      {loading && <Spin fullscreen></Spin>}
      <Modal open={showModal} onCancel={onCloseModal} onOk={onCreatePost}>
        <div>Youtube URL:</div>
        <Input
          onChange={(e) => setYouTubeURL(e.target.value)}
          placeholder="https://www.youtube.com/watch?v="
        />
      </Modal>
    </div>
  );
};

export default SharePostModal;
