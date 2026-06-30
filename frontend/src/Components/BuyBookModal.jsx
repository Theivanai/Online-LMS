// import React, { useEffect, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import QRCode from 'react-qr-code';
// import { toast, ToastContainer } from 'react-toastify';

// import {
//     fetchUserProfileRequest
// } from '../User/Pages/Redux/Slices/userSlice';

// import {
//     checkBookStatusRequest,
//     fakePaymentRequest
// } from '../User/Pages/Redux/Slices/paymentSlice';

// import './BuyBookModal.css';

// const BuyBookModal = ({ book, onClose }) => {
//     const dispatch = useDispatch();
//     const [duration, setDuration] = useState("7");
//     const [place, setPlace] = useState("");
//     const [showQR, setShowQR] = useState(false);
//     const [isAvailable, setIsAvailable] = useState(true);

//     const RATE_PER_DAY = 10;

//     const user = useSelector(state => state.UserProfile.profile);
//     const {
//         isBookPurchased,
//         startDate,
//         endDate
//     } = useSelector(state => state.UserPayment);

//     // Treat expired purchases as not purchased
//     const now = new Date();
//     const isActivePurchase = isBookPurchased && new Date(endDate) > now;

//     const price = useMemo(() => parseInt(duration) * RATE_PER_DAY, [duration]);

//     const formatDateTime = (date) => {
//         const d = new Date(date);
//         return d.toLocaleString('en-IN', {
//             day: '2-digit', month: '2-digit', year: 'numeric',
//             hour: '2-digit', minute: '2-digit', hour12: true
//         });
//     };

//     useEffect(() => {
//         dispatch(fetchUserProfileRequest());
//     }, [dispatch]);

//     useEffect(() => {
//         if (book?.status === "Out of Stock") {
//             setIsAvailable(false);
//         } else {
//             setIsAvailable(true);
//             dispatch(checkBookStatusRequest({ bookId: book.bookId, duration }));
//         }
//     }, [book, duration, dispatch]);




//     const handleFakePayment = () => {
//         const now = new Date();
//         const newStartDate = now.toISOString();
//         const newEndDate = new Date(now.getTime() + parseInt(duration) * 24 * 60 * 60 * 1000).toISOString();

//         dispatch(fakePaymentRequest({
//             bookId: book.bookId,
//             _id: book._id,
//             duration,
//             place,
//             amountPaid: price,
//             startDate: newStartDate,
//             endDate: newEndDate
//         }));

//         toast.success("Book Rented!");
//         setShowQR(false);
//         setTimeout(() => {
//             onClose();
//         }, 1500);
//     };


//     const qrValue = JSON.stringify({
//         user: user?.name || "N/A",
//         email: user?.email || "N/A",
//         userId: user?.userId || user?._id || "N/A",
//         bookTitle: book?.title || "N/A",
//         amountPaid: `${price} INR`,
//         duration: `${duration} days`,
//         place,
//         startDate: formatDateTime(startDate),
//         endDate: formatDateTime(endDate)
//     });

//     return (
//         <div className="modal-overlay">
//             <div className="modal-content">
//                 <h4>BUY BOOK</h4>

