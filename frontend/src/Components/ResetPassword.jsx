// import React from 'react';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';

// const ResetPassword = () => {
//     const navigate = useNavigate();

//     const formik = useFormik({
//         initialValues: {
//             newPassword: '',
//         },
//         validationSchema: Yup.object({
//             newPassword: Yup.string()
//                 .required('New password is required')
//                 .min(6, 'Password must be at least 6 characters')
//                 .max(20, 'Password must be less than 20 characters'),
//         }),
//         onSubmit: async (values) => {
//             try {
//                 const token = localStorage.getItem('token');
//                 const res = await axios.post(
//                     `http://localhost:8000/api/user/reset-password`,
//                     { newPassword: values.newPassword },
//                     {
//                         headers: {
//                             Authorization: `Bearer ${token}`,
//                         },
//                     }
//                 );
//                 console.log(res);
//                 toast.success('Password reset successful!');

//                 setTimeout(() => {
//                     const role = localStorage.getItem('role');
//                     navigate(role === 'admin' ? '/admin/dashboard' : '/user/dashboard');
//                 }, 1500);
//             } catch (error) {
//                 toast.error('Failed to reset password');
//             }
//         },
//     });

//     return (
//         <div style={{ width: '300px', margin: '50px auto' }}>
//             <h3>Reset Password</h3>
//             <form onSubmit={formik.handleSubmit}>
//                 <input
//                     type="password"
//                     name="newPassword"
//                     placeholder="Enter new password"
//                     value={formik.values.newPassword}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     style={{ width: '100%', padding: '10px', marginBottom: '12px' }}
//                 />
//                 {formik.touched.newPassword && formik.errors.newPassword && (
//                     <div style={{ color: 'red' }}>{formik.errors.newPassword}</div>
//                 )}
//                 <button type="submit">Submit</button>
//             </form>
//             <ToastContainer position="top-center" autoClose={1500} />
//         </div>
//     );
// };

// export default ResetPassword;

import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const [password, setpassword] = useState('');
    const [message, setmessage] = useState('');

    const handleReset = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/admin/resetpassword/${token}`, { password });
            setmessage(res.data.message);
        } catch (err) {
            setmessage(err.response?.data?.message || "Error occured")
        }
    };

    return (
        <div className="container" style={{ width: '25%', marginTop: '16%' }}>
            <div className="bg-white p-4 rounded shadow">
                <h3 className="mb-4 text-center">Reset Password</h3>
                <form onSubmit={handleReset}>
                    <div className="mb-3">
                        <input type="password"
                            minLength={6}
                            maxLength={8}
                            placeholder="Enter new password" style={{ outline: 'none', boxShadow: 'none', width: '99%' }}
                            value={password}
                            onChange={(e) => setpassword(e.target.value)}
                            required
                        />
                        <button type="Submit" className="btn btn-success w-100">Reset Passowrd</button>
                    </div>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
};
export default ResetPassword;