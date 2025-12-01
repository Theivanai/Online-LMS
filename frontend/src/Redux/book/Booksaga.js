// // import { call, put, takeLatest } from 'redux-saga/effects';
// // import axios from 'axios';
// // import { fetchBooksSuccess, fetchBooksFailure } from '../slices/bookSlice';

// // function* fetchBooksSaga() {
// //     try {
// //         const response = yield call(axios.get, 'http://localhost:8000/api/book/all');
// //         yield put(fetchBooksSuccess(response.data));
// //     } catch (error) {
// //         yield put(fetchBooksFailure(error.message));
// //     }
// // }

// // export default function* bookSaga() {
// //     yield takeLatest('books/fetchBooksRequest', fetchBooksSaga);
// // }

// // import { call, put, takeLatest } from 'redux-saga/effects';
// // import axios from 'axios';
// // import { addBookSuccess, addBookFailure } from './admin/adminSlice';

// // function* addBookSaga(action) {
// //     try {
// //         const token = localStorage.getItem('token');
// //         const response = yield call(axios.post, `http://localhost:8000/api/book/all`, action.payload, {
// //             headers: {
// //                 'Content-Type': 'multipart/form-data',
// //                 Authorization: `Bearer ${token}`,
// //             },
// //         });
// //         yield put(addBookSuccess());
// //     } catch (error) {
// //         yield put(addBookFailure(error.response?.data?.message || 'Add book failed'));
// //     }
// // }

// // export default function* bookSaga() {
// //     yield takeLatest('books/addBookRequest', addBookSaga);
// // }

// // src/Redux/book/Booksaga.js
// import { call, put, takeLatest } from 'redux-saga/effects';
// import axios from 'axios';
// import { addBookRequest, addBookSuccess, addBookFailure } from './bookSlice';

// function* handleAddBook(action) {
//     try {
//         const token = localStorage.getItem('token');
//         const data = action.payload;

//         const form = new FormData();
//         form.append('title', data.title);
//         form.append('author', data.author);
//         form.append('isbn', data.isbn);
//         form.append('category', data.category);
//         form.append('price', data.price);
//         form.append('stock', data.stock);
//         form.append('status', 'Available');
//         form.append('image', data.image);
//         form.append('bookFile', data.bookFile);

//         yield call(axios.post, 'http://localhost:8000/api/book/add', form, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//                 Authorization: `Bearer ${token}`,
//             },
//         });

//         yield put(addBookSuccess());
//     } catch (err) {
//         const msg = err.response?.data?.message || 'Book addition failed';
//         yield put(addBookFailure(msg));
//     }
// }

// export default function* bookSaga() {
//     yield takeLatest(addBookRequest.type, handleAddBook);
// }

// Redux/book/Booksaga.js

// Updated Redux Saga Setup for Book Addition (bookSaga.js)


import { takeLatest, put, call, all } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';
import {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
  deleteBookRequest,
  deleteBookSuccess,
  deleteBookFailure,
  addBookRequest,
  addBookSuccess,
  addBookFailure,
  updateBookRequest,
  // updateBookSuccess,
  // updateBookFailure,
} from './bookSlice';

// 🔹 Fetch All Books
function* handleFetchBooksSaga() {
  try {
    const response = yield call(() => axios.get(`${process.env.REACT_BASE_URL}/api/book/all`));
    yield put(fetchBooksSuccess(response.data));
  } catch (error) {
    yield put(fetchBooksFailure(error.message));
  }
}

// 🔹 Add Book
function* handleAddBookSaga(action) {
  try {
    const data = action.payload;
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('author', data.author);
    formData.append('isbn', data.isbn);
    formData.append('category', data.category);
    formData.append('price', data.price);
    formData.append('stock', data.stock);
    if (data.image) formData.append('image', data.image);
    if (data.bookFile) formData.append('bookFile', data.bookFile);

    yield call(() =>
      axios.post(`${process.env.REACT_BASE_URL}/api/book/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
    );

    yield put(addBookSuccess());
  } catch (error) {
    yield put(addBookFailure(error.response?.data?.message || 'Add book failed'));
  }
}

//update book
function* handleUpdateBookSaga(action) {
  try {
    const { id, data, files } = action.payload;

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("author", data.author);
    formData.append("isbn", data.isbn || "");
    formData.append("category", data.category);
    formData.append("price", data.price);

    if (files?.image) formData.append("image", files.image);
    if (files?.bookFile) formData.append("bookFile", files.bookFile);

    yield call(axios.put, `${process.env.REACT_BASE_URL}/api/book/update/${id}`, formData, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    yield put(fetchBooksRequest());
    toast.success("Book updated successfully!");
  } catch (error) {
    console.error("Saga Update Error:", error);
    toast.error("Update failed");
  }
}

//  Delete Book
function* handleDeleteBookSaga(action) {
  try {
    const id = action.payload;
    yield call(() =>
      axios.delete(`${process.env.REACT_BASE_URL}/api/book/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
    );
    yield put(deleteBookSuccess(id));
  } catch (error) {
    yield put(deleteBookFailure(error.message));
  }
}





export default function* bookManagementSaga() {
  yield all([
    takeLatest(fetchBooksRequest.type, handleFetchBooksSaga),
    takeLatest(addBookRequest.type, handleAddBookSaga),
    takeLatest(updateBookRequest.type, handleUpdateBookSaga),
    takeLatest(deleteBookRequest.type, handleDeleteBookSaga),
  ]);
}
