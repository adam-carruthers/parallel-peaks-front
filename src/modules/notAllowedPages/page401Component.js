import NotAllowedPage from "./notAllowedComponent";

import {Link, useLocation} from "react-router-dom";

// TODO: Make it so that when you're logged in it gives you the option of going to your profile/matching home

const Page401 = () => {
    const location = useLocation();

    return (
        <NotAllowedPage>
            <h1>401</h1>
            <p>You need to be logged in to go to this area.</p>
            <div className="make-children-blocky">
                <Link to={{pathname: "/login", state: {redirectUrl: location}}} className="btn btn-warning btn-pp">
                    Login <i className="fas fa-arrow-right ml-1"/>
                </Link>
            </div>
        </NotAllowedPage>
    )
}

export default Page401;