# System Design

### 1. Architecture

The system will use a three-layer architecture:

React [Frontend]
↓
Node.js + Express [Backend]
↓
MongoDB [Database]

# The backend will use:

- Package-by-Feature
- Layered Architecture

1. Route [http,endpoit]
2. Controller [req,res]
3. service [bussnies-Logic]
4. Repository [database]

## Features

### 1. Auth

The Auth feature is responsible for:

- User registration
- User login
- Password reset

### 2. OTP

The OTP feature is responsible for:

- Generating OTP codes
- Sending OTP codes
- Verifying OTP codes
- OTP expiration
- Limiting OTP attempts

### 3. Users

The Users feature is responsible for:

- User profile
- Unique username
- Profile picture
- Public profile

### 4. Messages

The Messages feature is responsible for:

- Sending text messages
- Supporting anonymous and identified messages
- Receiving messages
- Replying to messages
