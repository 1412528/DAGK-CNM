import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
import './public/auth.css';

class SignUp extends Component {
    state = {
        username : '',
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
        console.log(this.state);
      }
      render() {
        const { auth } = this.props;
        if(auth.uid)
          return <Redirect to="/"/>
        return (
          <div className="container">
            <div className="signin rounded">
              <form  onSubmit={this.handleSubmit}>
                <h5 className="grey-text text-darken-3">Sign Up</h5>
                <div className="form-group">
                  <label htmlFor="exampleInputEmail1">User name</label>
                  <input type="email" className="form-control" id="username" placeholder="Enter Username" onChange={this.handleChange}></input>
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
              </form>
            </div>
            <div className="signinGoogle">
              <div className="signinGoogle">
                  <span>Sign in with Google</span>
              </div>
            </div>
          </div>
          
        );
    }
}

function mapStateToProps(state) {
    return {
      auth : state.firebase.auth
    };
}

export default connect(
    mapStateToProps,
)(SignUp);