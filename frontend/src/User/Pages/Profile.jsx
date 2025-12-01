// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import {
//   fetchUserProfileRequest,
//   changePasswordRequest,
// } from './Redux/Slices/userSlice';
// import './Profile.css';
// import { useForm } from 'react-hook-form';
// import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const Profile = () => {
//   const dispatch = useDispatch();
//   const userState = useSelector((state) => state.UserData);
//   const { profile: user, message, error } = userState;

//   const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   useEffect(() => {
//     dispatch(fetchUserProfileRequest());
//   }, [dispatch]);

//   // Toast on message or error from Redux
//   useEffect(() => {
//     if (message) {
//       toast.success(message);
//     }
//     if (error) {
//       toast.error(error);
//     }
//   }, [message, error]);

//   const onSubmit = (data) => {
//     if (data.newPassword !== data.confirmPassword) {
//       toast.error("New passwords do not match");
//       return;
//     }

//     dispatch(changePasswordRequest({
//       currentPassword: data.currentPassword,
//       newPassword: data.newPassword,
//     }));

//     reset(); // clear the form
//   };

//   if (!user || Object.keys(user).length === 0) return <p>Loading profile...</p>;

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-left">
//         <div className="col-md-8">
//           <div className="card shadow p-4">
//             <div className="row">
//               <div className="col-md-5 border-end">
//                 <h4 className='fw-bold text-primary'>PROFILE</h4>
//                 {user.profileImage && (
//                   <img
//                     src={`http://localhost:8000/uploads/${user.profileImage}`}
//                     alt="Profile"
//                     style={{
//                       width: '70px',
//                       height: '80px',
//                       objectFit: 'contain',
//                       border: 'none',
//                       borderRadius: '0%'
//                     }}
//                   />
//                 )}
//                 <p><b>Name:</b> {user.name}</p>
//                 <p><b>Email:</b> {user.email}</p>
//               </div>

//               <div className="col-md-7">
//                 <form onSubmit={handleSubmit(onSubmit)} className="p-3">

//                   {/* Current Password */}
//                   <div className="form-group mb-3">
//                     <label>Current Password</label>
//                     <div className="input-group">
//                       <input
//                         type={showCurrent ? 'text' : 'password'}
//                         className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
//                         {...register('currentPassword', { required: 'Current password is required' })}
//                         style={{ outline: 'none', boxShadow: 'none' }}
//                       />
//                       <span className="input-group-text" onClick={() => setShowCurrent(!showCurrent)} style={{ cursor: 'pointer' }}>
//                         {showCurrent ? <FaEye /> : <FaEyeSlash />}
//                       </span>
//                     </div>
//                     {errors.currentPassword && <p className="text-danger">{errors.currentPassword.message}</p>}
//                   </div>

//                   {/* New Password */}
//                   <div className="form-group mb-3">
//                     <label>New Password</label>
//                     <div className="input-group">
//                       <input
//                         type={showNew ? 'text' : 'password'}
//                         className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
//                         {...register('newPassword', {
//                           required: 'New password is required',
//                           minLength: { value: 6, message: 'Minimum 6 characters required' },
//                         })}
//                         style={{ outline: 'none', boxShadow: 'none' }}
//                       />
//                       <span className="input-group-text" onClick={() => setShowNew(!showNew)} style={{ cursor: 'pointer' }}>
//                         {showNew ? <FaEye /> : <FaEyeSlash />}
//                       </span>
//                     </div>
//                     {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
//                   </div>

//                   {/* Confirm New Password */}
//                   <div className="form-group mb-3">
//                     <label>Confirm New Password</label>
//                     <div className="input-group">
//                       <input
//                         type={showConfirm ? 'text' : 'password'}
//                         className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
//                         {...register('confirmPassword', {
//                           required: 'Please confirm your password',
//                           validate: (value) =>
//                             value === watch('newPassword') || 'Passwords do not match',
//                         })}
//                         style={{ outline: 'none', boxShadow: 'none' }}
//                       />
//                       <span className="input-group-text" onClick={() => setShowConfirm(!showConfirm)} style={{ cursor: 'pointer' }}>
//                         {showConfirm ? <FaEye /> : <FaEyeSlash />}
//                       </span>
//                     </div>
//                     {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
//                   </div>

//                   <button type="submit" className="btn btn-primary">Update Password</button>
//                 </form>

//                 {/* Toast Container */}
//                 <ToastContainer position="top-center" autoClose={1500} closeButton={false} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import {
  fetchUserProfileRequest,
  changePasswordRequest,
} from './Redux/Slices/userSlice';
import './Profile.css';
import { useForm } from 'react-hook-form';
import { toast, ToastContainer } from 'react-toastify';


const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.UserProfile);
  const { profile: user, message, error } = userState;

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    dispatch(fetchUserProfileRequest());
  }, [dispatch]);

  useEffect(() => {
    if (message) toast.success(message);
    if (error) toast.error(error);
  }, [message, error]);

  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    dispatch(changePasswordRequest({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword,
    }));

    reset();
  };

  if (!user || Object.keys(user).length === 0) return <p>Loading profile...</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-left">
        <div className="col-md-8">
          <div className="card profile-card">
            <div className="row">
              <div className="col-md-5 border-end">
                <h4 className='fw-bold text-primary'>PROFILE</h4>
                {user.profileImage && (
                  <img
                    src={`http://localhost:8000/uploads/${user.profileImage}`}
                    alt="Profile"
                    className="profile-image"
                  />
                )}
                <p><b>Name:</b> {user.name}</p>
                <p><b>Email:</b> {user.email}</p>
              </div>

              <div className="col-md-7">
                <form onSubmit={handleSubmit(onSubmit)} className="p-3">

                  {/* Current Password */}
                  <div className="form-group mb-3">
                    <label>Current Password</label>
                    <div className="input-group">
                      <input
                        type={showCurrent ? 'text' : 'password'}
                        className={`form-control ${errors.currentPassword ? 'is-invalid' : ''}`}
                        {...register('currentPassword', { required: 'Current password is required' })}
                      />
                      <span className="input-group-text" onClick={() => setShowCurrent(!showCurrent)}>
                        {showCurrent ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    {errors.currentPassword && <p className="text-danger">{errors.currentPassword.message}</p>}
                  </div>

                  {/* New Password */}
                  <div className="form-group mb-3">
                    <label>New Password</label>
                    <div className="input-group">
                      <input
                        type={showNew ? 'text' : 'password'}
                        className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
                        {...register('newPassword', {
                          required: 'New password is required',
                          minLength: { value: 6, message: 'Minimum 6 characters required' },
                        })}
                      />
                      <span className="input-group-text" onClick={() => setShowNew(!showNew)}>
                        {showNew ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    {errors.newPassword && <p className="text-danger">{errors.newPassword.message}</p>}
                  </div>

                  {/* Confirm New Password */}
                  <div className="form-group mb-3">
                    <label>Confirm New Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirm ? 'text' : 'password'}
                        className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
                        {...register('confirmPassword', {
                          required: 'Please confirm your password',
                          validate: (value) =>
                            value === watch('newPassword') || 'Passwords do not match',
                        })}
                      />
                      <span className="input-group-text" onClick={() => setShowConfirm(!showConfirm)}>
                        {showConfirm ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                    {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
                  </div>

                  <button type="submit" className="btn btn-primary">Update Password</button>
                </form>

                <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
