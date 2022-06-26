import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const EditPatient = (props) => {

  const [updDr, setUpdDr] = useState({
    nameUpdate: props.updateName,
    surnameUpdate: props.updateSurname,
    medicalAidNumberUpdate: props.updateMedicalAidNumber,
    iddocUpdate: props.updateIddoc,
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
    document.getElementById('updMedicalAidNumber').innerHTML = props.updateMedicalAidNumber;
    document.getElementById('updIddoc').innerHTML = props.updateIddoc;
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

  const medicalAidNumberChange = (e) => {
    let value = e.target.value;
    setUpdDr({...updDr, medicalAidNumberUpdate: value});
    console.log(updDr);
  }

  const iddocChange = (e) => {
    let value = e.target.value;
    setUpdDr({...updDr, iddocUpdate: value});
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

    axios.post('http://localhost:80/drOffice/updatePat.php', updDr)
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
        <h3>Edit Patient</h3>
        <div className='input-con'>
          <p className='editTitle-l'>Name</p>
          <p className='editTitle-r'>Surname</p>
          <textarea className='edit-input' id='updName' placeholder='Edit Name' onChange={nameChange} />
          <textarea className='edit-input' id='updSurname' placeholder='Edit Surname' onChange={surnameChange} />
        </div>
        <div className='input-con'>
          <p className='editTitle-l'>Edit medicalAidNumber</p>
          <p className='editTitle-r'>Edit id</p>
          <textarea className='edit-input' id='updMedicalAidNumber' placeholder='Edit medicalAidNumber' onChange={medicalAidNumberChange} />
          <textarea className='edit-input' id='updIddoc' placeholder='Edit iddoc' onChange={iddocChange} />
        </div>
        <div className='input-con'>
          <p className='editTitle-l'>Edit Email</p>
          <textarea className='edit-input-long' id='updEmail' placeholder='Edit Email' onChange={emailChange} />
        </div>
        <div className='input-con'>
          <p className='editTitle-l'>Edit Number</p>
          <textarea className='edit-input-long' id='updContact' placeholder='Edit Number' onChange={contactChange} />
        </div>
        {/* <button type='submit' onClick={udpatePost}>Edit this post</button> */}
        <button className='reg-btn' type="submit" onClick={udpatePost}>Edit Doctor</button>
        <p className='close-btn' onClick={closeModal}>Close</p>
      </form>
       
    </div>
  )
}

export default EditPatient
