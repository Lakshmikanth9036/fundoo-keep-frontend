import React, { Component } from 'react';
import './App.css';
import RegistrationPage from './components/RegistrationPage';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import LoginPage from './components/LoginPage';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ RegistrationPage } />
          <Route exact path="/login" component={LoginPage}/>
        </Switch>
      </Router>
     
    );
  }
}

export default App;
