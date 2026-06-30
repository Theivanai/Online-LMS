import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
    name: 'history',
    initialState: {
        data: [],
        loading: false,
        error: '',
    },
    reducers: {
        fetchHistoryRequest: (state) => {
            state.loading = true;
            state.error = '';
        },
        fetchHistorySuccess: (state, action) => {
            state.loading = false;
            state.data = action.payload;
        },
        fetchHistoryFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    fetchHistoryRequest,
    fetchHistorySuccess,
    fetchHistoryFailure,
} = historySlice.actions;

export default historySlice.reducer;
