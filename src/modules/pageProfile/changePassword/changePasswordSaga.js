import {takeLatest, select, call, put} from 'redux-saga/effects';
import {getChangePasswordFetchArgs} from "./changePasswordApi";
import {userToken} from "../../user/userSelectors";
import {changePasswordActions, changePasswordActionTypes} from "./changePasswordSlice";
import Noty from "noty";

function* changePassword(action) {
    try {
        const token = yield select(userToken);
        const response = yield call(fetch, ...getChangePasswordFetchArgs(action.payload, token));
        const json = yield call([response, 'json']);

        if (response.status !== 200) {
            console.error(json);
            if (response.status === 401) {
                yield put(changePasswordActions.error(["We had trouble performing this action, are you still logged in? Try refreshing the page."]));
                return;
            }
            let errors = [];
            // The errors, if there are any, are stored in each of these keys in the JSON object.
            // We can compile them into an overall list to give to the error
            ['old_password', 'new_password1', 'new_password2'].forEach(key => {
                if (key in json) {
                    errors = errors.concat(json[key])
                }
            })
            if (errors.length) {
                yield put(changePasswordActions.error(errors))
            } else {
                yield put(changePasswordActions.error(["There was an unexpected error, please try again."]))
            }
            return;
        }

        new Noty({
            type: 'success',
            text: "Your password was successfully changed!",
            layout: 'bottomRight',
            timeout: 3000
        }).show();
        yield put(changePasswordActions.success());  // This should close the modal
    } catch (e) {
        console.error(e);
        yield put(changePasswordActions.error(['There was an error, check your internet and try again.']))
    }
}

export default function* changePasswordSaga() {
    yield takeLatest(changePasswordActionTypes.start, changePassword)
}