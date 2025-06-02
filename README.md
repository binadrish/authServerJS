# authServerJS

This project is an authentication server built with JavaScript. It authenticates users by checking credentials against a SQLite database and issues JWT tokens to maintain user sessions. New users can also register through the server.

---

## Features

- User registration and authentication
- JWT-based session management
- SQLite database integration

---

## Folder Structure

```
Directory structure:
└── binadrish-authserverjs/
├── .env                    # Environment variables (e.g., JWT secret)
├── app.js                  # Main application entry point
├── package.json
└── src/
    ├── config/
    │   └── dbConnector.js
    ├── controllers/
    │   └── authController.js
    ├── models/
    │   └── authModel.js
    ├── routes/
    │   └── authRoutes.js
    └── utils/
        ├── dateUtils.js
        ├── passwordUtils.js
        ├── uuidUtils.js
        └── tests/
            ├── testDBConnection.js
            └── testPasswordUtils.js
```

---

## API Endpoints

### 1. POST /register

- **Description:** Registers a new user.
- **Request Body:**  
  ```
  {
    "username": "desiredUsername",
    "password": "yourPassword"
  }
  ```
- **Response:**  
  - 201 Created on success
  - Error message if registration fails (e.g., user already exists)

---

### 2. POST /login

- **Description:** Authenticates a user and returns a JWT token.
- **Request Body:**  
  ```
  {
    "username": "yourUsername",
    "password": "yourPassword"
  }
  ```
- **Response:**  
  - 200 OK with `{ "token": "<JWT token>" }` on success
  - Error message if authentication fails

---

## Getting Started

1. **Install dependencies:**  
   ```bash
   npm install
   ```

2. **Configure environment:**  
   Create a `.env` file with your JWT secret and database path.

3. **Run the server:**  
   ```bash
   node app.js
   ```

---

## Notes

- Passwords are securely hashed in the database.
- JWT tokens should be kept safe on the client side.

---