import {useEffect} from 'react';
import {Route} from 'react-router-dom';

import {useSelector} from "react-redux";
import {userIsLoggedIn, userIsMatcher} from "../user/userSelectors";
import Page401 from "../notAllowedPages/page401Component";
import Page403 from "../notAllowedPages/page403Component";


const RouteNeedMatcher = ({children, ...rest}) => {
    const userLoggedIn = useSelector(userIsLoggedIn);
    const userMatcher = useSelector(userIsMatcher);

    return (
        <Route {...rest}>
            {userLoggedIn ? (
                userMatcher ? (
                    children
                ):(
                    <Page403/>
                )
            ):(
                <Page401/>
            )}
        </Route>
    )
}

export default RouteNeedMatcher;