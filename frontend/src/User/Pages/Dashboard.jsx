// import React, { useEffect, useMemo } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import {
//     fetchUserDashboardRequest,
//     fetchUserProfileRequest,
// } from '../Pages/Redux/Slices/userSlice';
// import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';


// const Dashboard = () => {
//     const dispatch = useDispatch();
//     const { dashboard, loading, profile } = useSelector(state => state.UserProfile);

//     useEffect(() => {
//         dispatch(fetchUserDashboardRequest());
//         dispatch(fetchUserProfileRequest());
//     }, [dispatch]);

//     // ✅ Must be before any early return
//     const pieData = useMemo(() => [
//         { name: 'Available Books', value: dashboard?.availableBooks || 0 },
//         { name: 'Rental Books', value: dashboard?.purchasedBooks || 0 },
//         { name: 'Payments Made', value: dashboard?.totalPayments || 0 },
//     ], [dashboard]);

//     if (loading || !dashboard) {
//         return <p className="text-center mt-5">Loading...</p>;
//     }

//     const COLORS = [
//         "rgba(54, 162, 235, 0.8)",  // Blue
//         "rgba(40, 167, 69, 0.8)",   // Green
//         "rgba(255, 193, 7, 0.8)",   // Yellow
//     ];

//     return (
//         <div className="container mt-4">
//             {/* Header */}
//             <div className="text-center mb-5">
//                 <h2 className="fw-bold text-gradient">USER DASHBOARD</h2>
//                 <p className="text-muted">Welcome back, here's your reading summary!</p>
//             </div>

//             {/* Profile Summary */}
//             {profile && (
//                 <div className="d-flex justify-content-center mb-4">
//                     <div
//                         className="card p-4 shadow-sm"
//                         style={{
//                             maxWidth: '500px',
//                             width: '100%',
//                             backgroundColor: '#007BFF',
//                             borderRadius: '15px',
//                         }}
//                     >
//                         <h5 className="mb-3 text-center fw-bold text-white">PROFILE SUMMARY</h5>
//                         <p className="text-white"><strong>Name:</strong> {profile.name}</p>
//                         <p className="text-white"><strong>Email:</strong> {profile.email}</p>
//                     </div>
//                 </div>
//             )}

//             {/* Metric Cards */}
//             <div className="row g-4">
//                 <div className="col-md-3 col-sm-6">
//                     <div className="card text-white border-0 shadow text-center hover-card" style={{ backgroundColor: '#3366FF', borderRadius: '15px' }}>
//                         <div className="card-body">
//                             <h6 className="mb-2 fw-semibold">Available Books</h6>
//                             <h3>{dashboard.availableBooks}</h3>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-3 col-sm-6">
//                     <div className="card text-white border-0 shadow text-center hover-card" style={{ backgroundColor: '#FFA500', borderRadius: '15px' }}>
//                         <div className="card-body">
//                             <h6 className="mb-2 fw-semibold">Rental Books</h6>
//                             <h3>{dashboard.purchasedBooks}</h3>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-3 col-sm-6">
//                     <div className="card text-white border-0 shadow text-center hover-card" style={{ backgroundColor: '#FFC107', borderRadius: '15px' }}>
//                         <div className="card-body">
//                             <h6 className="mb-2 fw-semibold">Payments Made</h6>
//                             <h3>{dashboard.totalPayments}</h3>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="col-md-3 col-sm-6">
//                     <div className="card text-white border-0 shadow text-center hover-card" style={{ backgroundColor: '#28A745', borderRadius: '15px' }}>
//                         <div className="card-body">
//                             <h6 className="mb-2 fw-semibold">Total Paid</h6>
//                             <h3>₹ {dashboard.totalAmountPaid}</h3>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Pie Chart */}
//             <div className="mt-5">
//                 <h5 className="text-center mb-4">READING SUMMARY</h5>
//                 <div className="d-flex justify-content-center">
//                     <PieChart width={400} height={300}>
//                         <Pie
//                             data={pieData}
//                             cx="50%"
//                             cy="50%"
//                             outerRadius={100}
//                             fill="#8884d8"
//                             dataKey="value"
//                             label
//                         >
//                             {pieData.map((entry, index) => (
//                                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                         </Pie>
//                         <Tooltip />
//                         <Legend verticalAlign="bottom" height={36} />
//                     </PieChart>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default Dashboard;




