import React, { useEffect } from 'react'
import { NavLink } from "react-router-dom";
import './sidebar.scss';

export const Sidebar = ({ prueba }) => {
  useEffect(() => {    
  }, [prueba])

  return (
    <div className="sidebar">
      <ul>
        <NavLink to="/">
          <li>
            Home
          </li>
         </NavLink>
        <NavLink to="/history">
          <li>
            History
          </li>
         </NavLink>
        <NavLink to="/configuration">
          <li>
            Configuration
          </li>
         </NavLink>
      </ul>
    </div>
  )
}
