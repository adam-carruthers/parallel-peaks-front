import {Switch, Route} from 'react-router-dom';
import Page404 from "../page404/page404Component";
import PageIndex from "../pageIndex/pageIndexComponent";

const Routes = () => (
    <Switch>
        <Route exact path="/">
            <PageIndex/>
        </Route>
        <Route path="*">
            <Page404/>
        </Route>
    </Switch>
)

export default Routes;