// import { createSlice } from '@reduxjs/toolkit';

// const initialState = {
//   books: [],
//   loading: false,
//   error: null,
// };

// const bookSlice = createSlice({
//   name: 'book',
//   initialState,
//   reducers: {
//     fetchBooksRequest: (state) => {
//       state.loading = true;
//     },
//     fetchBooksSuccess: (state, action) => {
//       state.loading = false;
//       state.books = action.payload;
//       // console.log(action)
//       // alert("String")
//     },
//     fetchBooksFailure: (state, action) => {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//   fetchBooksRequest,
//   fetchBooksSuccess,
//   fetchBooksFailure,
// } = bookSlice.actions;

// export default bookSlice.reducer;

// src/Redux/book/bookSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  loading: false,
  error: null
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
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
  },
});

export const {
  fetchBooksRequest,
  fetchBooksSuccess,
  fetchBooksFailure,
} = bookSlice.actions;

export default bookSlice.reducer;
