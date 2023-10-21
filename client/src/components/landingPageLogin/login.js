import React from 'react'
import './login.css';
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

function login({toggleLoginOrSignup}) {
  return (
    <div className='login-main'>
        <h2>Login</h2>
        <div className='login-field'>
            <p>Email address</p>
            <input type="email" />
        </div>
        <div className='login-field'>
            <p>Password</p>
            <input type="password" />
        </div>
        <Button>Login</Button>
        <p>Don't have an account ? <span onClick={toggleLoginOrSignup}>Register</span> </p>
    </div>
  )
}

export default login
