# Requirements

## What are Requirements?

Requirements describe what the system should be able to do.

## Functional Requirements

- User can register.
- User can verify their email using an OTP after registration.
- User can login only after verifying their account.
- User can send messages to other users.
- User can reply to received messages.

<!-- -------------------------------------------------------------------------- -->

## Non-Functional Requirements

- Privacy
- Security
- Performance
- OTP expiration

## Privacy

- The system must protect the identity of the sender when the message is anonymous.

## Security

- User passwords must be hashed.
- JWTs must be protected.
- The system must limit OTP attempts.

## Performance

- The system should respond to user requests within a reasonable time.

## OTP Expiration

- OTPs must expire after a limited period of time.
