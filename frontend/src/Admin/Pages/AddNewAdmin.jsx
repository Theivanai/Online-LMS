import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerAdminRequest, resetAdminStatus } from "../../Redux/admin/adminSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './AddNewAdmin.module.css';


const AddAdmin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const { loading, success } = useSelector(state => state.Admin);

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: ""
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .matches(/^[A-Za-z ]+$/, "Name must contain only alphabets")
                .required("Name is required"),
            email: Yup.string()
                .email("Invalid email address")
                .required("Email is required"),
            password: Yup.string()
                .required('Password is required')
                .matches(/^[a-zA-Z0-9]+$/, 'Password must be alphanumeric')
                .min(6, 'Minimum 6 characters')
                .max(8, 'Maximum 8 characters')
        }),
        onSubmit: (values, { resetForm }) => {
            dispatch(registerAdminRequest(values));
            toast.success("Admin added successfully!");
        }
    });

    useEffect(() => {
        if (success) {
            formik.resetForm();
            dispatch(resetAdminStatus());
        }
    }, [success, dispatch]);

    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h4 className={styles.title}>ADD NEW ADMIN</h4>

                <form onSubmit={formik.handleSubmit} noValidate>
                    {/* Name */}
                    <div className={styles.fieldBox}>
                        <label htmlFor="name" className={styles.label}>
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`${styles.input} ${formik.touched.name && formik.errors.name ? styles.invalid : ""}`}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className={styles.errorText}>{formik.errors.name}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div className={styles.fieldBox}>
                        <label htmlFor="email" className={styles.label}>
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`${styles.input} ${formik.touched.email && formik.errors.email ? styles.invalid : ""}`}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className={styles.errorText}>{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className={styles.fieldBox}>
                        <label htmlFor="password" className={styles.label}>
                            Password
                        </label>
                        <div className={styles.passwordWrapper}>
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                maxLength={8}
                                className={`${styles.input} ${formik.touched.password && formik.errors.password ? styles.invalid : ""}`}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span
                                className={styles.eyeIcon}
                                onClick={() => setShowPassword((prev) => !prev)}
                            >
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                        </div>
                        {formik.touched.password && formik.errors.password && (
                            <div className={styles.errorText}>{formik.errors.password}</div>
                        )}
                    </div>

                    {/* Button */}
                    <button type="submit" className={styles.submitBtn} disabled={loading}>
                        {loading ? "Adding..." : "ADD ADMIN"}
                    </button>
                </form>

                <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
            </div>
        </div>
    );
};
export default AddAdmin;
