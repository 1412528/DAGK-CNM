import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import { signUp, signInWithGoogle } from "../../store/actions/authActions";
import './public/auth.css';

class SignUp extends Component {
    state = {
        userName : '',
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
        this.props.signUp(this.state);
      }
      handleGoogleAccount = (e) => {
        this.props.signInWithGoogle();
      }
      render() {
        // console.log(this.props);
        
        const { auth, authError } = this.props;
        if(auth.uid)
          return <Redirect to="/"/>
        return (
          <div className="container">
            <div className="signin rounded">
              <form  onSubmit={this.handleSubmit}>
                <h5 className="center">Sign Up</h5>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User name</label>
                  <input type="text" className="form-control" id="userName" placeholder="Enter Username" onChange={this.handleChange}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">Email address</label>
                  <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChange}></input>
                </div>
                <div className="form-group">
                  <label htmlFor="exampleInputPassword1">Password</label>
                  <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChange}></input>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
                <div className="center red-text">
                  { authError ? <p>{authError}</p> : null }
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

function mapStateToProps(state) {
    return {
      auth : state.firebase.auth,
      authError : state.auth.authError
    };
}

function mapDispatchToProps(dispatch) {
  return {
    signUp : (newUser) => dispatch(signUp(newUser)),
    signInWithGoogle : () => dispatch(signInWithGoogle())
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUp);