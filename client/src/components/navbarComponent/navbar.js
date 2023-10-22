import React from 'react';
import './navbar.css';
import {Button} from "react-bootstrap"
import {Link, NavLink } from 'react-router-dom'


function navbar() {
  return (
    <div className='navbar'>
      <Link to={'/home'}>
      <img src={require('../../asset/images/logo.png')} alt="logo" className='nav-logo' />
      </Link>
      <div className='nav-elements'>
        <div className='nav-links'>
          <NavLink to={'/home'}>
            <span>Home</span>
          </NavLink>
          <NavLink to={'/setting'}>
            <span>Setting</span>
          </NavLink>
        </div>

        <div className='profile-pic'></div> 
        <p>Saitharsan</p>
        <Link to={'/'}>
          <Button variant='outline-primary'>Logout</Button>
        </Link>
      </div>
    </div>
  )
}

export default navbar
