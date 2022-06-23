import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const EditReceptionist = (props) => {

  const [updDr, setUpdDr] = useState({
    nameUpdate: props.updateName,
    surnameUpdate: props.updateSurname,
    specializationUpdate: props.updateSpecialization,
    roomUpdate: props.updateRoom,
    emailUpdate: props.updateEmail,
    contactUpdate: props.updateContact,
    id:props.id
  })

  const closeModal = () => {
    props.rerender();
  }

  useEffect(()=>{
    document.getElementById('updName').innerHTML = props.updateName;
    document.getElementById('updSurname').innerHTML = props.updateSurname;
    document.getElementById('updSpecialization').innerHTML = props.updateSpecialization;
    document.getElementById('updRoom').innerHTML = props.updateRoom;
    document.getElementById('updEmail').innerHTML = props.updateEmail;
    document.getElementById('updContact').innerHTML = props.updateContact;
  },[]);

  const nameChange = (e) => {
    let value = e.target.value;
    setUpdDr({...updDr, nameUpdate: value});
    console.log(updDr);
  }

  const surnameChange = (e) => {
    let value = e.target.value;
    setUpdDr({...updDr, surnameUpdate: value});
    console.log(updDr);
  }

  const specializationChange = (e) => {
    let value = e.target.value;
    setUpdDr({...updDr, specializationUpdate: value});
    console.log(updDr);
  }

  const roomChange = (e) => {
    let value = e.target.value;
    setUpdDr({...updDr, roomUpdate: value});
    console.log(updDr);
  }

  const emailChange = (e) => {
    let value = e.target.value;
    setUpdDr({...updDr, emailUpdate: value});
    console.log(updDr);
  }

  const contactChange = (e) => {
    let value = e.target.value;
    setUpdDr({...updDr, contactUpdate: value});
    console.log(updDr);
  }

  const udpatePost = (e) => {
    e.preventDefault();

    axios.post('http://localhost:80/drOffice/updateDr.php', updDr)
      .then((res)=>{
        let data = res.data;
        console.log(data); 
        // props.upRen(true);
        props.rerender();
    });
  }

  return (
    <div className='eddituser'>
      <form className='for'>
        <h3>Edit Receptionist</h3>
        <div className='input-con'>
          <p className='editTitle-l'>Name</p>
          <p className='editTitle-r'>Surname</p>
          <textarea className='edit-input' id='updName' placeholder='Edit Name' onChange={nameChange} />
          <textarea className='edit-input' id='updSurname' placeholder='Edit Surname' onChange={surnameChange} />
        </div>
        <div className='input-con'>
          <textarea className='edit-input' id='updSpecialization' placeholder='Edit Specialization' onChange={specializationChange} />
          <textarea className='edit-input' id='updRoom' placeholder='Edit Room' onChange={roomChange} />
        </div>
        <div className='input-con'>
          <textarea className='edit-input-long' id='updEmail' placeholder='Edit Email' onChange={emailChange} />
          <textarea className='edit-input' id='updContact' placeholder='Edit Number' onChange={contactChange} />
        </div>
        {/* <button type='submit' onClick={udpatePost}>Edit this post</button> */}
        <button className='reg-btn' type="submit" onClick={udpatePost}>Edit Doctor</button>
        <p className='close-btn' onClick={closeModal}>Close</p>
      </form>
       
    </div>
  )
}

export default EditReceptionist
