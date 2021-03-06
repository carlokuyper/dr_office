import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import '../css/login.css'

const Login = () => {

    const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const emailVal = (e) => {
    const value = e.target.value;
    setInputs({...inputs, email: value});
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
            sessionStorage.setItem('activeUser', inputs.email);
            navigate("/Appointments")
          }else {
            console.log("not working");
          }

        });

  }

    return(
      <div className="login-container">
        <div className='split'>
          <div className='split-img'>
            <div className='logo-img-long'></div>
          </div>
        </div>
        <div className='split'>
          

          <div className="login-con">
              <h2 className='small'>Welcome Back!</h2>
              <h3 className='small'>Login to continue</h3>
              <form>
                  <input className="login-input" name="email" type="email" placeholder="email" onChange={emailVal} />
                  <input className="login-input" name="password" type="password" placeholder="password" onChange={passwordeVal} />
              </form>
              <a><p className="forgot-btn">Forgot password</p></a>
              <button className="login-btn" type="submit"  onClick={handleSubmit} >Login</button>
          </div>
        </div>
    </div> 
  );
}

export default Login;
