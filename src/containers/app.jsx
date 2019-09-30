import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Header } from '../components/header';
import { getAuth } from '../services/authentication';
import Login from './login';
import Signup from './signup';
import localStorageService from '../services/localStorage';
import { AUTH_CONSTANTS } from '../reducers/auth';
import Logout from './logout';
import Dashboard from './dashboard';
import { Sidebar } from '../components/sidebar';
import Configuration from './configuration';

function Index() {
  const [count, setCount] = useState(0);



  useEffect(() => {
    getAuth();
  }, []);

  useEffect(() => {
  }, [])


  return (
    <div>
      <h2>Count {count}</h2>
      <button onClick={ () => setCount(count + 1) }>Increment</button>
      <button onClick={ () => setCount(count - 1) }>Decrement</button>
    </div>
  );
}

const Counter = props => {
  const counter = useSelector(state => state.test.counter)
  const dispatch = useDispatch()

  return (
  <div>
    Hello React!! { counter }
    <button onClick={ () => dispatch({ type: 'increment-counter'}) }>Increment</button>
    <button onClick={ () => dispatch({ type: 'decrement-counter'}) }>Decrement</button>
  </div>);
}

function Users() {
  return (
    <form method="post"action="http://localhost:8080/auth/twitter">
      bre<br />
      bre<br />
      bre<br />
      bre<br />
      bre<br />
      bre<br />
      bre<br />
      bre<br />
      bre<br />
      bre<br />
      bre<br />
      <button type="submit" className="btn btn-primary pull-right">Login with Twitter</button>
    </form>);
}

function NotFound() {
  return (
    <h1>NOT FOUND</h1>
  )
}

export const App = props => {
  const [test, setTest] = useState(3);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth.token);

  useEffect(() => {
    const { token, user, email } = localStorageService.getAuth();
    
    if (token) {
      dispatch({ 
        type: AUTH_CONSTANTS.SET_AUTH,
        payload: {
          token,
          user,
          email
        }})
    }
  }, []);

  function testFunc() {
    setTest(test + 1);
  }

  return (
      <Router>
        {
          !auth ? (
            <React.Fragment>
              <Route path="/" exact component={ Login }/>
              <Route path="/signup" component={ Signup }/>
              <Route component={ NotFound }/>
            </React.Fragment>
            ) : (
            <React.Fragment>
              <Header prueba={ test } />
              <div className="cont">
                <Sidebar />
                <div className="main">
                  <Route path="/" exact component={Dashboard} />
                  <Route path="/configuration" component={Configuration} />
                </div>
              </div>
            </React.Fragment>
          )
        }
      </Router>
  )
}