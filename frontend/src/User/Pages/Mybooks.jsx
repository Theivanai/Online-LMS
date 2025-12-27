import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyBooksRequest } from './Redux/Slices/myBooksSlice';
import './Mybooks.css';
import { Container, Table, Badge } from 'react-bootstrap';

const MyBooks = () => {
    const dispatch = useDispatch();
    const { books = [], loading, error } = useSelector((state) => state.UserBooks);

    const [selectedPDF, setSelectedPDF] = useState(null);
    const [showModal, setshowmodal] = useState(false);

    useEffect(() => {
        dispatch(fetchMyBooksRequest());
    }, [dispatch]);

    const handleView = (pdfPath) => {
        setSelectedPDF(`${process.env.REACT_APP_BACKEND_URL}/uploads/pdfs/${pdfPath}?token=${localStorage.getItem("token")}#toolbar=0&navpanes=0&scrollbar=0`);
        setshowmodal(true);
    };

    const handleClose = () => {
        setshowmodal(false);
        setSelectedPDF(null);
    };

    return (
        <Container className="my-4">
            <h3 className='text-center fw-bold text-primary'>PURCHASED BOOKS</h3>

            {loading ? (
                <div className='alert alert-warning text-center'>Loading...</div>
            ) : error ? (
                <div className='alert alert-danger text-center'>Error: {error}</div>
            ) : books.length === 0 ? (
                <div className='alert alert-info text-center'>No active books available</div>
            ) : (
                <div className='table-responsive shadow-sm rounded'>
                    <Table striped bordered hover className='align-middle text-center'>
                        <thead className='table-primary'>
                            <tr>
                                <th>IMAGE</th>
                                <th>TITLE</th>
                                <th>DURATION</th>
                                <th>START DATE</th>
                                <th>END DATE</th>
                                <th>REMAINING DAYS</th>
                                <th>PDF</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id}>
                                    <td>
                                        {book.bookimg ? (
                                            <img
                                                src={`${process.env.REACT_BASE_URL}/uploads/images/${book.bookimg}`}
                                                alt={book.bookTitle}
                                                style={{ width: '60px', height: '80px' }}
                                                className='rounded'
                                            />
                                        ) : 'No Image'}
                                    </td>
                                    <td>{book.bookTitle}</td>
                                    <td>{book.duration} days</td>
                                    <td>{new Date(book.startDate).toLocaleString('en-IN')}</td>
                                    <td>{new Date(book.endDate).toLocaleString('en-IN')}</td>
                                    <td>
                                        <Badge bg={book.remainingDays <= 3 ? 'danger' : 'success'}>
                                            {book.remainingDays} days
                                        </Badge>
                                    </td>
                                    <td>
                                        <button className="btn btn-primary" size="sm" onClick={() => handleView(book.pdfPath)}>View</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            )}

            {/* pdf modal */}
            {showModal && selectedPDF && (
                <div className="pdf-modal">
                    <div className="pdf-modal-content">
                        <button className="close-btn" onClick={handleClose}>x</button>
                        <iframe
                            src={selectedPDF}
                            width="100%"
                            height="900px"
                            style={{ border: 'none' }}
                            title="PDF Viewer"
                        />
                    </div>
                </div>
            )}
        </Container>
    );
};

export default MyBooks;
