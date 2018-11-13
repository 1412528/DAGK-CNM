import React from "react";
import PropTypes from "prop-types";
import "./public/signed.css";

const SignedInLink = (props) =>{
    return (
        <ul className="right">
            <li><a href="#" onClick={() => {props.signOut(); props.fetchMessage(null, null)}}>Logout</a></li>
            <li>
                <div className="btn btn-info rounded-circle" style={{backgroundImage: `url(${props.profile.photoURL})`, backgroundPosition : "center", backgroundSize : "cover", width : "30px", height : "30px"}}></div>
            </li>
        </ul>
    )
}

SignedInLink.propTypes = {
    signOut : PropTypes.func.isRequired,
    profile : PropTypes.object.isRequired
}

export default SignedInLink;