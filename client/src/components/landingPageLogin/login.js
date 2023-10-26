import {React, useState} from 'react';
import './login.css';
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({toggleLoginOrSignup}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  console.log(email, password);


  return (
    <div className='login-main'>
        <h2>Login</h2>
        <div className='login-field'>
            <p>Email address</p>
            <input type="email" onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div className='login-field'>
            <p>Password</p>
            <input type="password"  onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <Button>Login</Button>
        <p>Don't have an account ? <span onClick={toggleLoginOrSignup}>Register</span> </p>
    </div>
  )
}

export default Login
