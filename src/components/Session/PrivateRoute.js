import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import * as ROLES from '../../constants/roles'
export const PrivateRoute = ({ component: Component, roles, ...rest }) => (

    <Route {...rest} render={props => {
        const currentUser = JSON.parse(localStorage.getItem('authUser'))
        if (currentUser.roles === ROLES.ADMIN) {
        if (!currentUser) {
                return <Redirect to={{ pathname: '/admin-signin', state: { from: props.location } }} />
            }
        }else {
            if (!currentUser) {
                return <Redirect to={{ pathname: '/signin', state: { from: props.location } }} />
            } 
        }

        // check if route is restricted by role
        if (roles && roles.indexOf(currentUser.roles) === -1) {
            // role not authorised so redirect to home page
            if(currentUser.roles ===ROLES.ADMIN){
            return <Redirect to={{ pathname: '/admin-signin' }} />
        }else{
            return <Redirect to={{ pathname: '/signin' }} />
        }
        }
        // authorised so return component
        return <Component {...props} />
    }} />
)