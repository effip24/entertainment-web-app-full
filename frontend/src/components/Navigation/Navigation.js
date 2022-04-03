import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

import "./Navigation.css";

const Navigation = ({ loggedIn }) => {
  const location = useLocation();

  const isHome = location.pathname === "/";
  const isMovies = location.pathname === "/movies";
  const isTv = location.pathname === "/tv";
  const isSaved = location.pathname === "/saved";

  return (
    <nav className="navigation">
      <ul className="navigation__list">
        <li className="navigation__item">
          <Link className="navigation__link" to="/">
            <i
              className={`navigation__icon navigation__icon_type_home ${
                isHome ? "navigation__icon_home" : ""
              }`}
            ></i>
          </Link>
        </li>

        <li className="navigation__item">
          <Link className="navigation__link" to="/movies">
            <i
              className={`navigation__icon navigation__icon_type_movies ${
                isMovies ? "navigation__icon_movies" : ""
              }`}
            ></i>
          </Link>
        </li>

        <li className="navigation__item">
          <Link className="navigation__link" to="/tv">
            <i
              className={`navigation__icon navigation__icon_type_tv ${
                isTv ? "navigation__icon_tv" : ""
              }`}
            ></i>
          </Link>
        </li>

        {loggedIn ? (
          <li className="navigation__item">
            <Link className="navigation__link" to="/saved">
              <i
                className={`navigation__icon navigation__icon_type_bookmarked ${
                  isSaved ? "navigation__icon_bookmark" : ""
                }`}
              ></i>
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul>
    </nav>
  );
};
export default Navigation;
