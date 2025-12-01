// import React, { useState } from "react";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// const ForgotPassword = () => {
//     const [email, setEmail] = useState("");
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         if (!email) {
//             toast.error("Please enter your email");
//             return;
//         }

//         setLoading(true);

//         try {
//             await axios.post("http://localhost:8000/api/admin/forgot-password", { email });
//             toast.success("Reset password link has been sent to your email")
//         } catch (error) {
//             toast.error(error.response?.data?.message || "Something went wrong!")
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="container mt-5">
//             <div className="bg-white p-4 rounded shadow">
//                 <h3 className="mb-4 text-center">Reset password</h3>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email</label>
//                         <input id="email" name="email" type="email" className="form-control" style={{ outline: "none", boxShadow: "none" }}
//                             value={email} onChange={(e) => setEmail(e.target.value)} />
//                     </div>
//                     <button disabled={loading} type="submit" className="btn btn-primary w-100">
//                         {loading ? "processing" : "Reset password"}
//                     </button>

//                 </form>
//                 <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//             </div>
//         </div>
//     )
// };

// export default ForgotPassword;


import React, { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setmessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`http://localhost:8000/api/admin/forgotpassword`, { email });
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