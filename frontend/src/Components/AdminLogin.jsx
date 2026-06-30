// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch } from 'react-redux';
// import { adminLoginRequest } from '../Redux/admin/adminSlice';
// import { ToastContainer, toast } from 'react-toastify';
// import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
// import styles from './AdminLogin.module.css';

// const AdminLogin = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         const role = localStorage.getItem("role");
//         if (token && role === "admin") {
//             navigate("/admin/dashboard");
//         }
//     }, [navigate]);

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().email('Invalid email').required('Email is required'),
//             password: Yup.string()
//                 .required('Password is required')
//                 .matches(/^[a-zA-Z0-9]+$/, 'Alphanumeric only')
//                 .min(6, 'Min 6 characters')
//                 .max(8, 'Max 8 characters'),
//         }),
//         onSubmit: (values) => {
//             dispatch(adminLoginRequest({
//                 ...values,      // contains email & password
//                 navigate,       // for redirect after login
//                 toast           // for success message
//             }));
//         },

//     });

//     return (
//         <div className={styles.adminLoginPage}>

//             {/* Top Right User Login Icon */}
//             <div
//                 className={styles.topRightUserIcon}
//                 onClick={() => navigate('/user-login')}
//             >
//                 <FaUser title='User Login' />
//             </div>

//             {/* Login Card */}
//             <div className={styles.adminLoginCard}>
//                 <h2 className={styles.adminLoginTitle}>ADMIN</h2>

//                 <form onSubmit={formik.handleSubmit}>

