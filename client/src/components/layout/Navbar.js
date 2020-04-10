import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../Redux/actions/auth";
import styled from "styled-components";

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 2rem 2rem;
    z-index: 1;
    width: 100%;
    top: 0;
    opacity: 0.9;
    background-color: #17a2b8;
    @media (max-width: 1230px) {
        display: block;
        text-align: center;
    }
`;

const CompanyText = styled.h1`
    margin-left: 0.5rem;
    & > a {
        color: white;
    }
`;

const ListContainer = styled.ul`
    display: flex;
    @media (max-width: 1230px) {
        width: fit-content;
        margin: auto;
    }
`;

const NavLink = styled.li`
    color: #fff;
    padding: 0.45rem;
    margin: 0 0.25rem;
    & > a:hover {
        color: #deeaee;
    }
    & > a {
        color: white;
    }
`;

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    useEffect(() => {
        setPath(window.location.pathname);
        console.log(window.location.pathname);
    }, []);

    const [path, setPath] = useState("");

    const onLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const onPath = (e) => {
        console.log(e.target.href);
        const pathArr = e.target.href.split("3000");
        setPath(pathArr[1]);
        console.log(pathArr[1]);
    };

    const authLinks = (
        <ListContainer>
            <NavLink>
                <Link to="/myprofile" onClick={onPath} className={path === "/myprofile" ? "active-nav" : ""}>
                    My Profile
                </Link>
            </NavLink>
            <NavLink>
                <Link to="/mylistings" onClick={onPath} className={path === "/mylistings" ? "active-nav" : ""}>
                    My Properties
                </Link>
            </NavLink>
            <NavLink>
                <a onClick={onLogout} href="#!">
                    <i className="fas fa-sign-out-alt"></i> <span className="hide-sm">Logout</span>
                </a>
            </NavLink>
        </ListContainer>
    );

    const guestLinks = (
        <ListContainer>
            <NavLink>
                <Link to="/" onClick={onPath} className={path === "/" ? "active-nav" : ""}>
                    Home
                </Link>
            </NavLink>
            <NavLink>
                <Link to="/listings" onClick={onPath} className={path.includes("/listings") ? "active-nav" : ""}>
                    Properties
                </Link>
            </NavLink>
            <NavLink>
                <Link to="/agents" onClick={onPath} className={path === "/agents" ? "active-nav" : ""}>
                    Agents
                </Link>
            </NavLink>
            <NavLink>
                <Link to="/login" onClick={onPath} className={path === "/login" ? "active-nav" : ""}>
                    Login
                </Link>
            </NavLink>
        </ListContainer>
    );

    return (
        <NavbarContainer>
            <CompanyText>
                <Link to="/">
                    <i className="fas fa-home"></i> Pro 1 Realty
                </Link>
            </CompanyText>
            {!loading && <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>}
        </NavbarContainer>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

const mapDispatchToProps = {
    logout
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
