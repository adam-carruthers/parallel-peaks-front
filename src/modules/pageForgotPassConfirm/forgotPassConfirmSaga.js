import {takeLatest, call, put} from 'redux-saga/effects';
import {forgotPassConfirmActions, forgotPassConfirmActionTypes} from "./forgotPassConfirmSlice";
import {getForgotPassConfirmFetchArgs} from "./forgotPassConfirmApi";
import Noty from "noty";
import {push} from 'connected-react-router';

function* resetPasswordConfirm(action) {
    try {
        const response = yield call(fetch, ...getForgotPassConfirmFetchArgs(action.payload));
        const json = yield call([response, 'json']);

        if(response.status !== 200) {
            console.error(json);
            if (json.token || json.uid) {
                yield put(forgotPassConfirmActions.error("The password reset URL you were given is not currently valid. It may have expired or already been used."))
            } else if(json.new_password2){
                yield put(forgotPassConfirmActions.error(json.new_password2.join(' - ')))
            } else {
                yield put(forgotPassConfirmActions.error("There was an unexpected error, please try again."))
            }
            return;
        }

        new Noty({
            type: 'success',
            text: "Password has been reset, you can now login with your new details.",
            layout: 'bottomRight',
            timeout: 3000
        }).show();
        yield put(push('/'));
    } catch (e) {
        console.error(e);
        yield put(forgotPassConfirmActions.error("There was an error, check your internet and try again."))
    }
}

export default function* forgotPassConfirmSaga() {
    yield takeLatest(forgotPassConfirmActionTypes.start, resetPasswordConfirm)
}