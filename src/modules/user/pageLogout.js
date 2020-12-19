import {useEffect} from "react";

import {Redirect} from "react-router-dom";

import {useDispatch, useSelector} from "react-redux";
import {userActions} from "./userActions";

import Noty from 'noty';
import {userIsLoggedIn} from "./userSelectors";

const PageLogout = () => {
    const userLoggedIn = useSelector(userIsLoggedIn);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userActions.logout());
        if (userLoggedIn) {
            new Noty({
                type: "success",
                text: "You have been logged out.",
                layout: 'bottomRight',
                timeout: 3000
            }).show();
        } else {
            new Noty({
                type: "alert",
                text: "You weren't logged in 🤔",
                layout: 'bottomRight',
                timeout: 3000
            }).show()
        }
    })

    return <Redirect to="/" />
}

export default PageLogout;