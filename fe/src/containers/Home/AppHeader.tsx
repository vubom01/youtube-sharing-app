import { HomeOutlined } from '@ant-design/icons';
import { Button, Input, Layout, message, Space, Spin } from 'antd';
import SharePostModal from 'components';
import { StoreContext } from 'contexts';
import { userHooks } from 'hooks';
import React, { useContext, useState } from 'react';
import { userServices } from 'services';

const { Header } = Layout;

export const AppHeader = () => {
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
      {loading && <Spin fullscreen></Spin>}
      <Header style={{ backgroundColor: 'whitesmoke ' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <HomeOutlined size={2} />
            <div style={{ fontWeight: 'bold', fontSize: 24 }}>Funny Movies</div>
          </Space>
          {currentUser ? (
            <Space>
              <div>Welcome {currentUser?.email}</div>
              <Button onClick={onSharePost}>Share a movie</Button>
              <Button onClick={onLogout}>Logout</Button>
            </Space>
          ) : (
            <Space>
              <div>
                <Input
                  placeholder="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <Input.Password
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button onClick={onLogin}>Login/ Register</Button>
            </Space>
          )}
        </div>
      </Header>
      <SharePostModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};
