import {React, useState} from 'react';
import './login.css';
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Login({toggleLoginOrSignup}) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState({});

  const [showMessagePopup, setShowMessagePopup] = useState();

  const navigate = useNavigate();

  //validation
  const validate = () => {
    let newErrors = {};

    // Email validation
    if(!email.trim()) newErrors.email = 'Email is required.';
    else if(!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format.';

    // Password validation
    if(!password.trim()) newErrors.password = 'Password is required.';

    setErrors(newErrors);

    // Returns true if no errors, false otherwise
    return Object.keys(newErrors).length === 0;
  };
  
  const baseURL = 'http://localhost:3001/api/login';

  const addEmployee = () => {

      if(validate()) {
        Axios.post(baseURL,
          {
            email: email,
            password: password
          },
          {
            headers: {
              'authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        ).then((response) => {
          
            // Check if the response status is 200 before saving data
            if (response.status === 200) {
              // Save token and user data to localStorage
              localStorage.setItem('token', response.data.token);
              localStorage.setItem('user', JSON.stringify(response.data.user));
              localStorage.setItem('message', "Login successful !");
              //redirect the user to the home page
              navigate('/home');

            }
        }).catch((error) => {
              if (error.response) {
                if (error.response.status === 401) { 
                  setShowMessagePopup(error.response.data.message);
                  setTimeout(() => { 
                    setShowMessagePopup();
                  }, 3000);
                } else if (error.response.status === 500) {
                  setShowMessagePopup(error.response.data.message);
                  setTimeout(() => { 
                    setShowMessagePopup();
                  }, 3000);
                }
              } else {
                console.error("Error setting up the request", error.message);
              }
        });
      }
  }
  return (
    <>
    {showMessagePopup && (
      <div className="login-error-popup"><p>{showMessagePopup}</p></div>)
    }

    <div className='login-main'>
        <h2>Login</h2>
        <div className='login-field'>
            <p>Email address {errors.email && <span className="error">&nbsp;&nbsp;{errors.email}</span>}</p>
            <input type="email" onChange={(event) => setEmail(event.target.value)}/>
        </div>
        <div className='login-field'>
            <p>Password {errors.password && <span className="error">&nbsp;&nbsp;{errors.password}</span>}</p>
            <input type="password"  onChange={(event) => setPassword(event.target.value)}/>
        </div>
        <Button onClick={addEmployee}>Login</Button>
        <p>Don't have an account ? <span className='signup-toggle' onClick={toggleLoginOrSignup}>Register</span> </p>
    </div>
    </>
  )
}

export default Login
