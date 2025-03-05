import { Input, Modal } from 'antd';
import { YOUTUBE_REGEX } from 'constants/youtube';
import React, { useState } from 'react';
import { getYoutubeMetadata } from 'services/youtube';

interface ISharePostModalProps {
  showModal: boolean;
  setShowModal: (show: boolean) => void;
}

const SharePostModal: React.FC<ISharePostModalProps> = (props) => {
  const { showModal, setShowModal } = props;
  const [youtubeURL, setYouTubeURL] = useState<string>();

  const onCloseModal = () => {
    setShowModal(false);
  };

  const getYoutubeId = (url: string) => {
    const match = url.match(YOUTUBE_REGEX);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const onCreatePost = async () => {
    const youtubeLink = getYoutubeId(youtubeURL!);
    const metadata = await getYoutubeMetadata(youtubeLink!);
    console.log(metadata);
  };

  return (
    <Modal open={showModal} onCancel={onCloseModal} onOk={onCreatePost}>
      <div>Youtube URL:</div>
      <Input
        onChange={(e) => setYouTubeURL(e.target.value)}
        placeholder="https://www.youtube.com/watch?v="
      />
    </Modal>
  );
};

export default SharePostModal;
