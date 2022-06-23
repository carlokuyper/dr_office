import axios from 'axios';
import React, { useState } from 'react'
import MiniModalLeft from './MiniModalLeft';
import MiniModalRight from './MiniModalRight';
import { useNavigate } from 'react-router-dom';
import Okay from '../assets/okay.svg';
import NotOkay from '../assets/notOkay.svg';
import '../css/reg.css'

const RegisterDoctor = (props) => {

    const navigate = useNavigate();
    
    const [inputs, setInputs] = useState({
        name:'',
        surname:'',
        email:'',
        username:'',
        contact:'',
        age:'',
        gender:'',
        room:'',
        specialization:'',
        password:'',
        passwordCon:'',
        image: '',
    });

    const [nameError, setNameError] = useState();
    const [surnameError, setSurnameError] = useState();
    const [emailError, setEmailError] = useState();
    const [userNameError, setUserNameError] = useState();
    const [contactError, setContactError] = useState();
    const [ageError, setAgeError] = useState();
    const [genderError, setGenderError] = useState();
    const [specializationError, setSpecializationError] = useState();
    const [roomError, setRoomError] = useState()
    const [passwordError, setPasswordError] = useState();
    const [passwordConError, setPasswordConError] = useState();

    

    const [emailAvail, setEmailAvail] = useState();
    const [userAvail, setUserAvail] = useState();

    const [emailIcon, setEmailIcon] = useState();
    const [userIcon, setUserIcon] = useState();

    const imageVal = (e) => {           
        let file = e.target.files[0];
        let reader = new FileReader();

        reader.onloadend = function() {
        console.log(reader.result);
        let imgFile = reader.result;

        setInputs({...inputs, image: imgFile});

        let image = new Image();
        image.src = reader.result;
        document.getElementById('profileimg').appendChild(image);
        
        }
        reader.readAsDataURL(file);
}

    const nameVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, name:value});
        if(inputs.name !== ''){setNameError();}
    }

    const surnameVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, surname:value});
        if(inputs.surname !== ''){setSurnameError();}
    }

    const emailVal = (e) => {
        const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;;
        
        const value = e.target.value;
        setInputs({...inputs, email:value});
        if(inputs.email !== ''){setEmailError();}
        if(!value.match(emailRegex)){
            setEmailError(<MiniModalLeft message="Email is not a valid format..." />);
        }
    }
    const validateEmail = () =>{
        axios.post('http://localhost:80/drOffice/authenticateDoctorEmail.php', inputs)
        .then(function(response){
            console.log(response);
            if(response.data === "Available"){
                setEmailIcon(Okay);
                setEmailAvail();
            } else if(response.data === "Not Available"){
                setEmailIcon(NotOkay);
                setEmailAvail(<MiniModalRight message="Email is not a Available" />);
            } else if(response.data === ''){
                setEmailIcon();
                setEmailAvail();
                setEmailError();
            }
        });
    }

    const userNameVal = (e) => {
        const value = e.target.value.trim();
        setInputs({...inputs, username:value});
        if(inputs.username !== ''){setUserNameError();}
    }

    const validateUser = () =>{
        axios.post('http://localhost:80/drOffice/authenticateDoctor.php', inputs)
        .then(function(response){
            console.log(response);
            if(response.data === "Available"){
                setUserIcon(Okay);
                setUserAvail();
            } else if(response.data === "Not Available"){
                setUserIcon(NotOkay);
                setUserAvail(<MiniModalLeft message="Username is not a Available" />);
            } else if(response.data === ''){
                setUserIcon();
                setUserAvail();
                setUserNameError();
            }
        });
    }

    const contactVal = (e) => {
        const contactRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
        
        const value = e.target.value;
        setInputs({...inputs, contact: value});
        if(inputs.contact !== ''){setContactError();}
        if(!value.match(contactRegex)){
            setContactError(<MiniModalRight message="Not a valid phone nr..." />);
        }
    }

    const ageVal = (e) => {
        const value = e.target.value.trim();
        setInputs({...inputs, age:value});
        if(inputs.age !== ''){setAgeError();}
    }

    const genderVal = (e) => {
        const value = e.target.value.trim();
        setInputs({...inputs, gender:value});
        if(inputs.gender !== ''){setGenderError();}
    }

    const roomVal = (e) => {
        const value = e.target.value.trim();
        setInputs({...inputs, room:value});
        if(inputs.room !== ''){setRoomError();}
    }


    const specializationVal = (e) => {
        const value = e.target.value.trim();
        setInputs({...inputs, specialization:value});
        if(inputs.specialization !== ''){setSpecializationError();}
    }

    const passwordVal = (e) => {
        const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/ ;
        
        const value = e.target.value;
        setInputs({...inputs, password:value});
        if(inputs.password !== ''){setPasswordError();}
        if(!value.match(passRegex)){
            setPasswordError(<MiniModalLeft message="Not a valid password" />);
        }
    }

    const passwordConVal = (e) => {       
        const value = e.target.value;
        setInputs({...inputs, passwordCon:value});
        if(inputs.password === value){
            setPasswordConError();
        } else {
            setPasswordConError(<MiniModalLeft message="Your password doesn't match" />);
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(inputs);

        if(inputs.name === ''){
            setNameError(<MiniModalLeft message="Whats your name?" />);
        } else {
            setNameError();
        }

        if(inputs.surname === ''){
            setSurnameError(<MiniModalRight message="Whats your last name?" />);
        } else {
            setSurnameError();
        }

        if(inputs.email === ''){
            setEmailError(<MiniModalLeft message="We need your email..." />);
        } else {
            setEmailError();
        }

        if(inputs.username === ''){
            setUserNameError(<MiniModalLeft message="We need your username" />);
        } else {
            setUserNameError();
        }

        if(inputs.contact === ''){
            setContactError(<MiniModalRight message="What is you phone nr?" />);
        } else {
            setContactError();
        }
        
        if(inputs.age === ''){
            setAgeError(<MiniModalLeft message="We need your age" />);
        } else {
            setAgeError();
        }

        if(inputs.gender === ''){
            setGenderError(<MiniModalLeft message="What is your gender?" />);
        } else {
            setGenderError();
        }

        if(inputs.room === ''){
            setRoomError(<MiniModalRight message="Room Number?" />);
        } else {
            setRoomError();
        }

        if(inputs.specialization	 === ''){
            setSpecializationError(<MiniModalLeft message="Specialization?" />);
        } else {
            setSpecializationError();
        }

        if(inputs.password === ''){
            setPasswordError(<MiniModalLeft message="You must provide your password " />);
        } else {
            setPasswordError();
        }

        if(inputs.passwordCon === ''){
            setPasswordConError(<MiniModalRight message="You must confirm your password " />);
        } else {
            setPasswordConError();
        }

        let result = Object.values(inputs).some(o => o === '');

        if(result){
            console.log("There is an error with results");
        } else {
            axios.post('http://localhost:80/drOffice/addDoctor.php', inputs)
            .then(function(response){
                console.log(response);

                if(response.status === 200){
                    navigate("/");
                }
            });
        }
    }

    const closeModal = () => {
        props.rerender();
    }

  return (
    <div className='adduser'>
        <form className='for' id='ImgOne' encType="multipart/form-data">
            <div className='uploadimg'>
                <div id="profileimg" className='profile_img'></div> 
                <p className='upload'>Upload a Doctor Image</p>
                <input name="imageUrl" className='imgInput' type="file" onChange={imageVal} />
 
            </div>            
            <div className='input-con'>
                {nameError}
                <input className='reg-input' name="name" type="text" placeholder='First Name' onChange={nameVal} />
                {surnameError}
                <input className='reg-input' name='surname' type="text" placeholder='Last Name' onChange={surnameVal} />
                {userNameError}
                <input className='reg-input-long' name='username' type="text" placeholder='username' onChange={userNameVal} />
                {emailError}
                {emailAvail}  
            <input className='reg-input-long' name="email" type="email" placeholder='Your Email' onBlur={validateEmail} onChange={emailVal} />
            </div> 
            <div className='input-con'>
                {userAvail}
                {contactError}
                <input className='reg-input' name="contact" type="contact" placeholder='Contact Number' onChange={contactVal} />
                {ageError}
                <input className='reg-input' name="age" type="age" placeholder='Age' onChange={ageVal} />
            </div>
            <div className='input-con'>

                {genderError}
                <input className='reg-input' name="gender" type="gender" placeholder='Male/Female/Other' onChange={genderVal} />
                {roomError}
                <input className='reg-input' name="room" type="room" placeholder='Room nr' onChange={roomVal} />
                {specializationError}
                <input className='reg-input-long' name="specialization" type="specialization" placeholder='Specialization' onChange={specializationVal} />
            </div>

            <div className='input-con'>
                {passwordError}
                <input className='reg-input' name="password" type="password" placeholder='Choose A Password' onChange={passwordVal} />
                {passwordConError}
                <input className='reg-input' name="conPass" type="password" placeholder='Confirm Password' onChange={passwordConVal} />
            </div>
            <button className='reg-btn' type="submit" onClick={handleSubmit}>Add Doctor</button>
            <p className='close-btn' onClick={closeModal}>Close</p>
        </form>
        
    </div>
  )
}

export default RegisterDoctor
