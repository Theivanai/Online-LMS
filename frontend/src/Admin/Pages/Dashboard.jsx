// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchDashboardRequest } from '../../Redux/admin/adminSlice';
// import { fetchBookHistoryRequest } from '../../Redux/bookhistory/bookhistorySlice';
// import { Pie } from "react-chartjs-2";
// import 'chart.js/auto';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import styles from './Dashboard.module.css';

// const Dashboard = () => {
//     const dispatch = useDispatch();
//     const [showNotifications, setShowNotifications] = useState(false);
//     const [previousRentalCount, setPreviousRentalCount] = useState(0);

//     // Admin Name
//     const adminInfo = JSON.parse(localStorage.getItem("adminInfo"));
//     const adminName = adminInfo?.user?.name || "Admin";

//     // Date & Time
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

//     // Dashboard State
//     const adminState = useSelector((state) => state.Admin);
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

//     // Fetch Data
//     useEffect(() => {
//         dispatch(fetchDashboardRequest());
//         dispatch(fetchBookHistoryRequest());
//     }, [dispatch]);

//     // Toast Notification For New Rental
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
//         <div className="container-fluid mt-4">

//             {/* Notification Bell */}
//             <div className={`d-flex justify-content-end align-items-center mb-3 ${styles.notificationContainer}`}>
//                 <button
//                     className={`btn btn-light ${styles.bellBtn}`}
//                     onClick={() => setShowNotifications((prev) => !prev)}
//                 >
//                     <div className={styles.bellWrapper}>
//                         <i className="bi bi-bell fs-4"></i>
//                         <span className={`badge rounded-pill bg-danger ${styles.bellBadge}`}>
//                             5
//                         </span>
//                     </div>
//                 </button>

//                 {/* Notification Dropdown */}
//                 {showNotifications && (
//                     <div className={`card shadow-sm ${styles.notificationCard}`}>
//                         <div className="card-header fw-bold bg-primary text-white">
//                             Recent Rentals
//                         </div>
//                         <ul className="list-group list-group-flush">
//                             {recentRentals.map((rental) => (
//                                 <li key={rental._id} className="list-group-item small">
//                                     <strong>{rental.userName}</strong> rented{" "}
//                                     <em>{rental.bookTitle}</em>
//                                     <br />
//                                     <small>
//                                         {new Date(rental.startDate).toLocaleDateString("en-IN")}
//                                     </small>
//                                 </li>
//                             ))}
//                         </ul>
//                     </div>
//                 )}
//             </div>

//             {/* Greeting */}
//             <div className="mb-4">
//                 <h4 className="fw-bold">
//                     Hello, <span className={styles.adminname}>{adminName}</span>
//                 </h4>
//                 <p className="text-muted">
//                     {formattedDate} | {day}, {time}
//                 </p>
//             </div>

//             {/* Dashboard Data */}
//             {loading ? (
//                 <p>Loading...</p>
//             ) : error ? (
//                 <p className="text-danger">{error}</p>
//             ) : (
//                 <>
//                     {/* Summary Cards */}
//                     <div className="row g-4">
//                         <div className="col-12 col-sm-6 col-lg-3">
//                             <div className={`card text-center p-3 shadow-sm border-0 ${styles.cardPrimary}`}>
//                                 <h6>Total Books</h6>
//                                 <h3>{stats.totalBooks || 0}</h3>
//                             </div>
//                         </div>

//                         <div className="col-12 col-sm-6 col-lg-3">
//                             <div className={`card text-center p-3 shadow-sm border-0 ${styles.cardWarning}`}>
//                                 <h6>Active Rentals</h6>
//                                 <h3>{stats.purchasedBooks || 0}</h3>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Tables */}
//                     <div className="row mt-5 g-4">

