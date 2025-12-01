import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import './Register.css';
import lib3 from './Assets/lib3.jpeg'
import { toast, ToastContainer } from 'react-toastify';

const RegisterForm = () => {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const navigate = useNavigate();
 

    const handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post(`http://localhost:8000/api/user/register`, { name, email, password })
            .then((res) => {
                toast.success("User Registered")
                navigate("/login");
            })
            .catch((err) => {
                toast.error("User Already Exists!")
                console.log(err);
            });
    };

    return (
        <div
            className="register-container"
            style={{
                backgroundImage: `url(${lib3})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <form onSubmit={handleSubmit} className="register-form">
                <h3>Register</h3>
                <input type="text" className="name_register" placeholder="Name" value={name} onChange={(e) => setname(e.target.value)} required />
                <input type="email" className="email_register" placeholder="Email" value={email} onChange={(e) => setemail(e.target.value)} required />
                <input type="password" className="password_register" placeholder="Password" value={password} onChange={(e) => setpassword(e.target.value)} required />
                <button type="submit">Register</button>

                <div className="login">
                    <p>
                        Already have an account?
                        <Link to="/login">
                            <span className="l1"> Login</span>
                        </Link>
                    </p>
                </div>
            </form>

            <ToastContainer position="top-right" autoClose={1200} closeButton={false} />
        </div>
    );
};

export default RegisterForm;
