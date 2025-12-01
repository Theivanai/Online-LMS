// import { all } from 'redux-saga/effects';
// import UserbookSaga from '../src/User/Pages/Redux/book/bookSaga'
// import { watchMyBooksSaga } from '../src/User/Pages/Redux/Saga/myBooksSaga'
// import { historySaga } from '../src/User/Pages/Redux/Saga/historySaga'
// import profileSaga from '../src/User/Pages/Redux/Saga/userSaga'
// import { watchBookHistory } from '../src/Redux/bookhistory/bookhistorySaga'
// import adminSaga from '../src/Redux/admin/adminSaga'
// import { userSagaWatcher } from '../src/Redux/user/userSaga';
// import bookSaga from '../src/Redux/book/Booksaga';
// import handleAddBookSaga from '../src/Redux/book/Booksaga'
// import fetchAdminDashboardSaga from '../src/Redux/admin/adminSaga';
// import fetchUserDashboard from '../src/User/Pages/Redux/Saga/userSaga';
// import { watchPaymentSaga } from '../src/User/Pages/Redux/Saga/paymentSaga';
// import handleAdminLogin from '../src/Redux/admin/adminSaga';
// import loginUserSaga from '../src/User/Pages/Redux/Saga/userSaga';
// import registerUserSaga from '../src/User/Pages/Redux/Saga/userSaga';

// export default function* rootSaga() {
//   yield all([
//     UserbookSaga(),
//     watchMyBooksSaga(),
//     historySaga(),
//     profileSaga(),
//     watchBookHistory(),
//     adminSaga(),
//     userSagaWatcher(),
//     bookSaga(),
//     handleAddBookSaga(),
//     fetchAdminDashboardSaga(),
//     fetchUserDashboard(),
//     watchPaymentSaga(),
//     handleAdminLogin(),
//     loginUserSaga(),
//     registerUserSaga(),
//   ])
// }



import { all } from "redux-saga/effects";

// USER MODULE
import bookSaga from '../src/User/Pages/Redux/book/bookSaga';
import { watchMyBooksSaga } from '../src/User/Pages/Redux/Saga/myBooksSaga';
import { historySaga } from '../src/User/Pages/Redux/Saga/historySaga';
import userSaga from '../src/User/Pages/Redux/Saga/userSaga';
import { watchPaymentSaga } from "../src/User/Pages/Redux/Saga/paymentSaga";

// ADMIN MODULE
import adminSaga from "../src/Redux/admin/adminSaga";

// BOOK MODULE (ADMIN)
import bookManagementSaga from "../src/Redux/book/Booksaga";

// USER LIST (ADMIN)
import { userSagaWatcher } from "../src/Redux/user/userSaga";

// BOOK HISTORY (ADMIN)
import { watchBookHistory } from "../src/Redux/bookhistory/bookhistorySaga";

export default function* rootSaga() {
  yield all([
    // USER PANEL SAGAS
    bookSaga(),               // Fetch all books for User panel
    watchMyBooksSaga(),       // My Books
    historySaga(),            // Book History
    userSaga(),               // Login, Profile, Dashboard, Register
    watchPaymentSaga(),       // Payment workflow

    // ADMIN PANEL SAGAS
    adminSaga(),              // Admin login, dashboard

    // ADMIN BOOK MANAGEMENT
    bookManagementSaga(),     // Add, list, delete books

    // ADMIN USER LIST
    userSagaWatcher(),        // Admin CRUD on users

    // ADMIN BOOK HISTORY TRACKING
    watchBookHistory(),
  ]);
}
