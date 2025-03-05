import { Spin } from 'antd';
import React, { Suspense, useEffect, useState } from 'react';
import AppHeader from 'src/components/AppHeader';
import ListPosts from 'src/components/ListPosts';
import { StoreContext } from 'src/contexts';
import { userHooks } from 'src/hooks';
import { IUser } from 'src/interfaces/user';

const Home: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const { loading, getMe } = userHooks.useUser();

  useEffect(() => {
    getMe().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <div style={{ paddingBottom: '10px' }} data-testid="home-page">
      {loading && <Spin fullscreen></Spin>}
      <StoreContext.Provider value={{ currentUser, setCurrentUser }}>
        <AppHeader />
        <Suspense fallback={<div />}>
          <ListPosts />
        </Suspense>
      </StoreContext.Provider>
    </div>
  );
};

export default Home;
