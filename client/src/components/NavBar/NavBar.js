import React from 'react'
import { Link } from 'react-router-dom'
import "./NavBar.css"
function NavBar() {
  return (
    <div className='nav-bar'>
        <Link to ="/home">HOME</Link>
        <Link to ="/create">CREATE POKEMON</Link>
    </div>
  )
}

export default NavBar