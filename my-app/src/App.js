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

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/assetmanagement" element={<AssetManagement />} />
      </Routes>
      <Sidebar />
    </div>
  );
}

export default App;
