
import { createSlice } from '@reduxjs/toolkit';

const bookhistorySlice = createSlice({
    name: 'bookHistory',
    initialState: {
        loading: false,
        data: [],
        error: null,
    },
    reducers: {
        fetchBookHistoryRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchBookHistorySuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchBookHistoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchBookHistoryRequest,
    fetchBookHistorySuccess,
    fetchBookHistoryFailure,
} = bookhistorySlice.actions;

export default bookhistorySlice.reducer;
