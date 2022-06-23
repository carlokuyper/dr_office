import React, { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';

const EditPost = (props) => {

  const [updatedPost, setUpdatedPost] = useState({
    newMessage: props.original,
    id:props.id
  })

  const closeModal = () => {
    props.rerender();
  }

  useEffect(()=>{
    document.getElementById('updateText').innerHTML = props.original;
  },[]);

  const handleChange = (e) => {
    let value = e.target.value;
    setUpdatedPost({...updatedPost, newMessage: value});
    console.log(updatedPost);
  }

  const udpatePost = (e) => {
    e.preventDefault();

    axios.post('http://localhost:80/drOffice/updateDoctors.php', updatedPost)
      .then((res)=>{
        let data = res.data;
        console.log(data); 
        props.upRender(true);
        props.rerender();
      });
  }

  return (
    <div className='adduser'>
      <form className='for'>
        <h1>Made a Mistake? Edit</h1>
        <textarea id='updateText' placeholder='Edit Post Message' onChange={handleChange} />
        {/* <button type='submit' onClick={udpatePost}>Edit this post</button> */}
        <button className='reg-btn' type="submit" onClick={udpatePost}>Edit Doctor</button>
            <p className='close-btn' onClick={closeModal}>Close</p>
      </form>
       
    </div>
  )
}

export default EditPost
