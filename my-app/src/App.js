/* CSS */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import React from 'react'

/* Components */
import Sidebar from "./components/Sidebar";
import ConsultModal from './components/ConsultModal';

function App() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className='App'>
      <Sidebar></Sidebar>
      <ConsultModal></ConsultModal>
      <Button variant="primary" onClick={() => setModalShow(true)}>
        Consult an Expert
      </Button>

      <ConsultModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </div>
  );
}

export default App;
