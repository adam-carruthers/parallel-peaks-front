import {useEffect, useRef, useState} from "react";
import Modal from 'react-bootstrap/Modal';
import dynamic from "@redux-dynostore/react-redux";
import {
    forgotModuleId,
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
    const errors = useSelector(forgotPasswordSelectors.error);

    useEffect(() => {
        if(status === "success") {
            onHide();
        }
    })

    return (
        <form onSubmit={e => {
            e.preventDefault();
            dispatch(forgotPasswordActions.start({email: emailRef.current.value}))
        }}>
            <formset disabled={status === 'loading'}>
                {status === 'error' && (
                    <div className="error-login text-danger mb-2">
                        <i className="fas fa-exclamation-triangle mr-1"/> {errors}
                    </div>
                )}
                <div className="form-group">
                    <input className="form-control" placeholder="Enter your email here..." ref={emailRef}/>
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
    forgotModuleId, attachReducer(forgotPasswordReducer), runSaga(forgotPasswordSaga), dispatchAction(forgotPasswordActions.setIdle())
)(ForgotPasswordInterior);


const ForgotPasswordModal = (props) => (
    <Modal
        {...props}
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title>Forgot your password?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <ForgotPasswordInterior onHide={props.onHide}/>
        </Modal.Body>
    </Modal>
)


const ForgotPassword = () => {
    const [show, setShow] = useState(false);

    return (
        <>
            <span className="forgot-login text-secondary" onClick={() => setShow(true)}>
                Forgot your username or password?
            </span>
            <ForgotPasswordModal
                show={show}
                onHide={() => setShow(false)}
            />
        </>
    )
}

export default ForgotPassword;