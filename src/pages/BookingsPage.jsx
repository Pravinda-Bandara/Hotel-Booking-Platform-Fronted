import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getUserBookings } from "../apiHooks/useHooks.js";
import { toast } from "react-toastify";
import { Store } from '../Store.jsx';
import { PencilIcon, TrashIcon } from "@heroicons/react/16/solid/index.js";
import BookingPopUpForm from "../components/BookingPopUpForm.jsx";


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
                    // Sort the bookings by check-in date
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
        // Commented out for safety
        /*
        try {
            await deleteBooking(bookingId);
            // Refresh bookings after deletion
            const data = await getUserBookings(userId);
            setBookings(data);
            toast.success('Booking deleted successfully', {
                autoClose: 1000
            });
        } catch (error) {
            toast.error(error.message, {
                autoClose: 1000
            });
        }
        */
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
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Your Bookings</h1>
            <div className="flex justify-between items-center mb-4">
                <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-700"
                    onClick={() => openForm()}
                >
                    + Add new
                </button>
            </div>
            {bookings.length > 0 ? (
                <table className="min-w-full bg-white">
                    <thead>
                    <tr>
                        <th className="py-2">Hotel Name</th>
                        <th className="py-2">Check-in</th>
                        <th className="py-2">Check-out</th>
                        <th className="py-2">Guest Name</th>
                        <th className="py-2">Guest Phone Number</th>
                        <th className="py-2">Status</th>
                        <th className="py-2">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td className="py-2 px-4 border">{booking.hotelName}</td>
                            <td className="py-2 px-4 border">
                                <div>{new Date(booking.checkInDateTime).toLocaleDateString()}</div>
                                <div>{new Date(booking.checkInDateTime).toLocaleTimeString()}</div>
                            </td>
                            <td className="py-2 px-4 border">
                                <div>{new Date(booking.checkOutDateTime).toLocaleDateString()}</div>
                                <div>{new Date(booking.checkOutDateTime).toLocaleTimeString()}</div>
                            </td>
                            <td className="py-2 px-4 border">{booking.guestName}</td>
                            <td className="py-2 px-4 border">{booking.guestPhoneNumber}</td>
                            <td className="py-2 px-4 border">{booking.status}</td>
                            <td className="py-2 px-4 border">
                                <div className="flex space-x-2 text-center">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-1 rounded-md flex items-center hover:bg-blue-700"
                                        onClick={() => openForm(booking)}
                                    >
                                        <PencilIcon className="h-5 w-5 mr-1"/>
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-4 py-1 rounded-md flex items-center hover:bg-red-700"
                                        onClick={() => handleDelete(booking._id)}
                                    >
                                        <TrashIcon className="h-5 w-5 mr-1"/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No bookings found</p>
            )}
            <BookingPopUpForm
                isOpen={isFormOpen}
                onClose={closeForm}
                booking={currentBooking}
                refreshBookings={refreshBookings}
                userId={userId} // Add this line to pass the userId prop
            />
        </div>
    );
}
