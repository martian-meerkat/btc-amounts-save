import { hot } from 'react-hot-loader';
import React from 'react';
import AppRouter from './routes';
import './App.css';

const App = () => {
  return <AppRouter />;
};

export default hot(module)(App);
