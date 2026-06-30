// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchMyBooksRequest } from './Redux/Slices/myBooksSlice';
// import './Mybooks.css';
// import { Container, Table, Badge } from 'react-bootstrap';

// const MyBooks = () => {
//     const dispatch = useDispatch();
//     const { books = [], loading, error } = useSelector((state) => state.UserBooks);

//     const [selectedPDF, setSelectedPDF] = useState(null);
//     const [showModal, setshowmodal] = useState(false);

//     useEffect(() => {
//         dispatch(fetchMyBooksRequest());
//     }, [dispatch]);

//     const handleView = (pdfPath) => {
//         setSelectedPDF(`${process.env.REACT_APP_BASE_URL}/uploads/pdfs/${pdfPath}?token=${localStorage.getItem("token")}#toolbar=0&navpanes=0&scrollbar=0`);
//         setshowmodal(true);
//     };

//     const handleClose = () => {
//         setshowmodal(false);
//         setSelectedPDF(null);
//     };

//     return (
//         <Container className="my-4">
//             <h3 className='text-center fw-bold text-primary'>PURCHASED BOOKS</h3>

//             {loading ? (
//                 <div className='alert alert-warning text-center'>Loading...</div>
//             ) : error ? (
//                 <div className='alert alert-danger text-center'>Error: {error}</div>
//             ) : books.length === 0 ? (
//                 <div className='alert alert-info text-center'>No active books available</div>
//             ) : (
//                 <div className='table-responsive shadow-sm rounded'>
//                     <Table striped bordered hover className='align-middle text-center'>
//                         <thead className='table-primary'>
//                             <tr>
//                                 <th>IMAGE</th>
//                                 <th>TITLE</th>
//                                 <th>DURATION</th>
//                                 <th>START DATE</th>
//                                 <th>END DATE</th>
//                                 <th>REMAINING DAYS</th>
//                                 <th>PDF</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {books.map((book) => (
//                                 <tr key={book._id}>
//                                     <td>
//                                         {book.bookimg ? (
//                                             <img
//                                                 src={`${process.env.REACT_APP_BASE_URL}/uploads/images/${book.bookimg}`}
//                                                 alt={book.bookTitle}
//                                                 style={{ width: '60px', height: '80px' }}
//                                                 className='rounded'
//                                             />
//                                         ) : 'No Image'}
//                                     </td>
//                                     <td>{book.bookTitle}</td>
//                                     <td>{book.duration} days</td>
//                                     <td>{new Date(book.startDate).toLocaleString('en-IN')}</td>
//                                     <td>{new Date(book.endDate).toLocaleString('en-IN')}</td>
//                                     <td>
//                                         <Badge bg={book.remainingDays <= 3 ? 'danger' : 'success'}>
//                                             {book.remainingDays} days
//                                         </Badge>
//                                     </td>
//                                     <td>
//                                         <button className="btn btn-primary" size="sm" onClick={() => handleView(book.pdfPath)}>View</button>
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </Table>
//                 </div>
//             )}

//             {/* pdf modal */}
//             {showModal && selectedPDF && (
//                 <div className="pdf-modal">
//                     <div className="pdf-modal-content">
//                         <button className="close-btn" onClick={handleClose}>x</button>
//                         <iframe
//                             src={selectedPDF}
//                             width="100%"
//                             height="900px"
//                             style={{ border: 'none' }}
//                             title="PDF Viewer"
//                         />
//                     </div>
//                 </div>
//             )}
//         </Container>
//     );
// };

// export default MyBooks;








import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBooksRequest } from './Redux/Slices/myBooksSlice';
import styles from './Mybooks.module.css';

/* ── helpers ── */
const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-IN', {
        day: '2-digit', month: '2-digit', year: 'numeric',
    });

const getBadgeClass = (days) => {
    if (days <= 1) return styles.badgeDanger;
    if (days <= 3) return styles.badgeWarn;
    return styles.badgeOk;
};

const getBadgeText = (days) => {
    if (days <= 0) return 'Expired';
    return `${days} day${days === 1 ? '' : 's'} left`;
};

/* ── Icons ── */
const BookIcon = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    </svg>
);

const CalendarIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);

const ClockIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);

const PdfIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
    </svg>
);

const CloseIcon = () => (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const LargePdfIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="9" y1="13" x2="15" y2="13" />
        <line x1="9" y1="17" x2="15" y2="17" />
        <polyline points="9 9 10 9 12 9" />
    </svg>
);

