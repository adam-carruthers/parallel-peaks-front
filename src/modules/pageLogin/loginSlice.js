import basicRequestReducer from "../../shared/basicRequest/basicRequestReducer";

// ACTION TYPES
export const loginActionTypes = {
    start: 'loginRequest/LOGIN',
    success: 'loginRequest/LOGIN_SUCCESS',
    error: 'loginRequest/LOGIN_ERROR',
    setIdle: 'loginRequest/LOGIN_SET_IDLE'
}

// ACTIONS
export const loginActions = {
    start: (username, password) => ({
        type: loginActionTypes.start,
        username,
        password
    }),
    error: error => ({
        type: loginActionTypes.error,
        error
    }),
    setIdle: () => ({
        type: loginActionTypes.setIdle
    })
}

// SELECTORS
export const loginRequestStatus = state => state.loginRequest.status;
export const loginRequestError = state => state.loginRequest.error;

// REDUCER
const loginReducer = basicRequestReducer(loginActionTypes);

export default loginReducer;