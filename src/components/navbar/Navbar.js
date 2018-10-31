import React from "react";
import { Link } from "react-router-dom";
import SignedIn from './SignedIn';
import SignedOut from "./SignedOut";
import './public/Navbar.css';

const Navbar = () =>{
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">DAGK-1412528</Link>
                <SignedOut/>
                <SignedIn/>
            </div>
        </nav>
    )
}

export default Navbar;