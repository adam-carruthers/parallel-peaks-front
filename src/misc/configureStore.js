import {createStore, applyMiddleware} from "redux";

import createSagaMiddleware from 'redux-saga';
import userSaga from "../modules/user/userSaga";

import {composeWithDevTools} from "redux-devtools-extension";
import {routerMiddleware} from "connected-react-router";
import {persistStore} from "redux-persist";

import createRootReducer from "./rootReducer";

export default function createMyStore(history) {
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [
        sagaMiddleware,
        routerMiddleware(history)
    ];
    const enhancers = [
        applyMiddleware(...middlewares),
        dynostore(dynamicReducers(), dynamicSagas(sagaMiddleware))
    ];
    const rootReducer = createRootReducer(history);

    const store = createStore(
        rootReducer,
        {},
        composeWithDevTools(...enhancers)
    )

    sagaMiddleware.run(userSaga);

    const persistor = persistStore(store);

    return {store, persistor};
}