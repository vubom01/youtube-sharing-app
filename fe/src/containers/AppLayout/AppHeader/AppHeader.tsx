import { HomeOutlined } from '@ant-design/icons';
import { Button, Input, Layout, Space } from 'antd';
import { debounce } from 'lodash';
import React, { useCallback, useState } from 'react';

const { Header } = Layout;

const AppHeader: React.FC = () => {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();

  const currentUser = false;

  const onChangeEmail = useCallback(
    debounce((value: string) => {
      value = value.trim();
      setEmail(value);
    }, 300),
    []
  );

  const onChangePassword = useCallback(
    debounce((value: string) => {
      value = value.trim();
      setPassword(value);
    }, 300),
    []
  );

  const onLogin = () => {
    console.log(email, password);
  };

  return (
    <Header style={{ backgroundColor: 'grey' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Space>
          <HomeOutlined size={2} />
          <div style={{ fontWeight: 'bold', fontSize: 24 }}>Funny Movies</div>
        </Space>
        {currentUser ? (
          <Space>
            <div>Welcome Le Huy Vu</div>
            <Button>Share a movie</Button>
            <Button>Logout</Button>
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
  );
};

export default AppHeader;
