// import React, { useState } from "react";
// import axios from "axios";

// const Issuebook = () => {
//     const [bookId, setBookId] = useState("");

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             const token = localStorage.getItem('token'); // Make sure token is stored on login

//             const response = await axios.post(
//                 `http://localhost:8000/api/book/issue/${bookId}`,
//                 {},
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );

//             alert("Book issued successfully!");
//             console.log("Response:", response.data);
//             setBookId(""); // reset form
//         } catch (err) {
//             alert(err.response?.data?.message || "Issue failed");
//             console.error(err);
//         }
//     };

//     return (
//         <div className="container mt-5" style={{ width: '25%' }}>
//             <div className="bg-white p-4 rounded shadow">
//                 <h4 className="mb-4 text-center">Issue Book</h4>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="bookId" className="form-label">Book ID</label>
//                         <input
//                             type="text"
//                             className="form-control"
//                             id="bookId"
//                             value={bookId}
//                             onChange={(e) => setBookId(e.target.value)}
//                             placeholder="Enter Book ID"
//                             required
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-success w-100">Issue Book</button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default Issuebook;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'

const IssueBook = () => {
    const [books, setBooks] = useState([]);
    const [bookId, setBookId] = useState('');
    const [issuedTo, setIssuedTo] = useState('');

    const token = localStorage.getItem('token');

    useEffect(() => {
        axios.get(`http://localhost:8000/api/book/all`, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(res => {
            setBooks(res.data.filter(book => book.status === 'Available'));
        });
    }, []);

    const handleIssue = async () => {
        try {
            await axios.put(`http://localhost:8000/api/book/issue/${bookId}`, {
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
