import React, { Suspense, lazy, useState } from 'react';
import MainLayout from './layout/MainLayout';
import Login from './components/login/Login';
import useToken from './hooks/useToken';

const Operations = lazy(() => import('./components/operations/Operations'));
const Statistics = lazy(() => import('./components/statistics/Statistics'));

const components = {
  menu_item_statistics: <Statistics />,
  menu_item_operations: <Operations />
};

const AppRouter = () => {
  const [render, updateRender] = useState('menu_item_statistics');
  const { token, setToken } = useToken();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  const handleMenuClick = (menu) => {
    updateRender(menu.key);
  };

  return (
    <MainLayout handleMenuClick={handleMenuClick}>
      <Suspense
        fallback={
          <div className="lazy-loading">
            <span>Loading...</span>
          </div>
        }
      >
        {components[render]}
      </Suspense>
    </MainLayout>
  );
};

export default AppRouter;
