import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from './containers/navbar/Navbar';
import DashBoard from './components/dashboard/DashBoard';
import SignIn from './containers/auth/SignIn';
import SignUp from './containers/auth/SignUp';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar/>
          <Switch>
            <Route exact path='/' component = {DashBoard} />
            <Route path='/signin' component = {SignIn} />
            <Route path='/signup' component = {SignUp} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
