import './App.css'
import {ToastContainer} from "react-toastify";
import {Outlet} from "react-router-dom";

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
