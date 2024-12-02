Multilingual File Manager Application
A multi-user file manager application built with Node.js, Express.js, MySQL, Redis, and i18next for multilingual support. This application allows users to securely upload, manage, and delete files within their designated directories, with Redis handling asynchronous tasks. The user interface supports multiple languages, providing an inclusive experience for a diverse audience.

Features
User Authentication:
Secure user registration and login using password hashing with bcryptjs, Passport.js, and JWT tokens.

File Management:
Users can perform CRUD (Create, Read, Update, Delete) operations on their files and directories.

Multilingual Support:
The application supports multiple languages with i18next, allowing users to select their preferred language.

Asynchronous Task Handling:
Redis is used to queue background tasks like file uploads, ensuring non-blocking operations.

Unit Testing:
Comprehensive unit tests for core functionalities, including authentication, file management, and queuing, using Jest.

Technologies Used
Technology	Purpose
Node.js	Backend API and server
Express.js	Routing and handling HTTP requests
MongoDB	Storing user data and file metadata
Redis	Queuing asynchronous tasks
i18next	Internationalization (i18n)
Multer	File upload handling
bcryptjs	Password hashing
Passport.js / JWT	User authentication
Jest	Unit testing
Installation Requirements
Node.js (v14 or later)
Redis (v5.0 or later)
npm (v6 or later)
Installation
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/multilingual-file-manager.git
cd multilingual-file-manager
Install the dependencies:

bash
Copy code
npm install
Set up the MySQL database:

Create a MySQL database named file_manager:
bash
Copy code
mysql -u root -p -e "CREATE DATABASE file_manager;"
Run the schema creation queries located in the models/ directory.
Set up Redis:

Install and start the Redis server:
bash
Copy code
sudo apt-get install redis-server
sudo systemctl start redis-server
Set up environment variables: Create a .env file and add the following variables:

env
Copy code
PORT=5000
AWS_ACCESS_KEY_ID=YOUR_AWS_ACCESS_KEY
AWS_SECRET_ACCESS_KEY=YOUR_AWS_SECRET_KEY
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-s3-bucket
MONGODB_URI=mongodb://localhost:27017/file_manager
SESSION_SECRET=supersecretkey123456789
REDIS_HOST=localhost
REDIS_PORT=6379
Run the application:

bash
Copy code
npm start
The application will be running on http://localhost:5000.

API Endpoints
User Authentication
POST /register: Register a new user.
Request Body:

json
Copy code
{
  "username": "string",
  "email": "string",
  "password": "string"
}
Response:

json
Copy code
{
  "message": "User created successfully",
  "user": { ... }
}
POST /login: Log in an existing user and receive a JWT token.
Request Body:

json
Copy code
{
  "email": "string",
  "password": "string"
}
Response:

json
Copy code
{
  "token": "JWT_TOKEN"
}
File Management
POST /files: Upload a file.
Response:

json
Copy code
{
  "message": "File uploaded successfully",
  "file": { ... }
}
GET /files: Retrieve all files uploaded by the logged-in user.

PUT /files/:fileId: Update a file's metadata.

DELETE /files/:fileId: Delete a file.

Multilingual Support
The application supports multiple languages through i18next.
The default language is English. To add a new language, update the locales/ directory with the respective translation files.

Asynchronous Task Handling with Redis
The application uses Redis and Bull to queue file upload tasks asynchronously. These tasks are processed by background workers, improving application performance.

Unit Testing
To run the unit tests, use the following command:

bash
Copy code
npm test
Project Structure
bash
Copy code
Multilingual File Manager Application/
├── core/                  # Main application logic
├── config/                # Configuration files
├── locales/               # Localization for translations
├── middleware/            # Custom middleware for authentication and validation
├── models/                # Database models
├── routes/                # Application routes
├── scripts/               # Utility scripts
├── tests/                 # Unit tests
├── uploads/               # Temporary file storage
├── .env.example           # Environment variables template
├── app.js                 # Main application entry point
└── README.md              # Project documentation

Authors
Niyotwagira Beritha 
Niyogisubizo Elisa 
