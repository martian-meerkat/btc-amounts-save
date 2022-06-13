import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import createMockServer from './mock-server';

if (process.env.NODE_ENV === 'development') {
  createMockServer();
}

ReactDOM.render(<App />, document.querySelector('#root'));
