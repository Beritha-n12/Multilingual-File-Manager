
# This is our File Manager Application

# Multilingual File Manager Application

A multi-user file manager application built with Node.js, Express.js, MySQL, Redis, and i18next for multilingual support. This application allows users to securely upload, manage, and delete files within their designated directories. It also supports multiple languages for the user interface and uses Redis for asynchronous task management.

# Features

User Authentication: Secure user registration and login with password hashing.
File Management: Users can create, read, update, and delete files within their directories.
Multilingual Support: Support for multiple languages with the ability to select the preferred language.
Asynchronous Task Handling: Use of Redis to queue tasks like file uploads.
Unit Testing: Comprehensive unit tests for core functionalities including authentication, file management, and queuing.
Technologies Used
Node.js: For building the backend API and server.
Express.js: For routing and handling HTTP requests.
MySQL: For storing user data and file metadata.
Redis: For queuing asynchronous tasks (e.g., file uploads).
i18next: For internationalization (i18n) to support multiple languages.
Multer: For handling file uploads.
bcryptjs: For securely hashing passwords.
Passport.js / JWT: For user authentication.
Jest: For unit testing.

# Installation

Node.js (v14 or later)
MySQL (v5.7 or later)
Redis (v5.0 or later)
npm (v6 or later)

# Steps to Run Locally

Clone the repository:

```git clone https://github.com/your-username/multilingual-file-manager.git```


# Install the dependencies:


```npm install```

# Set up the MySQL database:

Create a MySQL database named file_manager:

```mysql -u root -p -e "CREATE DATABASE file_manager;```

Run the schema creation queries in the models directory.

# Set up Redis:

Install Redis and start the Redis server:

```sudo apt-get install redis-server````sudo systemctl start redis-server```

Create a .env file to store your environment variables:


```touch .env```

Added the following to the .env file:


```DB_HOST=localhost```
```DB_USER=root```
```DB_PASSWORD=yourpassword```
```DB_NAME=file_manager```
```REDIS_HOST=localhost```
```REDIS_PORT=6379```
```JWT_SECRET=your-jwt-secret```


Run the application:

```npm start```

The application will be running on http://localhost:3000.

# API Endpoints

## User Authentication

POST /register: Register a new user.
Request body: { "username": "string", "email": "string", "password": "string" }

```Response: { "message": "User created successfully", "user": { ... } }```

POST /login: Log in an existing user and receive a JWT token.
Request body: { "email": "string", "password": "string" }

```Response: { "token": "JWT_TOKEN" }```

File Management (CRUD)

POST /files: Upload a file.
Request body: Form-data with a file (file field).

```Response: { "message": "File uploaded successfully", "file": { ... } }```

GET /files: Retrieve all files uploaded by the logged-in user.

```Response: { "files": [ { ... }, { ... } ] }```

PUT /files/:fileId: Update a file's metadata (e.g., rename it).
Request body: Form-data with a file (file field).

```Response: { "message": "File updated successfully", "file": { ... } }```

DELETE /files/:fileId: Delete a file.

```Response: { "message": "File deleted successfully" }```

Multilingual Support

The user interface supports multiple languages. The default language is English, but you can add more languages by updating the i18next configuration.

# Asynchronous Task Handling with Redis

The application uses Redis and Bull to queue file upload tasks asynchronously. This allows the system to handle file uploads in the background and provide better performance.

Tasks like file uploads are added to the queue and processed by a worker.

#Unit Testing

The application uses Jest for unit testing. To run the tests, use the following command:

npm test

# Project Structure

-/multilingual-file-manager
-  /controllers
-    authController.js      # Handles authentication logic (register, login)
-    fileController.js      # Handles file management logic (CRUD operations)
-  /models
-    User.js                # User model for authentication
-    File.js                # File model for managing file metadata
-  /routes
-   authRoutes.js          # Routes for authentication
-   fileRoutes.js          # Routes for file operations
-  /middleware
-    authMiddleware.js      # Middleware for protecting routes
-  /utils
-   redisQueue.js          # Logic for Redis task queuing
-    i18n.js                # i18n configuration for multilingual support
-  /tests
-    auth.test.js           # Unit tests for authentication
-    file.test.js           # Unit tests for file management
-  app.js                   # Main application entry point
-  config.js                # Configuration file for MySQL and Redis
-  .env                     # Environment variables (DB, Redis, JWT secret)
-  package.json             # Project dependencies and scripts
-  README.md                # Project documentation
  

# Authors

[Beritha Niyotwagira](https://github.com/Beritha-n12)
[Elisa Niyogisubizo](https://github.com/ElisaNiyogisubizo)

