import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import rootStore from './redux/store';
import createMockServer from './mock-server';
import { PersistGate } from 'redux-persist/integration/react'

if (process.env.NODE_ENV === 'development') {
    createMockServer();
}

ReactDOM.render(
    <Provider store={rootStore.store}>
        <PersistGate 
            loading={
                <div className="lazy-loading">
                    <span>Loading...</span>
                </div>
            } 
            persistor={rootStore.persistor}>
                <App />
        </PersistGate>
    </Provider>,
    document.querySelector('#root')
);
