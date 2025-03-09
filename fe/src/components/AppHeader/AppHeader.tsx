import { HomeOutlined } from '@ant-design/icons';
import { Button, Input, Layout, message, Space, Spin } from 'antd';
import React, { useContext, useState } from 'react';
import { WebSocketMessage } from 'react-use-websocket/src/lib/types';
import SharePostModal from 'src/components/SharePostModal';
import { StoreContext } from 'src/contexts';
import { userHooks } from 'src/hooks';
import { userServices } from 'src/services';

const { Header } = Layout;

export interface IAppHeaderProps {
  sendMessage: (message: WebSocketMessage, keep?: boolean) => void;
}

const AppHeader = (props: IAppHeaderProps) => {
  const { sendMessage } = props;

  const [messageApi, contextHolder] = message.useMessage();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  const { currentUser, setCurrentUser } = useContext(StoreContext);

  const { loading, login } = userHooks.useLogin(messageApi);

  const onLogin = async () => {
    if (!email) {
      messageApi.error('Please enter email');
      return;
    }
    if (!password) {
      messageApi.error('Please enter password');
      return;
    }
    await login(email, password);
  };

  const onLogout = () => {
    userServices.logout();
    setCurrentUser(undefined);
  };

  const onSharePost = () => {
    setShowModal(true);
  };

  return (
    <div>
      {contextHolder}
      {loading && <Spin data-testid="spin" fullscreen></Spin>}
      <Header style={{ backgroundColor: 'whitesmoke ' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <HomeOutlined size={2} />
            <div style={{ fontWeight: 'bold', fontSize: 24 }}>Funny Movies</div>
          </Space>
          {currentUser ? (
            <Space data-testid="current-user-info">
              <div>
                Welcome <b>{currentUser?.email}</b>
              </div>
              <Button data-testid="share-video-button" onClick={onSharePost}>
                Share a Video
              </Button>
              <Button data-testid="logout-button" onClick={onLogout}>
                Logout
              </Button>
            </Space>
          ) : (
            <Space data-testid="login-form">
              <div>
                <Input
                  data-testid="email-input"
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Input.Password
                data-testid="password-input"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button data-testid="login-button" onClick={onLogin}>
                Login/ Register
              </Button>
            </Space>
          )}
        </div>
      </Header>
      <SharePostModal
        showModal={showModal}
        setShowModal={setShowModal}
        messageApi={messageApi}
        sendMessage={sendMessage}
      />
    </div>
  );
};

export default AppHeader;
