import React, { useState } from 'react';
import './Auth.css'
import { Router } from 'react-router-dom';

const SignIn = () => {
    const [nameHere, setNameHere] = useState("");
    const [passHere, setPassHere] = useState("");

    function checkUser() {
        // here check if database has x user with y password
    }

    return (
<div className='main'>
            <div>
                <h1 className='centere'>Sign up to testy to start your shoping</h1>
                <div className='center'>
                    <div className="container">
                        <p>Username</p>
                        <input type="text" placeholder="Username" className="name-input" id='name' autoComplete="off"/>
                        <p className='alarm'></p>
                    </div>
                    <div className="container">
                        <p>Password</p>
                        <input type="text" placeholder="Password" className="pass-input" id='pass' autoComplete="off"/>
                        <p className='alarm'></p>
                    </div>
                </div>
            <button className='signin' onClick={() => checkUser()}>SIGN IN</button>
            <a className='center' href='./sign-in'>Don't have an account? Sign up here!</a>
            </div>
        </div>
  );
};

export default SignIn;