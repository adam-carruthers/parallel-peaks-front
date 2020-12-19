import './pageIndex.css';

import {Link} from "react-router-dom";

// TODO: Make it so that the menu changes when you're logged in

const PageIndex = () => (
    <>
        <section className="section-1-index">
            <h1 className="pp-box-shadow bg-white">
                Exchange albums, hear new songs, meet new people.
            </h1>
            <Link to="/sign-up" className="btn btn-py btn-pp-ls option-index">
                Sign up to be matched <i className="fas fa-arrow-right ml-auto"/>
            </Link>
            <Link to="/login" className="btn btn-pr btn-pp-ls option-index">
                Login to your account <i className="fas fa-arrow-right ml-auto"/>
            </Link>
            <a href="#about-us-index" className="btn btn-pb btn-pp-ls option-index">
                Find out more about us <i className="fas fa-arrow-down ml-auto"/>
            </a>
        </section>
        <section>
            <div id="about-us-index" className="container pt-4 pb-4">
                <h1>About us</h1>
                <p className="font-alice">
                    In this section we will explain who we are and stuff.
                    When I get round to it that is...
                </p>
            </div>
        </section>
    </>
)

export default PageIndex;