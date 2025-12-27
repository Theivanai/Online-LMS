// import { call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import {
//     fetchDashboardRequest,
//     fetchDashboardSuccess,
//     fetchDashboardFailure,
// } from '../../Redux/admin/adminSlice';

// function* fetchAdminDashboardSaga() {
//     try {
//         const token = localStorage.getItem('token');
//         const response = yield call(axios.get, 'http://localhost:8000/api/dashboard/metrics', {
//             headers: { Authorization: `Bearer ${token}` },
//         });

//         const { stats, recentBooks, recentUsers } = response.data;
//         yield put(fetchDashboardSuccess({ stats, recentBooks, recentUsers }));
//     } catch (error) {
//         yield put(fetchDashboardFailure(error.message || 'Failed to fetch dashboard data'));
//     }
// }

// export default function* adminSaga() {
//     yield takeLatest(fetchDashboardRequest.type, fetchAdminDashboardSaga);
// }



import { call, put, takeLatest, all } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import {
  fetchDashboardRequest,
  fetchDashboardSuccess,
  fetchDashboardFailure,
  registerAdminRequest,
  registerAdminSuccess,
  registerAdminFailure,
  adminLoginRequest,
  adminLoginSuccess,
  adminLoginFailure,
} from '../../Redux/admin/adminSlice';

// DASHBOARD METRICS SAGA
function* fetchAdminDashboardSaga() {
  try {
    const token = localStorage.getItem('token');
    const response = yield call(axios.get, `${process.env.REACT_APP_BACKEND_URL}/api/dashboard/metrics`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const { stats, recentBooks, recentUsers } = response.data;
    yield put(fetchDashboardSuccess({ stats, recentBooks, recentUsers }));
  } catch (error) {
    yield put(fetchDashboardFailure(error.message || 'Failed to fetch dashboard data'));
  }
}

// ADMIN REGISTRATION SAGA
function* registerAdminSaga(action) {
  try {
    const response = yield call(axios.post, `${process.env.REACT_APP_BACKEND_URL}/api/admin/admin-register`, action.payload);
    yield put(registerAdminSuccess());
    localStorage.setItem('token', response.data.token);
    toast.success('Admin added successfully!');
  } catch (error) {
    if (error.response && error.response.status === 400) {
      yield put(registerAdminFailure('Email already exists!'));
      toast.error('Email already exists!');
    } else {
      yield put(registerAdminFailure('Something went wrong!'));
      toast.error('Something went wrong!');
    }
  }
}


// ADMIN LOGIN SAGA
let loginToastShown = false;

function* handleAdminLogin(action) {
  try {
    const { email, password } = action.payload;

    const response = yield call(axios.post, `${process.env.REACT_APP_BACKEND_URL}/api/admin/adminlogin`, { email, password });

    // Save token & data
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('role', 'admin');
    localStorage.setItem('userData', JSON.stringify(response.data.user));
    localStorage.setItem("adminInfo", JSON.stringify(response.data));



    yield put(adminLoginSuccess(response.data));

    if (!loginToastShown) {
      loginToastShown = true;
      action.payload.toast.success('Admin logged in');
    }

    // Navigate after success
    setTimeout(() => {
      action.payload.navigate(
        response.data.mustResetPassword ? '/reset-password' : '/admin/dashboard'
      );
    }, 1500);
  } catch (error) {
    yield put(adminLoginFailure(error.response?.data?.message || 'Admin login failed!'));
  }

  if (!loginToastShown) {
    loginToastShown = true;
  }
}


export default function* adminSaga() {
  yield all([
    takeLatest(fetchDashboardRequest.type, fetchAdminDashboardSaga),
    takeLatest(registerAdminRequest.type, registerAdminSaga),
    takeLatest(adminLoginRequest.type, handleAdminLogin),
  ]);
}