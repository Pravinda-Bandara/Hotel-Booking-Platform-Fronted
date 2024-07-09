import './App.css'
import {Outlet} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
        <h1>NavBar</h1>
            <ToastContainer />
            <Outlet />
    </>
  )
}

export default App
