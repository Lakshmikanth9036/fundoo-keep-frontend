import React, { Component } from 'react';
import './App.scss';
import RegistrationPage from './components/RegistrationPage';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Note from './components/Note';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ RegistrationPage } />
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/forgotPassword" component={ForgotPassword}/>
          <Route exact path="/resetPassword/:token" component={ ResetPassword } />
          <Route exact path="/note/dashboard" component={ Note }/>
        </Switch>
      </Router>
     
    );
  }
}

export default App;
