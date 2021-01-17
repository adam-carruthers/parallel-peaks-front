import {takeLatest, select, call, put} from 'redux-saga/effects';
import {deleteAccountActions, deleteAccountActionTypes} from "./deleteAccountSlice";
import {userToken} from "../../user/userSelectors";
import {getDeletePasswordFetchArgs} from "./deleteAccountApi";
import {changePasswordActions} from "../changePassword/changePasswordSlice";
import Noty from 'noty';
import {userActions} from "../../user/userActions";
import {push} from 'connected-react-router';

function* deleteAccount(action) {
    try {
        const token = yield select(userToken);
        const response = yield call(fetch, ...getDeletePasswordFetchArgs(action.payload, token));
        const json = yield call([response, 'json'])

        if (response.status !== 200) {
            console.error(json);
            if (response.status === 401) {
                yield put(changePasswordActions.error("We had trouble performing this action, are you still logged in? Try refreshing the page."));
            } else if (json.old_password) {
                yield put(deleteAccountActions.error(json.old_password.join(" - ")))
            } else {
                yield put(deleteAccountActions.error("An unexpected error occurred. Please try again."))
            }
            return;
        }

        yield put(push('/'))
        yield put(userActions.logout());
        new Noty({
            type: "success",
            text: "Your account was successfully deleted.",
            layout: 'bottomRight',
            timeout: 5000
        }).show();

    } catch (e) {
        console.error(e);
        yield put(changePasswordActions.error("There was an error. Check your internet and try again."))
    }
}

export default function* deleteAccountSaga() {
    yield takeLatest(deleteAccountActionTypes.start, deleteAccount)
}