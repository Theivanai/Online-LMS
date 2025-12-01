import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import {
    // Profile & Dashboard
    fetchUserProfileRequest,
    fetchUserProfileSuccess,
    fetchUserProfileFailure,
    // fetchUserHistorySuccess,
    fetchUserDashboardRequest,
    fetchUserDashboardSuccess,
    fetchUserDashboardFailure,

    // Password Change
    changePasswordRequest,
    changePasswordSuccess,
    changePasswordFailure,

    // User Login
    loginRequest,
    loginSuccess,
    loginFailure,

    //user-register
    registerUserRequest,
    registerUserSuccess,
    registerUserFailure,

} from '../Slices/userSlice';


// =====================
// Performs async task
// Worker: User Login
// =====================
function* loginUserSaga(action) {
    try {
        const response = yield call(axios.post, 'http://localhost:8000/api/admin/user/login', {
            ...action.payload,
            role: 'user',
        });

        const { token, user, mustResetPassword } = response.data;

        // Save to localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'user');
        localStorage.setItem('userData', JSON.stringify(user));

        yield put(loginSuccess({ token, user, mustResetPassword }));
    } catch (error) {
        yield put(loginFailure(error.response?.data?.message || 'Login failed'));
    }
}


// ==============================
// Worker: Fetch Profile + History
// ==============================
function* fetchUserProfileAndHistory() {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const profileResponse = yield call(axios.get, `http://localhost:8000/api/users/profile`, config);
        yield put(fetchUserProfileSuccess(profileResponse.data));


    } catch (error) {
        yield put(fetchUserProfileFailure(error.response?.data?.message || error.message));
    }
}


// =====================
// Worker: Fetch Dashboard
// =====================
function* fetchUserDashboard() {
    try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };

        const [booksRes, purchasedRes, paymentsRes] = yield all([
            call(axios.get, `http://localhost:8000/api/book/available`),
            call(axios.get, `http://localhost:8000/api/mybooks/count`, config),
            call(axios.get, `http://localhost:8000/api/payment/user-summary`, config),
        ]);

        const dashboardData = {
            availableBooks: booksRes.data.availableBooks,
            purchasedBooks: purchasedRes.data.purchasedBooks,
            totalPayments: paymentsRes.data.totalPayments,
            totalAmountPaid: paymentsRes.data.totalAmountPaid,
        };

        yield put(fetchUserDashboardSuccess(dashboardData));
    } catch (error) {
        yield put(fetchUserDashboardFailure(error.response?.data?.message || error.message));
    }
}


// ======================
// Worker: Change Password
// ======================
function* handleChangePassword(action) {
    try {
        const { currentPassword, newPassword } = action.payload;
        const response = yield call(() =>
            axios.put(
                'http://localhost:8000/api/users/change-password',
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`,
                    },
                }
            )
        );
        yield put(changePasswordSuccess(response.data.message));
    } catch (error) {
        yield put(changePasswordFailure(error.response?.data?.message || 'Password update failed'));
    }
}


// watches for action
//worker:user-register
function* registerUserSaga(action) {
    try {
        const formData = new FormData();
        for (let key in action.payload) {
            formData.append(key, action.payload[key]);
        }

        yield call(() =>
            axios.post(`http://localhost:8000/api/user/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            })
        );

        yield put(registerUserSuccess('User registered'));
    } catch (error) {
        yield put(registerUserFailure(error.response?.data?.message || 'User Registration failed'));
    }
}


// Watcher Saga
export default function* userSaga() {
    yield takeLatest(loginRequest.type, loginUserSaga);
    yield takeLatest(fetchUserProfileRequest.type, fetchUserProfileAndHistory);
    yield takeLatest(fetchUserDashboardRequest.type, fetchUserDashboard);
    yield takeLatest(changePasswordRequest.type, handleChangePassword);
    yield takeLatest(registerUserRequest.type, registerUserSaga);

}
