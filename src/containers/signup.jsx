import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Signup() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  useEffect(() => {
    console.log('render!')
  }, [])

  return (
    <div className="tfg-login-page">
      <form className="tfg-login">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Username..."/>
        </div>
        <div className="form-group">
          <input type="email" className="form-control" placeholder="email..."/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Password..."/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Repeat Password..."/>
        </div>
        <div className="tfg-buttons">
          <button className="btn btn-primary" onClick={ (e) => e.preventDefault()}>Signup</button>
          <Link to="/">
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}