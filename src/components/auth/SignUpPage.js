import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import './public/auth.css';
import PropTypes from "prop-types";

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.email = React.createRef();
    this.password = React.createRef();
    this.userName = React.createRef();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signUp(
      {
        email: this.email.current.value,
        password: this.password.current.value,
        userName: this.userName.current.value
      });
  }
  handleGoogleAccount = (e) => {
    this.props.signInWithGoogle();
  }
  render() {
    const { auth, authError } = this.props;
    if (auth.uid)
      return <Redirect to="/" />
    return (
      <div className="container">
        <div className="signin rounded">
          <form onSubmit={this.handleSubmit}>
            <h5 className="center">Sign Up</h5>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">User name</label>
              <input type="text" className="form-control" id="userName" placeholder="Enter Username" ref={this.userName}></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" ref={this.email}></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" ref={this.password}></input>
            </div>
            <button type="submit" className="btn btn-primary">Signup</button>
            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
          </form>
        </div>
        <div className="signinGoogle" onClick={this.handleGoogleAccount}>
          <div className="signinGoogle">
            <span >Sign in with Google</span>
          </div>
        </div>
      </div>
    );
  }
}

SignUpPage.propTypes = {
  auth: PropTypes.object.isRequired,
  authError: PropTypes.string,
  signUp: PropTypes.func.isRequired,
  signInWithGoogle: PropTypes.func.isRequired
}

export default SignUpPage;