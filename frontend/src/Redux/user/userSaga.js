import { call, put, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    showLoginReminder
} from './userSlice';

function* fetchUsersSaga() {
    try {
        const response = yield call(axios.get, 'http://localhost:8000/api/user/all', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        yield put(fetchUsersSuccess(response.data));
    } catch (error) {
        yield put(fetchUsersFailure(error.message));
    }
}

function* handleCheckLoginDuration() {
    const loginTimestamp = localStorage.getItem("loginTimestamp");

    if (loginTimestamp) {
        const now = Date.now();
        const threeDaysInMs = 3 * 24 * 60 * 60 * 1000;

        if (now - Number(loginTimestamp) >= threeDaysInMs) {
            yield put(showLoginReminder());
        }
    }
}

export function* userSagaWatcher() {
    yield takeLatest(fetchUsersRequest.type, fetchUsersSaga);
}

export function* watchLoginReminderSaga() {
    yield takeLatest("user/checkLoginDuration", handleCheckLoginDuration);
}
