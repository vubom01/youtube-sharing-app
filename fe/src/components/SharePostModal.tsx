import { Input, Modal } from 'antd';
import { getYoutubeId } from 'helpers/youtube';
import React, { useState } from 'react';
import { youtubeServices } from 'services';

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

  const onCreatePost = async () => {
    const youtubeLink = getYoutubeId(youtubeURL!);
    const metadata = await youtubeServices.getYoutubeMetadata(youtubeLink!);
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
