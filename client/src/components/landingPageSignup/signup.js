import React from 'react'
import './signup.css';
import {Button} from "react-bootstrap"
import 'bootstrap/dist/css/bootstrap.min.css';

function signup() {
  return (
    <div className='signup-main'>
        <h2>Signup</h2>
        <div className='signup-name-filed'>
            <div className='signup-field'>
                <p>First Name</p>
                <input type="text" />
            </div>
            <div className='signup-field'>
                <p>Last Name</p>
                <input type="text" />
            </div>
        </div>
        <div className='signup-field'>
            <p>Email</p>
            <input type="email" style={{width:'100%'}}/>
        </div>
        <div className='signup-name-filed'>
            <div className='signup-field'>
                <p>Password</p>
                <input type="password" />
            </div>
            <div className='signup-field'>
                <p>Confirm Password</p>
                <input type="password" />
            </div>
        </div>
        <Button>Signup</Button>
        <p>Already have an account ? Login </p>
    </div>
  )
}

export default signup
