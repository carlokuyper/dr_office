import Header from "./components/Header";
import Login from "./components/Login";
import Appointments from "./components/Appointments";
import Patient from "./components/Patient";
import Doctors from "./components/Doctors";
import Receptionist from "./components/Receptionist";

import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Appointments" element={<Appointments />} />
        <Route path="/Patient" element={<Patient />}/>
        <Route path="/Doctors" element={<Doctors />}/>
        <Route path="/Receptionist" element={<Receptionist />}/>
      </Routes>
    </div>
  );
}

export default App;
