import React from "react";
import { Link } from "react-router-dom";
import SignedIn from './SignedIn';
import SignedOut from "./SignedOut";
import './public/Navbar.css';
import { connect } from 'react-redux';

const Navbar = (props) =>{
    console.log(props);
    
    const { auth } = props;
    const link = auth.uid ? <SignedIn/> : <SignedOut/>
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">DAGK-1412528</Link>
                { link }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) =>{
    return {
        auth : state.firebase.auth
    }
}

export default connect(mapStateToProps)(Navbar);