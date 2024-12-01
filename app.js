const express = require('express');
const passport = require('passport');
const { i18next, middleware } = require('./core/config/i18next.js'); // Ensure this file exists
const session = require('express-session');
const Queue = require('bull');
require('dotenv').config(); // Load environment variables at the top
console.log('SESSION_SECRET:', process.env.SESSION_SECRET);


const authRoutes = require('./core/routes/auth.route.js');
const fileRoutes = require('./core/routes/file.route.js');
const directoryRoutes = require('./core/routes/directory.route.js');
const connectDB = require('./core/config/db.js'); // Ensure this file correctly connects to MongoDB
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const cors = require('cors');

const app = express();
const Port = process.env.PORT || 5000;

// Check for required environment variables
if (!process.env.SESSION_SECRET) {
  console.error('SESSION_SECRET environment variable is not defined');
  process.exit(1); // Exit the application if SESSION_SECRET is missing
}

// Ensure Redis Queue is properly initialized
const fileUploadQueue = new Queue('file-uploads', {
  redis: { host: process.env.REDIS_HOST || 'localhost', port: process.env.REDIS_PORT || 6379 }
});

const serverAdapter = new ExpressAdapter();

// Set up Bull Board for queue monitoring
createBullBoard({
  queues: [new BullAdapter(fileUploadQueue)],
  serverAdapter: serverAdapter
});

serverAdapter.setBasePath('/admin/queues');
app.use('/admin/queues', serverAdapter.getRouter());

// Session configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // Ensure this is defined in the .env file
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
app.use(middleware.handle(i18next)); // Ensure `middleware` and `i18next` are set up correctly

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/directories', directoryRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ status: 500, message: err.message, data: null });
});

// Database connection
connectDB(); // Ensure `connectDB` establishes a proper MongoDB connection

// Start the server
app.listen(Port, () => console.log(`App listening on port ${Port}`));

module.exports = app;

