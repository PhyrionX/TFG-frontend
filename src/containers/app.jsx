import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HashRouter as Router, Route, Link } from "react-router-dom";
import { Header } from '../components/header';
import { getAuth } from '../services/authentication';
import Login from './login';
import Signup from './signup';

function Index() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  useEffect(() => {
    console.log('render!')
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


export const App = props => {
  const [test, setTest] = useState(3)
  
  useEffect(() => {
    console.log('mounted');
    // getAuth();
  }, []);

  function testFunc() {
    setTest(test + 1);
  }

  return (
      <Router>
        <button onClick={ testFunc }>hi { test }</button>
          {
            true ? (
            <Router>
              <Route path="/" exact component={ Login }/>
              <Route path="/signup" component={ Signup }/>
            </Router>) : (
              <React.Fragment>
                <Header prueba={ test } />
                <div className="main">
                  <button onClick={ () => setTest(test + 1) }>mmm</button>
                    <Route path="/" exact component={Index} />
                    <Route path="/counter/" component={Counter} />
                    <Route path="/users/" component={Users} />        
                </div>
              </React.Fragment>
            )
          }
      </Router>
  )
}