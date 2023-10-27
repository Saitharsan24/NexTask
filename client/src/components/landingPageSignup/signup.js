import {React, useState} from 'react';
import './signup.css';
import {Button} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup({toggleLoginOrSignup}) {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errors, setErrors] = useState({});

    const [showMessagePopup, setShowMessagePopup] = useState();

    const navigate = useNavigate();


    //signup form validation
    const validate = () => {
        let newErrors = {};

        // First name validation
        if(!firstName.trim()) newErrors.firstName = 'First Name is required.';
        
        // Last name validation
        if(!lastName.trim()) newErrors.lastName = 'Last Name is required.';
        
        // Email validation
        if(!email.trim()) newErrors.email = 'Email is required.';
        else if(!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid.';

        // Password validation
        if(!password) {
            newErrors.password = 'Password is required.';
        } else if(password.length < 8) {
            newErrors.password = 'Weak password.';
        } else if(!/\d/.test(password)) {
            newErrors.password = 'Weak password.';
        } else if(!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password)) {
            newErrors.password = 'Weak password.';
        } else if(password !== confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match.';
        }

        setErrors(newErrors);

        // Returns true if no errors, false otherwise
        return Object.keys(newErrors).length === 0;
    };

    const baseURL = 'http://localhost:3001/api/signup';

    const addUser = () => {

        if(validate()){

            Axios.post(baseURL,
                {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
                }
            ).then((response) => {
                if (response.status === 201) {
                    // Save token and user data to localStorage
                    console.log(response);
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                    localStorage.setItem('message', "Account created successfully !");
                    //redirect the user to the home page
                    navigate('/home');
      
                  }
            }).catch((error) => {
                if (error.response) {
                    if (error.response.status === 400) { 
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
            }
            );

        }
    };
    
  return (
    <>
    {showMessagePopup && (
        <div className="login-error-popup"><p>{showMessagePopup}</p></div>)
      }
    <div className='signup-main'>
        <h2>Signup</h2>
        <div className='signup-name-filed'>
            <div className='signup-field'>
                <p>First Name {errors.firstName && <span className="error">&nbsp;&nbsp;{errors.firstName}</span>}</p>
                <input type="text" onChange={(event) => setFirstName(event.target.value)} />
                
            </div>
            <div className='signup-field'>
                <p>Last Name {errors.lastName && <span className="error">&nbsp;&nbsp;{errors.lastName}</span>}</p>
                <input type="text" onChange={(event) => setLastName(event.target.value)} />
            </div>
        </div>
        <div className='signup-field'>
            <p>Email {errors.email && <span className="error">&nbsp;&nbsp;{errors.email}</span>}</p>
            <input type="email" style={{width:'100%'}} onChange={(event) => setEmail(event.target.value)} />
        </div>
        <div className='signup-name-filed'>
            <div className='signup-field'>
                <p>Password {errors.password && <span className="error">&nbsp;&nbsp;{errors.password }</span>}</p>
                <input type="password" onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className='signup-field'>
                <p>Confirm Password{errors.confirmPassword && <span className="error">&nbsp;&nbsp;{errors.confirmPassword}</span>}</p>
                <input type="password" onChange={(event) => setConfirmPassword(event.target.value)}/>
            </div>
        </div>
        <Button onClick={addUser}>Signup</Button>
        <p>Already have an account ? <span className='login-toggle' onClick={toggleLoginOrSignup}>Login</span> </p>
    </div>
    </>
  )
}

export default Signup
