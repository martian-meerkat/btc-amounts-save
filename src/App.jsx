import { hot } from 'react-hot-loader';
import React, { Suspense, lazy, useState } from 'react';
import MainLayout from './layout/MainLayout.tsx';
import Login from './components/login/Login.tsx';
import useToken from './hooks/useToken.ts';

import './App.css';

const Operations = lazy(() => import('./components/operations/Operations.tsx'));
const Statistics = lazy(() => import('./components/statistics/Statistics.tsx'));

const components = {
  menu_item_statistics: <Statistics />,
  menu_item_operations: <Operations />,
};

const App = () => {
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
      <Suspense fallback={<div className="lazy-loading"><span>Loading...</span></div>}>
        {components[render]}
      </Suspense>
    </MainLayout>
  );
};

export default hot(module)(App);
