import {takeLatest, call, put} from 'redux-saga/effects';

import {loginActionTypes, loginActions} from './loginSlice';
import {getLoginFetchArgs} from "./loginApi";

import {userActions} from '../user/userActions';

function* login(action) {
    try {
        const response = yield call(fetch, ...getLoginFetchArgs(action.payload.username, action.payload.password));
        const json = yield call([response, 'json']);

        if (response.status !== 200) {
            console.error(json);
            // For this particular endpoint I think it is guaranteed that all errors will be non-field errors
            if (json.non_field_errors) {
                yield put(loginActions.error(json.non_field_errors.join(' - ')))
            } else {
                yield put(loginActions.error('There was an unexpected error, please try again.'));
            }
            return;
        }

        yield put(userActions.setUser({
            ...json.user,
            token: json.token
        }));  // Doing this will auto redirect the user because loginWrapper will load a Redirect on state change.
    } catch(e) {
        console.error(e);
        yield put(loginActions.error('There was an error, check your internet and try again.'));
    }
}

export function* loginSaga() {
    yield takeLatest(loginActionTypes.start, login);
}