import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchUserDashboardRequest,
    fetchUserProfileRequest,
} from '../Pages/Redux/Slices/userSlice';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


const Dashboard = () => {
    const dispatch = useDispatch();
    const { dashboard, loading, profile } = useSelector(state => state.UserProfile);

    useEffect(() => {
        dispatch(fetchUserDashboardRequest());
        dispatch(fetchUserProfileRequest());
    }, [dispatch]);

    // ✅ Must be before any early return
    const pieData = useMemo(() => [
        { name: 'Available Books', value: dashboard?.availableBooks || 0 },
        { name: 'Rental Books', value: dashboard?.purchasedBooks || 0 },
        { name: 'Payments Made', value: dashboard?.totalPayments || 0 },
    ], [dashboard]);

    if (loading || !dashboard) {
        return <p className="text-center mt-5">Loading...</p>;
    }

    const COLORS = [
        "rgba(54, 162, 235, 0.8)",  // Blue
        "rgba(40, 167, 69, 0.8)",   // Green
        "rgba(255, 193, 7, 0.8)",   // Yellow
    ];

    return (
        <div className="container mt-4">
            {/* Header */}
            <div className="text-center mb-5">
                <h2 className="fw-bold text-gradient">USER DASHBOARD</h2>
                <p className="text-muted">Welcome back, here's your reading summary!</p>
            </div>

            {/* Profile Summary */}
            {profile && (
                <div className="d-flex justify-content-center mb-4">
                    <div
                        className="card p-4 shadow-sm"
                        style={{
                            maxWidth: '500px',
                            width: '100%',
                            backgroundColor: '#007BFF',
                            borderRadius: '15px',
                        }}
                    >
                        <h5 className="mb-3 text-center fw-bold text-white">PROFILE SUMMARY</h5>
                        <p className="text-white"><strong>Name:</strong> {profile.name}</p>
                        <p className="text-white"><strong>Email:</strong> {profile.email}</p>
                    </div>
                </div>
            )}

            {/* Metric Cards */}
            <div className="row g-4">
                <div className="col-md-3 col-sm-6">
                    <div className="card text-white border-0 shadow text-center hover-card" style={{ backgroundColor: '#3366FF', borderRadius: '15px' }}>
                        <div className="card-body">
                            <h6 className="mb-2 fw-semibold">Available Books</h6>
                            <h3>{dashboard.availableBooks}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-6">
                    <div className="card text-white border-0 shadow text-center hover-card" style={{ backgroundColor: '#FFA500', borderRadius: '15px' }}>
                        <div className="card-body">
                            <h6 className="mb-2 fw-semibold">Rental Books</h6>
                            <h3>{dashboard.purchasedBooks}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-6">
                    <div className="card text-white border-0 shadow text-center hover-card" style={{ backgroundColor: '#FFC107', borderRadius: '15px' }}>
                        <div className="card-body">
                            <h6 className="mb-2 fw-semibold">Payments Made</h6>
                            <h3>{dashboard.totalPayments}</h3>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 col-sm-6">
                    <div className="card text-white border-0 shadow text-center hover-card" style={{ backgroundColor: '#28A745', borderRadius: '15px' }}>
                        <div className="card-body">
                            <h6 className="mb-2 fw-semibold">Total Paid</h6>
                            <h3>₹ {dashboard.totalAmountPaid}</h3>
                        </div>
                    </div>
                </div>
            </div>

            {/* Pie Chart */}
            <div className="mt-5">
                <h5 className="text-center mb-4">READING SUMMARY</h5>
                <div className="d-flex justify-content-center">
                    <PieChart width={400} height={300}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" height={36} />
                    </PieChart>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
