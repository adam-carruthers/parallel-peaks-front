import {persistReducer} from "redux-persist";
import storage from 'redux-persist/lib/storage';

import {userActionTypes} from "./userActions";

const initialState = null;

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userActionTypes.setUser:
            return {
                ...action.payload,
                token: action.payload.token || state?.token,
            };
        case userActionTypes.logout:
            return initialState;
        default:
            return state;
    }
}

const userPersistConfig = {
    key: 'user',
    storage
}

export default persistReducer(userPersistConfig, userReducer);