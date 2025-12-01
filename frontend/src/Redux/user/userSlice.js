import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userList: [],
        loading: false,
        error: null,
        username: null,
        loginTimestamp: null,
        showReminder: false,
    },


    reducers: {
        //fetch users
        fetchUsersRequest: (state) => {
            state.loading = true;
        },
        fetchUsersSuccess: (state, action) => {
            state.userList = action.payload;
            state.loading = false;
        },
        fetchUsersFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },


        loginSuccess: (state, action) => {
            state.username = action.payload.username;
            state.loginTimestamp = Date.now();
            state.showReminder = false;
        },
        checkLoginDuration: () => { }, // handled by saga
        showLoginReminder: (state) => {
            state.showReminder = true;
        },
        logout: () => {
            localStorage.clear();
            window.location.href = "/login";
        },
    },
});

export const {
    fetchUsersRequest,
    fetchUsersSuccess,
    fetchUsersFailure,
    loginSuccess,
    checkLoginDuration,
    showLoginReminder,
    logout
} = userSlice.actions;

export default userSlice.reducer;
