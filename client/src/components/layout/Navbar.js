import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../Redux/actions/auth";
import styled from "styled-components";

const NavbarContainer = styled.nav`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 2rem;
    position: fixed;
    z-index: 1;
    width: 100%;
    top: 0;
    border-bottom: solid 1px #17a2b8;
    opacity: 0.9;
    background-color: #343a40;
`;

const CompanyText = styled.h1`
    margin-left: 0.5rem;
    & > a {
        color: white;
    }
`;

const ListContainer = styled.ul`
    display: flex;
`;

const NavLink = styled.li`
    color: #fff;
    padding: 0.45rem;
    margin: 0 0.25rem;
    & > a:hover {
        color: #17a2b8;
    }
    & > a {
        color: white;
    }
`;

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const onLogout = (e) => {
        e.preventDefault();
        logout();
    };

    const authLinks = (
        <ListContainer>
            <NavLink>
                <Link to="/">Home</Link>
            </NavLink>
            <NavLink>
                <Link to="/myprofile">My Profile</Link>
            </NavLink>
            <NavLink>
                <Link to="/mylistings">My Listings</Link>
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
                <Link to="/">Home</Link>
            </NavLink>
            <NavLink>
                <Link to="/listings">Listings</Link>
            </NavLink>
            <NavLink>
                <Link to="/agents">Agents</Link>
            </NavLink>
            <NavLink>
                <Link to="/contact">About</Link>
            </NavLink>
            <NavLink>
                <Link to="/login">Login</Link>
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
