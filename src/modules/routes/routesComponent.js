import {Switch, Route} from 'react-router-dom';
import Page404 from "../notAllowedPages/page404Component";
import PageIndex from "../pageIndex/pageIndexComponent";
import PageLogin from "../pageLogin/pageLoginComponent";
import RouteNeedLogin from "./routeNeedLogin";
import PageLogout from "../user/pageLogout";
import PageProfile from "../pageProfile/pageProfileComponent";
import PageForgotPassConfirm from "../pageForgotPassConfirm/pageForgotPassConfirmComponent";
import PageConfirmEmail from "../pageConfirmEmail/pageConfirmEmailComponent";

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

        {/* WARNING - Below two routes are hard coded into backend emails */}
        <Route path="/forgot-password">
            <PageForgotPassConfirm/>
        </Route>
        <Route path="/confirm-email">
            <PageConfirmEmail/>
        </Route>

        <RouteNeedLogin path="/profile">
            <PageProfile/>
        </RouteNeedLogin>
        <RouteNeedLogin path="/home">
            <div className="pp-first-section">
                <h1>HOME TO BE BUILT</h1>
            </div>
        </RouteNeedLogin>
        <Route path="*">
            <Page404/>
        </Route>
    </Switch>
)

export default Routes;