// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardRequest } from '../../Redux/admin/adminSlice';
// import { fetchBookHistoryRequest } from '../../Redux/bookhistory/bookhistorySlice';
// import { Pie } from "react-chartjs-2";
// import 'chart.js/auto';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Dashboard.css'


// const Dashboard = () => {
//     const dispatch = useDispatch();
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [previousRentalCount, setPreviousRentalCount] = useState(0);

//     // Fetch admin name from localStorage
//     const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
//     const adminName = adminInfo?.user?.name || "Admin";

//     // Get formatted current date and time
//     const now = new Date();
//     const formattedDate = now.toLocaleDateString("en-US", {
//         month: "short",
//         day: "2-digit",
//         year: "numeric"
//     });
//     const day = now.toLocaleDateString("en-US", { weekday: "long" });
//     const time = now.toLocaleTimeString("en-US", {
//         hour: "numeric",
//         minute: "2-digit",
//         hour12: true,
//     });

//     const adminState = useSelector((state) => state.AdminDashboard);
//     const {
//         stats = {},
//         loading,
//         error,
//         recentBooks = [],
//         recentUsers = [],
//     } = adminState;

//     const { data: rentalHistory = [] } = useSelector((state) => state.AdminHistory);

//     const recentRentals = [...rentalHistory]
//         .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
//         .slice(0, 5);

//     useEffect(() => {
//         dispatch(fetchDashboardRequest());
//         dispatch(fetchBookHistoryRequest());
//     }, [dispatch]);

//     useEffect(() => {
//         if (rentalHistory.length > previousRentalCount) {
//             const newRental = rentalHistory[rentalHistory.length - 1];
//             toast.info(`${newRental.userName} rented "${newRental.bookTitle}"`);
//         }
//         setPreviousRentalCount(rentalHistory.length);
//     }, [rentalHistory]);

//     const bookPieData = {
//         labels: ["Total Books", "Purchased Books"],
//         datasets: [
//             {
//                 data: [stats.totalBooks || 0, stats.purchasedBooks || 0],
//                 backgroundColor: ["#007bff", "#ffc107"],
//                 borderColor: "#fff",
//                 borderWidth: 2,
//             },
//         ],
//     };

//     return (
//         <div className="container-fluid mt-4 position-relative">
//             {/* Bell Notification */}
//             <div className="d-flex justify-content-end align-items-center mb-3 position-relative">
//                 <div className="position-relative me-3">
//                     <button
//                         className="btn btn-light position-relative"
//                         onClick={() => setShowNotifications(!showNotifications)}
//                     >
//                         <i className="bi bi-bell fs-4"></i>
//                         {recentRentals.length > 0 && (
//                             <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                                 {recentRentals.length}
//                             </span>
//                         )}
//                     </button>

//                     {showNotifications && (
//                         <div className="card shadow-sm position-absolute end-0 mt-2" style={{ width: '300px', zIndex: 999 }}>
//                             <div className="card-header fw-bold bg-primary text-white">Recent Rentals</div>
//                             <ul className="list-group list-group-flush">
//                                 {recentRentals.map((rental) => (
//                                     <li key={rental._id} className="list-group-item small">
//                                         <strong>{rental.userName}</strong> rented <em>{rental.bookTitle}</em><br />
//                                         <small>{new Date(rental.startDate).toLocaleDateString('en-IN')}</small>
//                                     </li>
//                                 ))}
//                             </ul>
//                         </div>
//                     )}
//                 </div>
//             </div>

//             {/* Greeting and Time */}
//             <div className="mb-4">
//                 <h4 className="fw-bold">
//                     Hello, <span className="adminname">{adminName}</span>
//                 </h4>
//                 <p className="text-muted">
//                     {formattedDate} | {day}, {time}
//                 </p>
//             </div>

