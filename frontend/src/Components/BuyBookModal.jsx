import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { toast, ToastContainer } from 'react-toastify';

import {
    fetchUserProfileRequest
} from '../User/Pages/Redux/Slices/userSlice';

import {
    checkBookStatusRequest,
    fakePaymentRequest
} from '../User/Pages/Redux/Slices/paymentSlice';

import './BuyBookModal.css';

const BuyBookModal = ({ book, onClose }) => {
    const dispatch = useDispatch();
    const [duration, setDuration] = useState("7");
    const [place, setPlace] = useState("");
    const [showQR, setShowQR] = useState(false);
    const [isAvailable, setIsAvailable] = useState(true);

    const RATE_PER_DAY = 10;

    const user = useSelector(state => state.UserProfile.profile);
    const {
        isBookPurchased,
        startDate,
        endDate
    } = useSelector(state => state.UserPayment);

    // Treat expired purchases as not purchased
    const now = new Date();
    const isActivePurchase = isBookPurchased && new Date(endDate) > now;

    const price = useMemo(() => parseInt(duration) * RATE_PER_DAY, [duration]);

    const formatDateTime = (date) => {
        const d = new Date(date);
        return d.toLocaleString('en-IN', {
            day: '2-digit', month: '2-digit', year: 'numeric',
            hour: '2-digit', minute: '2-digit', hour12: true
        });
    };

    useEffect(() => {
        dispatch(fetchUserProfileRequest());
    }, [dispatch]);

    useEffect(() => {
        if (book?.status === "Out of Stock") {
            setIsAvailable(false);
        } else {
            setIsAvailable(true);
            dispatch(checkBookStatusRequest({ bookId: book.bookId, duration }));
        }
    }, [book, duration, dispatch]);

    // const handleFakePayment = () => {

    //     dispatch(fakePaymentRequest({
    //         bookId: book.bookId,
    //         _id: book._id,
    //         duration,
    //         place,
    //         amountPaid: price,
    //         startDate,
    //         endDate
    //     }));

    //     toast.success("Book Rented!");
    //     setShowQR(false);
    //     setTimeout(() => {
    //         onClose();
    //     }, 1500);
    // };


    const handleFakePayment = () => {
        const now = new Date();
        const newStartDate = now.toISOString();
        const newEndDate = new Date(now.getTime() + parseInt(duration) * 24 * 60 * 60 * 1000).toISOString();

        dispatch(fakePaymentRequest({
            bookId: book.bookId,
            _id: book._id,
            duration,
            place,
            amountPaid: price,
            startDate: newStartDate,
            endDate: newEndDate
        }));

        toast.success("Book Rented!");
        setShowQR(false);
        setTimeout(() => {
            onClose();
        }, 1500);
    };


    const qrValue = JSON.stringify({
        user: user?.name || "N/A",
        email: user?.email || "N/A",
        userId: user?.userId || user?._id || "N/A",
        bookTitle: book?.title || "N/A",
        amountPaid: `${price} INR`,
        duration: `${duration} days`,
        place,
        startDate: formatDateTime(startDate),
        endDate: formatDateTime(endDate)
    });

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h4>BUY BOOK</h4>

                {/* Buy Form */}
                {!showQR && !isActivePurchase && (
                    <>
                        <div className="form-group"><label>Name:</label><input value={user.name || ''} disabled /></div>
                        <div className="form-group"><label>Email:</label><input value={user.email || ''} disabled /></div>
                        <div className="form-group"><label>User ID:</label><input value={user.userId || user._id || ''} disabled /></div>
                        <div className="form-group"><label>Book Title:</label><input value={book.title} disabled /></div>
                        <div className="form-group">
                            <label>Place:</label>
                            <input
                                value={place}
                                onChange={(e) => setPlace(e.target.value)}
                                placeholder="Enter place"
                            />
                        </div>
                        <div className="form-group">
                            <label>Duration:</label>
                            <select value={duration} onChange={(e) => setDuration(e.target.value)}>
                                <option value="7">7 days</option>
                                <option value="15">15 days</option>
                                <option value="30">30 days</option>
                            </select>
                        </div>
                        <div className="form-group"><label>Start Date:</label><input value={formatDateTime(startDate)} disabled /></div>
                        <div className="form-group"><label>End Date:</label><input value={formatDateTime(endDate)} disabled /></div>
                        <div className="form-group"><label>Price:</label><input value={`₹${price}`} disabled /></div>
                        {isAvailable ? (
                            <div className="form-group d-flex justify-content-between mt-3">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => {
                                        if (!place.trim()) {
                                            toast.error("Please enter place!");
                                            return;
                                        }
                                        setShowQR(true);
                                    }}
                                >
                                    Pay & Buy
                                </button>
                                <button className="btn btn-danger" onClick={onClose}>Cancel</button>
                            </div>
                        ) : (
                            <div className="form-group text-center mt-3">
                                <p className="text-danger fw-bold">Book is <u>Unavailable</u></p>
                                <button className="btn btn-secondary" onClick={onClose}>Close</button>
                            </div>
                        )}
                    </>
                )}

                {/* QR Code Payment */}
                {showQR && (
                    <div className="form-group text-center">
                        <h4>Scan to Pay</h4>
                        <QRCode value={qrValue} size={180} />
                        <div className="d-flex justify-content-center gap-3 mt-3">
                            <button className="btn btn-success m-1" onClick={handleFakePayment}>Paid</button>
                            <button className="btn btn-secondary" onClick={() => setShowQR(false)}>Cancel Payment</button>
                        </div>
                    </div>
                )}

                {/* Already Rented View */}
                {isActivePurchase && (
                    <div className="form-group mt-3 text-center">
                        <p className="text-success fw-bold">Book Rented</p>
                        <button className="btn btn-danger m-2 w-25" onClick={onClose}>Close</button>
                    </div>
                )}

                <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
            </div>
        </div>
    );
};

export default BuyBookModal;
