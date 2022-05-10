import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute ( { children } ) {

  const userLoggedIn = localStorage.getItem('user');

  return userLoggedIn !== null ? children : <Navigate to={'/login'} /> 
}