import React, { useEffect, useMemo, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    fetchUserDashboardRequest,
    fetchUserProfileRequest,
    logoutRequest,
} from '../Pages/Redux/Slices/userSlice';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import styles from './Dashboard.module.css';

/* ─────────────────────────────────────────────
   Constants
───────────────────────────────────────────── */
const PIE_COLORS = ['#378ADD', '#EF9F27', '#7F77DD'];

const METRIC_CARDS = (dashboard) => [
    {
        label: 'Available Books',
        value: dashboard.availableBooks,
        sub: 'In library',
        accent: styles.accentBlue,
    },
    {
        label: 'Rental Books',
        value: dashboard.purchasedBooks,
        sub: 'Currently rented',
        accent: styles.accentAmber,
    },
    {
        label: 'Payments Made',
        value: dashboard.totalPayments,
        sub: 'Transactions',
        accent: styles.accentPurple,
    },
    {
        label: 'Total Paid',
        value: `₹ ${dashboard.totalAmountPaid}`,
        sub: 'Lifetime spend',
        accent: styles.accentGreen,
    },
];

const BAR_ROWS = (dashboard) => [
    { label: 'Available Books', value: dashboard.availableBooks || 0, colorClass: styles.barBlue },
    { label: 'Rental Books', value: dashboard.purchasedBooks || 0, colorClass: styles.barAmber },
    { label: 'Payments Made', value: dashboard.totalPayments || 0, colorClass: styles.barPurple },
];

/* ─────────────────────────────────────────────
   Sub-components
───────────────────────────────────────────── */

const MetricCard = ({ label, value, sub, accent }) => (
    <div className={`${styles.metricCard} ${accent}`}>
        <div className={styles.metricLabel}>{label}</div>
        <div className={styles.metricValue}>{value}</div>
        <div className={styles.metricSub}>{sub}</div>
    </div>
);

const BarRow = ({ label, value, max, colorClass }) => {
    const pct = max > 0 ? Math.round((value / max) * 100) : 0;
    return (
        <div className={styles.barRow}>
            <span className={styles.barLabel}>{label}</span>
            <div className={styles.barTrack}>
                <div className={`${styles.barFill} ${colorClass}`} style={{ width: `${pct}%` }} />
            </div>
            <span className={styles.barNum}>{value}</span>
        </div>
    );
};

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className={styles.tooltip}>
                {payload[0].name}: <strong>{payload[0].value}</strong>
            </div>
        );
    }
    return null;
};

