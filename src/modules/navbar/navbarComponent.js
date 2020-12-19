import './navbar.css';

import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {userIsLoggedIn, userIsMatcher} from "../user/userSelectors";

const NavbarUserSection = () => {
    const userLoggedIn = useSelector(userIsLoggedIn);
    const userMatcher = useSelector(userIsMatcher);

    if (!userLoggedIn) {
        return (
            <li className="nav-item">
                <Link to="/login" className="nav-link active" href="#">
                    Login
                    <i className="fas fa-user fa-lg ml-2"/>
                </Link>
            </li>
        )
    } else {
        return (
            <>
                {userMatcher && (
                    <li className="nav-item mr-3">
                        <Link to="/matcher-home" className="nav-link active">
                            <span className="d-none d-sm-inline">Matcher Home</span>
                            <i className="fas fa-home ml-2"/>
                        </Link>
                    </li>
                )}
                <li className="nav-item mr-3">
                    <Link to="/profile" className="nav-link active">
                        Me
                        <i className="fas fa-user fa-lg ml-2"/>
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/logout" className="nav-link">
                        Logout
                    </Link>
                </li>
            </>
        )
    }
}

const Navbar = () => (
    <nav id="pp-navbar" className="navbar navbar-dark fixed-top">
        <div className="container-fluid">
            <Link to="/" className="navbar-brand" id="pp-nav-brand">
                P<span className="d-none d-sm-inline">arallel </span>P<span className="d-none d-sm-inline">eaks</span>
            </Link>
            <ul className="nav navbar-nav flex-row ml-auto">
                <NavbarUserSection/>
            </ul>
        </div>
    </nav>
)

export default Navbar;