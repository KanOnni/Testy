import React, { useState, useEffect } from 'react';
import './Auth.css'
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [togle, setTogle] = useState(false);
    const [nameHere, setNameHere] = useState("");
    const [passHere, setPassHere] = useState("");
    const [addHere, setAddHere] = useState("");
    const navigate = useNavigate();

    const change = () => {
        setTogle(!togle);
    }

    const addUser = async () => {
        setNameHere("");
        setPassHere("");
        setAddHere(""); 

        if (!document.getElementById("name").value || !document.getElementById("pass").value || document.getElementById("pass").value.length < 5 || !document.getElementById("email").value) {

            if (!username) {
                setNameHere("Please enter name");
            }
            if (!password) {
                setPassHere("Password must be at least 5 character");
            } else if (password.length < 5) {
                setPassHere("Password must be at least 5 character");
            }
            if (!email) {
                setAddHere("Please enter your email");
            }

        } else {
            try {
                const response = await fetch("http://localhost:3001/users/", {
                    method: "POST",
                    body: JSON.stringify({ username: document.getElementById("name").value, password: document.getElementById("pass").value, email: document.getElementById("email").value }),
                    headers: {
                        "Content-Type": "application/json",
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "POST",
                        "Access-Control-Allow-Headers":
                        "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With",
                    },
                });
                const y = await response.json();
                console.log("🚀 ~ file: SignUp.jsx ~ line 80 ~ addUser ~ y", y);
                localStorage.setItem("id", y.user.id);
                localStorage.setItem("remeber", togle);
                navigate('../shop');
            } catch (error) {
                console.error("file: SignUp.jsx ~ line: 52 ~ function: postUserData ~ error: ", error);
            }
        }
    };

    return (
        <div className='main'>
            <div>
                <h1 className='center'>Sign up to testy to start your shoping</h1>
                <div className='center'>
                    <div className="container">
                        <p>Username</p>
                        <input type="text" placeholder="Username" className="name-input" id='name' autoComplete="off"/>
                        <p className='alarm'>{nameHere}</p>
                    </div>
                    <div className="container">
                        <p>Password</p>
                        <input type="text" placeholder="Password" className="pass-input" id='pass' autoComplete="off"/>
                        <p className='alarm'>{passHere}</p>
                    </div>
                    <div className="container">
                        <p>Email</p>
                        <input type="text" placeholder="Email" className="email-input" id='email' autoComplete="off"/>
                        <p className='alarm'>{addHere}</p>
                    </div>
                </div>
                <div className="remeberTogle">
                    <input onChange={() => change()} type="checkbox"></input>
                    <p>Remember me</p>
                </div>
                <div className='center'>
                    <button className='signin' onClick={() => addUser()}>SIGN UP</button>
                </div>
                <a className='center' href='./sign-in'>Already have an account? Sign in here!</a>
            </div>
        </div>
  );
};

export default SignUp;