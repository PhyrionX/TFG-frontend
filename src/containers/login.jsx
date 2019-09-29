import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import Input from '../components/commons/input';
import { login } from '../services/authentication';
import localStorageService from '../services/localStorage';
import { AUTH_CONSTANTS } from '../reducers/auth';

export default function Login() {
  const dispatch = useDispatch();
  const initialLoginForm = {
    email: '',
    password: '',
  }
  
  const [loginForm, setLoginForm] = useState(initialLoginForm);

  function handleOnChange(e) {    
    setLoginForm({
      ...loginForm,
      [e.target.id] : e.target.value
    })    
  }

  function handleClick(e) {
    e.preventDefault();
    
    login(loginForm)
      .then(({ data }) => {
        console.log(data.token, data.username, data.email);
        
        localStorageService.setAuth(data.token, data.username, data.email);
          
        dispatch({ 
          type: AUTH_CONSTANTS.SET_AUTH,
          payload: {
            token: data.token,
            user: data.user,
            email: data.email
          }})
        
      })
      .catch((err) => {
        console.log(err);
        
      })
  }

  return (
    <div className="tfg-login-page">
      <form className="tfg-login">
        <Input label="email"
            type="text"
            value={ loginForm.email }
            id="email"
            onChange={ handleOnChange } />
        <Input label="Password"
            type="password"
            value={ loginForm.password }
            id="password"
            onChange={ handleOnChange } />
        <div className="tfg-buttons">
          <button className="btn btn-primary" onClick={ handleClick }>Login</button>
          <Link to="/signup">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}