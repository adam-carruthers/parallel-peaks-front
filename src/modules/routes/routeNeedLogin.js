import {useEffect} from 'react';
import {Route} from 'react-router-dom';

import {useSelector} from "react-redux";
import {userIsLoggedIn} from "../user/userSelectors";
import Page401 from "../notAllowedPages/page401Component";


const RouteNeedLogin = ({children, ...rest}) => {
    const userLoggedIn = useSelector(userIsLoggedIn);

    return (
        <Route {...rest}>
            {userLoggedIn ? (
                children
            ):(
                <Page401/>
            )}
        </Route>
    )
}

export default RouteNeedLogin;