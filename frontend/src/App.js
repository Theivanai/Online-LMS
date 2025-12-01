import './App.css';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from "./Components/AdminLogin.jsx";
import Register from "./Components/Register";
import AdminRoutes from './Admin/Pages/AdminRoute';
import UserRoutes from './User/Pages/UserRoutes';
import ProtectedRoute from './Components/ProtectedRoute';
import ForgotPassword from './Components/ForgetPassword.jsx';
import ResetPassword from './Components/ResetPassword.jsx';
import UserRegistration from './Admin/Pages/UserRegistration.jsx';
import UserLogin from './Components/UserLogin.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/register-user" element={<UserRegistration />} />


        {/* Protected Admin Panel Route */}
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute role="admin">
              <AdminRoutes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/*"
          element={
            <ProtectedRoute role="user">
              <UserRoutes />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;