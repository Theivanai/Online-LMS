import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  history: [],
  dashboard: null,
  user: null,
  loading: false,
  error: null,
  // user: null,
  token: null,
  mustResetPassword: false,
  message: '', // ✅ New field to store password update success message
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {

    // --- Profile ---
    fetchUserProfileRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserProfileSuccess: (state, action) => {
      state.profile = action.payload;
      state.loading = false;
    },
    fetchUserProfileFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },



    // --- Dashboard ---
    fetchUserDashboardRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchUserDashboardSuccess: (state, action) => {
      state.dashboard = action.payload;
      state.loading = false;
    },
    fetchUserDashboardFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    // ✅ --- Password Change ---
    changePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = '';
    },
    changePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload; // success message from API
    },
    changePasswordFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // user-login
    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.mustResetPassword = action.payload.mustResetPassword;
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    //user-register
    registerUserRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = '';
    },
    registerUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    registerUserFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

  },
});

export const {
  fetchUserProfileRequest,
  fetchUserProfileSuccess,
  fetchUserProfileFailure,
  fetchUserHistorySuccess,
  fetchUserDashboardRequest,
  fetchUserDashboardSuccess,
  fetchUserDashboardFailure,

  // ✅ Export newly added actions
  changePasswordRequest,
  changePasswordSuccess,
  changePasswordFailure,

  //user-login actions
  loginRequest,
  loginSuccess,
  loginFailure,

  //user-register actions
  registerUserRequest,
  registerUserSuccess,
  registerUserFailure,

} = userSlice.actions;

export default userSlice.reducer;
