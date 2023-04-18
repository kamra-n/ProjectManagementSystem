import React from 'react'
import { Navigate, Outlet, Route } from "react-router-dom";

const LoginProtected = ({ children, ...rest }) => {
    let auth = localStorage.getItem('token');
    return !auth ? <Outlet /> : <Navigate to="/" />;
}

export default LoginProtected