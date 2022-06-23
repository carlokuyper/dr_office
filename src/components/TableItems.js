import React, {useState} from 'react'
import axios from 'axios';
import EditDoctors from './EditDoctors';
import EditPatient from './EditPatient';
import EditReceptionist from './EditReceptionist';

const TableItems = (props) => {

  const [modal, setModal] = useState();

  const editDr = () => {
    setModal(<EditDoctors upRen={props.rerender} rerender={setModal} updateName={props.name} updateSurname={props.surname} updateSpecialization={props.specialization} updateRoom={props.room} updateEmail={props.email} updateContact={props.contact} id={props.uniqueId} />)
  }

  const editPat = () => {
    setModal(<EditPatient upRen={props.rerender} rerender={setModal} updateName={props.name} updateSurname={props.surname} updateSpecialization={props.specialization} updateRoom={props.room} updateEmail={props.email} updateContact={props.contact} id={props.uniqueId} />)
  }

  const editRec = () => {
    setModal(<EditReceptionist upRen={props.rerender} rerender={setModal} updateName={props.name} updateSurname={props.surname} updateSpecialization={props.specialization} updateRoom={props.room} updateEmail={props.email} updateContact={props.contact} id={props.uniqueId} />)
  }

  const deletDr = () => {
    if(window.confirm("Are you sure you want to delete the post") == true){
      
      let postId = {id: props.uniqueId}

    axios.post('http://localhost:80/drOffice/deleteDr.php', postId)
    .then((response) => {
      let data = response.data;
      console.log(data);
      props.rerender(true);
      console.log("The usere deleted")
    });
      
    } else {
      console.log("The usere did not delete the post")
    }
  }

  const deletPat = () => {
    if(window.confirm("Are you sure you want to delete the post") == true){
      
      let postId = {id: props.uniqueId}

    axios.post('http://localhost:80/drOffice/deletPat.php', postId)
    .then((response) => {
      let data = response.data;
      console.log(data);
      props.rerender(true);
      console.log("The usere deleted")
    });
      
    } else {
      console.log("The usere did not delete the post")
    }
  }

  const deletRec = () => {
    if(window.confirm("Are you sure you want to delete the post") == true){
      
      let postId = {id: props.uniqueId}

    axios.post('http://localhost:80/drOffice/deletRec.php', postId)
    .then((response) => {
      let data = response.data;
      console.log(data);
      props.rerender(true);
      console.log("The usere deleted")
    });
      
    } else {
      console.log("The usere did not delete the post")
    }
  }

  const drImg = 'http://localhost:80/drOffice/' + props.profileImg;
  // let source = data[0].imgPath;
  //     let renderpath = 'http://localhost:80/apiWeek8/' + source;

  return (
    <>
      {modal}
          <tr>
            <td className='tb-img'><img className="table-img" src={drImg} /></td>
            {props.name !=undefined && <td>{props.name + " " + props.surname}</td>}
            {props.specialization !=undefined && <td>{props.specialization}</td>}
            {props.iddoc !=undefined && <td>{props.iddoc}</td>}
            {props.room !=undefined && <td className='tb-room'>{props.room}</td>}
            {props.medicalAidNumber !=undefined && <td>{props.medicalAidNumber}</td>}
            {props.department !=undefined && <td className='tb-room'>{props.department}</td>}
            {props.email !=undefined && <td>{props.email}</td>}
            {props.contact !=undefined && <td>{props.contact}</td>}

            {/* Edit butons dynamically changed based on content */}
            {props.specialization !=undefined && <td className='tb-change'><img className="change-img" src='../edit.png' onClick={editDr}/></td>}
            {props.medicalAidNumber !=undefined && <td className='tb-change'><img className="change-img" src='../edit.png' onClick={editPat}/></td>}
            {props.department !=undefined && <td className='tb-change'><img className="change-img" src='../edit.png' onClick={editRec}/></td>}

            {/* Delete butons dynamically changed based on content */}
            {props.specialization !=undefined && <td className='tb-change'><img className="change-img" src='../trash.png' onClick={deletDr}/></td>}
            {props.medicalAidNumber !=undefined && <td className='tb-change'><img className="change-img" src='../trash.png' onClick={deletPat}/></td>}
            {props.department !=undefined && <td className='tb-change'><img className="change-img" src='../trash.png' onClick={deletRec}/></td>}
            
          </tr>       
        {/* <p className='edit' onClick={editPost}>Edit Post</p>
        <p className='delete' onClick={deletPost}>Delete Post</p> */}
    </>
  )
}

export default TableItems 
