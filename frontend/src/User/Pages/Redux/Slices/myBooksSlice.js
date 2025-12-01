import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  books: [],
  loading: false,
  error: null,
};

const myBooksSlice = createSlice({
  name: 'myBooks',
  initialState,
  reducers: {
    fetchMyBooksRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchMyBooksSuccess: (state, action) => {
      state.loading = false;
      state.books = action.payload;
    },
    fetchMyBooksFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  fetchMyBooksRequest,
  fetchMyBooksSuccess,
  fetchMyBooksFailure,
} = myBooksSlice.actions;

export default myBooksSlice.reducer;
