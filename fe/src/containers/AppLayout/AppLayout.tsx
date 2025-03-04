import AppHeader from 'containers/AppLayout/AppHeader';
import React, { Suspense } from 'react';
import { Outlet } from 'react-router-dom';

const AppLayout: React.FC = () => {
  return (
    <div className="max-w-[1280px] mx-auto my-0 relative w-full">
      <AppHeader />
      <Suspense fallback={<div />}>
        <div className="w-full mx-auto my-0 min-h-[calc(100vh-192px)]">
          <Outlet />
        </div>
      </Suspense>
    </div>
  );
};

export default AppLayout;
