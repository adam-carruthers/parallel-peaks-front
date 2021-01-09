/*
 * A wrapper component that redirects an already logged in user, and provides the login redux module.
 */
import {useEffect} from 'react';

import {Redirect} from 'react-router-dom';

import {useSelector} from "react-redux";
import {userIsLoggedIn} from "../user/userSelectors";

import Noty from 'noty';

const LoginWrapper = ({children}) => {
    const userLoggedIn = useSelector(userIsLoggedIn);

    useEffect(() => {
        if(userLoggedIn) {
            new Noty({
                type: 'info',
                text: "You're already logged in!",
                layout: 'bottomRight',
                timeout: 3000
            }).show();
        }
    }, [])

    const locationRedirectUrl = useSelector(state => state.router?.location?.state?.redirectUrl);

    return userLoggedIn ? (
        <Redirect to={locationRedirectUrl || '/home'}/>
    ) : (
        <>{children}</>
    )
}

export default LoginWrapper;