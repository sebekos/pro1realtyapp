import React from "react";
import { uuid } from "utils";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "reduxStore";
import Pro1Logo from "img/pro1cyclinglogo.png";

// eslint-disable-next-line
import styles from "./style.scss";

const routes = [
  { route: "", image: Pro1Logo, text: "PRO1" },
  { route: "/", image: false, text: "About" },
  { route: "/team", image: false, text: "Agents" },
  { route: "/newsmedia", image: false, text: "News" },
  // { route: "/partners", image: false, text: "Contact" },
  { route: "/contact", image: false, text: "Contact" },
];

const adminRoutes = [
  { route: "/editteam", image: false, text: "TEAM" },
  { route: "/editschedule", image: false, text: "SCHEDULE" },
  { route: "/editnews", image: false, text: "NEWS" },
  { route: "/login", image: false, text: "LOGOUT", useLogout: true },
];

const Menu = ({ isAuth, logout }) => {
  const { pathname } = useLocation();
  const renderRoutes = isAuth ? adminRoutes : routes;
  const curRoute = renderRoutes.find((o) => o.route === pathname);
  return (
    <div className="container">
      <div className="item-container">
        {renderRoutes.map((o) =>
          o.route ? (
            <div
              key={uuid()}
              className={`item ${pathname === o.route ? "active-link" : ""}`}
            >
              <Link
                to={`${o.route}`}
                onClick={() => (o.useLogout ? logout() : window.scrollTo(0, 0))}
              >
                {o.text}
              </Link>
            </div>
          ) : (
            <div key={uuid()} className="menu-logo-container">
              <Link to={`/`} onClick={() => window.scrollTo(0, 0)}>
                <img className="menu-logo-img" alt="Pro1" src={o.image} />
              </Link>
            </div>
          )
        )}
      </div>
      <div className="item-container-dropdown">
        <div className="menu-logo-dropdown">
          <Link to={`/`} onClick={() => window.scrollTo(0, 0)}>
            <img className="menu-logo-img" alt="Pro1" src={Pro1Logo} />
          </Link>
        </div>
        <div className="dropdown">
          <div>
            <button className="dropbtn">
              {curRoute ? curRoute.text : "Login"}
            </button>
          </div>
          <div className="dropdown-content">
            {renderRoutes
              .filter((o) => o.route)
              .map((o) => (
                <Link
                  to={`${o.route}`}
                  onClick={() =>
                    o.useLogout ? logout() : window.scrollTo(0, 0)
                  }
                >
                  {o.text}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  isAuth: state.auth.isAuth,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
