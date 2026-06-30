import { createSlice } from "@reduxjs/toolkit";

const paymentSlice = createSlice({
    name: 'payment',
    initialState: {
        purchasedBook: null,
        isBookPurchased: false,
        startDate: '',
        endDate: '',
        loading: false,
        error: null,
    },
    reducers: {
        // 🔹 Check Book Status
        checkBookStatusRequest: () => { },
        checkBookStatusSuccess: (state, action) => {
            const { purchased, startDate, endDate } = action.payload;
            state.isBookPurchased = purchased;
            state.startDate = startDate;
            state.endDate = endDate;
            state.error = null;
        },
        checkBookStatusFailure: (state, action) => {
            state.error = action.payload;
        },

        // 🔹 Fake Payment
        fakePaymentRequest: (state, action) => {
            state.loading = true;
            state.error = null;
        },
        fakePaymentSuccess: (state, action) => {
            const { startDate, endDate } = action.payload;
            state.loading = false;
            // state.purchasedBook = book;
            state.isBookPurchased = true;
            state.startDate = startDate;
            state.endDate = endDate;
            state.error = null;
        },
        fakePaymentFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    checkBookStatusRequest,
    checkBookStatusSuccess,
    checkBookStatusFailure,
    fakePaymentRequest,
    fakePaymentSuccess,
    fakePaymentFailure,
} = paymentSlice.actions;

export default paymentSlice.reducer;
