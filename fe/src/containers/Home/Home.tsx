import { Spin } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import useWebSocket from 'react-use-websocket';
import AppHeader from 'src/components/AppHeader';
import ListPosts from 'src/components/ListPosts';
import { StoreContext } from 'src/contexts';
import { userHooks } from 'src/hooks';
import { IUser } from 'src/interfaces/user';

const { apiServices } = window.config ?? {};
const WS_URL = apiServices?.webSocket ?? 'ws://localhost:8000/ws';

const Home: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const [socketURL, setSocketURL] = useState<string>('');

  const { loading, getMe } = userHooks.useUser();

  const { sendMessage, lastMessage } = useWebSocket(socketURL, {
    protocols: [localStorage.getItem('token') ?? 'invalid-token'],
  });

  useEffect(() => {
    setSocketURL(`${WS_URL}?accessToken=${localStorage.getItem('token')}`);
  }, [localStorage.getItem('token')]);

  useEffect(() => {
    getMe().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <div style={{ paddingBottom: '10px' }} data-testid="home-page">
      {loading && <Spin fullscreen></Spin>}
      <StoreContext.Provider value={{ currentUser, setCurrentUser }}>
        <AppHeader sendMessage={sendMessage} />
        <Suspense fallback={<div />}>
          <ListPosts lastMessage={lastMessage} />
        </Suspense>
      </StoreContext.Provider>
    </div>
  );
};

export default Home;
