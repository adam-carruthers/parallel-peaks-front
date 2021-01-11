import {useEffect, useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import dynamic from "@redux-dynostore/react-redux";
import {
    changePasswordActions,
    changePasswordId,
    changePasswordReducer,
    changePasswordSelectors
} from "./changePasswordSlice";
import {attachReducer, dispatchAction} from "@redux-dynostore/core";
import {runSaga} from "@redux-dynostore/redux-saga";
import changePasswordSaga from "./changePasswordSaga";
import {useDispatch, useSelector} from "react-redux";

let ChangePasswordInterior = ({onHide}) => {
    const passRefOld = useRef(null);
    const passRef1 = useRef(null);
    const passRef2 = useRef(null);

    const dispatch = useDispatch();

    const status = useSelector(changePasswordSelectors.status);
    const errors = useSelector(changePasswordSelectors.error);
    console.log(errors);

    useEffect(() => {
        if(status === "success") onHide();
    })

    return (
        <form onSubmit={e => {
            e.preventDefault();
            const passOld = passRefOld.current.value;
            const pass1 = passRef1.current.value;
            const pass2 = passRef2.current.value;
            if (!pass1 || !passOld) {
                dispatch(changePasswordActions.error(["You need to enter a password!"]));
                return;
            }
            if (pass1 !== pass2) {
                dispatch(changePasswordActions.error(["Your two passwords are not the same."]))
                return;
            }
            dispatch(changePasswordActions.start({
                old_password: passOld,
                new_password1: pass1,
                new_password2: pass2
            }));
        }}>
            <fieldset disabled={status === "loading"}>
                {status === 'error' && (
                    <div className="pp-form-error text-danger mb-2 border border-danger p-2 d-flex">
                        <i className="fas fa-exclamation-triangle m-2"/>
                        <div className="p-1">{errors.map(
                            error => (
                                <div className="d-block" key={error}>{error}</div>
                            )
                        )}</div>
                    </div>
                )}
                <div className="form-group">
                    <span className="font-sans-serif font-italic">Enter your old password</span>
                    <input type="password" className="form-control" placeholder="Old Password" ref={passRefOld}/>
                </div>
                <div className="form-group">
                    <span className="font-sans-serif font-italic">Enter your new password</span>
                    <input type="password" className="form-control" placeholder="New Password" ref={passRef1}/>
                </div>
                <div className="form-group">
                    <span className="font-sans-serif font-italic">Re-enter your old password</span>
                    <input type="password" className="form-control" placeholder="Re-enter Old Password" ref={passRef2}/>
                </div>
                <div className="form-group">
                    <input type="submit" className="btn btn-primary btn-block" value={status === "loading"?"Loading...":"Submit"}/>
                </div>
            </fieldset>
        </form>
    )
}
ChangePasswordInterior = dynamic(
    changePasswordId, attachReducer(changePasswordReducer), runSaga(changePasswordSaga), dispatchAction(changePasswordActions.setIdle())
)(ChangePasswordInterior)

const ChangePassword = () => {
    const [show, setShow] = useState(false);
    const onHide = () => setShow(false)

    return (
        <>
            <button className="btn btn-py" type="button" onClick={() => setShow(true)}>
                <i className="fas fa-pencil-alt fa-lg mr-1"/>
                Change Password
            </button>
            <Modal
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Change your password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ChangePasswordInterior onHide={onHide}/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default ChangePassword;