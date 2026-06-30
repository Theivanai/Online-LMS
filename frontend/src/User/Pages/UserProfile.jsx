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


// const Profile = () => {
//   const dispatch = useDispatch();
//   const userState = useSelector((state) => state.UserProfile);
//   const { profile: user, message, error } = userState;

//   const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();

//   const [showCurrent, setShowCurrent] = useState(false);
//   const [showNew, setShowNew] = useState(false);
//   const [showConfirm, setShowConfirm] = useState(false);

//   useEffect(() => {
//     dispatch(fetchUserProfileRequest());
//   }, [dispatch]);

//   useEffect(() => {
//     if (message) toast.success(message);
//     if (error) toast.error(error);
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

//     reset();
//   };

//   if (!user || Object.keys(user).length === 0) return <p>Loading profile...</p>;

//   return (
//     <div className="container mt-5">
//       <div className="row justify-content-left">
//         <div className="col-md-8">
//           <div className="card profile-card">
//             <div className="row">
//               <div className="col-md-5 border-end">
//                 <h4 className='fw-bold text-primary'>PROFILE</h4>
//                 {user.profileImage && (
//                   <img
//                     src={`${process.env.REACT_APP_BASE_URL}/uploads/${user.profileImage}`}
//                     alt="Profile"
//                     className="profile-image"
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
//                       />
//                       <span className="input-group-text" onClick={() => setShowCurrent(!showCurrent)}>
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
//                       />
//                       <span className="input-group-text" onClick={() => setShowNew(!showNew)}>
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
//                       />
//                       <span className="input-group-text" onClick={() => setShowConfirm(!showConfirm)}>
//                         {showConfirm ? <FaEye /> : <FaEyeSlash />}
//                       </span>
//                     </div>
//                     {errors.confirmPassword && <p className="text-danger">{errors.confirmPassword.message}</p>}
//                   </div>

//                   <button type="submit" className="btn btn-primary">Update Password</button>
//                 </form>

//                 <ToastContainer position="top-center" autoClose={1200} closeButton={false} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Profile;





import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    changePasswordRequest, 
    logoutRequest,
} from '../Pages/Redux/Slices/userSlice';
import styles from './UserProfile.module.css';

/* ─────────────────────────────────────────────
   Eye Icon Toggle
───────────────────────────────────────────── */
const EyeIcon = ({ visible }) =>
    visible ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    );

/* ─────────────────────────────────────────────
   Password Field
───────────────────────────────────────────── */
const PasswordField = ({ label, value, onChange, placeholder, error }) => {
    const [show, setShow] = useState(false);
    return (
        <div className={styles.pwField}>
            <label className={styles.pwLabel}>{label}</label>
            <div className={styles.pwInputWrap}>
                <input
                    type={show ? 'text' : 'password'}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`${styles.pwInput} ${error ? styles.pwInputError : ''}`}
                    autoComplete="new-password"
                />
                <button
                    type="button"
                    className={styles.eyeBtn}
                    onClick={() => setShow(p => !p)}
                    aria-label="Toggle visibility"
                >
                    <EyeIcon visible={show} />
                </button>
            </div>
            {error && <span className={styles.errorMsg}>{error}</span>}
        </div>
    );
};

