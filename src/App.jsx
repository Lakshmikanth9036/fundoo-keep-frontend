import React, { Component } from 'react';
import './App.scss';
import RegistrationPage from './components/RegistrationPage';
import { Route, Switch } from 'react-router-dom'
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
import PrivateRoute from './auth/PriviteRoute';

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      view: false
    }
  }

  viewHandler = () => {
    this.setState(prevState => {
      return { view: !prevState.view }
    })
  }

  render() {
    return (
      <ViewContext.Provider
        value={{ view: this.state.view, viewController: this.viewHandler }}
      >
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegistrationPage} />
          <Route path="/forgotPassword" component={ForgotPassword} />
          <Route path="/resetPassword/:token" component={ResetPassword} />
          <PrivateRoute path="/dashboard/note" component={Dashboard} />
          <PrivateRoute path="/dashboard/reminder" component={Remainder} />
          <PrivateRoute path="/dashboard/archive" component={Archive} />
          <PrivateRoute path="/dashboard/trash" component={Trash} />
          <PrivateRoute path="/dashboard/search" component={Search} />
          <PrivateRoute path="/dashboard/labeledNotes" component={LabledNotes} />
          <Route component={LoginPage} />
        </Switch>
      </ViewContext.Provider>
    );
  }
}

export default App;
