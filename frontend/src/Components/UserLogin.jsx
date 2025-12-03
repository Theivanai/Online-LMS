// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { ToastContainer, toast } from 'react-toastify';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import 'react-toastify/dist/ReactToastify.css';
// import styles from './UserLogin.module.css';
// import { loginRequest } from '../../src/User/Pages/Redux/Slices/userSlice';



// const UserLogin = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const [toastShown, setToastShown] = useState(false); //  to prevent multiple toasts

//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { user, mustResetPassword, error } = useSelector(state => state.UserProfile);

//     // Redirect if already logged in
//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const role = localStorage.getItem('role');
//         if (token && role === 'user') {
//             navigate('/user/dashboard');
//         }
//     }, [navigate]);

//     // Handle login success or error once
//     useEffect(() => {
//         if (user && !toastShown) {
//             const username = user.name || user.email || "User";
//             toast.success(`${username} logged in `);
//             setToastShown(true);
//             setTimeout(() => {
//                 navigate(mustResetPassword ? '/reset-password' : '/user/dashboard');
//             }, 1200);
//         }

//         if (error && !toastShown) {
//             toast.error(error);
//             setToastShown(true);
//         }
//     }, [user, error, mustResetPassword, navigate, toastShown]);

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().email('Invalid email address').required('Email is required'),
//             password: Yup.string()
//                 .required('Password is required')
//                 .min(6, 'Min 6 characters')
//                 .max(8, 'Max 8 characters'),
//         }),
//         onSubmit: (values) => {
//             setToastShown(false); // reset before new login attempt
//             dispatch(loginRequest(values));
//         }
//     });

//     return (
//         <div className={styles.userLoginPage}>

//             <div className="login-card">
//                 <h2 className="user-login-title">USER LOGIN</h2>

//                 <form onSubmit={formik.handleSubmit}>
//                     {/* Email */}
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={formik.touched.email && formik.errors.email ? 'form-control is-invalid' : 'form-control'}
//                         style={{ outline: 'none', boxShadow: 'none' }}
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                         <div className="invalid-feedback">{formik.errors.email}</div>
//                     )}

//                     {/* Password */}
//                     <div className="password-container">
//                         <div className='input-group'>
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 placeholder="Password"
//                                 maxLength={8}
//                                 value={formik.values.password}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 className={formik.touched.password && formik.errors.password ? 'form-control is-invalid' : 'form-control'}
//                                 style={{ outline: 'none', boxShadow: 'none' }}
//                             />
//                             <span className="input-group-text" onClick={() => setShowPassword(prev => !prev)} style={{ cursor: 'pointer', marginBottom: '15px' }}>
//                                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//                             </span>
//                         </div>
//                     </div>
//                     {formik.touched.password && formik.errors.password && (
//                         <div className="invalid-feedback">{formik.errors.password}</div>
//                     )}

//                     {/* Register Link */}
//                     <div className="d-flex justify-content-between mt-3 mb-2">
//                         <p className='text-center'>Don't have an account?{" "}</p>
//                         <span onClick={() => navigate('/register-user')} className="link-text">Register</span>
//                     </div>

//                     {/* Submit Button */}
//                     <button type="submit" className="btn btn-primary fw-bold w-100">LOGIN</button>
//                 </form>
//             </div>

//             <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//         </div>
//     );
// };

// export default UserLogin;







import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';

import styles from './UserLogin.module.css';   // ✅ CSS Module
import { loginRequest } from '../../src/User/Pages/Redux/Slices/userSlice';

const UserLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [toastShown, setToastShown] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, mustResetPassword, error } = useSelector(state => state.UserProfile);

    // Redirect if already logged in
    useEffect(() => {
        const token = localStorage.getItem('token');
        const role = localStorage.getItem('role');
        if (token && role === 'user') {
            navigate('/user/dashboard');
        }
    }, [navigate]);

    // Handle login success/error
    useEffect(() => {
        if (user && !toastShown) {
            const username = user.name || user.email || "User";
            toast.success(`${username} logged in`);
            setToastShown(true);
            setTimeout(() => {
                navigate(mustResetPassword ? '/reset-password' : '/user/dashboard');
            }, 1200);
        }

        if (error && !toastShown) {
            toast.error(error);
            setToastShown(true);
        }
    }, [user, error, mustResetPassword, navigate, toastShown]);

    // Formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .min(6, 'Min 6 characters')
                .max(8, 'Max 8 characters'),
        }),
        onSubmit: (values) => {
            setToastShown(false);
            dispatch(loginRequest(values));
        }
    });

    return (
        <div className={styles["user-login-page"]}>
            <div className={styles["login-card"]}>
                <h2 className={styles["user-login-title"]}>USER LOGIN</h2>

                <form onSubmit={formik.handleSubmit}>
                    {/* Email */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                            formik.touched.email && formik.errors.email
                                ? `${styles.inputField} is-invalid`
                                : styles.inputField
                        }
                    />
                    {formik.touched.email && formik.errors.email && (
                        <div className={styles.errorText}>{formik.errors.email}</div>
                    )}

                    {/* Password */}
                    <div className={styles.passwordContainer}>
                        <div className={styles.inputGroup}>
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                maxLength={8}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={
                                    formik.touched.password && formik.errors.password
                                        ? `${styles.inputField} is-invalid`
                                        : styles.inputField
                                }
                            />

                            <span
                                className={styles.eyeIcon}
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>

                    {formik.touched.password && formik.errors.password && (
                        <div className={styles.errorText}>{formik.errors.password}</div>
                    )}

                    {/* Register Link */}
                    <div className={styles.registerRow}>
                        <p>Don't have an account?</p>
                        <span onClick={() => navigate('/register-user')} className={styles.linkText}>Register</span>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" className={styles.loginButton}>LOGIN</button>
                </form>
            </div>

            <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
        </div>
    );
};

export default UserLogin;
