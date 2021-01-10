import './pageLogin.css';

import {useRef} from "react";

import LoginWrapper from "./loginWrapper";

import {loginActions, loginModuleId, loginReducer, loginSelectors} from "./loginSlice";
import ForgotPassword from "./forgotPassword/forgotPasswordComponent";
import {loginSaga} from "./loginSaga";

import {useDispatch, useSelector} from "react-redux";
import dynamic from "@redux-dynostore/react-redux";
import {attachReducer, dispatchAction} from "@redux-dynostore/core";
import {runSaga} from "@redux-dynostore/redux-saga";

// TODO: Implement forgot login stuff
// TODO: Set minimum character limits on the username and password before the user can submit

const PageLoginInner = () => {
    const dispatch = useDispatch();
    const loginStatus = useSelector(loginSelectors.status);
    const loginError = useSelector(loginSelectors.error);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <form onSubmit={
            e => {
                e.preventDefault();
                const username = usernameRef.current.value;
                if(!username) {
                    dispatch(loginActions.error("Username is required."));
                    return;
                }
                const password = passwordRef.current.value;
                if(!password){
                    dispatch(loginActions.error("Password is required."));
                    return;
                }
                dispatch(
                    loginActions.start(
                        {username, password}
                        )
                );
            }
        }>
            <fieldset disabled={loginStatus === 'loading'}>
                {loginStatus === 'error' && (
                    <div className="pp-form-error text-danger mb-2">
                        <i className="fas fa-exclamation-triangle mr-1"/> {loginError}
                    </div>
                )}
                <div className="form-group">
                    <input ref={usernameRef} className="form-control" type="text" placeholder="Username"/>
                </div>
                <div className="form-group">
                    <input ref={passwordRef} className="form-control" type="password" placeholder="Password"/>
                </div>
                <div className="form-group">
                    <input
                        className="btn btn-primary btn-block"
                        type="submit"
                        value={loginStatus === 'loading' ? 'Loading...' : 'Submit'}
                    />
                </div>
            </fieldset>
        </form>
    );
}

// We need to give the history to LoginWrapper
const PageLogin = () => (
    <LoginWrapper>
        <section className="pp-first-section bg-blue-waves d-flex flex-column align-items-center">
            <div className="flex-grow-1 p-3"/>
            <div className="box-login pp-box-shadow bg-white">
                <h1 className="pp-box-shadow pp-brand-shadow bg-primary">
                    PP
                </h1>
                <PageLoginInner/>
                <ForgotPassword/>
            </div>
            <div className="flex-grow-1 p-4"/>
        </section>
    </LoginWrapper>
)

export default dynamic(loginModuleId, attachReducer(loginReducer), runSaga(loginSaga), dispatchAction(loginActions.setIdle()))(PageLogin);