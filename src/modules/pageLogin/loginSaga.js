import {takeLatest, call, put, select} from 'redux-saga/effects';

import {loginActionTypes, loginActions} from './loginSlice';
import {getLoginFetchArgs} from "./loginApi";

import {userActions} from '../user/userActions';
import {userIsMatcher} from "../user/userSelectors";

function* login(history, redirectUrl, action) {
    try {
        const response = yield call(fetch, ...getLoginFetchArgs(action.username, action.password));
        const json = yield call([response, 'json']);

        if (response.status !== 200) {
            console.error(json);
            if (json.message) {
                yield put(loginActions.error(json.message))
            } else {
                yield put(loginActions.error('There was an unexpected error, please try again.'));
            }
            return;
        }

        yield put(userActions.setUser({
            ...json.user,
            token: json.token
        }));

        if(redirectUrl) {
            history.push(redirectUrl);
            return;
        }

        const userMatcher = yield select(userIsMatcher);
        if (userMatcher) {
            history.push('/matcher-home')
        } else {
            history.push('/profile')
        }
    } catch(e) {
        console.error(e);
        yield put(loginActions.error('There was an error, check your internet and try again.'));
    }
}

export function* loginSaga({history, redirectUrl}) {
    yield takeLatest(loginActionTypes.start, login, history, redirectUrl);
}