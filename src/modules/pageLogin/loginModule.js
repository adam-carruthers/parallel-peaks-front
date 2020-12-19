import loginReducer from './loginSlice';
import {loginSaga} from "./loginSaga";

const LoginModule = ({history, redirectUrl}) => ({
    id: 'login',
    reducerMap: {
        loginRequest: loginReducer
    },
    sagas: [{saga: loginSaga, argument: {history, redirectUrl}}]
})

export default LoginModule;