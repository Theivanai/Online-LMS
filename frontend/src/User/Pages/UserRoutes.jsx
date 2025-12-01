// import React from 'react';
// import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
// import Dashboard from './Dashboard';
// import ViewBooks from './Viewbooks';
// import Mybooks from './Mybooks';
// import History from './History';
// import Profile from './Profile';
// import { FiLogOut } from 'react-icons/fi';
// import { FaUser, FaHistory, FaBookReader, FaCheck } from 'react-icons/fa';
// import { MdDashboard } from 'react-icons/md';

// const UserRoutes = () => {
//     const navigate = useNavigate();
//     const location = useLocation();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         navigate('/');
//     };

//     const navItems = [
//         { label: "Dashboard", path: "/user/dashboard", icon: <MdDashboard /> },
//         { label: "Available Books", path: "/user/books", icon: <FaCheck /> },
//         { label: "My Books", path: "/user/mybooks", icon: <FaBookReader /> },
//         { label: "Payment History", path: "/user/history", icon: <FaHistory /> },
//         { label: "My Profile", path: "/user/profile", icon: <FaUser /> }
//     ];

//     return (
//         <div style={{ display: 'flex', minHeight: '100vh' }}>
//             {/* Sidebar */}
//             <div
//                 className="bg-dark text-white p-3"
//                 style={{
//                     width: '250px',
//                     height: '100vh',
//                     position: 'fixed',
//                     overflowY: 'auto',
//                     boxShadow: '2px 0 6px rgba(0,0,0,0.1)'
//                 }}
//             >
//                 <div className="text-center mb-4">
//                     <h4 className="fw-bold ">USER PANEL</h4>
//                 </div>
//                 <ul className="nav flex-column">
//                     {navItems.map((item, idx) => (
//                         <li key={idx} className={`nav-item mb-2 ${location.pathname === item.path ? 'bg-primary rounded' : ''}`}>
//                             <Link to={item.path} className="nav-link text-white d-flex align-items-center px-3 py-2">
//                                 <span className="me-2">{item.icon}</span> {item.label.toUpperCase()}
//                             </Link>
//                         </li>
//                     ))}

//                     <li className="nav-item mt-4 px-3">
//                         <span
//                             onClick={handleLogout}
//                             className="d-flex align-items-center text-danger fw-bold"
//                             style={{ cursor: 'pointer' }}
//                         >
//                             <FiLogOut className="me-2" /> LOGOUT
//                         </span>
//                     </li>
//                 </ul>
//             </div>

//             {/* Main Content */}
//             <div style={{ marginLeft: '250px', padding: '30px', width: '100%' }}>
//                 <Routes>
//                     <Route path="dashboard" element={<Dashboard />} />
//                     <Route path="books" element={<ViewBooks />} />
//                     <Route path="mybooks" element={<Mybooks />} />
//                     <Route path="history" element={<History />} />
//                     <Route path="profile" element={<Profile />} />
//                 </Routes>
//             </div>
//         </div>
//     );
// };

// export default UserRoutes;


import React from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Dashboard from './Dashboard';
import ViewBooks from './Viewbooks';
import Mybooks from './Mybooks';
import History from './History';
import Profile from './Profile';
import { FiLogOut } from 'react-icons/fi';
import { FaUser, FaHistory, FaBookReader, FaCheck } from 'react-icons/fa';
import { MdDashboard } from 'react-icons/md';
import './UserRoutes.css';

const UserRoutes = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
    };

    const navItems = [
        { label: "Dashboard", path: "/user/dashboard", icon: <MdDashboard /> },
        { label: "Available Books", path: "/user/books", icon: <FaCheck /> },
        { label: "My Books", path: "/user/mybooks", icon: <FaBookReader /> },
        { label: "Payment History", path: "/user/history", icon: <FaHistory /> },
        { label: "My Profile", path: "/user/profile", icon: <FaUser /> }
    ];

    return (
        <div className="user-panel-container">
            {/* Sidebar */}
            <div className="bg-dark text-white p-3 user-sidebar">
                <div className="sidebar-header">
                    <h5 className="fw-bold">USER PANEL</h5>
                </div>
                <ul className="nav flex-column">
                    {navItems.map((item, idx) => (
                        <li key={idx} className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}>
                            <Link to={item.path} className="nav-link">
                                <span className="me-2">{item.icon}</span> {item.label.toUpperCase()}
                            </Link>
                        </li>
                    ))}
                    <li className="nav-item logout" onClick={handleLogout}>
                        <FiLogOut className="me-2" /> LOGOUT
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="user-main-content">
                <Routes>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="books" element={<ViewBooks />} />
                    <Route path="mybooks" element={<Mybooks />} />
                    <Route path="history" element={<History />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </div>
        </div>
    );
};

export default UserRoutes;
