// Redux/bookHistory/bookHistorySaga.js
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchBookHistoryRequest,
  fetchBookHistorySuccess,
  fetchBookHistoryFailure,
} from '../bookhistory/bookhistorySlice';

function* fetchBookHistoryWorker() {
  try {
    const response = yield call(() =>
      axios.get('http://localhost:8000/api/book-history/all', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    );
    yield put(fetchBookHistorySuccess(response.data));
  } catch (error) {
    yield put(fetchBookHistoryFailure(error.message));
  }
}

export function* watchBookHistory() {
  yield takeLatest(fetchBookHistoryRequest.type, fetchBookHistoryWorker);
}
