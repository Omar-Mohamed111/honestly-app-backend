database-design mean how database stored ???

# Database Design

## Database

The system will use MongoDB.

The database will contain three main collections:

- users
- messages
- otps

---

## 1. Users Collection

The `users` collection stores user account and profile data.

### Fields

- `name`
- `username` — unique
- `email` — unique
- `password`
- `picture`
- `isVerified`
- `createdAt`
- `updatedAt`

---

## 2. Messages Collection

The `messages` collection stores messages between users.

### Fields

- `sender` — reference to User ID
- `receiver` — reference to User ID
- `content`
- `isAnonymous`
- `replyTo` — reference to Message ID
- `createdAt`

### Relationships

- `sender` references a user.
- `receiver` references a user.
- `replyTo` references another message.

---

## 3. OTPs Collection   

The `otps` collection stores temporary OTP verification data.

### Fields

- `user` — reference to User ID
- `otp`
- `attempts`
- `expiresAt`

### Relationships

- `user` references a user.

### Expiration

OTP records are temporary and will expire automatically using a MongoDB TTL index.
