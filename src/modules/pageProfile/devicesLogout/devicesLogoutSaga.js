import {takeLatest, select, call, put} from 'redux-saga/effects';
import {devicesLogoutActions, devicesLogoutActionTypes} from "./devicesLogoutSlice";
import {userToken} from "../../user/userSelectors";
import {getDevicesLogoutFetchArgs} from "./devicesLogoutApi";
import {push} from 'connected-react-router';
import Noty from "noty";
import {userActions} from "../../user/userActions";

function* devicesLogout() {
    try {
        const token = yield select(userToken);
        const response = yield call(fetch, ...getDevicesLogoutFetchArgs(token));
        const json = yield call([response, 'json']);

        if(response.status !== 200){
            console.error(json);
            if(response.status === 401) {
                yield put(devicesLogoutActions.error("We had trouble logging out your other devices. You might already be logged out on this device. Try refreshing the page."))
            } else {
                yield put(devicesLogoutActions.error("There was an unexpected error. Please try again."))
            }
            return;
        }

        yield put(push('/'));
        yield put(userActions.logout());
        new Noty({
            type: "success",
            text: "You were successfully logged out.",
            layout: 'bottomRight',
            timeout: 5000
        }).show();
    } catch (e) {
        console.error(e);
        yield put(devicesLogoutActions.error("There was an error, check your internet and try again."))
    }
}

export default function* devicesLogoutSaga() {
    yield takeLatest(devicesLogoutActionTypes.start, devicesLogout)
}