/*
This file is the entry point for the application.
Context providing tags are placed here:
- React redux provider
- React router tag
- Redux persistor
 */
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {createBrowserHistory} from 'history';
import {ConnectedRouter} from "connected-react-router";

import {Provider} from 'react-redux';
import createMyStore from "./misc/configureStore";
import {PersistGate} from "redux-persist/integration/react";

import PreloadImages from "./misc/preloadImagesComponent";

const history = createBrowserHistory();
const {store, persistor} = createMyStore(history);

ReactDOM.render(
    <React.StrictMode>
        <PreloadImages/>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </ConnectedRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
