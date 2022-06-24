import React from "react";

import Header from "./Header";
import RegisterDoctor from './RegisterDoctor';
import Bookings from './Bookings'
import MiniModalLeft from './MiniModalLeft';
import MiniModalRight from './MiniModalRight';
import '../css/doctor.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";

import { useNavigate } from 'react-router-dom'
import { tab } from "@testing-library/user-event/dist/tab";

const Appointments = (props) => {
    
    const [modal, setModal] = useState();
    const registerDoc = () => {
        setModal(<RegisterDoctor upRender={props.rerender} rerender={setModal} original={props.message} id={props.uniqueId} />)
    }

    const navigate = useNavigate(); 
    const [table, setTable] = useState();
    const [renderTable, setRenderTable] = useState();
   
  //This useEffect will redicrct if Session is not set
  useEffect(() => {
    const userSession =  sessionStorage.getItem('activeUser')
    console.log(userSession);
    if(userSession === '' || userSession === null){
      navigate('/');
    }   
  },[]);

  const [inputs, setInputs] = useState({
    name:'',
    surname:'',
  });

  //This useEffect will get the table items for all the user
  useEffect(() => {
    axios.post('http://localhost/drOffice/readDr.php')
      .then((response) => {
        let data = response.data;
        let renderTable = data.map((item) => <Bookings key={item.id} name={item.name} surname={item.surname} uniqueId={item.id}  />);
        // let renderTable = data.map((item) => ( <option key={item.key} value={item.url}> {item.name} </option>));
        console.log(renderTable)
        setTable(renderTable);
        setRenderTable(false);
      })
      .catch(err=>{
        console.log(err);
      });
      
  },[]);

  


  const [nameError, setNameError] = useState();
  const [surnameError, setSurnameError] = useState();

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);

    let result = Object.values(inputs).some(o => o === '');

    if(inputs.name === ''){
      setNameError(<MiniModalRight message="Whats your last name?" />);
  } else {
    setNameError();
  }

  if(inputs.surname === ''){
    setSurnameError(<MiniModalLeft message="We need your email..." />);
  } else {
    setSurnameError();
  }

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

    const nameVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, name:value});

    }

    const surnameVal = (e) => {
        const value = e.target.value;
        setInputs({...inputs, surname:value});

    }

    return(
        <>
        <Header />
        {modal}
        <div className="container">
            <div className="table-con">
                <div className="title-con">
                    <h2 className="title">Doctor</h2>
                    <button className="add-dr-btn" onClick={registerDoc}>+ Add Doctor</button>
                    {/* <a href="/RegisterDoctor"><button className="add-dr-btn">+ Add Doctor</button></a> */}
                </div>
            <div className="dr-table">
 
            {renderTable}
              <select className='edit-input' >  
                <option value = {renderTable}> {renderTable}</option>  
              </select>
              
              {renderTable}
              <select className='edit-input' >  
                <option value = {renderTable}> {setTable}</option>  
              </select>

              {/* <select onChange={nameVal} className='edit-input' >  
                {table}
              </select> */}
              <input className='reg-input' name="name" type="text" placeholder='First Name' onChange={nameVal} />

              <input className='reg-input' name='surname' type="text" placeholder='Last Name' onChange={surnameVal} />
              <button className='reg-btn' type="submit" onClick={handleSubmit}>Add Doctor</button>
            </div>
          </div>
        </div>
        </>
        
    );
}

export default Appointments;
