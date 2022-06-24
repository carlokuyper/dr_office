import React from "react";

import {useState, useRef, useEffect } from 'react';
import axios from "axios";

import { useNavigate } from 'react-router-dom'


const Header = () => {

    const navigate = useNavigate();
    
    const setLogOut = () => {
        sessionStorage.clear();
        navigate('/')
    }

    const [renderImage, setRenderImage] = useState(); 

    //This useEffect will redicrct if Session is not set
    useEffect(() => {
        const userSession =  sessionStorage.getItem('activeUser')
        console.log(userSession);
        if(userSession === '' || userSession === null){
          navigate('/');
        }
      
        let userProfile = {activeUser: userSession};
    
        axios.post('http://localhost/drOffice/readProfile.php', userProfile)
        .then((res)=>{
          let data = res.data;
          let source = data[0].profileImg;
          let renderpath = 'http://localhost/drOffice/' + source;
          setRenderImage(renderpath);
        })
        .catch(err=>{
          console.log(err);
        });
      
      },[]);

    return(
        <div className="col-md-4, navigation">
            <a  href="/Appointments"><div className="logo-holder"><img className="logo-img" src={renderImage}/></div></a>
            <a  href="/Appointments"><div className="img-button-holder"><img className="img-button" src="../calendar.png"/><p className="header-text">Appointment</p></div></a>
            <a  href="/Doctors"><div className="img-button-holder"><img className="img-button" src="../dr.png"/><p className="header-text">Doctors</p></div></a>
            <a  href="/Patient"><div className="img-button-holder"><img className="img-button" src="../users.png"/><p className="header-text">Patient</p></div></a>
            <a  href="/Receptionist"><div className="img-button-holder"><img className="img-button" src="../dr.png"/><p className="header-text">Receptionist</p></div></a>
            <button className='logout-btn' onClick={setLogOut}>Logout</button>
        </div>
    );
}

export default Header;
