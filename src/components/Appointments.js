import React from "react";

import Header from "./Header";
import RegisterDoctor from './RegisterDoctor';
import '../css/appointments.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";

import { useNavigate } from 'react-router-dom'


const Appointments = (props) => {
  const [currentRecep, setCurrentRecep] = useState();

    const [modal, setModal] = useState();
    const registerDoc = () => {
      setModal(<RegisterDoctor upRender={props.rerender} rerender={setModal} original={props.message} id={props.uniqueId} />)
    }

    const navigate = useNavigate(); 
    const [drTable, setDrTable] = useState([]);
    const [patTable, setPatTable] = useState([]);
  //This useEffect will redicrct if Session is not set
  useEffect(() => {
    const userSession =  sessionStorage.getItem('activeUser')
    console.log(userSession);
    if(userSession === '' || userSession === null){
      navigate('/');
    }
      let userProfile = {activeUser: userSession};

    axios.post('http://localhost:80/drOffice/readReceptionist.php', userProfile)
    .then((res)=>{
      let data = res.data;
      let activeRecep = data[0].name + " " + data[0].surname;
      console.log(activeRecep);
      setCurrentRecep(activeRecep)
    })
    .catch(err=>{
      console.log(err);
    });
  
  },[]);

  const [inputs, setInputs] = useState({
    drName:'',
    patName:'',
    recepName:'',
    room:'',
    date:'',
    time:'',
  });

  //This useEffect will get the table items for all the user
  useEffect(() => {
    axios.post('http://localhost/drOffice/readDr.php')
      .then((response) => {
        let data = response.data;
        setDrTable(data);
      })
      .catch(err=>{
        console.log(err);
      });
      
  },[]);

  useEffect(() => {
    axios.post('http://localhost/drOffice/readPatient.php')
      .then((response) => {
        let data = response.data;
        setPatTable(data);
      })
      .catch(err=>{
        console.log(err);
      });

  },[]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(inputs);

      let result = Object.values(inputs).some(o => o === '');

    if(result){
        console.log("There is an error with results");
    } else {
        axios.post('http://localhost:80/drOffice/addBooking.php', inputs)
        .then(function(response){
            console.log(response);

            if(response.status === 200){
                navigate("/Appointments");
            }
        });
      }
  }

    const drVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, drName:value});
      console.log(value)
    }

    const patVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, patName:value});
      console.log(value)
    }

    const recepVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, recepName:value});
      console.log(value)
    }

    const roomVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, room:value});
      console.log(value)
    }

    const dateVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, date:value});
      console.log(value)
    }

    const timeVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, time:value});
      console.log(value)
    }


    let doctors = drTable.map((item) => ( <option key={item.id} value={item.name + " " + item.surname}> {item.name + " " + item.surname} </option>))
    let doctorsRoom = drTable.map((item) => ( <p key={item.id} value={item.room}> {item.room} </p>))
    // console.log(drTable);
    // console.log(doctorsRoom);

    let patients = patTable.map((item) => ( <option key={item.id} value={item.name + " " + item.surname}> {item.name + " " + item.surname} </option>))
 
 
    return(
        <>
        <Header />
        {modal}
        <div className="container">
            <div className="table-con">
                    <h2 className="title">Doctor</h2>
            <div className="booking">
              <div className="input-con">
                <p className="inputL">Doctors
                </p><p className="inputR">Patients</p>
                <select onChange={drVal} className='edit-input' >  
                  {doctors}
                </select>

                <select onChange={patVal}  className='edit-input' >  
                  {patients}
                </select>

                <p className="inputL">Room nr</p>
                <p className="inputL">Room nr</p>
                <select onChange={roomVal} className='edit-input' >  
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                <div onChange={roomVal} className='edit-input' >  
                  
                </div>
              </div>
              <div className="input-con">
              <p className="inputL">Date</p>
              <p className="inputR">Time</p>
                <input className='edit-input' type="date" data-date-inline-picker="true" onChange={dateVal} />

                <select onChange={timeVal} className='edit-input' >  
                  <option value={'10:00'}>10:00</option>
                  <option value={'12:00'}>12:00</option>
                  <option value={'14:00'}>14:00</option>
                  <option value={'16:00'}>16:00</option>
                </select>
              </div>
              



                         
              

              <p className="inputL">Receptionist</p>
              <input className='reg-input' name="name" type="text" placeholder={currentRecep} onBlur={recepVal} value={currentRecep} />

              <button className='reg-btn' type="submit" onClick={handleSubmit}>Make Appointment</button>

            </div>
          </div>
        </div>
        </>
        
    );
}

export default Appointments;
