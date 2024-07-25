import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = !!sessionStorage.getItem('access_token');
  const timeFromLocalStorage = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem("time") : null;
  const time = timeFromLocalStorage ? JSON.parse(timeFromLocalStorage) : "";
  const now = new Date().getTime();
  if (!isAuthenticated || now > time) {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('userName');
    navigate('/login');
  }
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
