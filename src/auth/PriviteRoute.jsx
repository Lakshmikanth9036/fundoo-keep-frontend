import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import jwt from 'jsonwebtoken';

const Token = JSON.parse(localStorage.getItem('Token'))
const verify = () => {
   return jwt.decode(Token,{complete: true});
}

const PrivateRoute = ({ component: Component, ...rest }) => (
<div>
    <Route {...rest} render={(props) => (
      Token == null
        ? <Redirect to='/login' />
        : verify() ? <Component {...props} /> : <Redirect to='/login' />
    )} />
    </div>
)

  export default PrivateRoute;