import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signInWithGoogle } from "../../store/actions/authActions";
import './public/auth.css';
import { Redirect } from "react-router-dom";

class SignIn extends Component {
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
        if(auth.uid)
          return <Redirect to="/"/>
        return (
          <div className="container">
            <div className="signin rounded">
              <form  onSubmit={this.handleSubmit}>
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
                  { authError ? <p>{authError}</p> : null }
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

const mapStateToProps = (state) => {
  return {
    authError : state.auth.authError,
    auth : state.firebase.auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    signIn : (creds) => dispatch(signIn(creds)),
    signInWithGoogle : () => dispatch(signInWithGoogle())
  };
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignIn);