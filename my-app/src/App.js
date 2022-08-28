/* React Router */
import { Routes, Route, Link } from "react-router-dom";

/* CSS */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React from 'react'

/* Components */
import Sidebar from "./components/Sidebar";
import ConsultModal from './components/ConsultModal';
import Home from "./components/Home";
import Payments from "./components/Payments";

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payments" element={<Payments />} />
      </Routes>
      <Sidebar />
    </div>
  );
}

export default App;
