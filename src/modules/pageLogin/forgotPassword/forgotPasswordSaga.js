import {takeLatest, call, put} from 'redux-saga/effects';
import {forgotPasswordActions, forgotPasswordActionTypes} from "./forgotPasswordSlice";
import {getForgotPasswordFetchArgs} from "./forgetPasswordApi";
import Noty from 'noty';

function* resetPassword(action) {
    try {
        const response = yield call(fetch, ...getForgotPasswordFetchArgs(action.payload.email));
        const json = yield call([response, 'json']);

        if (response.status !== 200) {
            console.error(json);
            if(response.email) {
                yield put(forgotPasswordActions.error(json.email.join(' - ')));
            } else if (response.non_field_errors) {
                yield put(forgotPasswordActions.error(json.non_field_errors.join(' - ')));
            } else {
                yield put(forgotPasswordActions.error('There was an unexpected error, please try again.'));
            }
            return;
        }

        new Noty({
            type: 'success',
            text: "Password reset email sent.",
            layout: 'bottomRight',
            timeout: 3000
        }).show();
        yield put(forgotPasswordActions.success()) // This should close the modal
    } catch (e) {
        console.error(e);
        yield put(forgotPasswordActions.error('There was an error, check your internet and try again.'));
    }
}

function* forgotPasswordSaga() {
    yield takeLatest(forgotPasswordActionTypes.start, resetPassword);
}

export default forgotPasswordSaga;