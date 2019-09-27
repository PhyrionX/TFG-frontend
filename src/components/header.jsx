import React, { useEffect } from 'react'
import './header.scss'

export const Header = ({ prueba }) => {
  useEffect(() => {
    console.log(prueba);
    
  }, [prueba])

  return (
    <nav className="navbar"></nav>
  )
}