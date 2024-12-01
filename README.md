#  File Manager Application

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
Mangodb: For storing user data and file metadata.
Redis: For queuing asynchronous tasks (e.g., file uploads).
i18next: For internationalization (i18n) to support multiple languages.
Multer: For handling file uploads.
bcryptjs: For securely hashing passwords.
Passport.js / JWT: For user authentication.
Jest: For unit testing.

# Installation

Node.js (v14 or later)
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

PORT=5000
AWS_ACCESS_KEY_ID=BERITHA123
AWS_SECRET_ACCESS_KEY=ELISA123
AWS_REGION=us-east-1
AWS_BUCKET_NAME=beritha-elisa-bucket
MONGODB_URI=mongodb://localhost:27017/file_manager
SESSION_SECRET=supersecretkey123456789
REDIS_HOST=localhost
REDIS_PORT=6379



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

# File Management (CRUD)

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

# Multilingual Support

The user interface supports multiple languages. The default language is English, but you can add more languages by updating the i18next configuration.

# Asynchronous Task Handling with Redis

The application uses Redis and Bull to queue file upload tasks asynchronously. This allows the system to handle file uploads in the background and provide better performance.

Tasks like file uploads are added to the queue and processed by a worker.

# Unit Testing

The application uses Jest for unit testing. To run the tests, use the following command:

npm test

# Project Structure 

- Multilingual File Manager Application/
- ├── core/                          # Main application logic
- ├── config/                        # Configuration files
- │   ├── config.js                  # Application-wide settings
- │   ├── db.js                      # Database connection setup
- │   ├── i18next.js                 # i18n configuration for internationalization
- │   ├── queue.js                   # Redis queue setup for asynchronous tasks
- ├── locales/                       # Localization folder for translations
- │   ├── en/                        # English translations
- │   │   └── translation.json       # Key-value pairs for English
- │   ├── fr/                        # French translations
- │       └── translation.json       # Key-value pairs for French
- ├── middleware/                    # Custom middleware for authentication and validation
- │   ├── auth.middleware.js         # Middleware for authentication
- │   ├── validation.middleware.js   # Middleware for request validation
- ├── models/                        # Database models
- │   ├── directory.model.js         # Directory schema
- │   ├── file.model.js              # File schema
- │   ├── user.model.js              # User schema
- ├── routes/                        # Application routes
- │   ├── auth.route.js              # Routes for authentication (login, registration)
- │   ├── directory.route.js         # Routes for directory operations (CRUD)
- │   ├── file.route.js              # Routes for file operations (CRUD, uploads)
- ├── scripts/                       # Utility scripts
- │   └── init.js                    # Initialization script (e.g., database seeding)
- ├── utils/                         # Utility functions
- │   ├── cloudinary.js              # Cloudinary file upload helper
- │   ├── setLanguage.js             # Utility to set user language preferences
- │   ├── token.js                   # JWT token creation and verification
- │   ├── validate.js                # General validation functions
- ├── tests/                         # Unit tests for application features
- │   ├── auth.test.js               # Tests for authentication routes and logic
- │   ├── directory.test.js          # Tests for directory operations
- │   ├── file.test.js               # Tests for file operations
- ├── uploads/                       # Temporary storage for uploaded files
- │   ├── MCN profile.jpg            # Example file
- │   ├── logobuss.png               # Example file
- ├── .env.example                   # Template for environment variables
- ├── .gitignore                     # Files to ignore in version control
- ├── README.md                      # Project documentation
- ├── app.js                         # Main application entry point
- ├── package.json                   # Project dependencies and metadata
- ├── package-lock.json              # Dependency lockfile


# Authors

- [Beritha Niyotwagira](https://github.com/Beritha-n12)
- [Elisa Niyogisubizo](https://github.com/ElisaNiyogisubizo)

