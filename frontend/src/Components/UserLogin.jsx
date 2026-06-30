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
//     const [toastShown, setToastShown] = useState(false);

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

//     // Handle login success/error
//     useEffect(() => {
//         if (user && !toastShown) {
//             const username = user.name || user.email || "User";
//             toast.success(`${username} logged in`);
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

//     // Formik
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
//             setToastShown(false);
//             dispatch(loginRequest(values));
//         }
//     });

//     return (
//         <div className={styles.userloginpage}>
//             <div className={styles.logincard}>
//                 <h2 className={styles.userlogintitle}>USER LOGIN</h2>

//                 <form onSubmit={formik.handleSubmit}>
//                     {/* Email */}
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={
//                             formik.touched.email && formik.errors.email
//                                 ? `${styles.inputField} is-invalid`
//                                 : styles.inputField
//                         }
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                         <div className={styles.errorText}>{formik.errors.email}</div>
//                     )}

//                     {/* Password */}
//                     <div className={styles.passwordContainer}>
//                         <div className={styles.inputGroup}>
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 placeholder="Password"
//                                 maxLength={8}
//                                 value={formik.values.password}
//                                 onChange={formik.handleChange}
//                                 onBlur={formik.handleBlur}
//                                 className={
//                                     formik.touched.password && formik.errors.password
//                                         ? `${styles.inputField} is-invalid`
//                                         : styles.inputField
//                                 }
//                             />

//                             <span
//                                 className={styles.eyeIcon}
//                                 onClick={() => setShowPassword(prev => !prev)}
//                             >
//                                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//                             </span>
//                         </div>
//                     </div>

//                     {formik.touched.password && formik.errors.password && (
//                         <div className={styles.errorText}>{formik.errors.password}</div>
//                     )}


//                     <div className={styles.registerRow}>
//                         <p>Don't have an account?</p>
//                         <span onClick={() => navigate('/register-user')} className={styles.linkText}>Register</span>
//                     </div>


//                     <button type="submit" className={styles.loginButton}>LOGIN</button>
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
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaUserCircle } from 'react-icons/fa';
import 'react-toastify/dist/ReactToastify.css';

import styles from './UserLogin.module.css';
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
            const username = user.name || user.email || 'User';
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
        },
    });

    return (
        <div className={styles.userLoginPage}>

            {/* Background overlay */}
            <div className={styles.bgOverlay} />

            {/* Login Card */}
            <div className={styles.loginCard}>

                {/* Header */}
                <div className={styles.cardHeader}>
                    <div className={styles.avatarWrapper}>
                        <FaUserCircle className={styles.avatarIcon} />
                    </div>
                    <p className={styles.welcomeLabel}>Welcome Back</p>
                    <h2 className={styles.loginTitle}>User Login</h2>
                </div>

                <form onSubmit={formik.handleSubmit} noValidate>

                    {/* Email */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Email</label>
                        <div className={`${styles.inputWrapper} ${formik.touched.email && formik.errors.email ? styles.inputWrapperError : ''}`}>
                            <FaEnvelope className={styles.inputIcon} />
                            <input
                                type="email"
                                name="email"
                                // placeholder="user@example.com"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={styles.formControl}
                            />
                        </div>
                        {formik.touched.email && formik.errors.email && (
                            <div className={styles.invalidFeedback}>{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Password</label>
                        <div className={`${styles.inputWrapper} ${formik.touched.password && formik.errors.password ? styles.inputWrapperError : ''}`}>
                            <FaLock className={styles.inputIcon} />
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                // placeholder="••••••••"
                                maxLength={8}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className={styles.formControl}
                            />
                            <button
                                type="button"
                                className={styles.eyeBtn}
                                onClick={() => setShowPassword(prev => !prev)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className={styles.invalidFeedback}>{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Register Row */}
                    <div className={styles.registerRow}>
                        <span className={styles.registerText}>Don't have an account?</span>
                        <button
                            type="button"
                            className={styles.registerLink}
                            onClick={() => navigate('/register-user')}
                        >
                            Register
                        </button>
                    </div>

                    {/* Submit */}
                    <button type="submit" className={styles.loginButton}>
                        Sign In
                    </button>

                </form>
            </div>

            <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
        </div>
    );
};

export default UserLogin;