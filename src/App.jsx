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
          <Route path="/register" component={ RegistrationPage } />
          <Route path="/login" component={LoginPage}/>
          <Route path="/forgotPassword" component={ForgotPassword}/>
          <Route path="/resetPassword/:token" component={ ResetPassword } />
          <Route path="/dashboard/note" component={ Dashboard }/>
          <Route path="/dashboard/archive" component={ Archive }/>
          <Route path="/dashboard/trash" component={ Trash }/>
        </Switch>
      </Router>
    );
  }
}

export default App;
