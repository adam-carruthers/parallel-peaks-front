import './pageIndex.css';

import {Link} from "react-router-dom";

// TODO: Make it so that the

const PageIndex = () => (
    <div className="section-1-index">
        <h1 className="pp-box-shadow bg-white">
            Exchange albums, hear new songs, meet new people.
        </h1>
        <Link to="/sign-up" className="btn btn-py btn-pp-ls option-index">
            Sign up to be matched <i className="fas fa-arrow-right ml-auto"/>
        </Link>
        <Link to="/login" className="btn btn-pr btn-pp-ls option-index">
            Login to your account <i className="fas fa-arrow-right ml-auto"/>
        </Link>
    </div>
)

export default PageIndex;