import React from "react";
import { Link } from "react-router-dom";
import { isLoaded } from 'react-redux-firebase';
import SignedIn from '../../containers/navbar/SignedIn';
import SignedOutLink from "./SignedOutLink";
import PropTypes from 'prop-types';
import './public/Navbar.css';

const NavbarLink = (props) =>{
    const { auth, profile } = props;
    let link = auth.uid ? <SignedIn profile={profile}/> : <SignedOutLink/>;
    
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">CHAT APP</Link>
                { link }
            </div>
        </nav>
    )
}

NavbarLink.propTypes = {
    auth : PropTypes.object.isRequired,
    profile : PropTypes.object.isRequired
}

export default NavbarLink;