import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NavBar from './components/NavBar.jsx';
import Footer from './components/Footer.jsx';
import { Store } from './Store.jsx'; // Import your context
import BackgroundImage from './assets/Background.jpg'; // Import your background image

function App() {
    const { state } = useContext(Store); // Access the state from your context
    const { userInfo } = state; // Extract userInfo from the state

    return (
        <div
            className="min-h-screen relative bg-Background"
        >
            <div className="absolute inset-0 bg-black bg-opacity-20 backdrop-blur-sm"></div>
            {/* Overlay for opacity and blur */}
            <div className="min-h-screen flex flex-col relative">
                {userInfo && <NavBar />}
                <main className="flex-grow">
                    <ToastContainer />
                    <Outlet />
                </main>
                {userInfo && <Footer />}
            </div>
        </div>
    );
}

export default App;
