import React from "react";

import Header from "./Header";

import '../css/doctor.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";

const Doctors = () => {
    return(
        <>
        <Header />
        <div className="container">
            <div className="table-con">
                <div className="title-con">
                    <h2 className="title">Doctor</h2>
                    <button className="add-dr-btn">+ Add Doctor</button>
                </div>
                <table class="dr-table">
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
                        <td><img className="table-img" src="../user.jpg" /></td>
                        <td>Mildred Farrell</td>
                        <td>Muscles</td>
                        <td>1</td>
                        <td>Mildredfarrell@gmail.com</td>
                        <td>0849082890</td>
                    </tr>
                    <tr class="active-row">
                        <td><img className="table-img" src="../user.jpg" /></td>
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

export default Doctors;
