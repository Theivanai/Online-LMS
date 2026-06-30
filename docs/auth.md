## Authentication & Authorization

Explains how login security works in your LMS

## Authentication Flow

1. User registers
2. Password is hashed using bcrypt
3. JWT token is generated on login
4. Token is sent in Authorization header


## JWT Token

Authorization: Bearer <token>


## Roles

- Admin
- User

## Protected Routes

- Add Book → Admin only
- Issue Book → Admin only
- Buy Book → User only

## Force Password Reset

- Admin creates user with temporary password
- User must reset password on first login
