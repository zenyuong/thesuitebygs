/* React Router */
import { Routes, Route } from "react-router-dom";

/* CSS */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

/* Components */
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Analytics from "./components/Analytics";
import Payments from "./components/Payments";
import AssetManagement from "./components/AssetManagement"
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function App() {
  return (
    <Row className='App'>
      <Col xs={1}>
        <Sidebar />
      </Col>
      <Col>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/assetmanagement" element={<AssetManagement />} />
        </Routes>
      </Col>
    </Row>
  );
}

export default App;
