// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsersRequest } from "../../Redux/user/userSlice";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import styles from "./Userlist.module.css";

// function UserList() {
//     const dispatch = useDispatch();
//     const { userList, loading, error } = useSelector((state) => state.UserList);

//     useEffect(() => {
//         dispatch(fetchUsersRequest());
//     }, [dispatch]);

//     useEffect(() => {
//         if (error) {
//             toast.error("Failed to load users");
//         }
//     }, [error]);

//     return (
//         <div className={`${styles.container} mt-5`}>
//             <div className={`card shadow ${styles.card}`}>
//                 <div className={`bg-primary text-white ${styles.cardHeader}`}>
//                     <h4 className="text-center">USER LISTS</h4>
//                 </div>

//                 <div className="card-body table-responsive">
//                     <table className={`table table-bordered text-center align-middle ${styles.table}`}>
//                         <thead className="table-secondary">
//                             <tr>
//                                 <th>USER ID</th>
//                                 <th>PROFILE</th>
//                                 <th>NAME</th>
//                                 <th>EMAIL</th>
//                                 <th>PHONE</th>
//                                 <th>GENDER</th>
//                                 <th>ROLE</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             {loading ? (
//                                 <tr>
//                                     <td colSpan="7" className={styles.emptyRow}>Loading...</td>
//                                 </tr>
//                             ) : userList.length === 0 ? (
//                                 <tr>
//                                     <td colSpan="7" className={styles.emptyRow}>No users found</td>
//                                 </tr>
//                             ) : (
//                                 userList.map((user) => (
//                                     <tr key={user._id}>
//                                         <td>{user.userId || "N/A"}</td>

//                                         <td>
//                                             {user.profileImage ? (
//                                                 <img
//                                                     src={`${process.env.REACT_APP_BASE_URL}/uploads/${user.profileImage}`}
//                                                     alt="Profile"
//                                                     className={styles.profileImg}
//                                                 />
//                                             ) : (
//                                                 <span className="text-muted">No Image</span>
//                                             )}
//                                         </td>

//                                         <td>{user.name}</td>
//                                         <td>{user.email}</td>
//                                         <td>{user.phone}</td>
//                                         <td>{user.gender}</td>

//                                         <td>
//                                             <span
//                                                 className={`${styles.roleBadge} ${user.role === "admin" ? styles.admin : styles.user
//                                                     }`}
//                                             >
//                                                 {user.role}
//                                             </span>
//                                         </td>
//                                     </tr>
//                                 ))
//                             )}
//                         </tbody>
//                     </table>
//                 </div>
//             </div>

//             <ToastContainer position="top-center" autoClose={2000} closeButton={false} />
//         </div>
//     );
// }

// export default UserList;














import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../../Redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./Userlist.module.css";

// ── Skeleton Row ──────────────────────────────────────────────────────────────
const SkeletonRow = () => (
  <tr className={styles.skeletonRow}>
    {[...Array(7)].map((_, i) => (
      <td key={i}><div className={styles.skeletonCell} /></td>
    ))}
  </tr>
);