/* ─────────────────────────────────────────────
   Avatar Dropdown
───────────────────────────────────────────── */
const AvatarDropdown = ({ profile, initials, onLogout }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);

    // Close on outside click
    useEffect(() => {
        const handler = (e) => {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, []);

    return (
        <div className={styles.avatarWrapper} ref={ref}>
            {/* Clickable pill */}
            <div
                className={`${styles.avatarPill} ${open ? styles.avatarPillActive : ''}`}
                onClick={() => setOpen((prev) => !prev)}
                role="button"
                aria-haspopup="true"
                aria-expanded={open}
            >
                <div className={styles.avatarCircle}>{initials}</div>
                <div>
                    <div className={styles.avatarName}>{profile.name}</div>
                    <div className={styles.avatarEmail}>{profile.email}</div>
                </div>
                {/* Chevron */}
                {/* <svg
                    className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`}
                    width="14" height="14" viewBox="0 0 14 14" fill="none"
                >
                    <path d="M3 5l4 4 4-4" stroke="#7A7A9D" strokeWidth="1.6"
                        strokeLinecap="round" strokeLinejoin="round" />
                </svg> */}
            </div>

            {/* Dropdown menu */}
            {open && (
                <div className={styles.dropdown}>
                    {/* Profile header inside dropdown */}
                    <div className={styles.dropdownHeader}>
                        <div className={styles.dropdownAvatar}>{initials}</div>
                        <div>
                            <div className={styles.dropdownName}>{profile.name}</div>
                            <div className={styles.dropdownEmail}>{profile.email}</div>
                        </div>
                    </div>

                    <div className={styles.dropdownDivider} />

                    {/* Logout button */}
                    <button
                        className={styles.logoutBtn}
                        onClick={() => {
                            setOpen(false);
                            onLogout();
                        }}
                    >
                        {/* Logout icon */}
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                            <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" stroke="#E24B4A"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <polyline points="16 17 21 12 16 7" stroke="#E24B4A"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <line x1="21" y1="12" x2="9" y2="12" stroke="#E24B4A"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

/* ─────────────────────────────────────────────
   Main Dashboard
───────────────────────────────────────────── */
const Dashboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dashboard, loading, profile } = useSelector(state => state.UserProfile);

    useEffect(() => {
        dispatch(fetchUserDashboardRequest());
        dispatch(fetchUserProfileRequest());
    }, [dispatch]);

    const pieData = useMemo(() => [
        { name: 'Available Books', value: dashboard?.availableBooks || 0 },
        { name: 'Rental Books', value: dashboard?.purchasedBooks || 0 },
        { name: 'Payments Made', value: dashboard?.totalPayments || 0 },
    ], [dashboard]);

    if (loading || !dashboard) {
        return (
            <div className={styles.loading}>
                <span>Loading your dashboard…</span>
            </div>
        );
    }

    const maxVal = Math.max(
        dashboard.availableBooks || 0,
        dashboard.purchasedBooks || 0,
        dashboard.totalPayments || 0,
        1
    );

    const initials = profile?.name
        ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'U';

    const handleLogout = () => {
        dispatch(logoutRequest());   // dispatch your Redux logout action
        navigate('/');          // redirect to login page
    };

    return (
        <div className={styles.page}>

            {/* ── Top bar ── */}
            <div className={styles.topBar}>
                {/* <div>
                    <h1 className={styles.heading}>User Dashboard</h1>
                    <p className={styles.subheading}>
                        Welcome back — here's your reading summary
                    </p>
                </div> */}

                {profile && (
                    <AvatarDropdown
                        profile={profile}
                        initials={initials}
                        onLogout={handleLogout}
                    />
                )}
            </div>

            {/* ── Metric cards ── */}
            <div className={styles.metricGrid}>
                {METRIC_CARDS(dashboard).map((card) => (
                    <MetricCard key={card.label} {...card} />
                ))}
            </div>

            {/* ── Bottom panels ── */}
            <div className={styles.bottomGrid}>

                {/* Donut chart */}
                <div className={styles.panel}>
                    <div className={styles.panelTitle}>Reading Summary</div>
                    <ResponsiveContainer width="100%" height={240}>
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={62}
                                outerRadius={90}
                                paddingAngle={3}
                                dataKey="value"
                                stroke="none"
                            >
                                {pieData.map((_, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={PIE_COLORS[index % PIE_COLORS.length]}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip />} />
                            <Legend
                                iconType="circle"
                                iconSize={9}
                                wrapperStyle={{ fontSize: 13, color: '#7A7A9D', paddingTop: 12 }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Activity breakdown + profile */}
                {/* <div className={styles.panel}>
                    <div className={styles.panelTitle}>Activity Breakdown</div>

                    {BAR_ROWS(dashboard).map((row) => (
                        <BarRow key={row.label} {...row} max={maxVal} />
                    ))}

                    {profile && (
                        <>
                            <hr className={styles.divider} />
                            <div className={styles.panelTitle}>Profile</div>
                            <div className={styles.pdRow}>
                                <span className={styles.pdKey}>Name</span>
                                <span className={styles.pdVal}>{profile.name}</span>
                            </div>
                            <div className={styles.pdRow}>
                                <span className={styles.pdKey}>Email</span>
                                <span className={styles.pdVal}>{profile.email}</span>
                            </div>
                        </>
                    )}
                </div> */}

            </div>
        </div>
    );
};

export default Dashboard;