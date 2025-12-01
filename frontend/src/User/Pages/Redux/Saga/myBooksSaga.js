import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    fetchMyBooksRequest,
    fetchMyBooksSuccess,
    fetchMyBooksFailure,
} from '../Slices/myBooksSlice';

function* fetchMyBooksSaga() {

    try {
        const token = localStorage.getItem('token');
        const res = yield call(() => axios.get(`${process.env.REACT_BASE_URL}/api/mybooks/my-books`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        );
        console.log("Fetched Books: ", res.data);

        const today = new Date();
        const todayMidnight = new Date(today.setHours(0, 0, 0, 0));

        const booksWithRemaining = res.data.map((book) => {
            const endDateMidnight = new Date(new Date(book.endDate).setHours(0, 0, 0, 0));
            const remainingTime = Math.ceil((endDateMidnight - todayMidnight) / (1000 * 60 * 60 * 24));
            return { ...book, remainingDays: remainingTime };
        });

        yield put(fetchMyBooksSuccess(booksWithRemaining));
    } catch (error) {
        yield put(fetchMyBooksFailure(error.message));
    }
}

export function* watchMyBooksSaga() {
    yield takeLatest(fetchMyBooksRequest.type, fetchMyBooksSaga);
}