/* ─────────────────────────────────────────────
   Main UserProfile
───────────────────────────────────────────── */
const UserProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { profile, loading } = useSelector(state => state.UserProfile);

    /* ── Phone number state ── */
    const [phoneMode, setPhoneMode] = useState('view'); // 'view' | 'add'
    const [phoneInput, setPhoneInput] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [phoneSaved, setPhoneSaved] = useState('');

    /* ── Password state ── */
    const [pwForm, setPwForm] = useState({
        current: '', newPw: '', confirm: '',
    });
    const [pwErrors, setPwErrors] = useState({});
    const [pwSuccess, setPwSuccess] = useState('');
    const [pwLoading, setPwLoading] = useState(false);

    if (loading || !profile) {
        return <div className={styles.loading}>Loading your profile…</div>;
    }

    const initials = profile.name
        ? profile.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
        : 'U';

    const memberSince = profile.createdAt
        ? new Date(profile.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })
        : 'April 2026';

    const currentPhone = phoneSaved || profile.phone || '';

    /* ── Handlers: Phone ── */
    const handleAddPhone = () => {
        setPhoneMode('add');
        setPhoneError('');
        setPhoneInput('');
    };

    const handleSavePhone = () => {
        if (!phoneInput.trim()) {
            setPhoneError('Please enter a phone number.');
            return;
        }
        const cleaned = phoneInput.trim().replace(/\s+/g, '');
        if (!/^\+?\d{10,13}$/.test(cleaned)) {
            setPhoneError('Enter a valid phone number (10–13 digits).');
            return;
        }
        // Phone saved locally — add your own API call here if needed
        setPhoneSaved(cleaned);
        setPhoneMode('view');
        setPhoneError('');
    };

    const handleCancelPhone = () => {
        setPhoneMode('view');
        setPhoneInput('');
        setPhoneError('');
    };

    /* ── Handlers: Password ── */
    const validatePw = () => {
        const errs = {};
        if (!pwForm.current) errs.current = 'Current password is required.';
        if (!pwForm.newPw) errs.newPw = 'New password is required.';
        else if (pwForm.newPw.length < 8) errs.newPw = 'Must be at least 8 characters.';
        if (!pwForm.confirm) errs.confirm = 'Please confirm your new password.';
        else if (pwForm.newPw !== pwForm.confirm) errs.confirm = 'Passwords do not match.';
        return errs;
    };

    const handleUpdatePassword = async () => {
        const errs = validatePw();
        if (Object.keys(errs).length) { setPwErrors(errs); return; }
        setPwLoading(true);
        setPwErrors({});
        setPwSuccess('');
        try {
            await dispatch(changePasswordRequest({
                currentPassword: pwForm.current,
                newPassword: pwForm.newPw,
            }));
            setPwSuccess('Password updated successfully!');
            setPwForm({ current: '', newPw: '', confirm: '' });
        } catch {
            setPwErrors({ current: 'Current password is incorrect.' });
        } finally {
            setPwLoading(false);
        }
    };

    const handleLogout = () => {
        dispatch(logoutRequest());
        navigate('/login');
    };

    return (
        <div className={styles.page}>

            {/* ── Back button ── */}
            <button className={styles.back} onClick={() => navigate('/user/dashboard')}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back to dashboard
            </button>

            {/* ── Hero ── */}
            <div className={styles.hero}>
                <div className={styles.avatarCircle}>{initials}</div>
                <div className={styles.heroInfo}>
                    <div className={styles.heroName}>{profile.name}</div>
                    <div className={styles.heroEmail}>{profile.email}</div>
                    <div className={styles.heroActions}>
                        <span className={styles.activeBadge}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                                <polyline points="22 4 12 14.01 9 11.01" />
                            </svg>
                            Active member
                        </span>
                        {/* <button className={styles.logoutBadge} onClick={handleLogout}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
                                <polyline points="16 17 21 12 16 7" />
                                <line x1="21" y1="12" x2="9" y2="12" />
                            </svg>
                            Logout
                        </button> */}
                    </div>
                </div>
                {/* <button className={styles.editBtn} onClick={() => navigate('/user/edit-profile')}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" />
                        <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Edit profile
                </button> */}
            </div>

            {/* ── Bottom grid ── */}
            <div className={styles.grid2}>

                {/* Personal info */}
                <div className={styles.panel}>
                    <div className={styles.panelTitle}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                            <circle cx="12" cy="7" r="4" />
                        </svg>
                        Personal info
                    </div>

                    {/* Full name */}
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Full name</span>
                        <span className={styles.infoVal}>{profile.name}</span>
                    </div>

                    {/* Email */}
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Email address</span>
                        <span className={styles.infoVal}>{profile.email}</span>
                    </div>

                    {/* Phone number */}
                    <div className={`${styles.infoRow} ${styles.infoRowCol}`}>
                        <div className={styles.infoRowTop}>
                            <span className={styles.infoLabel}>Phone number</span>
                            {phoneMode === 'view' && (
                                currentPhone ? (
                                    <span className={styles.infoVal}>{currentPhone}</span>
                                ) : (
                                    <span className={styles.infoMuted}>Not added</span>
                                )
                            )}
                            {phoneMode === 'view' && !currentPhone && (
                                <button className={styles.addPhoneBtn} onClick={handleAddPhone}>
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="12" y1="5" x2="12" y2="19" />
                                        <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    Add number
                                </button>
                            )}
                            {phoneMode === 'view' && currentPhone && (
                                <button className={styles.changePhoneBtn} onClick={handleAddPhone}>Edit</button>
                            )}
                        </div>

                        {/* Inline add form */}
                        {phoneMode === 'add' && (
                            <div className={styles.phoneForm}>
                                <div className={styles.phoneInputRow}>
                                    <input
                                        type="tel"
                                        className={`${styles.phoneInput} ${phoneError ? styles.phoneInputError : ''}`}
                                        placeholder="+91 98765 43210"
                                        value={phoneInput}
                                        onChange={e => { setPhoneInput(e.target.value); setPhoneError(''); }}
                                        maxLength={15}
                                        autoFocus
                                    />
                                    <button className={styles.savePhoneBtn} onClick={handleSavePhone}>Save</button>
                                    <button className={styles.cancelPhoneBtn} onClick={handleCancelPhone}>Cancel</button>
                                </div>
                                {phoneError && <span className={styles.errorMsg}>{phoneError}</span>}
                            </div>
                        )}
                    </div>

                    {/* Member since */}
                    <div className={styles.infoRow}>
                        <span className={styles.infoLabel}>Member since</span>
                        <span className={styles.infoVal}>{memberSince}</span>
                    </div>
                </div>


                {/* Update password */}
                <div className={styles.panel}>
                    <div className={styles.panelTitle}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                        </svg>
                        Update password
                    </div>

                    <PasswordField
                        label="Current password"
                        value={pwForm.current}
                        onChange={e => { setPwForm(p => ({ ...p, current: e.target.value })); setPwErrors(p => ({ ...p, current: '' })); }}
                        placeholder="Enter current password"
                        error={pwErrors.current}
                    />
                    <PasswordField
                        label="New password"
                        value={pwForm.newPw}
                        onChange={e => { setPwForm(p => ({ ...p, newPw: e.target.value })); setPwErrors(p => ({ ...p, newPw: '' })); }}
                        placeholder="Enter new password"
                        error={pwErrors.newPw}
                    />
                    <PasswordField
                        label="Confirm new password"
                        value={pwForm.confirm}
                        onChange={e => { setPwForm(p => ({ ...p, confirm: e.target.value })); setPwErrors(p => ({ ...p, confirm: '' })); }}
                        placeholder="Re-enter new password"
                        error={pwErrors.confirm}
                    />

                    {pwSuccess && <p className={styles.successMsg}>{pwSuccess}</p>}

                    <button
                        className={styles.updatePwBtn}
                        onClick={handleUpdatePassword}
                        disabled={pwLoading}
                    >
                        {pwLoading ? 'Updating…' : 'Update'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UserProfile;