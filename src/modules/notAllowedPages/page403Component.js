import NotAllowedPage from "./notAllowedComponent";

import {Link} from "react-router-dom";

// This page is for logged in people only, so we can show the profile link.

const Page403 = () => (
    <NotAllowedPage>
        <h1>403</h1>
        <p>This page is for matchers only, and your account isn't a matcher sorry!</p>
        <div className="make-children-blocky">
            <Link to="/profile" className="btn btn-warning btn-pp">
                Go to your profile <i className="fas fa-arrow-right ml-1"/>
            </Link>
        </div>
    </NotAllowedPage>
)

export default Page403;