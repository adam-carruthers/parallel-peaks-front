import './page404.css';

import {Link} from "react-router-dom";

// TODO: Make it so that when you're logged in it gives you the option of going to your profile/matching home

const Page404 = () => (
    <section className="pp-first-section bg-404">
        <div className="box-404">
            <h1>404</h1>
            <p>You appear to have taken a wrong turn...</p>
            <div className="make-children-blocky">
                <Link to="/" className="btn btn-warning btn-pp">
                    Go Home <i className="fas fa-arrow-right ml-1"/>
                </Link>
            </div>
        </div>
    </section>
)

export default Page404;