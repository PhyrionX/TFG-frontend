import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Link } from "react-router-dom";
import { AUTH_CONSTANTS } from '../reducers/auth';
import localStorageService from '../services/localStorage';

export default function Logout() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    localStorageService.deleteAuth();
    dispatch({type: AUTH_CONSTANTS.LOGOUT});
    window.location.assign('/#/')
  }, []); 

  return (
    <React.Fragment />
  );
}