/* CSS */
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

/* Components */
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";

function App() {
  return (
    <div className='App'>
      <Sidebar></Sidebar>
      <Footer></Footer>
    </div>
  );
}

export default App;
