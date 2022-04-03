import "./SideNav.css";
import { Link, useLocation } from "react-router-dom";

import Navigation from "../Navigation/Navigation";

import logo from "../../images/logo.svg";

const SideNav = ({ loggedIn, onLogout }) => {
  const location = useLocation();

  const isLogin = location.pathname === "/login";
  const isRegister = location.pathname === "/signup";

  return (
    <>
      {!isLogin && !isRegister ? (
        <div className="side-nav">
          <div className="side-nav-container">
            <div className="side-nav__logo-container">
              <img className="side-nav__logo" src={logo} alt="logo"></img>
              <Navigation loggedIn={loggedIn} />
            </div>

            <div className="side-nav__login-wrap">
              <Link
                className="side-nav__login"
                to="/login"
                onClick={onLogout}
              ></Link>
              <label className="side-nav__login-label">
                {loggedIn ? "Log out" : "Log in"}
              </label>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default SideNav;
