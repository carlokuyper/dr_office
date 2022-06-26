import React from "react";

import Header from "./Header";
import RegisterDoctor from './RegisterDoctor';
import '../css/reg.css';
import '../css/appointments.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";
import MiniModalLeft from './MiniModalLeft';
import MiniModalRight from './MiniModalRight';

import { useNavigate } from 'react-router-dom'
import Bookings from "./Bookings";


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

  const [drNameError, setDrNameError] = useState();
  const [patNameError, setPatNameError] = useState();
  const [roomError, setRoomError] = useState();
  const [dateError, setDateError] = useState();
  const [timeError, setTimeError] = useState();

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
      // console.log(value)
      if(inputs.room !== ''){setDrNameError();}
    }

    const patVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, patName:value});
      // console.log(value)
      if(inputs.room !== ''){setPatNameError();}
    }

    const recepVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, recepName:value});
      // console.log(value)
    }

    const roomVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, room:value});
      // console.log(value)
      if(inputs.room !== ''){setRoomError();}
    }

    const dateVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, date:value});
      // console.log(value)
      if(inputs.date !== ''){setDateError();}
    }

    const timeVal = (e) => {
      const value = e.target.value;
      setInputs({...inputs, time:value});
      // console.log(value)
      if(inputs.time !== ''){setTimeError();}
    }


    let doctors = drTable.map((item) => ( <option key={item.id} value={item.name + " " + item.surname}> {item.name + " " + item.surname} </option>))
    let doctorsRoom = drTable.map((item) => ( <p key={item.id} value={item.room}> {item.room} </p>))
    // console.log(drTable);
    // console.log(doctorsRoom);

    let patients = patTable.map((item) => ( <option key={item.id} value={item.name + " " + item.surname}> {item.name + " " + item.surname} </option>))
 

    const [table, setTable] = useState();
    const [renderTable, setRenderTable] = useState();

   //This useEffect will get the table items for all the user
   useEffect(() => {
    axios.post('http://localhost/drOffice/readBookings.php')
      .then((response) => {
        let data = response.data;
        let renderTable = data.map((item) => <Bookings key={item.id} doctor={item.doctor} patient={item.patient} uniqueId={item.id} date={item.date} time={item.time} receptionist={item.receptionist} room={item.room} />);
        // console.log(renderTable)
        setTable(renderTable);
        setRenderTable(false);
      })
      .catch(err=>{
        console.log(err);
      });
      
  },[renderTable]);

    return(
        <>
        <Header />
        {modal}
        <div className="container">
            
          <h2 className="title">Appointments</h2>
          <h2 className="title">Upcoming appointments</h2>
            <div className="booking">
              <div className="booking-con">
                <p className="inputL">Doctors</p>
                <p className="inputR">Patients</p>
                {drNameError}
                <select onChange={drVal} className='edit-input' >  
                  {doctors}
                </select>
                {patNameError}
                <select onChange={patVal}  className='edit-input' >  
                  {patients}
                </select>
                </div>
                <div className="booking-con">
                <p className="inputL">Room nr</p>
                <p className="inputR">Receptionist</p>
                {roomError}
                <select onChange={roomVal} className='edit-input' >  
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </select>
                
               
              <input className='reg-input2' name="name" type="text" placeholder={currentRecep} onBlur={recepVal} value={currentRecep} />
              </div>
              <div className="booking-con">
              <p className="inputL">Date</p>
              <p className="inputR">Time</p>
              {dateError}
                <input className='date-input' type="date" data-date-inline-picker="true" onChange={dateVal} />
                
                {timeError}
                <select onChange={timeVal} className='edit-input' >  
                  <option value={'10:00'}>10:00</option>
                  <option value={'12:00'}>12:00</option>
                  <option value={'14:00'}>14:00</option>
                  <option value={'16:00'}>16:00</option>
                </select>
              </div>

              <div className="booking-con">

              <button className='book-btn' type="submit" onClick={handleSubmit}>Make Appointment</button>
              </div>
            </div>
            <div className="booking">
            <table className="dr-table">
                <thead>
                    <tr>
                        <th>Doctor</th>
                        <th>Patients</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Receptionist</th>
                        <th>Room</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
              </table>
            </div>
          </div>
          
          
        
        
        </>
        
    );
}

export default Appointments;
