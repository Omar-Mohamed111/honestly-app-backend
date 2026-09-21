api-contract mean this contract between frontend and backend

# API Contract

## Authentication

<!-- *********************************************************************** -->

### 1. Register

**POST** `/auth/register`

#### Request Body

{
"name": "Omar",
"username": "sioomar",
"email": "omar@example.com",
"password": "12345678"
}

#### Success Response

{
"message": "Registration successful. Please verify your email."
}

---

<!-- *********************************************************************** -->

### 2. Verify OTP

**POST** `/auth/verify-otp`

#### Request Body

{
"email": "omar@example.com",
"otp": "483921",
"purpose": "emailVerification"
}

#### Success Response

{
"message": "Email verified successfully."
}

The same endpoint can be used for password reset by changing the `purpose` to `passwordReset`.

---

<!-- *********************************************************************** -->

### 3. Login

**POST** `/auth/login`

#### Request Body

{
"email": "omar@example.com",
"password": "12345678"
}

#### Success Response

{
"message": "Login successful.",
"token": "JWT_TOKEN"
}

---

<!-- *********************************************************************** -->

### 4. Forgot Password

**POST** `/auth/forgot-password`

#### Request Body

{
"email": "omar@example.com"
}

The system generates and sends a password reset OTP.

---

<!-- *********************************************************************** -->

### 5. Reset Password

**POST** `/auth/reset-password`

#### Request Body

{
"email": "omar@example.com",
"newPassword": "newPassword123"
}

---

<!-- *********************************************************************** -->

## Users

### 6. Get Public Profile

**GET** `/users/:username`

Example:

GET /users/sioomar

#### Success Response

{
"username": "sioomar",
"name": "Omar",
"picture": "PROFILE_PICTURE_URL"
}

Private data such as `email` and `password` must not be returned.

---

<!-- *********************************************************************** -->

## Messages

### 7. Send Message

**POST** `/messages`

#### Request Body

{
"receiver": "USER_ID",
"content": "Good luck!",
"isAnonymous": true
}

The `sender` is taken from the authenticated user's JWT and must not be provided by the client.

#### Success Response

{
"message": "Message sent successfully."
}

### Reply

A reply uses the same endpoint.

#### Request Body

{
"receiver": "USER_ID",
"content": "Thank you!",
"isAnonymous": false,
"replyTo": "MESSAGE_ID"
}

---

<!-- *********************************************************************** -->

### 8. Get Received Messages

**GET** `/messages`

The authenticated user's ID is taken from the JWT.

#### Success Response

[
{
"id": "MESSAGE_ID",
"sender": "Anonymous",
"content": "Good luck!",
"isAnonymous": true,
"replyTo": null,
"createdAt": "2026-09-15T10:00:00Z"
}
]

If a message is anonymous, the sender's identity must not be exposed.