//                         {/* Users Table */}
//                         <div className="col-12 col-lg-6">
//                             <div className="card shadow-sm border-0 h-100">
//                                 <div className={`card-header ${styles.tableHeader}`}>Users List</div>
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
//                                             {recentUsers.slice(0, 4).map((u) => (
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
//                                         <a href="/admin/userlist" className={styles.tableLink}>See All</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         {/* Books Table */}
//                         <div className="col-12 col-lg-6">
//                             <div className="card shadow-sm border-0 h-100">
//                                 <div className={`card-header ${styles.tableHeader}`}>Books List</div>
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
//                                             {recentBooks.slice(0, 4).map((b) => (
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
//                                         <a href="/admin/booklist" className={styles.tableLink}>See All</a>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     {/* Pie Chart */}
//                     <div className="row mt-5 d-flex justify-content-center">
//                         <div className="col-12 col-md-6 col-lg-4">
//                             <div className={`card shadow-sm ${styles.summaryCard}`}>
//                                 <div className={styles.summaryHeader}>BOOK SUMMARY</div>
//                                 <div className="card-body d-flex justify-content-center">
//                                     <div className={styles.pieWrapper}>
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












import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDashboardRequest } from '../../Redux/admin/adminSlice';
import { fetchBookHistoryRequest } from '../../Redux/bookhistory/bookhistorySlice';
import { Pie, Bar } from "react-chartjs-2";
import 'chart.js/auto';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Dashboard.module.css';

// ─── Skeleton Card ────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className={styles.skeletonCard}>
    <div className={styles.skeletonLine} style={{ width: '60%', height: '14px' }} />
    <div className={styles.skeletonLine} style={{ width: '40%', height: '32px', marginTop: '10px' }} />
  </div>
);

// ─── Stat Card ────────────────────────────────────────────────────────────────
const StatCard = ({ title, value, icon, colorClass, trend }) => (
  <div className={`${styles.statCard} ${colorClass}`}>
    <div className={styles.statIcon}>{icon}</div>
    <div className={styles.statInfo}>
      <p className={styles.statTitle}>{title}</p>
      <h2 className={styles.statValue}>{value ?? 0}</h2>
      {trend && <span className={styles.statTrend}>{trend}</span>}
    </div>
  </div>
);

// ─── Empty State ──────────────────────────────────────────────────────────────
const EmptyRow = ({ cols, message }) => (
  <tr>
    <td colSpan={cols} className={styles.emptyCell}>
      <span>📭 {message}</span>
    </td>
  </tr>
);

// ─── Safe JSON parse ──────────────────────────────────────────────────────────
const safeParse = (key) => {
  try { return JSON.parse(localStorage.getItem(key)); }
  catch { return null; }
};

