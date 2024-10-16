import { useState, useEffect } from 'react';
import './Auth.css';

const SignIn = () => {
  const [togle, setTogle] = useState(false);
  const [wrong, setWrong] = useState("");

  const change = () => {
    if (togle == true) {
      setTogle(false);
    } else {
      setTogle(true);
    }
  }

  const checkUser = async () => {
    if (!document.getElementById("email").value || !document.getElementById("pass").value || document.getElementById("pass").value.length < 5) {
      setWrong("Email or password are incorrect");
    } else {
      try {
        const response = await fetch("http://localhost:3001/users/find", {
          method: "POST",
          body: JSON.stringify({ email: document.getElementById("email").value, password: document.getElementById("pass").value }),
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        });
        
        const data = await response.json();
        const user = data;

        localStorage.setItem("id", user.user.id);
        localStorage.setItem("remember", togle);

        location.href = 'http://localhost:5173/shop';
      } catch (error) {
        console.error(error);
        setWrong("Email or password are incorrect");
      }
    }
  };

  return (
    <div className='main'>
      <div>
          <h1 className='centere'>Sign in to testy to start your shoping</h1>
          <div className='center'>
              <div className="container">
                  <p>Email</p>
                  <input type="text" placeholder="Email" className="name-input" id='email' autoComplete="off"/>
              </div>
              <div className="container">
                  <p>Password</p>
                  <input type="password" placeholder="Password" className="pass-input" id='pass' autoComplete="off"/>
              </div>
          </div>
          <div className='center'>
            <p className='alarm'>{wrong}</p>
          </div>
          <div className="remeberTogle">
              <input onClick={() => change()} type="checkbox"></input>
              <p>Remember me</p>
          </div>
          <div className='center'>
              <button className='signin' onClick={() => checkUser()}>SIGN IN</button>
          </div>
          <a className='center' href='./sign-up'>Don't have an account? Sign up here!</a>
      </div>
    </div>
  );
};

export default SignIn;