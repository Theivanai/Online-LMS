import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import 'react-toastify/dist/ReactToastify.css';
import { registerUserRequest } from '../../User/Pages/Redux/Slices/userSlice';

const RegisterUser = () => {
    const [showpassword, setshowpassword] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { message, error } = useSelector(state => state.UserProfile);

    useEffect(() => {
        if (message) {
            toast.success(message);
            setTimeout(() => navigate('/user-login'), 1500);
        }
        if (error) {
            toast.error(error);
        }
    }, [message, error, navigate]);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            phone: '',
            address: '',
            gender: '',
            role: 'user',
            profileimg: null,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            password: Yup.string().min(6).max(8).required('Password is required'),
            phone: Yup.string().matches(/^[0-9]{10}$/, 'Phone must be 10 digits').required('Phone is required'),
            address: Yup.string().required('Address is required'),
            gender: Yup.string().required('Gender is required'),
            role: Yup.string().oneOf(['user', 'admin']).required('Role is required'),
        }),
        onSubmit: (values) => {
            const formdata = new FormData();
            for (const key in values) {
                if (key === 'profileimg' && values.profileimg) {
                    formdata.append('profileimg', values.profileimg);
                } else {
                    formdata.append(key, values[key]);
                }
            }

            dispatch(registerUserRequest(Object.fromEntries(formdata))); // ✅ convert FormData to plain object
        },
    });

    return (
        <div className="container mt-2" style={{ maxWidth: '600px' }}>
            <div className='bg-white p-4 rounded shadow'>
                <h3 className="mb-3 text-center">User Registration</h3>
                <form onSubmit={formik.handleSubmit} encType="multipart/form-data">

                    {/* Name */}
                    <div className="mb-2">
                        <label className="form-label fw-bold">Name</label>
                        <input className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`} {...formik.getFieldProps('name')} />
                        {formik.touched.name && formik.errors.name && <div className="invalid-feedback">{formik.errors.name}</div>}
                    </div>

                    {/* Email */}
                    <div className="mb-2">
                        <label className="form-label fw-bold">Email</label>
                        <input type="email" className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`} {...formik.getFieldProps('email')} />
                        {formik.touched.email && formik.errors.email && <div className="invalid-feedback">{formik.errors.email}</div>}
                    </div>

                    {/* Password */}
                    <div className="mb-2 position-relative">
                        <label className="form-label fw-bold">Password</label>
                        <div className='input-group'>
                            <input type={showpassword ? "text" : "password"} maxLength={8} className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`} {...formik.getFieldProps('password')} />
                            <span className="input-group-text" onClick={() => setshowpassword(prev => !prev)} style={{ cursor: 'pointer', marginBottom: '15px' }}>
                                {showpassword ? <FaEye /> : <FaEyeSlash />}
                            </span>
                            {formik.touched.password && formik.errors.password && <div className="invalid-feedback">{formik.errors.password}</div>}
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="mb-2">
                        <label className="form-label fw-bold">Phone</label>
                        <input type="text" maxLength={10} className={`form-control ${formik.touched.phone && formik.errors.phone ? 'is-invalid' : ''}`} {...formik.getFieldProps('phone')} />
                        {formik.touched.phone && formik.errors.phone && <div className="invalid-feedback">{formik.errors.phone}</div>}
                    </div>

                    {/* Address */}
                    <div className="mb-2">
                        <label className="form-label fw-bold">Address</label>
                        <textarea className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`} {...formik.getFieldProps('address')} />
                        {formik.touched.address && formik.errors.address && <div className="invalid-feedback">{formik.errors.address}</div>}
                    </div>

                    {/* Gender */}
                    <div className="mb-2">
                        <label className="form-label fw-bold">Gender</label>
                        <select className="form-control" {...formik.getFieldProps('gender')}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                        {formik.touched.gender && formik.errors.gender && <div className="text-danger">{formik.errors.gender}</div>}
                    </div>

                    {/* Role */}
                    <div className="mb-2">
                        <label className="form-label fw-bold">Role</label>
                        <select className="form-control" {...formik.getFieldProps('role')}>
                            <option value="user">User</option>
                        </select>
                        {formik.touched.role && formik.errors.role && <div className="text-danger">{formik.errors.role}</div>}
                    </div>

                    {/* Profile Image */}
                    <div className="mb-3">
                        <label className="form-label fw-bold">Profile</label>
                        <input
                            type="file"
                            name="profileimg"
                            className="form-control"
                            onChange={(e) => formik.setFieldValue('profileimg', e.currentTarget.files[0])}
                            accept="image/*"
                        />
                    </div>

                    <button type="submit mt-3" className="btn btn-primary w-100">Register</button>

                    {/* Already have account? */}
                    <p className="text-center" l>
                        Already have an account?{" "}
                        <span style={{ color: 'blue', cursor: 'pointer' }} onClick={() => navigate('/user-login')}>
                            Login
                        </span>
                    </p>
                </form>
            </div>
            <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
        </div>
    );
};

export default RegisterUser;