// ─────────────────────────────────────────────────────────────────────────────
const Dashboard = () => {
  const dispatch = useDispatch();
  const isFirstRender = useRef(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [previousRentalCount, setPreviousRentalCount] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const notifRef = useRef(null);

  // Admin Name
  const adminInfo = safeParse("adminInfo");
  const adminName = adminInfo?.user?.name || "Admin";

  // Live Clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentTime.toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" });
  const day = currentTime.toLocaleDateString("en-US", { weekday: "long" });
  const time = currentTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true });

  // Redux State
  const adminState = useSelector((state) => state.Admin);
  const { stats = {}, loading, error, recentBooks = [], recentUsers = [] } = adminState;
  const { data: rentalHistory = [] } = useSelector((state) => state.AdminHistory);

  const recentRentals = [...rentalHistory]
    .sort((a, b) => new Date(b.startDate) - new Date(a.startDate))
    .slice(0, 5);

  // Fetch
  useEffect(() => {
    dispatch(fetchDashboardRequest());
    dispatch(fetchBookHistoryRequest());
  }, [dispatch]);

  // Toast — skip first render to avoid false notification on mount
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setPreviousRentalCount(rentalHistory.length);
      return;
    }
    if (rentalHistory.length > previousRentalCount) {
      const newRental = rentalHistory[rentalHistory.length - 1];
      toast.info(`📚 ${newRental.userName} rented "${newRental.bookTitle}"`, {
        icon: false,
      });
    }
    setPreviousRentalCount(rentalHistory.length);
  }, [rentalHistory]);

  // Close notification dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setShowNotifications(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // ── Chart Data ──────────────────────────────────────────────────────────────
  const availableBooks = (stats.totalBooks || 0) - (stats.purchasedBooks || 0);

  const bookPieData = {
    labels: ["Available Books", "Active Rentals", "Overdue"],
    datasets: [{
      data: [
        availableBooks > 0 ? availableBooks : 0,
        stats.purchasedBooks || 0,
        stats.overdueBooks || 0,
      ],
      backgroundColor: ["#22c55e", "#3b82f6", "#ef4444"],
      borderColor: "#fff",
      borderWidth: 3,
    }],
  };

  // Monthly rental bar chart — use real data if available, otherwise placeholder
  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyCounts = Array(12).fill(0);
  rentalHistory.forEach((r) => {
    const m = new Date(r.startDate).getMonth();
    if (!isNaN(m)) monthlyCounts[m]++;
  });

  const barData = {
    labels: monthLabels,
    datasets: [{
      label: "Rentals",
      data: monthlyCounts,
      backgroundColor: "rgba(59,130,246,0.75)",
      borderRadius: 6,
      borderSkipped: false,
    }],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: "#f0f0f0" } },
      x: { grid: { display: false } },
    },
  };

  const pieOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom", labels: { padding: 16, font: { size: 13 } } },
    },
  };

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.dashWrapper}>

      {/* ── Top Bar ─────────────────────────────────────────────────────────── */}
      <div className={styles.topBar}>
        <div className={styles.greeting}>
          <h4>Hello, <span className={styles.adminName}>{adminName}</span></h4>
          <p className={styles.dateTime}>{formattedDate} &nbsp;|&nbsp; {day}, {time}</p>
        </div>

        {/* Notification Bell */}
        <div className={styles.notifWrap} ref={notifRef}>
          <button
            className={styles.bellBtn}
            onClick={() => setShowNotifications((p) => !p)}
            aria-label="Notifications"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {recentRentals.length > 0 && (
              <span className={styles.badge}>{recentRentals.length}</span>
            )}
          </button>

          {showNotifications && (
            <div className={styles.notifDropdown}>
              <div className={styles.notifHeader}>
                <span>Recent Rentals</span>
                <span className={styles.notifCount}>{recentRentals.length} new</span>
              </div>
              {recentRentals.length === 0 ? (
                <div className={styles.notifEmpty}>No recent rentals</div>
              ) : (
                <ul className={styles.notifList}>
                  {recentRentals.map((r) => (
                    <li key={r._id} className={styles.notifItem}>
                      <div className={styles.notifAvatar}>
                        {r.userName?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className={styles.notifText}>
                          <strong>{r.userName}</strong> rented <em>{r.bookTitle}</em>
                        </p>
                        <small className={styles.notifDate}>
                          {new Date(r.startDate).toLocaleDateString("en-IN")}
                        </small>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      {loading ? (
        <div className="row g-4 mt-2">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="col-12 col-sm-6 col-lg-3"><SkeletonCard /></div>
          ))}
        </div>
      ) : error ? (
        <div className={styles.errorBox}>
          <span>⚠️ {error}</span>
          <button onClick={() => dispatch(fetchDashboardRequest())} className={styles.retryBtn}>
            Retry
          </button>
        </div>
      ) : (
        <>
          {/* ── Stat Cards ────────────────────────────────────────────────── */}
          <div className="row g-4 mt-1">
            <div className="col-12 col-sm-6 col-lg-3">
              <StatCard title="Total Books" value={stats.totalBooks} colorClass={styles.cardBlue} />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <StatCard title="Active Rentals" value={stats.purchasedBooks} colorClass={styles.cardYellow} />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <StatCard title="Total Users" value={stats.totalUsers} colorClass={styles.cardGreen} />
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <StatCard title="Overdue Books" value={stats.overdueBooks} colorClass={styles.cardRed} />
            </div>
          </div>

          {/* ── Tables ────────────────────────────────────────────────────── */}
          <div className="row mt-4 g-4">

            {/* Users Table */}
            {/* <div className="col-12 col-lg-6">
              <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                  <span>Users List</span>
                  <a href="/admin/userlist" className={styles.seeAllLink}>See All →</a>
                </div>
                <div className="table-responsive">
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>User ID</th>
                        <th>Name</th>
                        <th>Books</th>
                        <th>Dept</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentUsers.length === 0
                        ? <EmptyRow cols={5} message="No users found" />
                        : recentUsers.slice(0, 5).map((u) => (
                          <tr key={u._id}>
                            <td><code className={styles.idCode}>{u.userId}</code></td>
                            <td>{u.name}</td>
                            <td><span className={styles.countBadge}>{u.totalBooks}</span></td>
                            <td>{u.department}</td>
                            <td>
                              <span className={`${styles.statusBadge} ${u.totalBooks > 0 ? styles.statusActive : styles.statusIdle}`}>
                                {u.totalBooks > 0 ? "Active" : "Idle"}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}

            {/* Books Table */}
            {/* <div className="col-12 col-lg-6">
              <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                  <span>Books List</span>
                  <a href="/admin/booklist" className={styles.seeAllLink}>See All →</a>
                </div>
                <div className="table-responsive">
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Stock</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBooks.length === 0
                        ? <EmptyRow cols={5} message="No books found" />
                        : recentBooks.slice(0, 5).map((b) => (
                          <tr key={b._id}>
                            <td><code className={styles.idCode}>{b.bookId}</code></td>
                            <td className={styles.bookTitle}>{b.title}</td>
                            <td>{b.author}</td>
                            <td><span className={styles.countBadge}>{b.stock}</span></td>
                            <td>
                              <span className={`${styles.statusBadge} ${b.stock > 0 ? styles.statusActive : styles.statusOut}`}>
                                {b.stock > 0 ? "In Stock" : "Out"}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div> */}
          </div>

          {/* ── Charts ────────────────────────────────────────────────────── */}
          <div className="row mt-4 g-4">

            {/* Monthly Rentals Bar Chart */}
            <div className="col-12 col-lg-8">
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <span>Monthly Rental Activity</span>
                  <small className={styles.chartSub}>{new Date().getFullYear()}</small>
                </div>
                <div className={styles.barWrapper}>
                  <Bar data={barData} options={barOptions} />
                </div>
              </div>
            </div>

            {/* Pie Chart */}
            <div className="col-12 col-lg-4">
              <div className={styles.chartCard}>
                <div className={styles.chartHeader}>
                  <span>Book Summary</span>
                </div>
                <div className={styles.pieWrapper}>
                  <Pie data={bookPieData} options={pieOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Recent Rental Activity ─────────────────────────────────────── */}
          <div className="row mt-4 g-4 mb-5">
            <div className="col-12">
              <div className={styles.tableCard}>
                <div className={styles.tableCardHeader}>
                  <span> Recent Rental Activity</span>
                </div>
                <div className="table-responsive">
                  <table className={styles.dataTable}>
                    <thead>
                      <tr>
                        <th>Sno</th>
                        <th>User</th>
                        <th>Book</th>
                        <th>Start Date</th>
                        <th>Due Date</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentRentals.length === 0
                        ? <EmptyRow cols={6} message="No rental activity yet" />
                        : recentRentals.map((r, i) => {
                          // const isOverdue = r.dueDate && new Date(r.dueDate) < new Date() && !r.returnDate;
                          // return (
                          //   <tr key={r._id}>
                          //     <td>{i + 1}</td>
                          //     <td>{r.userName}</td>
                          //     <td className={styles.bookTitle}>{r.bookTitle}</td>
                          //     <td>{new Date(r.startDate).toLocaleDateString("en-IN")}</td>
                          //     <td>{r.dueDate ? new Date(r.dueDate).toLocaleDateString("en-IN") : "—"}</td>
                          //     <td>
                          //       <span className={`${styles.statusBadge} ${r.returnDate ? styles.statusReturned : isOverdue ? styles.statusOut : styles.statusActive}`}>
                          //         {r.returnDate ? "Returned" : isOverdue ? "Overdue" : "Active"}
                          //       </span>
                          //     </td>
                          //   </tr>
                          const isReturned = r.status === "Returned";
                          const isOverdue = r.endDate && new Date(r.endDate) < new Date() && !isReturned;

                          return (
                            <tr key={r._id}>
                              <td>{i + 1}</td>
                              <td>{r.userName}</td>
                              <td className={styles.bookTitle}>{r.bookTitle}</td>
                              <td>{new Date(r.startDate).toLocaleDateString("en-IN")}</td>
                              <td>{r.endDate ? new Date(r.endDate).toLocaleDateString("en-IN") : "—"}</td>
                              <td>
                                <span className={`${styles.statusBadge} ${isReturned ? styles.statusReturned : isOverdue ? styles.statusOut : styles.statusActive}`}>
                                  {isReturned ? "Returned" : isOverdue ? "Overdue" : "Active"}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <ToastContainer position="top-right" autoClose={3000} closeButton={false} />
    </div>
  );
};

export default Dashboard;