import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getUserBookings, deleteBooking } from "../apiHooks/ApiHooks.js";
import { toast } from "react-toastify";
import { Store } from '../Store.jsx';
import BookingPopUpForm from "../components/BookingPopUpForm.jsx";
import {getStatusClass} from "../utils/getStatusClass.js";

export function BookingsPage() {
    const { userId } = useParams();
    const [bookings, setBookings] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentBooking, setCurrentBooking] = useState(null);
    const { state } = useContext(Store);
    const { userInfo } = state;
    const navigate = useNavigate();

    useEffect(() => {
        if (!userInfo) {
            navigate('/login');
        } else {
            const fetchBookings = async () => {
                try {
                    const data = await getUserBookings(userId);
                    data.sort((a, b) => new Date(a.checkInDateTime) - new Date(b.checkInDateTime));
                    setBookings(data);
                } catch (error) {
                    toast.error(error.message, {
                        autoClose: 1000
                    });
                }
            };

            fetchBookings();
        }
    }, [userId, userInfo, navigate]);

    const handleDelete = async (bookingId) => {
        try {
            await deleteBooking(bookingId);
            const data = await getUserBookings(userId);
            data.sort((a, b) => new Date(a.checkInDateTime) - new Date(b.checkInDateTime));
            setBookings(data);
            toast.success('Booking deleted successfully', {
                autoClose: 1000
            });
        } catch (error) {
            toast.error(error.message, {
                autoClose: 1000
            });
        }
    };

    const openForm = (booking = null) => {
        setCurrentBooking(booking);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setCurrentBooking(null);
    };

    const refreshBookings = async () => {
        try {
            const data = await getUserBookings(userId);
            data.sort((a, b) => new Date(a.checkInDateTime) - new Date(b.checkInDateTime));
            setBookings(data);
        } catch (error) {
            toast.error(error.message, {
                autoClose: 1000
            });
        }
    };



    return (
        <div className="container mx-auto pt-4">
            <div className="flex w-full justify-between items-center mb-4 px-2 sm:px-0">
                <h1 className="text-3xl font-bold text-white ">Your Bookings</h1>
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    onClick={() => openForm()}
                >
                    + Add new
                </button>
            </div>
            {bookings.length > 0 ? (
                <div className="overflow-x-auto rounded-lg">
                    <table className="min-w-full w-full bg-white rounded-lg shadow-lg">
                        <thead>
                        <tr className="bg-gray-100">
                            <th className="booking-th">Hotel Name</th>
                            <th className="booking-th">Check-in</th>
                            <th className="booking-th hidden lg:table-cell">Check-out</th>
                            <th className="booking-th">Guest Name</th>
                            <th className="booking-th hidden md:table-cell">Phone Number</th>
                            <th className="booking-th">Status</th>
                            <th className="booking-th">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="hover:bg-gray-200 transition duration-300 ease-in-out transform">
                                <td className="booking-td">{booking.hotelName}</td>
                                <td className="booking-td text-xs">
                                    <div>{new Date(booking.checkInDateTime).toLocaleDateString()}</div>
                                    <div>{new Date(booking.checkInDateTime).toLocaleTimeString()}</div>
                                </td>
                                <td className="booking-td hidden lg:table-cell text-xs">
                                    <div>{new Date(booking.checkOutDateTime).toLocaleDateString()}</div>
                                    <div>{new Date(booking.checkOutDateTime).toLocaleTimeString()}</div>
                                </td>
                                <td className="booking-td">{booking.guestName}</td>
                                <td className="booking-td hidden md:table-cell">{booking.guestPhoneNumber}</td>
                                <td className={`booking-td ${getStatusClass(booking.status)}`}>{booking.status}</td>
                                <td className="booking-td">
                                    <div className="flex space-x-2 justify-center items-center">
                                        <button
                                            className="bg-blue-500 text-white p-2 pt-2 rounded-md hover:bg-blue-700"
                                            onClick={() => openForm(booking)}
                                        >
                                            <i className="bi bi-pencil"></i>
                                        </button>
                                        <button
                                            className="bg-red-500 text-white p-2 pt-2 rounded-md hover:bg-red-700"
                                            onClick={() => handleDelete(booking._id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <p className="text-white font-bold">No bookings found</p>
            )}
            <BookingPopUpForm
                isOpen={isFormOpen}
                onClose={closeForm}
                booking={currentBooking}
                refreshBookings={refreshBookings}
                userId={userId}
            />
        </div>
    );
}
