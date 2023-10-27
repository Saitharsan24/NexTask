import {React} from 'react';
import './navbar.css';
import {Button} from "react-bootstrap"
import {Link, NavLink } from 'react-router-dom'


function Navbar() {

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    // redirect to login or other logout-related tasks
  };

  const user = JSON.parse(localStorage.getItem('user'));
  console.log(user);
  
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
        <p>Welcome ! &nbsp; <span className='nav-barname'>{user.firstName}</span></p>
        <Link to={'/'}>
          <Button variant='outline-primary' onClick={logout}>Logout</Button>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