//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p className="text-danger">{error}</p>
//             ) : (
//                 <>
//                     {/* Summary Cards */}
//                     <div className="row g-4">
//                         <div className="col-12 col-sm-6 col-lg-3">
//                             <div className="card text-white bg-primary shadow-sm border-0 text-center p-3">
//                                 <h6>Total Books</h6>
//                                 <h3>{stats.totalBooks || 0}</h3>
//                             </div>
//                         </div>
//                         <div className="col-12 col-sm-6 col-lg-3">
//                             <div className="card bg-warning shadow-sm border-0 text-center p-3">
//                                 <h6 className="text-white">Active Rentals</h6>
//                                 <h3 className="text-white">{stats.purchasedBooks || 0}</h3>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Tables Section */}
//                     <div className="row mt-5 g-4">
//                         {/* Users Table */}
//                         <div className="col-12 col-lg-6">
//                             <div className="card shadow-sm border-0 h-100">
//                                 <div className="card-header bg-white fw-bold">Users List</div>
//                                 <div className="card-body table-responsive">
//                                     <table className="table table-sm table-borderless">
//                                         <thead>
//                                             <tr>
//                                                 <th>User ID</th>
//                                                 <th>Name</th>
//                                                 <th>Books</th>
//                                                 <th>Dept</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {recentUsers?.slice(0, 4).map((u) => (
//                                                 <tr key={u._id}>
//                                                     <td>{u.userId}</td>
//                                                     <td>{u.name}</td>
//                                                     <td>{u.totalBooks}</td>
//                                                     <td>{u.department}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                     <div className="text-end">
//                                         <a href="/admin/userlist" className="text-decoration-none text-primary">See All</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Books Table */}
//                         <div className="col-12 col-lg-6">
//                             <div className="card shadow-sm border-0 h-100">
//                                 <div className="card-header bg-white fw-bold">Books List</div>
//                                 <div className="card-body table-responsive">
//                                     <table className="table table-sm table-borderless">
//                                         <thead>
//                                             <tr>
//                                                 <th>ID</th>
//                                                 <th>Title</th>
//                                                 <th>Author</th>
//                                                 <th>Available</th>
//                                             </tr>
//                                         </thead>
//                                         <tbody>
//                                             {recentBooks?.slice(0, 4).map((b) => (
//                                                 <tr key={b._id}>
//                                                     <td>{b.bookId}</td>
//                                                     <td>{b.title}</td>
//                                                     <td>{b.author}</td>
//                                                     <td>{b.stock}</td>
//                                                 </tr>
//                                             ))}
//                                         </tbody>
//                                     </table>
//                                     <div className="text-end">
//                                         <a href="/admin/booklist" className="text-decoration-none text-primary">See All</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pie Chart */}
//                     {/* <div className="row mt-5">
//                         <div className="col-12 col-md-8 col-lg-6 mx-auto text-center">
//                             <div className="card shadow-sm border-0">
//                                 <div className="card-header bg-white fw-bold">Book Summary</div>
//                                 <div className="card-body">
//                                     <Pie data={bookPieData} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}

//                     {/* <div className="row mt-5 w-25">
//                         <div className="card shadow-sm border-0">
//                             <div className="card-header bg-white fw-bold text-center">BOOK SUMMARY</div>
//                             <div className="card-body d-flex justify-content-center">
//                                 <div style={{ width: "250px", height: "250px" }}>
//                                     <Pie
//                                         data={bookPieData}
//                                         options={{ maintainAspectRatio: false }}
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </div> */}

//                     <div className="row mt-5 d-flex justify-content-center">
//                         <div className="col-12 col-md-6 col-lg-4">
//                             <div className="card shadow-sm border-0">
//                                 <div className="card-header bg-white fw-bold text-center">BOOK SUMMARY</div>
//                                 <div className="card-body d-flex justify-content-center">
//                                     <div style={{ width: "250px", height: "250px" }}>
//                                         <Pie
//                                             data={bookPieData}
//                                             options={{ maintainAspectRatio: false }}
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>




//                 </>
//             )}

//             <ToastContainer position="top-right" autoClose={1200} closeButton={false} />
//         </div>
//     );
// };

// export default Dashboard;




