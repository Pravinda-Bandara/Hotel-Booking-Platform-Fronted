import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Store } from "../Store.jsx";

export default function NavBar() {
    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: 'USER_SIGNOUT' });
        localStorage.removeItem('userInfo');
        toast.success('Logged out successfully', {
            autoClose: 1000
        });
        navigate('/login');
    };

    return (
        <nav className="bg-gray-800 p-3 ">
            <div className="container mx-auto w-full  flex justify-between items-center">
                <div className="text-white text-xl font-bold">
                    <Link to="/">Hotel Booking App</Link>
                </div>
                <div className="flex items-center space-x-4">
                        <>
                            <span className="text-white hidden sm:inline">{userInfo.email}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </>
                </div>
            </div>
        </nav>
    );
}
