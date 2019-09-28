import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="tfg-login-page">
      <form className="tfg-login">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Username..."/>
        </div>
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Password..."/>
        </div>
        <div className="tfg-buttons">
          <button className="btn btn-primary" onClick={ (e) => e.preventDefault()}>Login</button>
          <Link to="/signup">
            Sign up
          </Link>
        </div>
      </form>
    </div>
  );
}