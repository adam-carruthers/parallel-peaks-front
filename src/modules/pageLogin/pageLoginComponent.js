import './pageLogin.css';

import {useRef} from "react";

import LoginWrapper from "./loginWrapper";

import {useDispatch, useSelector} from "react-redux";
import {loginRequestStatus, loginActions, loginRequestError} from "./loginSlice";

// TODO: Implement forgot login stuff
// TODO: Set minimum character limits on the username and password before the user can submit

const PageLoginInner = () => {
    const dispatch = useDispatch();
    const loginStatus = useSelector(loginRequestStatus);
    const loginError = useSelector(loginRequestError);

    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    return (
        <form onSubmit={
            e => {
                e.preventDefault();
                loginActions.start(usernameRef.current.value, passwordRef.current.value);
            }
        }>
            <formset disabled={loginStatus === 'loading'}>
                {loginStatus === 'error' && (
                    <div className="error-login text-danger mb-2">
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
                    <button
                        className="btn btn-primary btn-block"
                        type="button"
                        onClick={() => dispatch(
                            loginActions.start(usernameRef.current.value, passwordRef.current.value)
                        )}
                    >
                        {loginStatus === 'loading' ? <i className="fas fa-circle-notch fa-spin"/> : 'Submit'}
                    </button>
                </div>
                <a href="#" className="forgot-login text-secondary">
                    Forgot your username or password?
                </a>
            </formset>
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
            </div>
            <div className="flex-grow-1 p-4"/>
        </section>
    </LoginWrapper>
)

export default PageLogin;