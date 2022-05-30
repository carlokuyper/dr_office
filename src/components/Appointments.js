import React from "react";

import Header from "./Header";

import '../css/appointments.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";

const Appointments = () => {
    return(
        <>
        <Header />
        <div className="container">
            <div className="callendar">
                
            </div>
        </div>
        </>
        
    );
}

export default Appointments;
