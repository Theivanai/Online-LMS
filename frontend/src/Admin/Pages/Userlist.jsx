// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchUsersRequest } from "../../Redux/user/userSlice";
// import { ToastContainer, toast } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import './Userlist.css';

// function UserList() {
//     const dispatch = useDispatch();
//     const { userList, loading, error } = useSelector((state) => state.Userlists);

//     useEffect(() => {
//         dispatch(fetchUsersRequest());
//     }, [dispatch]);

//     useEffect(() => {
//         if (error) {
//             toast.error("Failed to load users");
//         }
//     }, [error]);

//     return (
//         <div className="container mt-5">
//             <div className="card shadow">
//                 <div className="card-header bg-primary text-white">
//                     <h4 className="text-center">USER LISTS</h4>
//                 </div>
//                 <div className="card-body table-responsive">
//                     <table className="table table-bordered text-center align-middle">
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
//                                 <tr><td colSpan="7">Loading...</td></tr>
//                             ) : userList.length === 0 ? (
//                                 <tr><td colSpan="7">No users found</td></tr>
//                             ) : (
//                                 userList.map((user) => (
//                                     <tr key={user._id}>
//                                         <td>{user.userId || "N/A"}</td>
//                                         <td>
//                                             {user.profileImage ? (
//                                                 <img
//                                                     src={`http://localhost:8000/uploads/${user.profileImage}`}
//                                                     alt="Profile"
//                                                     style={{
//                                                         width: '60px', height: '80px',
//                                                         objectFit: 'contain', border: 'none', borderRadius: '0%'
//                                                     }}
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
//                                             <span className={`badge ${user.role === "admin" ? "bg-success" : "bg-info"}`}>
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




import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsersRequest } from "../../Redux/user/userSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Userlist.module.css";

function UserList() {
    const dispatch = useDispatch();
    const { userList, loading, error } = useSelector((state) => state.UserList);

    useEffect(() => {
        dispatch(fetchUsersRequest());
    }, [dispatch]);

    useEffect(() => {
        if (error) {
            toast.error("Failed to load users");
        }
    }, [error]);

    return (
        <div className={`${styles.container} mt-5`}>
            <div className={`card shadow ${styles.card}`}>
                <div className={`bg-primary text-white ${styles.cardHeader}`}>
                    <h4 className="text-center">USER LISTS</h4>
                </div>

                <div className="card-body table-responsive">
                    <table className={`table table-bordered text-center align-middle ${styles.table}`}>
                        <thead className="table-secondary">
                            <tr>
                                <th>USER ID</th>
                                <th>PROFILE</th>
                                <th>NAME</th>
                                <th>EMAIL</th>
                                <th>PHONE</th>
                                <th>GENDER</th>
                                <th>ROLE</th>
                            </tr>
                        </thead>

                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="7" className={styles.emptyRow}>Loading...</td>
                                </tr>
                            ) : userList.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className={styles.emptyRow}>No users found</td>
                                </tr>
                            ) : (
                                userList.map((user) => (
                                    <tr key={user._id}>
                                        <td>{user.userId || "N/A"}</td>

                                        <td>
                                            {user.profileImage ? (
                                                <img
                                                    src={`${process.env.REACT_BASE_URL}/uploads/${user.profileImage}`}
                                                    alt="Profile"
                                                    className={styles.profileImg}
                                                />
                                            ) : (
                                                <span className="text-muted">No Image</span>
                                            )}
                                        </td>

                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.gender}</td>

                                        <td>
                                            <span
                                                className={`${styles.roleBadge} ${user.role === "admin" ? styles.admin : styles.user
                                                    }`}
                                            >
                                                {user.role}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={2000} closeButton={false} />
        </div>
    );
}

export default UserList;
