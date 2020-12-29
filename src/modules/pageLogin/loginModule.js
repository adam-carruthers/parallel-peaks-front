import loginReducer, {loginActions} from './loginSlice';
import {loginSaga} from "./loginSaga";

const LoginModule = () => ({
    id: 'login',
    reducerMap: {
        loginRequest: loginReducer
    },
    sagas: [loginSaga],
    initialActions: [loginActions.setIdle()]
})

export default LoginModule;