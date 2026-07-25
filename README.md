# CheatBoard

A fast and simple text-sharing platform that lets you share information using short secret codes.

## Overview

In a fast-paced world, sharing information quickly can be inconvenient when every platform demands accounts, logins, and unnecessary setup.

**CheatBoard** works like a temporary digital clipboard:

1. Upload text.
2. Receive a unique share code.
3. Share the code with someone.
4. Retrieve the text instantly.

No account is required for quick sharing.

---

## Features

* ⚡ Fast text sharing
* 🔑 Secret code-based retrieval
* 📝 Simple upload and retrieve workflow
* ⏳ Temporary text storage with expiration
* 📋 One-click copy support
* 🔒 Account-free access for temporary sharing

---

## How It Works

### Upload

```
User Text
    |
    v
CheatBoard Server
    |
    v
Generated Share Code
```

Example:

```
Text:
"Meeting details at 5 PM"

Generated Code:

AB1234
```

The receiver can use this code to retrieve the message.

---

### Retrieve

```
Share Code
    |
    v
CheatBoard
    |
    v
Original Text
```

The system verifies the code and returns the stored message if it has not expired.

---

## Technology Stack

### Backend

* Java
* Spring Boot
* Firebase Admin SDK
* Firebase Realtime Database

### Frontend

* HTML
* CSS
* JavaScript
* Vite

---

## API Endpoints

### Publish Text

```
POST /publish
```

Request:

```
Content-Type: text/plain
```

Body:

```
Your message here
```

Response:

```
AB1234
```

---

### Retrieve Text

```
GET /retrieve/{code}
```

Example:

```
GET /retrieve/AB1234
```

Success Response:

```json
{
  "code": "AB1234",
  "text": "Your message",
  "expiryTime": 1785169200000
}
```

Error Responses:

```json
{
  "success": false,
  "message": "Code not found"
}
```

or

```json
{
  "success": false,
  "message": "Code has expired"
}
```

---

## Security Model

CheatBoard does not require authentication for temporary sharing.

Security is based on:

* Randomly generated share codes
* Limited lifetime of messages
* No public listing of stored content

For future versions, user accounts can provide permanent storage and additional controls.

---

## Project Vision

CheatBoard aims to make information exchange as simple as copying something to a clipboard and handing it over, without forcing users through unnecessary barriers.

A clipboard for the internet, powered by short-lived secret codes.

---

## Developer

Built by **Aayush Vishwakarma**.

Student developer interested in software engineering, programming, and building practical applications.

Technologies explored:

* Java
* Spring Boot
* Firebase
* Android Development
* Web Development

---

## License

This project is currently under development.
