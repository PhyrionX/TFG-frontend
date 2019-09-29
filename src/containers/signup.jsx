import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { getAuth, signUp } from '../services/authentication';
import Input from '../components/commons/input';
import { AUTH_CONSTANTS } from '../reducers/auth';
import localStorageService from '../services/localStorage';

export default function Signup() {
  const dispatch = useDispatch();
  const initialRegisterForm = {
    username: '',
    email: '',
    password: '',
    repassword: ''
  }
  const initialRegisterFormErrors = {
    username: false,
    email: false,
    password: false,
    repassword: false,
    samePassword: false
  }
  const [userExistError, setUserExistError] = useState(false); 
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [registerFormErrors, setRegisterFormErrors] = useState(initialRegisterFormErrors);

  function handleClick(e) {
    e.preventDefault();
    
    let errors = {
      username: !registerForm.username,
      email: !registerForm.email,
      password: !registerForm.password,
      repassword: !registerForm.repassword,
      samePassword: registerForm.password !== registerForm.repassword
    }

    setRegisterFormErrors(errors);
    

    if (Object.values(errors).filter(err => err === true).length === 0) {
      signUp(registerForm)
        .then(({ data }) => {
          localStorageService.setAuth(data.token, data.username, data.email);
          
          dispatch({ 
            type: AUTH_CONSTANTS.SET_AUTH,
            payload: {
              token: data.token,
              user: data.user,
              email: data.email
            }})
          
          window.location.assign('/');
        })
        .catch(err => {
          console.log(err)
        }); 
    }
  }

  function handleOnChange(e) {    
    setRegisterForm({
      ...registerForm,
      [e.target.id] : e.target.value
    })

    setRegisterFormErrors(initialRegisterFormErrors);
    
  }

  return (
    <div className="tfg-login-page">
      <form className="tfg-login">
        <Input label="Username"
            type="text"
            value={ registerForm.username }
            error={ registerFormErrors.username }
            id="username"
            onChange={ handleOnChange } />
        <Input label="Email"
            type="text"
            value={ registerForm.email }
            error={ registerFormErrors.email }
            id="email"
            onChange={ handleOnChange } />
        <Input label="Password"
            type="password"
            value={ registerForm.password }
            error={ registerFormErrors.password || registerFormErrors.samePassword }
            id="password"
            onChange={ handleOnChange } />
        <Input label="Repeat password"
            type="password"
            value={ registerForm.repassword }
            error={ registerFormErrors.repassword || registerFormErrors.samePassword }
            id="repassword"
            onChange={ handleOnChange } />
        <div className="tfg-buttons">
          <button className="btn btn-primary" onClick={ handleClick }>Signup</button>
          <Link to="/">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}