// ─────────────────────────────────────────────────────────────────────────────
function UserList() {
  const dispatch = useDispatch();
  const { userList = [], loading, error } = useSelector((state) => state.UserList);

  const [search, setSearch] = useState("");
  // const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const ROWS_PER_PAGE = 8;

  // Fetch on mount
  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, [dispatch]);

  // Show toast only when error changes and is truthy
  useEffect(() => {
    if (error) {
      toast.error(`⚠️ ${error || "Failed to load users. Please try again."}`, {
        toastId: "user-error", // prevent duplicate toasts
      });
    }
  }, [error]);

  // ── Filter + Search ─────────────────────────────────────────────────────────
  const filtered = userList.filter((u) =>
    u.role !== "admin" &&
    (
      u.name?.toLowerCase().includes(search.toLowerCase()) ||
      u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.userId?.toLowerCase().includes(search.toLowerCase())
    )
  );

  // ── Pagination ──────────────────────────────────────────────────────────────
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE
  );

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  // const handleRoleFilter = (role) => {
  //   setRoleFilter(role);
  //   setCurrentPage(1);
  // };

  const handleRetry = () => dispatch(fetchUsersRequest());

  const baseUrl = process.env.REACT_APP_BASE_URL || "";

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className={styles.pageWrapper}>

      {/* ── Header ───────────────────────────────────────────────────────────── */}
      <div className={styles.pageHeader}>
        <div>
          <h4 className={styles.pageTitle}>USER MANAGEMENT</h4>
          <p className={styles.pageSubtitle}>
            {loading ? "Loading..." : `${filtered.length} user${filtered.length !== 1 ? "s" : ""} found`}
          </p>
        </div>

        {/* Search */}
        <div className={styles.searchBox}>
          <svg className={styles.searchIcon} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search by name, email, ID..."
            value={search}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          {search && (
            <button className={styles.clearSearch} onClick={() => { setSearch(""); setCurrentPage(1); }}>✕</button>
          )}
        </div>
      </div>

      {/* ── Role Filter Tabs ──────────────────────────────────────────────────── */}
      {/* <div className={styles.filterTabs}>
        {["all", "user"].map((role) => (
          <button
            key={role}
            className={`${styles.filterTab} ${roleFilter === role ? styles.filterTabActive : ""}`}
            onClick={() => handleRoleFilter(role)}
          >
            {role === "all" ? "All Users" : "Users"}
            <span className={styles.filterCount}>
              {role === "all"
                ? userList.length
                : userList.filter((u) => u.role === role).length}
            </span>
          </button>
        ))}
      </div> */}

      {/* ── Main Card ─────────────────────────────────────────────────────────── */}
      <div className={styles.card}>

        {/* Error Banner */}
        {error && !loading && (
          <div className={styles.errorBanner}>
            <span>⚠️ {error || "Failed to load users"}</span>
            <button className={styles.retryBtn} onClick={handleRetry}>↻ Retry</button>
          </div>
        )}

        <div className="table-responsive">
          <table className={styles.table}>
            <thead>
              <tr>
                <th>User ID</th>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Gender</th>
                <th>Role</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
              ) : paginated.length === 0 ? (
                <tr>
                  <td colSpan="7" className={styles.emptyState}>
                    <div>
                      <div style={{ fontSize: "2.5rem" }}>🔍</div>
                      <p>{search ? `No results for "${search}"` : "No users found"}</p>
                      {search && (
                        <button className={styles.clearBtn} onClick={() => setSearch("")}>
                          Clear Search
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginated.map((user) => (
                  <tr key={user._id} className={styles.tableRow}>

                    <td>
                      <code className={styles.idCode}>{user.userId || "N/A"}</code>
                    </td>

                    <td>
                      {user.profileImage ? (
                        <img
                          src={`${baseUrl}/uploads/${user.profileImage}`}
                          alt={user.name}
                          className={styles.profileImg}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        className={styles.avatarFallback}
                        style={{ display: user.profileImage ? "none" : "flex" }}
                      >
                        {user.name?.charAt(0).toUpperCase() || "?"}
                      </div>
                    </td>

                    <td className={styles.nameCell}>{user.name || "—"}</td>
                    <td className={styles.emailCell}>{user.email || "—"}</td>
                    <td>{user.phone || "—"}</td>

                    <td>
                      <span className={styles.genderTag}>
                        {user.gender === "male" ? "♂" : user.gender === "female" ? "♀" : "—"}{" "}
                        {user.gender
                          ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
                          : "—"}
                      </span>
                    </td>

                    <td>
                      <span className={`${styles.roleBadge} ${user.role === "admin" ? styles.adminBadge : styles.userBadge}`}>
                        {user.role === "admin" ? "🛡 Admin" : "👤 User"}
                      </span>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ─────────────────────────────────────────────────────── */}
        {!loading && totalPages > 1 && (
          <div className={styles.pagination}>
            <span className={styles.pageInfo}>
              Page {currentPage} of {totalPages}
            </span>
            <div className={styles.pageButtons}>
              <button
                className={styles.pageBtn}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
              >«</button>
              <button
                className={styles.pageBtn}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >‹</button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  className={`${styles.pageBtn} ${currentPage === i + 1 ? styles.pageBtnActive : ""}`}
                  onClick={() => setCurrentPage(i + 1)}
                >{i + 1}</button>
              ))}

              <button
                className={styles.pageBtn}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >›</button>
              <button
                className={styles.pageBtn}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(totalPages)}
              >»</button>
            </div>
          </div>
        )}
      </div>

      <ToastContainer position="top-center" autoClose={3000} closeButton={false} />
    </div>
  );
}

export default UserList;