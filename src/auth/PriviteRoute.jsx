import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import jwt from 'jsonwebtoken';

const Token = JSON.parse(localStorage.getItem('Token'))
const verify = () => {
    if(jwt.decode(Token,{complete: true}) !== null && typeof Token !== 'undefined'){
        return true;
    }
    else{
        localStorage.clear();
        return false;
    }
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