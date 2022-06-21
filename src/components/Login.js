import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/login.css'

const Login = () => {

    const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  });

  const usernameVal = (e) => {
    const value = e.target.value;
    setInputs({...inputs, username: value});
    //Here you will validate 
  }

  const passwordeVal = (e) => {
    const value = e.target.value;
    setInputs({...inputs, password: value});
    //Here you will validate 
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);

    axios.post('http://localhost:80/drOffice/userLogin.php', inputs)
        .then(function(response){
          console.log(response);

          if(response.data === true){
            sessionStorage.setItem('activeUser', inputs.username);
            navigate("/dashboard")
          }else {
            console.log("not working");
          }

        });

  }

    return(
        <div className="login-container">
            <div className="logo-holder-long"><img className="logo-img-long" src="../logo-long-white.png"/></div>

            <div className="login-con">
                <h2>Login</h2>
                <form>
                    <input className="login-input" name="username" type="username" placeholder="username" onChange={usernameVal} />
                    <input className="login-input" name="password" type="password" placeholder="password" onChange={passwordeVal} />
                </form>
                <a><p className="forgot-btn">Forgot password</p></a>
                <button className="login-btn" type="submit"  onClick={handleSubmit} >Login</button>
            </div>

        {/* <form>
            <h1>Sign In to FakeBook</h1>
            <p>You life belongs to us!</p>
            <input name="username" type="username" placeholder='Your Username' onChange={usernameVal} />
            <input name="password" type="password" placeholder='YourPassword' onChange={passwordeVal} />     
            <button type="submit" onClick={handleSubmit}>I am ready to waste my life!</button>
        </form> */}

        </div>
    );
}

export default Login;
