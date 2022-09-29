import React from "react";
import { Route,Redirect } from "react-router-dom";

const isLogin=()=>{
    const isLogin= localStorage.getItem("id") || false;

    return isLogin;
}

export const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
            : <Redirect to="/signin" /> 
        )} />
    );
};

export const PublicRoute = ({ ...props}) => {
    return (
        <Route  {...props} />
    );
};

export const ProtectedRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
            <Redirect to="/dashboard" />
            :  <Component {...props} />
        )} />
    );
};