## Application Workflow

Explains how the system works end-to-end:


## Overall System Flow
User / Admin
     ↓
Frontend (React)
     ↓
Backend (Node.js + Express)
     ↓
Database (MongoDB)
     ↓
Response to Frontend


## Admin flow:
Admin Login
     ↓
JWT Token Generated
     ↓
Admin Dashboard
     ↓
+---------------------------+
|                           |
|  Add / Update / Delete    |
|        Books              |
|                           |
+---------------------------+
     ↓
Manage Users
     ↓
Issue Book to User
     ↓
Set Return Date
     ↓
Update Book Quantity
     ↓
View Reports & Payments
     ↓
Logout

## Overview
1. Admin logs in using credentials
2. Backend verifies admin role using JWT
3. Admin accesses protected dashboard
4. Admin performs book and user management
5. Book issue updates Issue Collection
6. Reports and payments fetched from database




## User Flow

User Registration
     ↓
Login
     ↓
JWT Token Generated
     ↓
User Dashboard
     ↓
View Available Books
     ↓
Select Book
     ↓
Choose Rental Period
     ↓
Razorpay Payment
     ↓
Payment Verification
     ↓
Access PDF Book
     ↓
Read Book
     ↓
Return Book
     ↓
Logout


## Overview
1. User registers and logs in
2. JWT token allows access to protected pages
3. User browses available books
4. Rental duration selected
5. Payment processed via Razorpay
6. PDF access granted after payment
7. Return updates issue status


## High level diagram
Frontend → Backend → Database
