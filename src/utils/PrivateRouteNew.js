import React from "react";
import { Navigate } from "react-router-dom";
import AuthHandler from "./AuthHandler";
import MainComponent from "../components/MainComponent";

const PrivateRouteNew = ({ component: Page, activepage }) => {
    return AuthHandler.loggedIn() ? (
        <MainComponent page={Page} activepage={activepage} />
    ) : (
        <Navigate to="/" />
    );
};

export default PrivateRouteNew;
