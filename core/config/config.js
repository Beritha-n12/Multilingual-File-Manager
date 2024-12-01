require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  app: {
    port: process.env.PORT || 3000, // Application port (default: 3000 if not specified in .env)
    env: process.env.NODE_ENV || 'development', // Environment type (default: 'development')
  },
  db: {
    uri: process.env.MONGODB_URI || '', // MongoDB connection URI
    options: {
      useNewUrlParser: true, // Use new MongoDB URL parser
      useUnifiedTopology: true, // Use new unified topology layer
    },
  },
  jwt: {
    secret: process.env.JWT_SECRET, // Secret key for JWT signing
    expiresIn: '7d', // Token expiration time (7 days)
  },
  upload: {
    path: process.env.FILE_UPLOAD_PATH || './uploads', // Directory for file uploads (default: './uploads')
    maxSize: 10 * 1024 * 1024, // Maximum file size allowed (10 MB)
    allowedTypes: [ // Array of allowed MIME types for file uploads
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
    ],
  },
};
