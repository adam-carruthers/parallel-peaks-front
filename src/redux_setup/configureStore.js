import { createStore } from 'redux-dynamic-modules';
import { composeWithDevTools } from "redux-devtools-extension";
import { getSagaExtension } from "redux-dynamic-modules-saga";
import { getThunkExtension } from "redux-dynamic-modules-thunk";

import UserModule from "../modules/user/userModule";

const baseModules = [UserModule];

export default function createMyStore() {
    const store = createStore({
            extensions: [getThunkExtension(), getSagaExtension()],
            advancedComposeEnhancers: composeWithDevTools({})
        },
        ...baseModules
    )

    return store;
}