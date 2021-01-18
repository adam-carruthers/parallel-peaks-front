import {useState} from "react";
import Modal from "react-bootstrap/Modal";
import dynamic from "@redux-dynostore/react-redux";
import {
    devicesLogoutActions,
    devicesLogoutId,
    devicesLogoutReducer,
    devicesLogoutSelectors
} from "./devicesLogoutSlice";
import {attachReducer, dispatchAction} from "@redux-dynostore/core";
import {runSaga} from "@redux-dynostore/redux-saga";
import devicesLogoutSaga from "./devicesLogoutSaga";
import {useDispatch, useSelector} from "react-redux";

let DevicesLogoutInterior = () => {
    const dispatch = useDispatch();

    const status = useSelector(devicesLogoutSelectors.status);
    const error = useSelector(devicesLogoutSelectors.error);

    return (
        <>
            {status === 'error' && (
                <div className="pp-form-error text-danger mb-2 border border-danger p-2 d-flex">
                    <i className="fas fa-exclamation-triangle m-2"/>
                    <div className="p-1">{error}</div>
                </div>
            )}
            <button
                type="button"
                className="btn btn-warning btn-block"
                disabled={status === 'loading'}
                onClick={e => {
                    e.preventDefault();
                    dispatch(devicesLogoutActions.start())
                }}
            >
                {status === 'loading' ? "Logging you out..." : "Logout of all devices (including this one)?"}
            </button>
        </>
    )
}
DevicesLogoutInterior = dynamic(
    devicesLogoutId, attachReducer(devicesLogoutReducer), runSaga(devicesLogoutSaga), dispatchAction(devicesLogoutActions.setIdle())
)(DevicesLogoutInterior)

const DevicesLogout = () => {
    const [show, setShow] = useState(false);
    const onHide = () => setShow(false);

    return (
        <>
            <button className="btn btn-pk" type="button" onClick={() => setShow(true)}>
                <i className="fas fa-door-open fa-lg mr-1"/>
                Logout of all devices
            </button>
            <Modal
                show={show}
                onHide={onHide}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Logout of all devices</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <DevicesLogoutInterior/>
                </Modal.Body>
            </Modal>
        </>
    )
}

export default DevicesLogout;