//                 {/* Buy Form */}
//                 {!showQR && !isActivePurchase && (
//                     <>
//                         <div className="form-group"><label>Name:</label><input value={user.name || ''} disabled /></div>
//                         <div className="form-group"><label>Email:</label><input value={user.email || ''} disabled /></div>
//                         <div className="form-group"><label>User ID:</label><input value={user.userId || user._id || ''} disabled /></div>
//                         <div className="form-group"><label>Book Title:</label><input value={book.title} disabled /></div>
//                         <div className="form-group">
//                             <label>Place:</label>
//                             <input
//                                 value={place}
//                                 onChange={(e) => setPlace(e.target.value)}
//                                 placeholder="Enter place"
//                             />
//                         </div>
//                         <div className="form-group">
//                             <label>Duration:</label>
//                             <select value={duration} onChange={(e) => setDuration(e.target.value)}>
//                                 <option value="7">7 days</option>
//                                 <option value="15">15 days</option>
//                                 <option value="30">30 days</option>
//                             </select>
//                         </div>
//                         <div className="form-group"><label>Start Date:</label><input value={formatDateTime(startDate)} disabled /></div>
//                         <div className="form-group"><label>End Date:</label><input value={formatDateTime(endDate)} disabled /></div>
//                         <div className="form-group"><label>Price:</label><input value={`₹${price}`} disabled /></div>
//                         {isAvailable ? (
//                             <div className="form-group d-flex justify-content-between mt-3">
//                                 <button
//                                     className="btn btn-primary"
//                                     onClick={() => {
//                                         if (!place.trim()) {
//                                             toast.error("Please enter place!");
//                                             return;
//                                         }
//                                         setShowQR(true);
//                                     }}
//                                 >
//                                     Pay & Buy
//                                 </button>
//                                 <button className="btn btn-danger" onClick={onClose}>Cancel</button>
//                             </div>
//                         ) : (
//                             <div className="form-group text-center mt-3">
//                                 <p className="text-danger fw-bold">Book is <u>Unavailable</u></p>
//                                 <button className="btn btn-secondary" onClick={onClose}>Close</button>
//                             </div>
//                         )}
//                     </>
//                 )}

//                 {/* QR Code Payment */}
//                 {showQR && (
//                     <div className="form-group text-center">
//                         <h4>Scan to Pay</h4>
//                         <QRCode value={qrValue} size={180} />
//                         <div className="d-flex justify-content-center gap-3 mt-3">
//                             <button className="btn btn-success m-1" onClick={handleFakePayment}>Paid</button>
//                             <button className="btn btn-secondary" onClick={() => setShowQR(false)}>Cancel Payment</button>
//                         </div>
//                     </div>
//                 )}

//                 {/* Already Rented View */}
//                 {isActivePurchase && (
//                     <div className="form-group mt-3 text-center">
//                         <p className="text-success fw-bold">Book Rented</p>
//                         <button className="btn btn-danger m-2 w-25" onClick={onClose}>Close</button>
//                     </div>
//                 )}

//                 <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
//             </div>
//         </div>
//     );
// };

// export default BuyBookModal;













// import React, { useEffect, useState, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import QRCode from 'react-qr-code';
// import { toast, ToastContainer } from 'react-toastify';
// import { fetchUserProfileRequest } from '../User/Pages/Redux/Slices/userSlice';
// import { checkBookStatusRequest, fakePaymentRequest } from '../User/Pages/Redux/Slices/paymentSlice';
// import styles from './BuyBookModal.module.css';

// const RATE_PER_DAY = 10;

// /* ── helpers ── */
// const formatDateTime = (date) =>
//     new Date(date).toLocaleString('en-IN', {
//         day: '2-digit', month: '2-digit', year: 'numeric',
//         hour: '2-digit', minute: '2-digit', hour12: true,
//     });

// /* ── Step indicator ── */
// const Steps = ({ current }) => {
//     const steps = ['Details', 'Payment', 'Confirm'];
//     return (
//         <div className={styles.steps}>
//             {steps.map((label, i) => (
//                 <React.Fragment key={label}>
//                     <div className={`${styles.step} ${i <= current ? styles.stepActive : ''}`}>
//                         <div className={styles.stepCircle}>{i + 1}</div>
//                         <span className={styles.stepLabel}>{label}</span>
//                     </div>
//                     {i < steps.length - 1 && (
//                         <div className={`${styles.stepLine} ${i < current ? styles.stepLineActive : ''}`} />
//                     )}
//                 </React.Fragment>
//             ))}
//         </div>
//     );
// };

// /* ── Info row ── */
// const InfoRow = ({ icon, label, value, children }) => (
//     <div className={styles.infoRow}>
//         <span className={styles.infoIcon}>{icon}</span>
//         <div className={styles.infoContent}>
//             <span className={styles.infoLabel}>{label}</span>
//             {children || <span className={styles.infoValue}>{value}</span>}
//         </div>
//     </div>
// );

