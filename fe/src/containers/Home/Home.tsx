import { Spin } from 'antd';
import AppHeader from 'components/AppHeader';
import ListPosts from 'components/ListPosts';
import { StoreContext } from 'contexts';
import { userHooks } from 'hooks';
import { IUser } from 'interfaces/user';
import React, { Suspense, useEffect, useState } from 'react';

const Home: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<IUser | undefined>(undefined);
  const { loading, getMe } = userHooks.useUser();

  useEffect(() => {
    getMe().then((data) => {
      setCurrentUser(data);
    });
  }, []);

  return (
    <div style={{ paddingBottom: '10px' }}>
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
