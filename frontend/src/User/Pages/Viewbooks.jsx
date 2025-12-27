import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import BuyBookModal from '../../Components/BuyBookModal';

import {
    fetchBooksRequest
} from './Redux/book/bookSlice';
import {
    fetchUserProfileRequest
} from './Redux/Slices/userSlice';

import 'react-toastify/dist/ReactToastify.css';
import './Viewbooks.css';

const ViewBooks = () => {
    const dispatch = useDispatch();
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedBook, setSelectedBook] = useState(null);

    // Correct useSelector mapping

    useEffect(() => {
        dispatch(fetchBooksRequest());
        dispatch(fetchUserProfileRequest());
    }, [dispatch]);

    const { books } = useSelector((state) => state.UserBookList);
    const { profile } = useSelector((state) => state.UserProfile);

    

    const availableBooks = useMemo(() => {
        return books.filter(book => book.status === 'Available');
    }, [books]);

    const categories = useMemo(() => {
        const allCategories = availableBooks.map(book => book.category);
        return ['all', ...new Set(allCategories)];
    }, [availableBooks]);

    const filteredBooks = useMemo(() => {
        return availableBooks.filter(book => {
            const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = categoryFilter === 'all' || book.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });
    }, [availableBooks, searchTerm, categoryFilter]);

    if (!profile) {
        return <div className="text-center mt-4">Loading user profile...</div>;
    }

    return (
        <div className="container mt-4">
            <h3 className="text-center fw-bold text-primary">AVAILABLE BOOKS</h3>

            <div className="row mb-4">
                <div className="col-md-6 mb-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by book title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="col-md-6 mb-2">
                    <select
                        className="form-select"
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                    >
                        {categories.map((category, index) => (
                            <option key={index} value={category}>
                                {category === 'all' ? 'All Categories' : category}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {filteredBooks.length === 0 ? (
                <div className="alert alert-info text-center">No available books match your search/filter.</div>
            ) : (
                <div className="table-responsive shadow-sm rounded">
                    <table className="table table-hover align-middle text-center">
                        <thead className="table-primary">
                            <tr>
                                <th>IMAGE</th>
                                <th>BOOK ID</th>
                                <th>TITLE</th>
                                <th>AUTHOR</th>
                                <th>CATEGORY</th>
                                <th>PRICE</th>
                                {profile?.role === 'admin' && <th>STOCK</th>}
                                <th>STATUS</th>
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map(book => (
                                <tr key={book._id}>
                                    <td>
                                        {book.image ? (
                                            <img
                                                src={`http://localhost:8000/uploads/images/${book.image}`}
                                                alt={book.title}
                                                className="rounded"
                                                style={{ width: '60px', height: '80px' }}
                                            />
                                        ) : 'No Image'}
                                    </td>
                                    <td>{book.bookId}</td>
                                    <td>{book.title}</td>
                                    <td>{book.author}</td>
                                    <td>{book.category}</td>
                                    <td>₹{book.price}</td>
                                    {profile?.role === 'admin' && <td>{book.stock}</td>}
                                    <td>
                                        {book.stock === 0 ? (
                                            <span className="badge bg-danger">Out of Stock</span>
                                        ) : (
                                            <span className="badge bg-success">Available</span>
                                        )}
                                    </td>
                                    <td>
                                        {book.stock === 0 && profile?.role !== 'admin' ? (
                                            <button className="btn btn-secondary btn-sm" disabled>Out of Stock</button>
                                        ) : (
                                            <button
                                                className="btn btn-primary btn-sm"
                                                onClick={() => setSelectedBook(book)}
                                            >
                                                Buy
                                            </button>
                                        )}

                                    </td>

                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedBook && (
                <BuyBookModal
                    book={selectedBook}
                    onClose={() => setSelectedBook(null)}
                />
            )}

            <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
        </div>
    );
};

export default ViewBooks;
