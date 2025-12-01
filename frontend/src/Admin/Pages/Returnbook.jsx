import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify'

const Returnbook = () => {
    const [bookId, setBookId] = useState("");
    const [issuedBooks, setIssuedBooks] = useState([]);



    // Fetch issued books for the dropdown
    useEffect(() => {
        const fetchIssuedBooks = async () => {

            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    toast.error("No token");
                    return;
                }


                const response = await axios.get(`http://localhost:8000/api/book/admin-issued`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                console.log("Issued books:", response.data);
                setIssuedBooks(response.data);
            } catch (error) {
                console.error("Error fetching issued books:", error.response?.data || error.message);
            }
        };

        fetchIssuedBooks();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!bookId) return toast.info("Please select a book");

        try {
            const token = localStorage.getItem("token");

            if (!token) {
                toast.error('Np token');
                return;
            }

            await axios.put(
                `http://localhost:8000/api/book/return/${bookId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success("Book returned!");

            // console.log("Returned response:", response.data);

            // Remove returned book from dropdown
            setIssuedBooks((prev) => prev.filter((book) => book._id !== bookId));
            setBookId("");
        } catch (error) {
            console.error("Return error:", error.response?.data || error.message);
            toast.error("Failed to return book");
        }
    };

    return (
        <div className="container mt-5" style={{ width: "30%" }}>
            <div className="bg-white p-4 rounded shadow">
                <h4 className="mb-4 text-center">Return Book</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="bookId" className="form-label">
                            Select Issued Book
                        </label>
                        <select
                            id="bookId"
                            className="form-control" style={{ outline: 'none', boxShadow: 'none' }}
                            value={bookId}
                            onChange={(e) => setBookId(e.target.value)}
                            required
                        >
                            <option value="">-- Select Book --</option>
                            {issuedBooks.length > 0 ? (
                                issuedBooks.map((book) => (
                                    <option key={book._id} value={book._id}>
                                        {book.title} ({book._id})
                                    </option>
                                ))
                            ) : (
                                <option disabled>No issued books available</option>
                            )}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success w-100">
                        Return Book
                    </button>
                </form>
                <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
            </div>
        </div>
    );
};

export default Returnbook;
