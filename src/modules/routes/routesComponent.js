import {Switch, Route} from 'react-router-dom';
import Page404 from "../notAllowedPages/page404Component";
import PageIndex from "../pageIndex/pageIndexComponent";
import PageLogin from "../pageLogin/pageLoginComponent";
import Page401 from "../notAllowedPages/page401Component";
import RouteNeedLogin from "./routeNeedLogin";
import RouteNeedMatcher from "./routeNeedMatcher";
import PageLogout from "../user/pageLogout";

const Routes = () => (
    <Switch>
        <Route exact path="/">
            <PageIndex/>
        </Route>
        <Route path="/login">
            <PageLogin/>
        </Route>
        <Route path="/logout">
            <PageLogout/>
        </Route>
        <RouteNeedLogin path="/profile">
            <div className="pp-first-section">
                <h1>PROFILE TO BE BUILT</h1>
            </div>
        </RouteNeedLogin>
        <RouteNeedMatcher path="/matcher-home">
            <div className="pp-first-section">
                <h1>MATCHER HOME TO BE BUILT</h1>
            </div>
        </RouteNeedMatcher>
        <Route path="*">
            <Page404/>
        </Route>
    </Switch>
)

export default Routes;