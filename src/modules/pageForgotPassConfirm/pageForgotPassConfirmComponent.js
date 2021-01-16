import './forgotPassConfirm.css';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef} from "react";
import Noty from 'noty';
import {useHistory} from 'react-router-dom';
import {userIsLoggedIn} from "../user/userSelectors";
import dynamic from "@redux-dynostore/react-redux";
import {
    forgotPassConfirmActions,
    forgotPassConfirmId,
    forgotPassConfirmReducer,
    forgotPassConfirmSelectors
} from "./forgotPassConfirmSlice";
import {attachReducer, dispatchAction} from "@redux-dynostore/core";
import {runSaga} from "@redux-dynostore/redux-saga";
import forgotPassConfirmSaga from "./forgotPassConfirmSaga";


let ForgotPassInner = ({token, uid}) => {
    const passRef1 = useRef(null);
    const passRef2 = useRef(null);

    const dispatch = useDispatch();
    const status = useSelector(forgotPassConfirmSelectors.status)
    const error = useSelector(forgotPassConfirmSelectors.error)

    return (
        <form onSubmit={e=>{
            e.preventDefault();
            const pass1 = passRef1.current.value;
            const pass2 = passRef2.current.value;
            if (!pass1) {
                dispatch(forgotPassConfirmActions.error("You must enter a new password."));
                return;
            }
            if (pass1 !== pass2) {
                dispatch(forgotPassConfirmActions.error("Your two passwords do not match."));
                return;
            }

            dispatch(forgotPassConfirmActions.start({
                token,
                uid,
                new_password1: pass1,
                new_password2: pass2
            }))
        }}>
            <fieldset disabled={status === "loading"}>
                {status === 'error' && (
                    <div className="pp-form-error text-danger mb-3 border border-danger p-2">
                        <i className="fas fa-exclamation-triangle mr-1"/> {error}
                    </div>
                )}
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="New Password" ref={passRef1}
                           autoComplete="new-password"/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Re-enter Password" ref={passRef2}
                           autoComplete="new-password"/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary btn-block" value={status === "loading"?"Loading...":"Submit"}/>
                </div>
            </fieldset>
        </form>
    )
}
ForgotPassInner = dynamic(
    forgotPassConfirmId, attachReducer(forgotPassConfirmReducer), runSaga(forgotPassConfirmSaga), dispatchAction(forgotPassConfirmActions.setIdle())
)(ForgotPassInner);


const PageForgotPassConfirm = () => {
    // This component redirects if the page wasn't accessed with a token and uid
    // It also displays the more static outer code for the page
    const history = useHistory();
    const locationQuery = useSelector(state => state.router?.location?.query);
    const token = locationQuery?.token;
    const uid = locationQuery?.uid;
    const hasNeededDetails = token && uid;

    useEffect(() => {
        if(!hasNeededDetails){
            new Noty({
                type: 'error',
                text: "You don't have the needed details to reset the password. Did you make sure to access that page by a link?",
                layout: 'bottomRight',
                timeout: 3000
            }).show();
            history.push('/')
        }
    }, [])

    return (
        <section className="pp-first-section bg-blue-waves d-flex flex-column align-items-center">
            <div className="flex-grow-1 p-3"/>
            <div className="bg-white pp-box-shadow p-4 box-forgot-pass-confirm">
                <h1>Password Reset Form</h1>
                <p className="text-muted font-sans-serif">
                    Please enter your new password.
                </p>
                <ForgotPassInner token={token} uid={uid}/>
            </div>
            <div className="flex-grow-1 p-3"/>
        </section>
    )
}

export default PageForgotPassConfirm;