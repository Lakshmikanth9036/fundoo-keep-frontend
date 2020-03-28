import React, { Component } from 'react';
import './App.scss';
import RegistrationPage from './components/RegistrationPage';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import Dashboard from './components/Dashboard'
import Archive from './components/Archive';
import Trash from './components/Trash';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/register" component={ RegistrationPage } />
          <Route exact path="/login" component={LoginPage}/>
          <Route exact path="/forgotPassword" component={ForgotPassword}/>
          <Route exact path="/resetPassword/:token" component={ ResetPassword } />
          <Route exact path="/dashboard/note" component={ Dashboard }/>
          <Route exact path="/dashboard/archive" component={ Archive }/>
          <Route exact path="/dashboard/trash" component={ Trash }/>
        </Switch>
      </Router>
    );
  }
}

export default App;
