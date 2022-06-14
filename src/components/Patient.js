import React from "react";

import Header from "./Header";

import '../css/patient.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";

const Patient = () => {
    return(
        <>
        <Header />
        <div className="container">
            <div className="table-con">
                <div className="title-con">
                    <h2 className="title">Doctor</h2>
                    <button className="add-dr-btn">+ Add Patient</button>
                </div>
                <table class="patient-table">
                <thead>
                    <tr>
                        <th className="img-head"></th>
                        <th>Name</th>
                        <th>Specialization</th>
                        <th>Room</th>
                        <th>Email</th>
                        <th>Number</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><img className="table-img" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" /></td>
                        <td>Mildred Farrell</td>
                        <td>Muscles</td>
                        <td>1</td>
                        <td>Mildredfarrell@gmail.com</td>
                        <td>0849082890</td>
                    </tr>
                    <tr class="active-row">
                        <td><img className="table-img" src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80" /></td>
                        <td>Mildred Farrell</td>
                        <td>Muscles</td>
                        <td>1</td>
                        <td>Mildredfarrell@gmail.com</td>
                        <td>0849082890</td>
                    </tr>
                </tbody>
            </table>
            </div>
            
        </div>
        </>
        
    );
}

export default Patient;
