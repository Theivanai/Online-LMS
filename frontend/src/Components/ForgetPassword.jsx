import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setmessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${process.env.REACT_BASE_URL}/api/admin/forgotpassword`, { email });
            setmessage(res.data.message);
        } catch (err) {
            setmessage(err.response?.data?.message || 'Error occured');
        }
    };

    return (
        <div className="container" style={{ width: '25%', marginTop:'16%' }}>
            <div className="bg-white p-4 rounded shadow">
                <h3 className="mb-4 text-center">Forgot Password</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input type='email'
                            placeholder="Enter your email" style={{outline:'none',boxShadow:'none',width:'99%'}}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="Submit" className="btn btn-success w-100">Send Reset Link</button>
                </form>
                <p>{message}</p>
            </div>
        </div>
    );
};
export default ForgetPassword;