// /* ── Main Modal ── */
// const BuyBookModal = ({ book, onClose }) => {
//     const dispatch = useDispatch();
//     const [duration, setDuration] = useState('7');
//     const [place, setPlace] = useState('');
//     const [step, setStep] = useState(0); // 0=details, 1=payment QR, 2=success
//     const [isAvailable, setIsAvailable] = useState(true);

//     const user = useSelector(state => state.UserProfile.profile);
//     const { isBookPurchased, startDate, endDate } = useSelector(state => state.UserPayment);

//     const now = new Date();
//     const isActivePurchase = isBookPurchased && new Date(endDate) > now;
//     const price = useMemo(() => parseInt(duration) * RATE_PER_DAY, [duration]);

//     useEffect(() => { dispatch(fetchUserProfileRequest()); }, [dispatch]);

//     useEffect(() => {
//         if (book?.status === 'Out of Stock') {
//             setIsAvailable(false);
//         } else {
//             setIsAvailable(true);
//             dispatch(checkBookStatusRequest({ bookId: book.bookId, duration }));
//         }
//     }, [book, duration, dispatch]);

//     const handleProceedToPayment = () => {
//         if (!place.trim()) {
//             toast.error('Please enter your place!');
//             return;
//         }
//         setStep(1);
//     };

//     const handleFakePayment = () => {
//         const now = new Date();
//         const newStartDate = now.toISOString();
//         const newEndDate = new Date(now.getTime() + parseInt(duration) * 86400000).toISOString();

//         dispatch(fakePaymentRequest({
//             bookId: book.bookId,
//             _id: book._id,
//             duration,
//             place,
//             amountPaid: price,
//             startDate: newStartDate,
//             endDate: newEndDate,
//         }));

//         setStep(2);
//         setTimeout(() => { toast.success('Book Rented Successfully!'); }, 200);
//         setTimeout(onClose, 2500);
//     };

//     const qrValue = JSON.stringify({
//         user: user?.name || 'N/A',
//         email: user?.email || 'N/A',
//         userId: user?.userId || user?._id || 'N/A',
//         bookTitle: book?.title || 'N/A',
//         amountPaid: `₹${price}`,
//         duration: `${duration} days`,
//         place,
//         startDate: startDate ? formatDateTime(startDate) : '',
//         endDate: endDate ? formatDateTime(endDate) : '',
//     });

//     return (
//         <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
//             <div className={styles.modal}>

//                 {/* ── Header ── */}
//                 <div className={styles.header}>
//                     <div className={styles.headerLeft}>
//                         <div className={styles.headerIcon}>
//                             <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
//                                 stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                 <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
//                                 <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
//                             </svg>
//                         </div>
//                         <div>
//                             <h4 className={styles.headerTitle}>Rent a Book</h4>
//                             <p className={styles.headerSub}>Complete your rental in 3 steps</p>
//                         </div>
//                     </div>
//                     <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
//                         <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
//                             stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                             <line x1="18" y1="6" x2="6" y2="18" />
//                             <line x1="6" y1="6" x2="18" y2="18" />
//                         </svg>
//                     </button>
//                 </div>

//                 {/* ── Steps ── */}
//                 {!isActivePurchase && <Steps current={step} />}

//                 {/* ════════════════════════════
//                     STEP 0 — Details
//                 ════════════════════════════ */}
//                 {step === 0 && !isActivePurchase && (
//                     <div className={styles.body}>

//                         {/* Book card */}
//                         <div className={styles.bookCard}>
//                             <img
//                                 src={`http://localhost:8000/uploads/images/${book?.bookimg}`}
//                                 alt={book?.title}
//                                 className={styles.bookThumb}
//                                 onError={e => { e.target.style.display = 'none'; }}
//                             />
//                             <div className={styles.bookMeta}>
//                                 <h5 className={styles.bookTitle}>{book?.title}</h5>
//                                 <span className={`${styles.statusBadge} ${isAvailable ? styles.statusAvailable : styles.statusUnavailable}`}>
//                                     {isAvailable ? '● Available' : '● Out of Stock'}
//                                 </span>
//                             </div>
//                         </div>

