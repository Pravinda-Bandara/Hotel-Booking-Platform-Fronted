import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createBooking, updateBooking } from "../apiHooks/ApiHooks.js";

const BookingPopUpForm = ({ isOpen, onClose, booking, refreshBookings, userId }) => {
    const [formData, setFormData] = useState({
        hotelName: '',
        checkInDateTime: '',
        checkOutDateTime: '',
        guestName: '',
        guestPhoneNumber: '',
        status: '',
        description: ''
    });

    useEffect(() => {
        if (booking) {
            setFormData({
                hotelName: booking.hotelName,
                checkInDateTime: new Date(booking.checkInDateTime).toISOString().slice(0, 16),
                checkOutDateTime: new Date(booking.checkOutDateTime).toISOString().slice(0, 16),
                guestName: booking.guestName,
                guestPhoneNumber: booking.guestPhoneNumber,
                status: booking.status,
                description: booking.description || ''
            });
        } else {
            setFormData({
                hotelName: '',
                checkInDateTime: '',
                checkOutDateTime: '',
                guestName: '',
                guestPhoneNumber: '',
                status: '',
                description: ''
            });
        }
    }, [booking]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (booking) {
                await updateBooking(booking._id, formData);
                toast.success('Booking updated successfully');
            } else {
                await createBooking({ ...formData, userId });
                toast.success('Booking created successfully');
            }
            refreshBookings();
            onClose();
        } catch (error) {
            toast.error(error.message);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
            <div className="bg-white p-6 rounded-md w-full max-w-2xl shadow-lg">
                <h2 className="text-2xl mb-4">{booking ? 'Edit Booking' : 'Add New Booking'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                            <label className="block mb-2 font-semibold">Hotel Name</label>
                            <input
                                type="text"
                                name="hotelName"
                                value={formData.hotelName}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>

                        <div className="w-full md:w-1/2 px-3">
                            <label className="block mb-2 font-semibold">Guest Name</label>
                            <input
                                type="text"
                                name="guestName"
                                value={formData.guestName}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block mb-2 font-semibold">Check-in Date & Time</label>
                            <input
                                type="datetime-local"
                                name="checkInDateTime"
                                value={formData.checkInDateTime}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                            <label className="block mb-2 font-semibold">Check-out Date & Time</label>
                            <input
                                type="datetime-local"
                                name="checkOutDateTime"
                                value={formData.checkOutDateTime}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>

                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4">
                        <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                            <label className="block mb-2 font-semibold">Guest Phone Number</label>
                            <input
                                type="text"
                                name="guestPhoneNumber"
                                value={formData.guestPhoneNumber}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded-md"
                            />
                        </div>
                        <div className="w-full md:w-1/2 px-3">
                            <label className="block mb-2 font-semibold">Status</label>
                            <div className="flex space-x-4">
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Pending"
                                        checked={formData.status === 'Pending'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Pending
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Confirmed"
                                        checked={formData.status === 'Confirmed'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Confirmed
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="status"
                                        value="Cancelled"
                                        checked={formData.status === 'Cancelled'}
                                        onChange={handleChange}
                                        className="mr-2"
                                    />
                                    Cancelled
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-semibold">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded-md"
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                        >
                            {booking ? 'Update' : 'Add'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BookingPopUpForm;
