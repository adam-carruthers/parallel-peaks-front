import { createStore } from 'redux-dynamic-modules';
import { composeWithDevTools } from "redux-devtools-extension";
import { getSagaExtension } from "redux-dynamic-modules-saga";

import {persistStore} from "redux-persist";

import UserModule from "../modules/user/userModule";
import RouterModule, {getRouterExtension} from "../modules/routes/routerModule";

export default function createMyStore(history) {
    const store = createStore({
            extensions: [getRouterExtension(history), getSagaExtension()],
            advancedComposeEnhancers: composeWithDevTools({})
        },
        UserModule,
        RouterModule(history)
    )

    const persistor = persistStore(store);

    return {store, persistor};
}