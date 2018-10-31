import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const SignedIn = (props) =>{
    return (
        <ul className="right">
            <li><a onClick={props.signOut}>Logout</a></li>
            <li><NavLink to="/" className="btn btn-info rounded-circle">N</NavLink></li>
        </ul>
    )
}

const mapDispatchToProps = (dispatch) =>{
    return{
        signOut : () => dispatch(signOut())
    }
}

export default connect(null, mapDispatchToProps)(SignedIn);