//                         {/* User info */}
//                         <div className={styles.section}>
//                             <div className={styles.sectionTitle}>Your Info</div>
//                             <InfoRow icon="👤" label="Name" value={user?.name || '—'} />
//                             <InfoRow icon="✉️" label="Email" value={user?.email || '—'} />
//                             <InfoRow icon="🪪" label="User ID" value={user?.userId || user?._id || '—'} />
//                         </div>

//                         {/* Rental options */}
//                         <div className={styles.section}>
//                             <div className={styles.sectionTitle}>Rental Options</div>

//                             <InfoRow icon="📍" label="Place">
//                                 <input
//                                     className={styles.inputField}
//                                     value={place}
//                                     onChange={e => setPlace(e.target.value)}
//                                     placeholder="Enter your place"
//                                 />
//                             </InfoRow>

//                             <InfoRow icon="📅" label="Duration">
//                                 <div className={styles.durationGrid}>
//                                     {['7', '15', '30'].map(d => (
//                                         <button
//                                             key={d}
//                                             className={`${styles.durationBtn} ${duration === d ? styles.durationBtnActive : ''}`}
//                                             onClick={() => setDuration(d)}
//                                         >
//                                             {d} days
//                                         </button>
//                                     ))}
//                                 </div>
//                             </InfoRow>

//                             <InfoRow icon="🗓️" label="Start date" value={startDate ? formatDateTime(startDate) : '—'} />
//                             <InfoRow icon="🗓️" label="End date" value={endDate ? formatDateTime(endDate) : '—'} />
//                         </div>

//                         {/* Price summary */}
//                         <div className={styles.priceSummary}>
//                             <div className={styles.priceRow}>
//                                 <span className={styles.priceLabel}>Rate</span>
//                                 <span className={styles.priceVal}>₹{RATE_PER_DAY} / day</span>
//                             </div>
//                             <div className={styles.priceRow}>
//                                 <span className={styles.priceLabel}>Duration</span>
//                                 <span className={styles.priceVal}>{duration} days</span>
//                             </div>
//                             <div className={styles.priceDivider} />
//                             <div className={styles.priceRowTotal}>
//                                 <span className={styles.priceTotalLabel}>Total</span>
//                                 <span className={styles.priceTotalVal}>₹{price}</span>
//                             </div>
//                         </div>

//                         {/* Actions */}
//                         <div className={styles.actions}>
//                             <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
//                             {isAvailable ? (
//                                 <button className={styles.primaryBtn} onClick={handleProceedToPayment}>
//                                     Proceed to Pay
//                                     <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                                         stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                         <path d="M5 12h14M12 5l7 7-7 7" />
//                                     </svg>
//                                 </button>
//                             ) : (
//                                 <button className={styles.unavailableBtn} disabled>Unavailable</button>
//                             )}
//                         </div>
//                     </div>
//                 )}

//                 {/* ════════════════════════════
//                     STEP 1 — QR Payment
//                 ════════════════════════════ */}
//                 {step === 1 && (
//                     <div className={styles.body}>
//                         <div className={styles.qrSection}>
//                             <p className={styles.qrHint}>Scan the QR code to complete your payment</p>
//                             <div className={styles.qrBox}>
//                                 <QRCode value={qrValue} size={180} />
//                             </div>
//                             <div className={styles.qrAmount}>₹{price}</div>
//                             <p className={styles.qrSub}>for {duration} days · {book?.title}</p>
//                         </div>
//                         <div className={styles.actions}>
//                             <button className={styles.cancelBtn} onClick={() => setStep(0)}>Back</button>
//                             <button className={styles.primaryBtn} onClick={handleFakePayment}>
//                                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
//                                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
//                                     <polyline points="22 4 12 14.01 9 11.01" />
//                                 </svg>
//                                 I've Paid
//                             </button>
//                         </div>
//                     </div>
//                 )}

