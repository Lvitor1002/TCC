import React from "react";
import { Route, Navigate } from "react-router-dom";
import AuthHandler from "./AuthHandler"; // Assumindo que AuthHandler contém a lógica de autenticação

const PrivateRoute = ({ element: Element, ...rest }) => (
  <Route
    {...rest}
    element={
      AuthHandler.loggedIn() ? <Element /> : <Navigate to="/" />
    }
  />
);

export default PrivateRoute;
