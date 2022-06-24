import React, {useState} from 'react'
import axios from 'axios';


import { useNavigate } from 'react-router-dom';



const Bookings = (props) => {

  const navigate = useNavigate();

  const [modal, setModal] = useState();

  const drImg = 'http://localhost:80/drOffice/' + props.profileImg;
  // let source = data[0].imgPath;
  //     let renderpath = 'http://localhost:80/apiWeek8/' + source;

  return (
    <>
      <option value = {props.name + " " + props.surname}> {props.name + " " + props.surname}</option>  
    </>
  )
}

export default Bookings 
