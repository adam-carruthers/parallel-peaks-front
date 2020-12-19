import { createStore } from 'redux-dynamic-modules';
import { composeWithDevTools } from "redux-devtools-extension";
import { getSagaExtension } from "redux-dynamic-modules-saga";

import {persistStore} from "redux-persist";

import UserModule from "../modules/user/userModule";

export default function createMyStore() {
    const store = createStore({
            extensions: [getSagaExtension()],
            advancedComposeEnhancers: composeWithDevTools({trace: true})
        },
        UserModule
    )

    const persistor = persistStore(store);

    return {store, persistor};
}