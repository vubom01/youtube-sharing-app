import { HomeOutlined } from '@ant-design/icons';
import { Button, Input, Layout, message, Space, Spin } from 'antd';
import SharePostModal from 'components';
import { userHooks } from 'hooks';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';
import { userServices } from 'services';

const { Header } = Layout;

export const AppHeader = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const { loading, login } = userHooks.useLogin();

  const onChangeEmail = useCallback(
    debounce((value: string) => {
      value = value.trim();
      setEmail(value);
    }, 100),
    []
  );

  const onChangePassword = useCallback(
    debounce((value: string) => {
      value = value.trim();
      setPassword(value);
    }, 100),
    []
  );

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

  const onSharePost = () => {
    setShowModal(true);
  };

  return (
    <div>
      {contextHolder}
      {loading && <Spin fullscreen></Spin>}
      <Header style={{ backgroundColor: 'grey' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Space>
            <HomeOutlined size={2} />
            <div style={{ fontWeight: 'bold', fontSize: 24 }}>Funny Movies</div>
          </Space>
          {userServices.isLoggedIn() ? (
            <Space>
              <div>Welcome Le Huy Vu</div>
              <Button onClick={onSharePost}>Share a movie</Button>
              <Button onClick={userServices.logout}>Logout</Button>
            </Space>
          ) : (
            <Space>
              <div>
                <Input
                  placeholder="email"
                  onChange={(e) => onChangeEmail(e.target.value)}
                />
              </div>

              <Input.Password
                placeholder="password"
                onChange={(e) => onChangePassword(e.target.value)}
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
