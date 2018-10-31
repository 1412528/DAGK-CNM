import React from "react";
import { NavLink } from "react-router-dom";

const SignedIn = () =>{
    return (
        <ul className="right">
            <li><NavLink to="/">Logout</NavLink></li>
            <li><NavLink to="/" className="btn btn-info rounded-circle">N</NavLink></li>
        </ul>
    )
}

export default SignedIn;