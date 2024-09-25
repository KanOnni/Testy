import React, { useState, useEffect } from 'react';
import './Auth.css'
import { Router } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [address, setAddress] = useState("");
    const [nameHere, setNameHere] = useState("");
    const [passHere, setPassHere] = useState("");
    const [addHere, setAddHere] = useState("");

    useEffect(() => {
        if (!username || !password || password.length < 5 || !address) {

            if (!username) {
                setNameHere("Please enter name");
            }
            if (!password) {
                setPassHere("Password must be at least 5 character");
            } else if (password.length < 5) {
                setPassHere("Password must be at least 5 character");
            }
            if (!address) {
                setAddHere("Please enter your address");
            }

        } else {
            postUserData();
        }
        
        async function postUserData() {
            try {
                const response = await fetch("http://localhost:3001/users", {
                    method: "POST",
                    body: JSON.stringify({ username: username, address: address, password: password }),
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
                location.href = 'http://localhost:5173/shop';
            } catch (error) {
                console.error("🚀 ~ file: SignUp.jsx ~ line 51 ~ addKitty ~ error", error);
            }
        }
    }, [nameHere, passHere, addHere]);

    const addUser = async () => {
        setNameHere("");
        setPassHere("");
        setAddHere(""); 
        const nameInput = document.getElementById("name").value;
        const passInput = document.getElementById("pass").value;
        const addInput = document.getElementById("add").value;
        setUsername(nameInput);
        setPassword(passInput);
        setAddress(addInput);
    };

    return (
        <div className='main'>
            <div>
                <h1 className='centere'>Sign up to testy to start your shoping</h1>
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
                        <p>Address</p>
                        <input type="text" placeholder="Address" className="address-input" id='add' autoComplete="off"/>
                        <p className='alarm'>{addHere}</p>
                    </div>
                </div>
            <button className='signin' onClick={() => addUser()}>SIGN UP</button>
            <a className='center' href='./sign-in'>Already have an account? Sign in here!</a>
            </div>
        </div>
  );
};

export default SignUp;