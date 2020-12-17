import './navbar.css';

import {Link} from "react-router-dom";

const Navbar = () => (
    <nav id="pp-navbar" className="navbar navbar-dark fixed-top">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand" id="pp-nav-brand">
                P<span className="d-none d-sm-inline">arallel </span>P<span className="d-none d-sm-inline">eaks</span>
            </Link>
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item">
                    <a className="nav-link active" href="#">
                        Sign In
                        <i className="fas fa-user fa-lg ml-2"/>
                    </a>
                </li>
            </ul>
        </div>
    </nav>
)

export default Navbar;