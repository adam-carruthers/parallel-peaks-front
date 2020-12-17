/*
* This file contains the redux-dynamic-modules module for the user data.
* */
import userReducer from "./userReducer";
import userSaga from "./userSaga";

const UserModule = {
    id: "user",
    reducerMap: {
        user: userReducer
    },
    sagas: [userSaga]
}

export default UserModule;