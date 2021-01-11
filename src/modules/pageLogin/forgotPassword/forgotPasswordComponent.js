import {useEffect, useRef, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import dynamic from "@redux-dynostore/react-redux";
import {
    forgotPasswordId,
    forgotPasswordActions,
    forgotPasswordReducer,
    forgotPasswordSelectors
} from "./forgotPasswordSlice";
import {attachReducer, dispatchAction} from "@redux-dynostore/core";
import {runSaga} from "@redux-dynostore/redux-saga";
import forgotPasswordSaga from "./forgotPasswordSaga";
import {useDispatch, useSelector} from "react-redux";

let ForgotPasswordInterior = ({onHide}) => {
    const emailRef = useRef(null);
    const dispatch = useDispatch();

    const status = useSelector(forgotPasswordSelectors.status);
    const error = useSelector(forgotPasswordSelectors.error);

    useEffect(() => {
        if(status === "success") onHide();
    })

    return (
        <form onSubmit={e => {
            e.preventDefault();
            const email = emailRef.current.value;
            if (!email) {
                dispatch(forgotPasswordActions.error("You need to enter an email!"));
                return;
            }
            dispatch(forgotPasswordActions.start({email}));
        }}>
            <formset disabled={status === 'loading'}>
                {status === 'error' && (
                    <div className="pp-form-error text-danger mb-2">
                        <i className="fas fa-exclamation-triangle mr-1"/> {error}
                    </div>
                )}
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Enter your email here..." ref={emailRef}/>
                </div>
                <div className="form-group">
                    <input
                        className="btn btn-primary btn-block"
                        type="submit"
                        value={status === 'loading' ? "Loading..." : "Send password reset email"}
                    />
                </div>
            </formset>
        </form>
    )
}
ForgotPasswordInterior = dynamic(
    forgotPasswordId, attachReducer(forgotPasswordReducer), runSaga(forgotPasswordSaga), dispatchAction(forgotPasswordActions.setIdle())
)(ForgotPasswordInterior);


const ForgotPassword = () => {
    const [show, setShow] = useState(false);
    const onHide = () => setShow(false)

    return (
        <>
            <span className="forgot-login text-secondary" onClick={() => setShow(true)}>
                Forgot your username or password?
            </span>
            <Modal
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Forgot your password?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ForgotPasswordInterior onHide={onHide}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ForgotPassword;