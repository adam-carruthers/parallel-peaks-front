import {useRef, useState} from "react";
import Modal from "react-bootstrap/Modal";
import dynamic from "@redux-dynostore/react-redux";
import {
    deleteAccountActions,
    deleteAccountId,
    deleteAccountReducer,
    deleteAccountSelectors
} from "./deleteAccountSlice";
import {attachReducer, dispatchAction} from "@redux-dynostore/core";
import {runSaga} from "@redux-dynostore/redux-saga";
import deleteAccountSaga from "./deleteAccountSaga";
import {useDispatch, useSelector} from "react-redux";

let DeleteAccountInterior = () => {
    const [sure, setSure] = useState(false);
    const [reallySure, setReallySure] = useState(false);

    const passwordRef = useRef(null);
    const dispatch = useDispatch();

    const status = useSelector(deleteAccountSelectors.status);
    const error = useSelector(deleteAccountSelectors.error);

    if (!sure){
        return (
            <button type="button" className="btn btn-danger btn-block" onClick={() => setSure(true)}>Are you sure you want to delete your account?</button>
        )
    }
    if(!reallySure){
        return (
            <button type="button" className="btn btn-danger btn-block" onClick={() => setReallySure(true)}>Really sure?</button>
        )
    }


    return (
        <form onSubmit={e => {
            e.preventDefault();
            const password = passwordRef.current?.value;
            if(!password) {
                dispatch(deleteAccountActions.error("You need to enter a password!"));
                return;
            }
            dispatch(deleteAccountActions.start(password))
        }}>
            <fieldset disabled={status === "loading"}>
                {status === 'error' && (
                    <div className="pp-form-error text-danger mb-2 border border-danger p-2 d-flex">
                        <i className="fas fa-exclamation-triangle m-2"/>
                        <div className="p-1">{error}</div>
                    </div>
                )}
                <div className="form-group">
                    <span className="font-sans-serif font-italic">Enter your password</span>
                    <input type="password" className="form-control" placeholder="Password" ref={passwordRef}
                           autoComplete="current-password"/>
                </div>
                <div className="form-group mb-0">
                    <input type="submit" className="btn btn-danger btn-block" value={status === "loading"?"Loading...":"Submit"}/>
                </div>
            </fieldset>
        </form>
    )
}

DeleteAccountInterior = dynamic(
    deleteAccountId, attachReducer(deleteAccountReducer), runSaga(deleteAccountSaga), dispatchAction(deleteAccountActions.setIdle())
)(DeleteAccountInterior)

const DeleteAccount = () => {
    const [show, setShow] = useState(false);
    const onHide = () => setShow(false);

    return (
        <>
            <button className="btn btn-pr" type="button" onClick={() => setShow(true)}>
                <i className="fas fa-trash-alt fa-lg mr-2"/>
                Delete Account
            </button>
            <Modal
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete your account permanently</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DeleteAccountInterior/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DeleteAccount;