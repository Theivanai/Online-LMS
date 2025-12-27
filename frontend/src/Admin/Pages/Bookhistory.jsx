import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Table,
  Container,
  Image,
  Form,
  InputGroup,
  Spinner,
} from 'react-bootstrap';
import {
  fetchBookHistoryRequest,
} from '../../Redux/bookhistory/bookhistorySlice';
import styles from './Bookhistory.module.css';


const Bookhistory = () => {
  const dispatch = useDispatch();
  const { data: history, loading, error } = useSelector((state) => state.AdminHistory);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchBookHistoryRequest());
  }, [dispatch]);

  const filteredHistory = history.filter((record) =>
    record.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    record.userEmail?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className={styles.container}>
      <h3 className={styles.title}>BOOK PAYMENT HISTORY</h3>

      <InputGroup className={styles.searchBox}>
        <Form.Control
          type="text"
          placeholder="Search by user name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <div className={styles.tableWrapper}>
        {loading ? (
          <div className="text-center py-4">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : error ? (
          <p className="text-danger text-center">Error: {error}</p>
        ) : (
          <Table bordered hover striped className={styles.table}>
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>BOOK ID</th>
                <th>USER ID</th>
                <th>USER NAME</th>
                <th>USER EMAIL</th>
                <th>BOOK TITLE</th>
                <th>START DATE</th>
                <th>END DATE</th>
                <th>AMOUNT PAID</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.length === 0 ? (
                <tr>
                  <td colSpan="9" className={styles.noRecords}>
                    No payment records available.
                  </td>
                </tr>
              ) : (
                filteredHistory.map((record) => (
                  <tr key={record._id}>
                    <td>
                      <Image
                        src={`http://localhost:8000/uploads/images/${record.bookimg}`}
                        alt="book"
                        className={styles.bookImage}
                      />
                    </td>
                    <td>{record.bookId}</td>
                    <td>{record.userId}</td>
                    <td>{record.userName || "N/A"}</td>
                    <td>{record.userEmail || "N/A"}</td>
                    <td>{record.bookTitle}</td>
                    <td>{record.startDate ? new Date(record.startDate).toLocaleString('en-IN') : 'Not available'}</td>
                    <td>{record.endDate ? new Date(record.endDate).toLocaleString('en-IN') : 'Not available'}</td>
                    <td className={styles.amount}>₹{record.amountPaid?.toFixed(2) || '0.00'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        )}
      </div>
    </Container>
  );
};
export default Bookhistory;