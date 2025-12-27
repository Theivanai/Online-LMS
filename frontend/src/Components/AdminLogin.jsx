import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { adminLoginRequest } from '../Redux/admin/adminSlice';
import { ToastContainer, toast } from 'react-toastify';
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import styles from './AdminLogin.module.css';

const AdminLogin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");
        const role = localStorage.getItem("role");
        if (token && role === "admin") {
            navigate("/admin/dashboard");
        }
    }, [navigate]);

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
            dispatch(adminLoginRequest(values));
        },
    });

    return (
        <div className={styles.adminLoginPage}>

            {/* Top Right User Login Icon */}
            <div
                className={styles.topRightUserIcon}
                onClick={() => navigate('/user-login')}
            >
                <FaUser title='User Login' />
            </div>

            {/* Login Card */}
            <div className={styles.adminLoginCard}>
                <h2 className={styles.adminLoginTitle}>ADMIN</h2>

                <form onSubmit={formik.handleSubmit}>

                    {/* Email Input */}
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        className={
                            formik.touched.email && formik.errors.email
                                ? `${styles.formControl} ${styles.invalidInput}`
                                : styles.formControl
                        }
                    />

                    {formik.touched.email && formik.errors.email && (
                        <div className={styles.invalidFeedback}>
                            {formik.errors.email}
                        </div>
                    )}

                    {/* Password Input */}
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
                                        ? `${styles.formControl} ${styles.invalidInput}`
                                        : styles.formControl
                                }
                            />

                            {/* Eye Icon */}
                            <span
                                className={styles.inputGroupText}
                                onClick={() => setShowPassword(prev => !prev)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                    </div>

                    {formik.touched.password && formik.errors.password && (
                        <div className={styles.invalidFeedback}>
                            {formik.errors.password}
                        </div>
                    )}

                    <button type="submit" className={styles.adminLoginBtn}>
                        LOGIN
                    </button>
                </form>
            </div>

            <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
        </div>
    );
};

export default AdminLogin;
