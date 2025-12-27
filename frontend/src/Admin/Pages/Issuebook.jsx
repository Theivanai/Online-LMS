import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'

const IssueBook = () => {
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState('');
    const [issuedTo, setIssuedTo] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/book/all`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setBooks(res.data.filter(book => book.status === 'Available'));
        });
    }, []);

    const handleIssue = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/api/book/issue/${bookId}`, {
                issuedTo
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Book issued!');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Issue failed');
        }
    };

    return (
        <div className="container mt-4" style={{ width: '30%' }}>
            <div className='bg-whitw p-4 rounded shadow'>
                <h3 className='text-center'>Issue a Book</h3>
                <select className="form-control mb-3" style={{ outline: 'none', boxShadow: 'none' }} onChange={e => setBookId(e.target.value)}>
                    <option value="">Select Book</option>
                    {books.map(book => (
                        <option key={book._id} value={book._id}>
                            {book.title} ({book.isbn})
                        </option>
                    ))}
                </select>
                <input
                    type="text"
                    className="form-control mb-3" style={{ outline: 'none', boxShadow: 'none' }}
                    placeholder="IssuedTo "
                    value={issuedTo}
                    onChange={e => setIssuedTo(e.target.value)}
                />
                <button className="btn btn-primary w-100" onClick={handleIssue}>Issue Book</button>
            </div>
            <ToastContainer position='top-center' autoClose={1500} closeButton={false}/>
        </div>
    );
};

export default IssueBook;
