import React from 'react';
import './landingPageDesign.css';
import { useState } from 'react';

//component
import Login from '../landingPageLogin/login.js';
import Signup from '../landingPageSignup/signup.js';

function LandingPageDesign() {

    const [loginOrSignup, setLogin] = useState(true);

    const toggleLoginOrSignup = () => {
        setLogin(!loginOrSignup);
    }

  return (
    <div className='landing-main'>
        <div className='design-rightside'>
            <img src={require('../../asset/images/01.png')} alt="image" className='landingPageImg' />
        </div>
        <div className='design-leftside'>
            <img src={require('../../asset/images/logo.png')} alt="logo" className='logo' />
            {loginOrSignup && <Login toggleLoginOrSignup={toggleLoginOrSignup} />}
            {!loginOrSignup && <Signup toggleLoginOrSignup={toggleLoginOrSignup} />}
        </div>
    </div> 
  )
}

export default LandingPageDesign
