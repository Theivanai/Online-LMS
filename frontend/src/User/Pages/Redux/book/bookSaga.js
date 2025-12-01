
import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
} from './bookSlice';

function* handleFetchBooks() {
  try {
    const response = yield call(axios.get, `${process.env.REACT_BASE_URL}/api/book/all`);
    yield put(fetchBooksSuccess(response.data));
  } catch (error) {
    yield put(fetchBooksFailure(error.response?.data?.message || error.message));
  }
}

export default function* bookSaga() {
  yield takeLatest(fetchBooksRequest.type, handleFetchBooks);
}
