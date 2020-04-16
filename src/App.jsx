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
import Search from './components/Search';
import Remainder from './components/Remainder';
import LabledNotes from './components/LabledNotes';
import ViewContext from './components/ViewContext';

class App extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       view: false
    }
  }
  
  viewHandler = () => {
    this.setState(prevState => {
      return {view: !prevState.view}
    })
  }

  render() {
    return (
      <ViewContext.Provider
      value={{view: this.state.view , viewController: this.viewHandler}}
      >
      <Router>
        <Switch>
          <Route path="/register" component={ RegistrationPage } />
          <Route path="/login" component={LoginPage}/>
          <Route path="/forgotPassword" component={ForgotPassword}/>
          <Route path="/resetPassword/:token" component={ ResetPassword } />
          <Route path="/dashboard/note" component={ Dashboard }/>
          <Route path="/dashboard/reminder" component={ Remainder }/>
          <Route path="/dashboard/archive" component={ Archive }/>
          <Route path="/dashboard/trash" component={ Trash }/>
          <Route path="/dashboard/search" component={ Search }/>
          <Route path="/dashboard/labeledNotes" component={ LabledNotes }/>
        </Switch>
      </Router>
      </ViewContext.Provider>
    );
  }
}

export default App;
