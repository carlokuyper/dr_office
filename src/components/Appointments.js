import React from "react";

import Header from "./Header";

import '../css/appointments.css';
import {useState, useRef, useEffect } from 'react';
import axios from "axios";

import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Appointments = () => {

    const [value, onChange] = useState(new Date());

    return(
        <>
        <Header />
        <div className="container">
            <div className="calendar">
              <div>
                <Calendar
                  onChange={onChange}
                  value={value}
                />
              </div>
            </div>
        </div>
        </>
        
    );
}

export default Appointments;