//                 {/* ════════════════════════════
//                     STEP 2 — Success
//                 ════════════════════════════ */}
//                 {step === 2 && (
//                     <div className={styles.body}>
//                         <div className={styles.successSection}>
//                             <div className={styles.successIcon}>
//                                 <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
//                                     stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                                     <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
//                                     <polyline points="22 4 12 14.01 9 11.01" />
//                                 </svg>
//                             </div>
//                             <h4 className={styles.successTitle}>Book Rented!</h4>
//                             <p className={styles.successSub}>
//                                 <strong>{book?.title}</strong> is yours for {duration} days.<br />
//                                 Enjoy your reading!
//                             </p>
//                             <div className={styles.successMeta}>
//                                 <span>Amount paid: <strong>₹{price}</strong></span>
//                                 <span>Place: <strong>{place}</strong></span>
//                             </div>
//                         </div>
//                     </div>
//                 )}

//                 {/* ════════════════════════════
//                     Already rented
//                 ════════════════════════════ */}
//                 {isActivePurchase && (
//                     <div className={styles.body}>
//                         <div className={styles.alreadyRented}>
//                             <div className={styles.alreadyIcon}>📖</div>
//                             <h4 className={styles.alreadyTitle}>Already Rented</h4>
//                             <p className={styles.alreadySub}>You already have an active rental for this book.</p>
//                             <div className={styles.alreadyDates}>
//                                 <span>Ends: <strong>{formatDateTime(endDate)}</strong></span>
//                             </div>
//                             <button className={styles.cancelBtn} onClick={onClose}>Close</button>
//                         </div>
//                     </div>
//                 )}

//             </div>
//             <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//         </div>
//     );
// };

// export default BuyBookModal;











import React, { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import QRCode from 'react-qr-code';
import { toast, ToastContainer } from 'react-toastify';
import { fetchUserProfileRequest } from '../User/Pages/Redux/Slices/userSlice';
import { checkBookStatusRequest, fakePaymentRequest } from '../User/Pages/Redux/Slices/paymentSlice';
import styles from './BuyBookModal.module.css';

const RATE_PER_DAY = 10;

/* ── helpers ── */
const formatDateTime = (date) =>
    new Date(date).toLocaleString('en-IN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit', hour12: true,
    });

