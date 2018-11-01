import React from "react";
import { Link } from "react-router-dom";
import SignedIn from './SignedIn';
import SignedOut from "./SignedOut";
import './public/Navbar.css';
import { connect } from 'react-redux';

const Navbar = (props) =>{
    
    const { auth, profile } = props;
    const link = auth.uid ? <SignedIn profile={profile}/> : <SignedOut/>
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link to="/" className="navbar-brand">CHAT APP</Link>
                { link }
            </div>
        </nav>
    )
}

const mapStateToProps = (state) =>{
    return {
        auth : state.firebase.auth,
        profile : state.firebase.profile
    }
}

export default connect(mapStateToProps)(Navbar);