import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardRequest } from '../../Redux/admin/adminSlice';
import { fetchBookHistoryRequest } from '../../Redux/bookhistory/bookhistorySlice';
import { Pie } from "react-chartjs-2";
import 'chart.js/auto';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    const dispatch = useDispatch();
    const [showNotifications, setShowNotifications] = useState(false);
    const [previousRentalCount, setPreviousRentalCount] = useState(0);

    // Admin Name
    const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
    const adminName = adminInfo?.user?.name || "Admin";

    // Date & Time
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric"
    });
    const day = now.toLocaleDateString("en-US", { weekday: "long" });
    const time = now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    // Dashboard State
    const adminState = useSelector((state) => state.Admin);
    const {
        stats = {},
        loading,
        error,
        recentBooks = [],
        recentUsers = [],
    } = adminState;

    const { data: rentalHistory = [] } = useSelector((state) => state.AdminHistory);

    const recentRentals = [...rentalHistory]
        .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
        .slice(0, 5);

    // Fetch Data
    useEffect(() => {
        dispatch(fetchDashboardRequest());
        dispatch(fetchBookHistoryRequest());
    }, [dispatch]);

    // Toast Notification For New Rental
    useEffect(() => {
        if (rentalHistory.length > previousRentalCount) {
            const newRental = rentalHistory[rentalHistory.length - 1];
            toast.info(`${newRental.userName} rented "${newRental.bookTitle}"`);
        }
        setPreviousRentalCount(rentalHistory.length);
    }, [rentalHistory]);

    const bookPieData = {
        labels: ["Total Books", "Purchased Books"],
        datasets: [
            {
                data: [stats.totalBooks || 0, stats.purchasedBooks || 0],
                backgroundColor: ["#007bff", "#ffc107"],
                borderColor: "#fff",
                borderWidth: 2,
            },
        ],
    };

    return (
        <div className="container-fluid mt-4">

            {/* Notification Bell */}
            <div className={`d-flex justify-content-end align-items-center mb-3 ${styles.notificationContainer}`}>
                <button className={`btn btn-light ${styles.bellBtn}`}>
                    <div className={styles.bellWrapper}>
                        <i className="bi bi-bell fs-4"></i>
                        <span className={`badge rounded-pill bg-danger ${styles.bellBadge}`}>5</span>
                    </div>
                </button>


                {showNotifications && (
                    <div className={`card shadow-sm ${styles.notificationCard}`}>
                        <div className="card-header fw-bold bg-primary text-white">Recent Rentals</div>
                        <ul className="list-group list-group-flush">
                            {recentRentals.map((rental) => (
                                <li key={rental._id} className="list-group-item small">
                                    <strong>{rental.userName}</strong> rented <em>{rental.bookTitle}</em><br />
                                    <small>{new Date(rental.startDate).toLocaleDateString('en-IN')}</small>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* Greeting */}
            <div className="mb-4">
                <h4 className="fw-bold">
                    Hello, <span className={styles.adminname}>{adminName}</span>
                </h4>
                <p className="text-muted">
                    {formattedDate} | {day}, {time}
                </p>
            </div>

            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="text-danger">{error}</p>
            ) : (
                <>
                    {/* Summary Cards */}
                    <div className="row g-4">
                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className={`card text-center p-3 shadow-sm border-0 ${styles.cardPrimary}`}>
                                <h6>Total Books</h6>
                                <h3>{stats.totalBooks || 0}</h3>
                            </div>
                        </div>

                        <div className="col-12 col-sm-6 col-lg-3">
                            <div className={`card text-center p-3 shadow-sm border-0 ${styles.cardWarning}`}>
                                <h6>Active Rentals</h6>
                                <h3>{stats.purchasedBooks || 0}</h3>
                            </div>
                        </div>
                    </div>

                    {/* Tables Section */}
                    <div className="row mt-5 g-4">

                        {/* Users Table */}
                        <div className="col-12 col-lg-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className={`card-header ${styles.tableHeader}`}>Users List</div>
                                <div className="card-body table-responsive">
                                    <table className="table table-sm table-borderless">
                                        <thead>
                                            <tr>
                                                <th>User ID</th>
                                                <th>Name</th>
                                                <th>Books</th>
                                                <th>Dept</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentUsers.slice(0, 4).map((u) => (
                                                <tr key={u._id}>
                                                    <td>{u.userId}</td>
                                                    <td>{u.name}</td>
                                                    <td>{u.totalBooks}</td>
                                                    <td>{u.department}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="text-end">
                                        <a href="/admin/userlist" className={styles.tableLink}>See All</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Books Table */}
                        <div className="col-12 col-lg-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className={`card-header ${styles.tableHeader}`}>Books List</div>
                                <div className="card-body table-responsive">
                                    <table className="table table-sm table-borderless">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Available</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {recentBooks.slice(0, 4).map((b) => (
                                                <tr key={b._id}>
                                                    <td>{b.bookId}</td>
                                                    <td>{b.title}</td>
                                                    <td>{b.author}</td>
                                                    <td>{b.stock}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="text-end">
                                        <a href="/admin/booklist" className={styles.tableLink}>See All</a>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Pie Chart */}
                    <div className="row mt-5 d-flex justify-content-center">
                        <div className="col-12 col-md-6 col-lg-4">
                            <div className={`card shadow-sm ${styles.summaryCard}`}>
                                <div className={styles.summaryHeader}>BOOK SUMMARY</div>
                                <div className="card-body d-flex justify-content-center">
                                    <div className={styles.pieWrapper}>
                                        <Pie
                                            data={bookPieData}
                                            options={{ maintainAspectRatio: false }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </>
            )}

            <ToastContainer position="top-right" autoClose={1200} closeButton={false} />
        </div>
    );
};

export default Dashboard;