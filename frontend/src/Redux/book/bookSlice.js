// import { createSlice } from '@reduxjs/toolkit';

// const bookSlice = createSlice({
//     name: 'books',
//     initialState: {
//         loading: false,
//         success: false,
//         error: null,
//     },
//     reducers: {
//         addBookRequest: (state) => {
//             state.loading = true;
//             state.success = false;
//             state.error = null;
//         },
//         addBookSuccess: (state) => {
//             state.loading = false;
//             state.success = true;
//         },
//         addBookFailure: (state, action) => {
//             state.loading = false;
//             state.error = action.payload;
//         },
//         clearBookStatus: (state) => {
//             state.loading = false;
//             state.success = false;
//             state.error = null;
//         }
//     },
// });

// export const { addBookRequest, addBookSuccess, addBookFailure, clearBookStatus } = bookSlice.actions;
// export default bookSlice.reducer;


// Redux/book/bookSlice.js

import { createSlice } from '@reduxjs/toolkit';

const bookSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    addBookRequest: (state) => {
      state.loading = true;
      state.success = false;
      state.error = null;
    },
    addBookSuccess: (state) => {
      state.loading = false;
      state.success = true;
    },
    addBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateBookRequest: (state) => {
  state.loading = true;
},
updateBookSuccess: (state, action) => {
  state.loading = false;
  state.books = state.books.map((book) =>
    book._id === action.payload._id ? action.payload : book
  );
},
updateBookFailure: (state, action) => {
  state.loading = false;
  state.error = action.payload;
},

    // ✅ Fetch Books
    fetchBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // ✅ Delete Book
    deleteBookRequest: (state, action) => {
      state.loading = true;
      state.error = null;
    },
    deleteBookSuccess: (state, action) => {
      state.loading = false;
      state.books = state.books.filter(book => book._id !== action.payload);
    },
    deleteBookFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearBookStatus: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
});

export const {
  addBookRequest, addBookSuccess, addBookFailure,
  updateBookFailure,updateBookRequest,updateBookSuccess,
  fetchBooksRequest, fetchBooksSuccess, fetchBooksFailure,
  deleteBookRequest, deleteBookSuccess, deleteBookFailure,
  clearBookStatus
} = bookSlice.actions;

export default bookSlice.reducer;
