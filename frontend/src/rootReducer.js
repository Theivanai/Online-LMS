// import { combineReducers } from '@reduxjs/toolkit';
// import UserbookReducer from '../src/User/Pages/Redux/Slices/myBooksSlice';
// import UserHistoryPayment from '../src/User/Pages/Redux/Slices/historySlice';
// import UserDataProfileDB from '../src/User/Pages/Redux/Slices/userSlice';
// import AdminBookHistory from '../src/Redux/bookhistory/bookhistorySlice'
// import Newadmin from '../src/Redux/admin/adminSlice'
// import Userlists from '../src/Redux/user/userSlice'
// import Booklists from '../src/Redux/book/bookSlice';
// import AddBooks from '../src/Redux/book/bookSlice';
// import AdminDashboard from '../src/Redux/admin/adminSlice'
// import UserDashboard from '../src/User/Pages/Redux/Slices/userSlice'
// import UserPayment from '../src/User/Pages/Redux/Slices/paymentSlice'
// import userbooks from '../src/User/Pages/Redux/book/bookSlice'
// import userlogin from '../src/User/Pages/Redux/Slices/userSlice'
// import userregister from '../src/User/Pages/Redux/Slices/userSlice'


// const rootReducer = combineReducers({
//     Userbooks: UserbookReducer,
//     UserHistory: UserHistoryPayment,
//     UserData: UserDataProfileDB,
//     AdminHistory: AdminBookHistory,
//     Newadmin: Newadmin,
//     Userlists: Userlists,
//     Booklists: Booklists,
//     AddBooks: AddBooks,
//     AdminDashboard: AdminDashboard,
//     UserDashboard: UserDashboard,
//     UserPayment: UserPayment,
//     userbooks: userbooks,
//     userlogin: userlogin,
//     userregister: userregister
// });

// export default rootReducer;





import { combineReducers } from '@reduxjs/toolkit';

// USER PANEL REDUCERS
import userBooksReducer from '../src/User/Pages/Redux/Slices/myBooksSlice';
import userHistoryReducer from '../src/User/Pages/Redux/Slices/historySlice';
import userProfileReducer from '../src/User/Pages/Redux/Slices/userSlice';
import userPaymentReducer from '../src/User/Pages/Redux/Slices/paymentSlice';
import userBookListReducer from '../src/User/Pages/Redux/book/bookSlice';

// ADMIN PANEL REDUCERS
import adminBookHistoryReducer from '../src/Redux/bookhistory/bookhistorySlice';
import adminReducer from '../src/Redux/admin/adminSlice';
import userListReducer from '../src/Redux/user/userSlice';
import bookReducer from '../src/Redux/book/bookSlice';

// FINAL ROOT REDUCER
const rootReducer = combineReducers({
    // USER MODULE
    UserBooks: userBooksReducer,
    UserHistory: userHistoryReducer,
    UserProfile: userProfileReducer,
    UserPayment: userPaymentReducer,
    UserBookList: userBookListReducer,

    // ADMIN MODULE
    AdminHistory: adminBookHistoryReducer,
    Admin: adminReducer,
    UserList: userListReducer,
    Books: bookReducer
});

export default rootReducer;