import React from 'react';
import { Navigate } from "react-router-dom";
import AuthHandler from '../utils/AuthHandler';

class LogoutComponent extends React.Component {
    componentDidMount() {
        AuthHandler.logoutUser();
    }

    render() {
        return <Navigate to="/" />;
    }
}

export default LogoutComponent;