/* ── Book Card ── */
const BookCard = ({ book, onView }) => {
    const badgeClass = getBadgeClass(book.remainingDays);
    const badgeText = getBadgeText(book.remainingDays);

    return (
        <div className={styles.card}>
            {/* Cover image */}
            <div className={`${styles.imgWrap} ${badgeClass === styles.badgeDanger ? styles.imgBgDanger : badgeClass === styles.badgeWarn ? styles.imgBgWarn : styles.imgBgOk}`}>
                {book.bookimg ? (
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/uploads/images/${book.bookimg}`}
                        alt={book.bookTitle}
                        className={styles.bookImg}
                        onError={e => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className={styles.imgPlaceholder}>
                        <BookIcon />
                    </div>
                )}
                <span className={`${styles.remainingBadge} ${badgeClass}`}>
                    {badgeText}
                </span>
            </div>

            {/* Info */}
            <div className={styles.cardInfo}>
                <h3 className={styles.bookTitle}>{book.bookTitle}</h3>

                <div className={styles.metaRow}>
                    <CalendarIcon />
                    <span className={styles.metaLabel}>Start date</span>
                    <span className={styles.metaVal}>{formatDate(book.startDate)}</span>
                </div>
                <div className={styles.metaRow}>
                    <CalendarIcon />
                    <span className={styles.metaLabel}>End date</span>
                    <span className={styles.metaVal}>{formatDate(book.endDate)}</span>
                </div>
                <div className={styles.metaRow}>
                    <ClockIcon />
                    <span className={styles.metaLabel}>Duration</span>
                    <span className={styles.metaVal}>{book.duration} days</span>
                </div>

                <div className={styles.divider} />

                <button
                    className={styles.viewBtn}
                    onClick={() => onView(book)}
                >
                    <PdfIcon />
                    Read PDF
                </button>
            </div>
        </div>
    );
};

/* ── PDF Modal ── */
const PdfModal = ({ book, onClose }) => {
    const pdfUrl = `${process.env.REACT_APP_BASE_URL}/uploads/pdfs/${book.pdfPath}?token=${localStorage.getItem('token')}#toolbar=0&navpanes=0&scrollbar=0`;

    return (
        <div className={styles.overlay} onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className={styles.pdfModal}>
                {/* Header */}
                <div className={styles.pdfHeader}>
                    <div className={styles.pdfHeaderLeft}>
                        <div className={styles.pdfHeaderIcon}>
                            <LargePdfIcon />
                        </div>
                        <div>
                            <div className={styles.pdfHeaderTitle}>{book.bookTitle}</div>
                            <div className={styles.pdfHeaderSub}>PDF viewer</div>
                        </div>
                    </div>
                    <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
                        <CloseIcon />
                    </button>
                </div>

                {/* iframe */}
                <div className={styles.pdfBody}>
                    <iframe
                        src={pdfUrl}
                        width="100%"
                        height="100%"
                        style={{ border: 'none', display: 'block' }}
                        title={book.bookTitle}
                    />
                </div>
            </div>
        </div>
    );
};

/* ── Main Page ── */
const MyBooks = () => {
    const dispatch = useDispatch();
    const { books = [], loading, error } = useSelector((state) => state.UserBooks);
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        dispatch(fetchMyBooksRequest());
    }, [dispatch]);

    const handleView = (book) => setSelectedBook(book);
    const handleClose = () => setSelectedBook(null);

    return (
        <div className={styles.page}>

            {/* Header */}
            <div className={styles.header}>
                <div className={styles.headerLeft}>
                    <h1 className={styles.pageTitle}>My books</h1>
                    <p className={styles.pageSub}>Books you currently have rented</p>
                </div>
                {!loading && !error && books.length > 0 && (
                    <span className={styles.countPill}>
                        {books.length} active rental{books.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {/* States */}
            {loading && (
                <div className={styles.stateBox}>
                    <div className={styles.spinner} />
                    <p className={styles.stateText}>Loading your books…</p>
                </div>
            )}

            {!loading && error && (
                <div className={`${styles.stateBox} ${styles.stateError}`}>
                    <p className={styles.stateText}>Error: {error}</p>
                </div>
            )}

            {!loading && !error && books.length === 0 && (
                <div className={styles.emptyState}>
                    <div className={styles.emptyIcon}><BookIcon /></div>
                    <h3 className={styles.emptyTitle}>No active rentals</h3>
                    <p className={styles.emptySub}>Books you rent will appear here</p>
                </div>
            )}

            {/* Book grid */}
            {!loading && !error && books.length > 0 && (
                <div className={styles.grid}>
                    {books.map((book) => (
                        <BookCard key={book._id} book={book} onView={handleView} />
                    ))}
                </div>
            )}

            {/* PDF Modal */}
            {selectedBook && (
                <PdfModal book={selectedBook} onClose={handleClose} />
            )}
        </div>
    );
};

export default MyBooks;