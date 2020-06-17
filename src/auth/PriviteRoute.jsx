import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const Token = JSON.parse(localStorage.getItem('Token'))

const verify = () => {
    return jwt.decode(Token, { complete: true })
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <div>
        <Route {...rest} render={(props) => (
            Token == null || typeof Token === "undefined"
                ? <Fragment>
                    {alert('Please login first')}
                    <Redirect to='/login' />
                </Fragment>
                : 
                verify() ? <Component {...props} />
                    : <Fragment>
                        {alert('Please login first')}
                        {localStorage.clear()}
                        <Redirect to='/login' />
                    </Fragment>
        )} />
    </div>
)

export default PrivateRoute;