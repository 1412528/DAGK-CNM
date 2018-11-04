import React, { Component } from 'react';
import './public/auth.css';
import { Redirect } from "react-router-dom";
import PropTypes from "prop-types";

class SignInPage extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  }
  handleGoogleAccount = (e) => {
    this.props.signInWithGoogle();
  }
  render() {
    const { authError, auth } = this.props;
    if (auth.uid)
      return <Redirect to="/" />
    return (
      <div className="container">
        <div className="signin rounded">
          <form onSubmit={this.handleSubmit}>
            <h5 className="center">Sign In</h5>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">Email address</label>
              <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}></input>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}></input>
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
            <div className="center red-text">
              {authError ? <p>{authError}</p> : null}
            </div>
          </form>
        </div>
        <div className="signinGoogle" onClick={this.handleGoogleAccount}>
          <div className="signinGoogle" >
            <span>Sign in with Google</span>
          </div>
        </div>
      </div>
    );
  }
}

SignInPage.propTypes = {
  auth: PropTypes.object,
  authError: PropTypes.string,
  signIn: PropTypes.func,
  signInWithGoogle: PropTypes.func
}

export default SignInPage;