/* ── Step indicator ── */
const Steps = ({ current }) => {
    const steps = ['Details', 'Payment', 'Confirm'];
    return (
        <div className={styles.steps}>
            {steps.map((label, i) => (
                <React.Fragment key={label}>
                    <div className={`${styles.step} ${i <= current ? styles.stepActive : ''}`}>
                        <div className={styles.stepCircle}>{i + 1}</div>
                        <span className={styles.stepLabel}>{label}</span>
                    </div>
                    {i < steps.length - 1 && (
                        <div className={`${styles.stepLine} ${i < current ? styles.stepLineActive : ''}`} />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
};

/* ── Info row ── */
const InfoRow = ({ icon, label, value, children }) => (
    <div className={styles.infoRow}>
        <span className={styles.infoIcon}>{icon}</span>
        <div className={styles.infoContent}>
            <span className={styles.infoLabel}>{label}</span>
            {children || <span className={styles.infoValue}>{value}</span>}
        </div>
    </div>
);

/* ── Main Modal ── */
const BuyBookModal = ({ book, onClose }) => {
    const dispatch = useDispatch();
    const [duration, setDuration] = useState('7');
    const [place, setPlace] = useState('');
    const [step, setStep] = useState(0); // 0=details, 1=payment QR, 2=success
    const [isAvailable, setIsAvailable] = useState(true);

    const user = useSelector(state => state.UserProfile.profile);
    const { isBookPurchased, startDate: reduxStartDate, endDate: reduxEndDate } = useSelector(state => state.UserPayment);

    const now = new Date();
    const isActivePurchase = isBookPurchased && new Date(reduxEndDate) > now;
    const price = useMemo(() => parseInt(duration) * RATE_PER_DAY, [duration]);

    // ✅ Always calculate dates locally based on current duration
    // For already-purchased books use redux dates, else calculate fresh
    const startDate = isActivePurchase ? reduxStartDate : new Date().toISOString();
    const endDate = isActivePurchase
        ? reduxEndDate
        : new Date(new Date().getTime() + parseInt(duration) * 86400000).toISOString();

    useEffect(() => { dispatch(fetchUserProfileRequest()); }, [dispatch]);

    useEffect(() => {
        if (book?.status === 'Out of Stock') {
            setIsAvailable(false);
        } else {
            setIsAvailable(true);
            dispatch(checkBookStatusRequest({ bookId: book.bookId, duration }));
        }
    }, [book, duration, dispatch]);

    const handleProceedToPayment = () => {
        if (!place.trim()) {
            toast.error('Please enter your place!');
            return;
        }
        setStep(1);
    };

    const handleFakePayment = () => {
        const now = new Date();
        const newStartDate = now.toISOString();
        const newEndDate = new Date(now.getTime() + parseInt(duration) * 86400000).toISOString();

        dispatch(fakePaymentRequest({
            bookId: book.bookId,
            _id: book._id,
            duration,
            place,
            amountPaid: price,
            startDate: newStartDate,
            endDate: newEndDate,
        }));

        setStep(2);
        setTimeout(() => { toast.success('Book Rented Successfully!'); }, 200);
        setTimeout(onClose, 2500);
    };

    const qrValue = JSON.stringify({
        user: user?.name || 'N/A',
        email: user?.email || 'N/A',
        userId: user?.userId || user?._id || 'N/A',
        bookTitle: book?.title || 'N/A',
        amountPaid: `₹${price}`,
        duration: `${duration} days`,
        place,
        startDate: startDate ? formatDateTime(startDate) : '',
        endDate: endDate ? formatDateTime(endDate) : '',
    });

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.modal}>

                {/* ── Header ── */}
                <div className={styles.header}>
                    <div className={styles.headerLeft}>
                        <div className={styles.headerIcon}>
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
                                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className={styles.headerTitle}>Rent a Book</h4>
                            <p className={styles.headerSub}>Complete your rental in 3 steps</p>
                        </div>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* ── Steps ── */}
                {!isActivePurchase && <Steps current={step} />}

                {/* ════════════════════════════
                    STEP 0 — Details
                ════════════════════════════ */}
                {step === 0 && !isActivePurchase && (
                    <div className={styles.body}>

                        {/* Book card */}
                        <div className={styles.bookCard}>
                            <img
                                src={`http://localhost:8000/uploads/images/${book?.bookimg}`}
                                alt={book?.title}
                                className={styles.bookThumb}
                                onError={e => { e.target.style.display = 'none'; }}
                            />
                            <div className={styles.bookMeta}>
                                <h5 className={styles.bookTitle}>{book?.title}</h5>
                                <span className={`${styles.statusBadge} ${isAvailable ? styles.statusAvailable : styles.statusUnavailable}`}>
                                    {isAvailable ? '● Available' : '● Out of Stock'}
                                </span>
                            </div>
                        </div>

                        {/* User info */}
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Your Info</div>
                            <InfoRow icon="👤" label="Name" value={user?.name || '—'} />
                            <InfoRow icon="✉️" label="Email" value={user?.email || '—'} />
                            <InfoRow icon="🪪" label="User ID" value={user?.userId || user?._id || '—'} />
                        </div>

                        {/* Rental options */}
                        <div className={styles.section}>
                            <div className={styles.sectionTitle}>Rental Options</div>

                            <InfoRow icon="📍" label="Place">
                                <input
                                    className={styles.inputField}
                                    value={place}
                                    onChange={e => setPlace(e.target.value)}
                                    placeholder="Enter your place"
                                />
                            </InfoRow>

                            <InfoRow icon="📅" label="Duration">
                                <div className={styles.durationGrid}>
                                    {['7', '15', '30'].map(d => (
                                        <button
                                            key={d}
                                            className={`${styles.durationBtn} ${duration === d ? styles.durationBtnActive : ''}`}
                                            onClick={() => setDuration(d)}
                                        >
                                            {d} days
                                        </button>
                                    ))}
                                </div>
                            </InfoRow>

                            <InfoRow icon="🗓️" label="Start date" value={startDate ? formatDateTime(startDate) : '—'} />
                            <InfoRow icon="🗓️" label="End date" value={endDate ? formatDateTime(endDate) : '—'} />
                        </div>

                        {/* Price summary */}
                        <div className={styles.priceSummary}>
                            <div className={styles.priceRow}>
                                <span className={styles.priceLabel}>Rate</span>
                                <span className={styles.priceVal}>₹{RATE_PER_DAY} / day</span>
                            </div>
                            <div className={styles.priceRow}>
                                <span className={styles.priceLabel}>Duration</span>
                                <span className={styles.priceVal}>{duration} days</span>
                            </div>
                            <div className={styles.priceDivider} />
                            <div className={styles.priceRowTotal}>
                                <span className={styles.priceTotalLabel}>Total</span>
                                <span className={styles.priceTotalVal}>₹{price}</span>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <button className={styles.cancelBtn} onClick={onClose}>Cancel</button>
                            {isAvailable ? (
                                <button className={styles.primaryBtn} onClick={handleProceedToPayment}>
                                    Proceed to Pay
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                    </svg>
                                </button>
                            ) : (
                                <button className={styles.unavailableBtn} disabled>Unavailable</button>
                            )}
                        </div>
                    </div>
                )}

                {/* ════════════════════════════
                    STEP 1 — QR Payment
                ════════════════════════════ */}
                {step === 1 && (
                    <div className={styles.body}>
                        <div className={styles.qrSection}>
                            <p className={styles.qrHint}>Scan the QR code to complete your payment</p>
                            <div className={styles.qrBox}>
                                <QRCode value={qrValue} size={180} />
                            </div>
                            <div className={styles.qrAmount}>₹{price}</div>
                            <p className={styles.qrSub}>for {duration} days · {book?.title}</p>
                        </div>
                        <div className={styles.actions}>
                            <button className={styles.cancelBtn} onClick={() => setStep(0)}>Back</button>
                            <button className={styles.primaryBtn} onClick={handleFakePayment}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                                I've Paid
                            </button>
                        </div>
                    </div>
                )}

                {/* ════════════════════════════
                    STEP 2 — Success
                ════════════════════════════ */}
                {step === 2 && (
                    <div className={styles.body}>
                        <div className={styles.successSection}>
                            <div className={styles.successIcon}>
                                <svg width="32" height="32" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                    <polyline points="22 4 12 14.01 9 11.01" />
                                </svg>
                            </div>
                            <h4 className={styles.successTitle}>Book Rented!</h4>
                            <p className={styles.successSub}>
                                <strong>{book?.title}</strong> is yours for {duration} days.<br />
                                Enjoy your reading!
                            </p>
                            <div className={styles.successMeta}>
                                <span>Amount paid: <strong>₹{price}</strong></span>
                                <span>Place: <strong>{place}</strong></span>
                            </div>
                        </div>
                    </div>
                )}

                {/* ════════════════════════════
                    Already rented
                ════════════════════════════ */}
                {isActivePurchase && (
                    <div className={styles.body}>
                        <div className={styles.alreadyRented}>
                            <div className={styles.alreadyIcon}>📖</div>
                            <h4 className={styles.alreadyTitle}>Already Rented</h4>
                            <p className={styles.alreadySub}>You already have an active rental for this book.</p>
                            <div className={styles.alreadyDates}>
                                <span>Ends: <strong>{formatDateTime(endDate)}</strong></span>
                            </div>
                            <button className={styles.cancelBtn} onClick={onClose}>Close</button>
                        </div>
                    </div>
                )}

            </div>
            <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
        </div>
    );
};

export default BuyBookModal;