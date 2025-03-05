import React, { Suspense } from 'react';
import { AppHeader } from './AppHeader';

const Home: React.FC = () => {
  return (
    <div>
      <AppHeader />
      <Suspense fallback={<div />}>
        <div>Trang chủ</div>
      </Suspense>
    </div>
  );
};

export default Home;
