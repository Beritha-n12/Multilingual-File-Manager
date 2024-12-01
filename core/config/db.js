const mongoose = require('mongoose'); // Import the Mongoose library for MongoDB interaction

// Asynchronous function to connect to the MongoDB database
const connectDB = async () => {
  try {
    // Attempt to establish a connection to the MongoDB database using the URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB connected successfully'); // Log success message if the connection is successful
  } catch (err) {
    console.error('MongoDB connection error:', err); // Log an error message if the connection fails
    process.exit(1); // Exit the process with failure code (1) if unable to connect
  }
};

module.exports = connectDB; // Export the connectDB function for use in other parts of the application
