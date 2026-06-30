## BACKEND API REFERENCE

## BASE URL
http://localhost:8000/api


## Authentication APIs

### Register User
POST /auth/admin-register

### Login User
POST /auth/user/login

## User APIs

GET /users/profile
PUT /users/update


## User APIs

GET /users/profile
PUT /users/update

## Book APIs

POST /books        (Admin)
GET /books         (User)
PUT /books/:id     (Admin)
DELETE /books/:id  (Admin)

## Issue & Return APIs

POST /issue
POST /return


## Payment APIs

POST /payment/create-order
POST /payment/verify
