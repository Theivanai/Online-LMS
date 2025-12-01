import React, { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerAdminRequest, resetAdminStatus } from "../../Redux/admin/adminSlice";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Add New Admin.css'

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
        <div className="container d-flex justify-content-center align-items-center mt-5">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h4 className="mb-4 text-center fw-bold text-primary">ADD NEW ADMIN</h4>
                <form onSubmit={formik.handleSubmit} noValidate>
                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} style={{ outline: 'none', boxShadow: 'none' }}
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.name && formik.errors.name && (
                            <div className="invalid-feedback">{formik.errors.name}</div>
                        )}
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} style={{ outline: 'none', boxShadow: 'none' }}
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <div className="invalid-feedback">{formik.errors.email}</div>
                        )}
                    </div>

                    {/* Password */}
                    <div className="mb-3 position-relative">
                        <label htmlFor="password" className="form-label">Password</label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                maxLength={8}
                                className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} style={{ outline: 'none', boxShadow: 'none' }}
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <span className="input-group-text" onClick={() => setShowPassword(prev => !prev)} style={{ cursor: 'pointer', marginBottom: '15px' }}>
                                {showPassword ? <FaEye /> : <FaEyeSlash />}
                            </span>

                            {formik.touched.password && formik.errors.password && (
                                <div className="invalid-feedback">{formik.errors.password}</div>
                            )}
                        </div>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn btn-primary w-100 fw-bold" disabled={loading}>
                        {loading ? "Adding..." : "ADD ADMIN"}
                    </button>
                </form>

                <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
            </div>
        </div>
    );
};

export default AddAdmin;
