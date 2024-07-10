import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getError } from "../utils/errorUtils.js";
import apiClient from "../apiClient.js";
import InputFieldComponent from "../components/inputFieldComponent.jsx";
import { Store } from "../Store.jsx";
import { RegisterValidationUtil } from "../utils/validationUtil.jsx";

export function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    const handleRegister = async (event) => {
        event.preventDefault();

        if (!RegisterValidationUtil(email, password, confirmPassword)) {
            return;
        }

        try {
            const data = await registerUser({ email, password });
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(`/booking/${data._id}`);
        } catch (err) {
            toast.error(getError(err), { autoClose: 1000 });
        }
    };

    useEffect(() => {
        if (userInfo && userInfo._id) {
            navigate(`/booking/${userInfo._id}`);
        }
    }, [userInfo, navigate]);

    const registerUser = async ({ email, password }) => {
        try {
            const response = await apiClient.post('api/v1/users/signup', { email, password });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Error registering');
        }
    };

    return (
        <div
            className="flex justify-center items-center h-screen ">


            {/* Content */}
            <div className="relative bg-white p-8 rounded-lg shadow-lg bg-opacity-80">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Register Now!</h1>
                <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="text"
                            placeholder="E-mail"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="password"
                            placeholder="Create password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="password"
                            placeholder="Confirm password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="flex justify-between items-center">
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                            Register
                        </button>
                        <button
                            type="button"
                            className="text-blue-500 underline"
                            onClick={() => navigate('/login')}
                        >
                            &lt; Back To Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
