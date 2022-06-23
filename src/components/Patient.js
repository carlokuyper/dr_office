import React from "react";

import Header from "./Header";
import RegisterPatient from "./RegisterPatient";

import '../css/patient.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";

import { useNavigate } from 'react-router-dom'
import TableItems from './TableItems'

const Patient = (props) => {
    
    const [modal, setModal] = useState();
    const registerPat = () => {
        setModal(<RegisterPatient upRender={props.rerender} rerender={setModal} original={props.message} id={props.uniqueId} />)
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
    axios.post('http://localhost/drOffice/readPatient.php')
      .then((response) => {
        let data = response.data;
        let renderTable = data.map((item) => <TableItems key={item.id} uniqueId={item.id} name={item.name} surname={item.surname} profileImg={item.profileImg} age={item.age} gender={item.gender} email={item.email} contact={item.contact} room={item.room} specialization={item.specialization} iddoc={item.iddoc} medicalAidNumber={item.medicalAidNumber} />);
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
                    <h2 className="title">Patient</h2>
                    <button className="add-dr-btn" onClick={registerPat}>+ Add Patient</button>
                    {/* <a href="/RegisterPatient"><button className="add-dr-btn">+ Add Patient</button></a> */}
                </div>
                <table className="dr-table">
                    <thead>
                        <tr>
                            <th className="img-head"></th>
                            <th>Name</th>
                            <th>Id</th>
                            <th>Medial Aid Nr</th>
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

export default Patient;
