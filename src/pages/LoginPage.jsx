import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Store } from "../Store.jsx";
import { login } from "../apiHooks/ApiHooks.js";
import { getError } from "../utils/errorUtils.js";
import { toast } from "react-toastify";
import InputFieldComponent from "../components/inputFieldComponent.jsx";
import { LoginValidationUtil } from "../utils/validationUtil.jsx";

export function LoginPage() {
    const navigate = useNavigate();
    const redirect = '/bookings';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);

    const { state, dispatch } = useContext(Store);
    const { userInfo } = state;

    const handleLogin = async (event) => {
        event.preventDefault();
        if (!LoginValidationUtil(email, password)) {
            return;
        }

        setIsPending(true);
        try {
            const data = await login({ email, password });
            dispatch({ type: 'USER_SIGNIN', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
        } catch (err) {
            toast.error(getError(err), { autoClose: 1000 });
        } finally {
            setIsPending(false);
        }
    };

    useEffect(() => {
        if (userInfo && userInfo._id) {
            navigate(`/booking/${userInfo._id}`);
        }
    }, [userInfo, navigate]);

    return (
        <div
            className="flex justify-center items-center h-screen bg-cover bg-center relative"
        >

            {/* Content */}
            <div className="relative bg-white p-8 rounded-lg shadow-lg bg-opacity-80">
                <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Hi there!</h1>
                <h2 className="text-gray-700 text-lg">
                    Welcome to
                </h2>
                <h2 className="font-bold text-xl">Hotel Booking App</h2>
                </div>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="E-mail"
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="mb-4">
                        <InputFieldComponent
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-md"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isPending}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700"
                    >
                        Login
                    </button>
                    <span className="text-gray-700 mx-4">or</span>
                    <button
                        className="text-blue-500 underline"
                        type="button"
                        onClick={() => navigate('/register')}
                    >
                        Click here to Register
                    </button>
                </form>
            </div>
        </div>
    );
}
