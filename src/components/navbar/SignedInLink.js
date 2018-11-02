import React from "react";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import "./public/signed.css";

const SignedInLink = (props) =>{
    return (
        <ul className="right">
            <li><a href="#" onClick={props.signOut}>Logout</a></li>
            <li><NavLink to="/" className="btn btn-info rounded-circle">{props.profile.initials}</NavLink></li>
        </ul>
    )
}

SignedInLink.propTypes = {
    signOut : PropTypes.func,
    profile : PropTypes.object
}

export default SignedInLink;