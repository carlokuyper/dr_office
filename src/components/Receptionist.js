import React from "react";

import Header from "./Header";
import RegisterReceptionist from "./RegisterReceptionist";
import TableItems from './TableItems'

import '../css/doctor.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";


import { useNavigate } from 'react-router-dom'

const Doctors = (props) => {

    const [modal, setModal] = useState();
    const registerRecep = () => {
        setModal(<RegisterReceptionist upRender={props.rerender} rerender={setModal} original={props.message} id={props.uniqueId} />)
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

  //This useEffect will ge the table items for all the user
  useEffect(() => {
    axios.post('http://localhost/drOffice/readReceptionist.php')
      .then((response) => {
        let data = response.data;
        let renderTable = data.map((item) => <TableItems key={item.id}  uniqueId={item.id} name={item.name} surname={item.surname} profileImg={item.profileImg} age={item.age} gender={item.gender} email={item.email} contact={item.contact} room={item.room} specialization={item.specialization} department={item.department} />);
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
                    <h2 className="title">Receptionist</h2>
                    <button className="add-dr-btn" onClick={registerRecep}>+ Add Receptionist</button>
                    {/* <a href="/RegisterReceptionist"><button className="add-dr-btn">+ Add Receptionist</button></a> */}
                </div>
                <table class="dr-table">
                <thead>
                    <tr>
                        <th className="img-head"></th>
                        <th>Name</th>
                        <th>Department</th>
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
        </>
        
    );
}

export default Doctors;
