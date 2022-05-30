import React from "react";

import '../css/login.css'

const Login = () => {
    return(
        <div className="login-container">
            <div className="logo-holder-long"><img className="logo-img-long" src="../logo-long-white.png"/></div>

            <div className="login-con">
                <h2>Login</h2>
                <form>
                    <input className="login-input" name="username" placeholder="username"/>
                    <input className="login-input" name="password" placeholder="password"/>
                </form>
                <a><p className="forgot-btn">Forgot password</p></a>
                <button className="login-btn" type="submit">Login</button>
            </div>

        </div>
    );
}

export default Login;
