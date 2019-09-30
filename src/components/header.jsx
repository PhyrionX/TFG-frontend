import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import './header.scss'

export const Header = ({ prueba }) => {
  useEffect(() => {    
  }, [prueba])

  return (
    <nav className="navbar">
      SocialAnalitycs<Link to="/logout">Logout</Link>
    </nav>
  )
}
