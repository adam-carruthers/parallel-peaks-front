import {takeLatest, select, call, put, take, fork} from "redux-saga/effects";

import {userActionTypes, userActions} from "./userActions";
import {userIsLoggedIn, userToken} from "./userSelectors";
import {getUserRefreshFetchArgs} from "./userApi";

import Noty from 'noty';

function* refreshUser() {
    const userLoggedIn = yield select(userIsLoggedIn);  // Check that user logged in on client
    if (!userLoggedIn) {
        return;  // If they aren't logged in we don't need to refresh them
    }
    const token = yield select(userToken);

    try {
        const response = yield call(fetch, ...getUserRefreshFetchArgs(token));

        if (response.status !== 200) {
            if (response.status === 401) {
                yield put(userActions.logout());
                new Noty({
                    type: 'error',
                    text: "You were logged out on the server.",
                    layout: 'bottomRight',
                    timeout: 3000
                }).show();
                return;
            } else {
                throw new Error('Unknown status response code.');  // Handle this case with our default catch-all code.
            }
        }

        const json = yield call([response, 'json']);
        yield put(userActions.setUser(json));
    } catch (err) {
        console.error(err);
        new Noty({
            type: 'error',
            text: "We had trouble refreshing your profile. Is your internet okay? " +
                "The website may not work, it may be worth refreshing and/or logging out and in again.",
            layout: 'bottomRight',
            timeout: 5000
        }).show();
    }
}

function* refreshUserOnRehydrate() {
    yield take(action => action.type === "persist/REHYDRATE" && action.key === 'user');
    yield fork(refreshUser);
}

function* userSaga() {
    yield fork(refreshUserOnRehydrate);
    yield takeLatest(userActionTypes.refresh, refreshUser)
}

export default userSaga;