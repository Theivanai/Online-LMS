import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Table, Spinner, Alert } from 'react-bootstrap';
import {
  fetchHistoryRequest,
} from '../Pages/Redux/Slices/historySlice';
import './History.css';

const History = () => {
  const dispatch = useDispatch();
  const historyState = useSelector((state) => state.UserHistory);


  const {
    data: bookHistory = [],
    loading = false,
    error = ''
  } = historyState;

  useEffect(() => {
    dispatch(fetchHistoryRequest());
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <h3 className="text-center fw-bold text-primary">BOOK BORROW HISTORY</h3>

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : error ? (
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      ) : bookHistory.length === 0 ? (
        <Alert variant="info" className="text-center">
          No book history found
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover className="text-center shadow-sm">
            <thead className="table-success">
              <tr>
                <th>SNO</th>
                <th>USER ID</th>
                <th>BOOK TITLE</th>
                <th>START DATE</th>
                <th>END DATE</th>
                <th>STATUS</th>
                <th>AMOUNT PAID</th>
              </tr>
            </thead>
            <tbody>
              {bookHistory.map((b, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{b.userID}</td>
                  <td>{b.title}</td>
                  <td>{new Date(b.startDate).toLocaleDateString('en-IN', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}</td>
                  <td>{new Date(b.endDate).toLocaleDateString('en-IN', {
                    hour: 'numeric',
                    minute: 'numeric',
                    second: 'numeric',
                    hour12: true,
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                  })}</td>
                  <td>
                    <span className={`badge bg-${b.status === 'Returned' ? 'success' : 'warning'}`}>
                      {b.status}
                    </span>
                  </td>
                  <td>₹{b.amountPaid}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}
    </Container>
  );
};

export default History;
