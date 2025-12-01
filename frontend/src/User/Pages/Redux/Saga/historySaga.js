import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchHistoryRequest,
    fetchHistorySuccess,
    fetchHistoryFailure,
} from '../Slices/historySlice';

function* fetchHistoryWorker() {
    try {
        const token = localStorage.getItem('token');

        const response = yield call(() => axios.get(`http://localhost:8000/api/users/book-history`, {
            headers: { Authorization: `Bearer ${token}` },
        })
    );

        yield put(fetchHistorySuccess(response.data));
    } catch (error) {
        yield put(fetchHistoryFailure('Failed to load book history'));
    }
}

export function* historySaga() {
    yield takeLatest(fetchHistoryRequest.type, fetchHistoryWorker);
}
