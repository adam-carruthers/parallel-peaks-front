/*
 * A wrapper component that redirects an already logged in user, and provides the login redux module.
 */
import {useEffect} from 'react';

import {Redirect, useHistory, useLocation} from 'react-router-dom';

import {DynamicModuleLoader} from 'redux-dynamic-modules';
import LoginModule from "./loginModule";

import {useSelector} from "react-redux";
import {userIsLoggedIn, userIsMatcher} from "../user/userSelectors";

import Noty from 'noty';

const LoginWrapper = ({children}) => {
    const userLoggedIn = useSelector(userIsLoggedIn);
    const userMatcher = useSelector(userIsMatcher);

    const history = useHistory();
    const location = useLocation();
    const redirectUrl = location.state?.redirectUrl;

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

    return userLoggedIn ? (
        <Redirect to={userMatcher ? '/matcher-home' : '/profile'}/>
    ) : (
        <DynamicModuleLoader modules={[LoginModule({history, redirectUrl})]}>{children}</DynamicModuleLoader>
    )
}

export default LoginWrapper;