//                     {/* Email Input */}
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={
//                             formik.touched.email && formik.errors.email
//                                 ? `${styles.formControl} ${styles.invalidInput}`
//                                 : styles.formControl
//                         }
//                     />

//                     {formik.touched.email && formik.errors.email && (
//                         <div className={styles.invalidFeedback}>
//                             {formik.errors.email}
//                         </div>
//                     )}

//                     {/* Password Input */}
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
//                                         ? `${styles.formControl} ${styles.invalidInput}`
//                                         : styles.formControl
//                                 }
//                             />

//                             {/* Eye Icon */}
//                             <span
//                                 className={styles.inputGroupText}
//                                 onClick={() => setShowPassword(prev => !prev)}
//                             >
//                                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//                             </span>
//                         </div>
//                     </div>

//                     {formik.touched.password && formik.errors.password && (
//                         <div className={styles.invalidFeedback}>
//                             {formik.errors.password}
//                         </div>
//                     )}

//                     <button type="submit" className={styles.adminLoginBtn}>
//                         LOGIN
//                     </button>
//                 </form>
//             </div>

//             <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
//         </div>
//     );
// };

// export default AdminLogin;





// import { useEffect, useRef, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useFormik } from 'formik';
// import * as Yup from 'yup';
// import { useDispatch, useSelector } from 'react-redux';
// import { adminLoginRequest } from '../Redux/admin/adminSlice';
// import { ToastContainer, toast } from 'react-toastify';
// import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
// import styles from './AdminLogin.module.css';

// const AdminLogin = () => {
//     const [showPassword, setShowPassword] = useState(false);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { admin } = useSelector((state) => state.Admin);

//     const hasShownToast = useRef(false); // ✅ Add this line inside component

//     // ✅ Replace existing admin useEffect with this
//     useEffect(() => {
//         if (admin && !hasShownToast.current) {
//             hasShownToast.current = true;
//             toast.success('Admin logged in!', { toastId: 'login-toast' });
//             setTimeout(() => navigate('/admin/dashboard'), 1500);
//         }
//     }, [admin, navigate]);

//     // Redirect if already logged in
//     // useEffect(() => {
//     //     const token = localStorage.getItem("token");
//     //     const role = localStorage.getItem("role");
//     //     if (token && role === "admin") {
//     //         navigate("/admin/dashboard");
//     //     }
//     // }, [navigate]);

//     // useEffect(() => {
//     //     if (admin) {
//     //         toast.success('Admin logged in!');
//     //         setTimeout(() => navigate('/admin/dashboard'), 1500);
//     //     }
//     // }, [admin, navigate]);

//     const formik = useFormik({
//         initialValues: {
//             email: '',
//             password: '',
//         },
//         validationSchema: Yup.object({
//             email: Yup.string().email('Invalid email').required('Email is required'),
//             password: Yup.string()
//                 .required('Password is required')
//                 .matches(/^[a-zA-Z0-9]+$/, 'Alphanumeric only')
//                 .min(6, 'Min 6 characters')
//                 .max(8, 'Max 8 characters'),
//         }),
//         onSubmit: (values) => {
//             dispatch(adminLoginRequest({
//                 email: values.email,
//                 password: values.password
//             }));
//         },
//     });

//     return (
//         <div className={styles.adminLoginPage}>

//             {/* Top Right User Login Icon */}
//             <div
//                 className={styles.topRightUserIcon}
//                 onClick={() => navigate('/user-login')}
//             >
//                 <FaUser title='User Login' />
//             </div>

//             {/* Login Card */}
//             <div className={styles.adminLoginCard}>
//                 <h2 className={styles.adminLoginTitle}>ADMIN</h2>

//                 <form onSubmit={formik.handleSubmit}>

//                     {/* Email Input */}
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={formik.values.email}
//                         onChange={formik.handleChange}
//                         onBlur={formik.handleBlur}
//                         className={
//                             formik.touched.email && formik.errors.email
//                                 ? `${styles.formControl} ${styles.invalidInput}`
//                                 : styles.formControl
//                         }
//                     />
//                     {formik.touched.email && formik.errors.email && (
//                         <div className={styles.invalidFeedback}>
//                             {formik.errors.email}
//                         </div>
//                     )}

//                     {/* Password Input */}
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
//                                         ? `${styles.formControl} ${styles.invalidInput}`
//                                         : styles.formControl
//                                 }
//                             />
//                             {/* Eye Icon */}
//                             <span
//                                 className={styles.inputGroupText}
//                                 onClick={() => setShowPassword(prev => !prev)}
//                             >
//                                 {showPassword ? <FaEye /> : <FaEyeSlash />}
//                             </span>
//                         </div>
//                     </div>
//                     {formik.touched.password && formik.errors.password && (
//                         <div className={styles.invalidFeedback}>
//                             {formik.errors.password}
//                         </div>
//                     )}

//                     <button type="submit" className={styles.adminLoginBtn}>
//                         LOGIN
//                     </button>
//                 </form>
//             </div>

//             <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
//         </div>
//     );
// };

// export default AdminLogin;




import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { adminLoginRequest } from '../Redux/admin/adminSlice';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUser, FaShieldAlt, FaEnvelope, FaLock } from 'react-icons/fa';
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { admin } = useSelector((state) => state.Admin);
    const hasShownToast = useRef(false);

    useEffect(() => {
        if (admin && !hasShownToast.current) {
            hasShownToast.current = true;
            toast.success('Admin logged in!', { toastId: 'login-toast' });
            setTimeout(() => navigate('/admin/dashboard'), 1500);
        }
    }, [admin, navigate]);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string()
                .required('Password is required')
                .matches(/^[a-zA-Z0-9]+$/, 'Alphanumeric only')
                .min(6, 'Min 6 characters')
                .max(8, 'Max 8 characters'),
        }),
        onSubmit: (values) => {
            dispatch(adminLoginRequest({
                email: values.email,
                password: values.password,
            }));
        },
    });

    return (
        <div className={styles.adminLoginPage}>

            {/* Background image overlay */}
            <div className={styles.bgOverlay} />

            {/* Top Right User Login Button */}
            <button
                className={styles.topRightUserBtn}
                onClick={() => navigate('/user-login')}
                type="button"
            >
                <FaUser className={styles.userBtnIcon} />
                <span>User Login</span>
            </button>

            {/* Login Card */}
            <div className={styles.adminLoginCard}>

                {/* Card Header */}
                <div className={styles.cardHeader}>
                    <div className={styles.shieldIconWrapper}>
                        <FaShieldAlt className={styles.shieldIcon} />
                    </div>
                    <p className={styles.adminLabel}>Administrator</p>
                    <h2 className={styles.adminLoginTitle}>Admin Portal</h2>
                </div>

                <form onSubmit={formik.handleSubmit} noValidate>

                    {/* Email Input */}
                    <div className={styles.fieldGroup}>
                        <label className={styles.fieldLabel}>Email</label>
                        <div className={`${styles.inputWrapper} ${formik.touched.email && formik.errors.email ? styles.inputWrapperError : ''}`}>
                            <FaEnvelope className={styles.inputIcon} />
                            <input
                                type="email"
                                name="email"
                                // placeholder="admin@example.com"
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

                    {/* Password Input */}
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
                                onClick={() => setShowPassword((prev) => !prev)}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className={styles.invalidFeedback}>{formik.errors.password}</div>
                        )}
                    </div>

                    <button type="submit" className={styles.adminLoginBtn}>
                        Sign In
                    </button>
                </form>
            </div>

            <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
        </div>
    );
};

export default AdminLogin;