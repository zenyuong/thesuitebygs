/* React Router */
import { Routes, Route, Link } from "react-router-dom";

/* CSS */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

/* Components */
import Sidebar from "./components/Sidebar";
import Home from "./components/Home";
import Payments from "./components/Payments";

function App() {
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
