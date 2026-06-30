// import React from "react";
// import { Link, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
// import Dashboard from './Dashboard';
// import Bookhistory from './Bookhistory';
// import AddBook from './AddBook';
// import Booklist from './Booklist';
// import Userlist from './Userlist';
// import AddNewAdmin from './AddNewAdmin';
// import ForgotPassword from "../../Components/ForgetPassword";
// import { FiLogOut } from 'react-icons/fi';
// import { MdDashboard } from 'react-icons/md';
// import { FaUser, FaUsers, FaBookOpen, FaBookMedical, FaHistory } from 'react-icons/fa';
// import styles from "./AdminRoute.module.css";



// const AdminRoute = () => {
//     const isAuthenticated = !!localStorage.getItem('token');
//     const navigate = useNavigate();
//     const location = useLocation();

//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('role');
//         navigate('/');
//     };

//     const navItems = [
//         { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard /> },
//         { path: "/admin/bookhistory", label: "Book History", icon: <FaHistory /> },
//         { path: "/admin/addbook", label: "Add Books", icon: <FaBookMedical /> },
//         { path: "/admin/booklist", label: "Book Lists", icon: <FaBookOpen /> },
//         { path: "/admin/add-new-admin", label: "Add New Admin", icon: <FaUser /> },
//         { path: "/admin/userlist", label: "User Lists", icon: <FaUsers /> },
//     ];

//     return (
//         <div className={styles.adminContainer}>

//             <div className={styles.sidebar}>
//                 <div className="text-center mb-4">
//                     <h4>ADMIN PANEL</h4>
//                 </div>

//                 <ul className={styles.navList}>
//                     {navItems.map((item, idx) => (
//                         <li
//                             key={idx}
//                             className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
//                         >
//                             <Link to={item.path} className={styles.navLink}>
//                                 <span className="me-2">{item.icon}</span>
//                                 {item.label.toUpperCase()}
//                             </Link>
//                         </li>
//                     ))}

//                     <li>
//                         <span className={styles.logout} onClick={handleLogout}>
//                             <FiLogOut className="me-2" /> LOGOUT
//                         </span>
//                     </li>
//                 </ul>
//             </div>

//             <div className={styles.mainContent}>
//                 <Routes>
//                     <Route path="/" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
//                     <Route path="/dashboard" element={<Dashboard />} />
//                     <Route path="/bookhistory" element={<Bookhistory />} />
//                     <Route path="/addbook" element={<AddBook />} />
//                     <Route path="/booklist" element={<Booklist />} />
//                     <Route path="/userlist" element={<Userlist />} />
//                     <Route path="/add-new-admin" element={<AddNewAdmin />} />
//                     <Route path="/forgotpassword" element={<ForgotPassword />} />
//                 </Routes>
//             </div>

//         </div>

//     );
// };

// export default AdminRoute;





import React from "react";
import { Link, Routes, Route, useNavigate, Navigate, useLocation } from "react-router-dom";
import Dashboard from './Dashboard';
import Bookhistory from './Bookhistory';
import AddBook from './AddBook';
import Booklist from './Booklist';
import Userlist from './Userlist';
import AddNewAdmin from './AddNewAdmin';
import ForgotPassword from "../../Components/ForgetPassword";
import { FiLogOut } from 'react-icons/fi';
import { MdDashboard } from 'react-icons/md';
import { FaUser, FaUsers, FaBookOpen, FaBookMedical, FaHistory } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styles from "./AdminRoute.module.css";
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../Redux/admin/adminSlice';


   
    const AdminRoute = () => {
        const dispatch = useDispatch(); 
        const isAuthenticated = !!localStorage.getItem('token') &&
            localStorage.getItem('role') === 'admin';
        const navigate = useNavigate();
        const location = useLocation();

        const handleLogout = () => {
            dispatch(adminLogout());
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('userData');
            localStorage.removeItem('adminInfo');
            toast.success('Admin logged out!', { toastId: 'logout-toast' });
            setTimeout(() => navigate('/'), 1000);
        };

        const navItems = [
            { path: "/admin/dashboard", label: "Dashboard", icon: <MdDashboard /> },
            { path: "/admin/bookhistory", label: "Book History", icon: <FaHistory /> },
            { path: "/admin/addbook", label: "Add Books", icon: <FaBookMedical /> },
            { path: "/admin/booklist", label: "Book Lists", icon: <FaBookOpen /> },
            { path: "/admin/add-new-admin", label: "Add New Admin", icon: <FaUser /> },
            { path: "/admin/userlist", label: "User Lists", icon: <FaUsers /> },
        ];

        return (
            <div className={styles.adminContainer}>
                <div className={styles.sidebar}>
                    <div className="text-center mb-4">
                        <h4>ADMIN PANEL</h4>
                    </div>

                    <ul className={styles.navList}>
                        {navItems.map((item, idx) => (
                            <li
                                key={idx}
                                className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                            >
                                <Link to={item.path} className={styles.navLink}>
                                    <span className="me-2">{item.icon}</span>
                                    {item.label.toUpperCase()}
                                </Link>
                            </li>
                        ))}

                        <li>
                            <span className={styles.logout} onClick={handleLogout}>
                                <FiLogOut className="me-2" /> LOGOUT
                            </span>
                        </li>
                    </ul>
                </div>

                <div className={styles.mainContent}>
                    <Routes>
                        {/* ✅ Default redirects to dashboard */}
                        <Route path="/" element={<Navigate to="/admin/dashboard" />} />
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/bookhistory" element={<Bookhistory />} />
                        <Route path="/addbook" element={<AddBook />} />
                        <Route path="/booklist" element={<Booklist />} />
                        <Route path="/userlist" element={<Userlist />} />
                        <Route path="/add-new-admin" element={<AddNewAdmin />} />
                        <Route path="/forgotpassword" element={<ForgotPassword />} />
                    </Routes>
                </div>
            </div>
        );
    };

    export default AdminRoute;