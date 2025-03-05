import { Input, Modal } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { postHooks } from 'hooks';
import React, { useState } from 'react';

interface ISharePostModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
  messageApi: MessageInstance;
}

export const isValidYouTubeUrl = (url: string) => {
  const regex =
    /^((?:https?:)?\/\/)?((?:www|m)\.)?(youtube(?:-nocookie)?\.com|youtu.be)(\/(?:[\w-]+\?v=|embed\/|live\/|v\/)?)([\w-]+)(\S+)?$/;
  return regex.test(url);
};

const SharePostModal = (props: ISharePostModalProps) => {
  const { showModal, setShowModal, messageApi } = props;
  const [youtubeURL, setYouTubeURL] = useState<string>('');

  const { createPost } = postHooks.useCreatePost(messageApi);

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onCreatePost = async () => {
    if (!isValidYouTubeUrl(youtubeURL)) {
      messageApi.error('YouTube URL is invalid');
      return;
    }

    const res = await createPost(youtubeURL);
    if (res) {
      setYouTubeURL('');
      setShowModal(false);
    }
  };

  return (
    <div>
      <Modal open={showModal} onCancel={onCloseModal} onOk={onCreatePost}>
        <div>Youtube URL:</div>
        <Input
          value={youtubeURL}
          onChange={(e) => setYouTubeURL(e.target.value)}
          placeholder="https://www.youtube.com/watch?v="
        />
      </Modal>
    </div>
  );
};

export default SharePostModal;
