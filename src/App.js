import Header from "./components/Header";
import Login from "./components/Login";
import Appointments from "./components/Appointments";
import Patient from "./components/Patient";
import Doctors from "./components/Doctors";

import {Routes, Route} from 'react-router-dom';



function App() {
  return (
    <div className="App">

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Appointments" element={<Appointments/>} />
        <Route path="/Patient" element={<Patient />}/>
        <Route path="/Doctors" element={<Doctors />}/>
      </Routes>
    </div>
  );
}

export default App;
