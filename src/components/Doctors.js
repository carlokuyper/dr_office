import React from "react";

import Header from "./Header";
import RegisterDoctor from './RegisterDoctor';
import TableItems from './TableItems'

import '../css/doctor.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";

import { useNavigate } from 'react-router-dom'

const Doctors = (props) => {
    
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

  //This useEffect will get the table items for all the user
  useEffect(() => {
    axios.post('http://localhost/drOffice/readDr.php')
      .then((response) => {
        let data = response.data;
        let renderTable = data.map((item) => <TableItems key={item.id} name={item.name} surname={item.surname} uniqueId={item.id} profileImg={item.profileImg} age={item.age} gender={item.gender} email={item.email} contact={item.contact} room={item.room} specialization={item.specialization} />);
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
            <div className="table-con">
                <div className="title-con">
                    <h2 className="title">Doctor</h2>
                    <button className="add-dr-btn" onClick={registerDoc}>+ Add Doctor</button>
                    {/* <a href="/RegisterDoctor"><button className="add-dr-btn">+ Add Doctor</button></a> */}
                </div>
            <div className="dr-table">
              <table className="dr-table">
                <thead>
                    <tr>
                        <th className="img-head"></th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Room</th>
                        <th>Email</th>
                        <th>Number</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {table}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        </>
        
    );
}

export default Doctors;
