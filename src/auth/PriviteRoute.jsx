import React, { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const Token = JSON.parse(localStorage.getItem('Token'))

const verify = () => {
    console.log(jwt.decode(Token, { complete: true }))
    return jwt.decode(Token, { complete: true })
}

const PrivateRoute = ({ component: Component, ...rest }) => (
    <div>
        <Route {...rest} render={(props) => (
            Token == null || typeof Token === "undefined"
                ? <Redirect to='/login' />
                : verify() ? <Component {...props} />
                    : <Fragment>
                        {localStorage.clear()}
                        <Redirect to='/login' />
                    </Fragment>
        )} />
    </div>
)

export default PrivateRoute;