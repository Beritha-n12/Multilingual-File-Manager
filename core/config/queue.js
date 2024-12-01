const Bull = require('bull'); // Import Bull for job queue management
const File = require('../models/file.model'); // Import the File model to interact with the database
const fs = require('fs').promises; // Import the filesystem module with promises support for file operations

// Initialize a new Bull queue named 'file-queue' with Redis configuration
const fileQueue = new Bull('file-queue', {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1', // Redis host, default to localhost
    port: process.env.REDIS_PORT || 6379, // Redis port, default to 6379
  },
});

// Define the job processing logic for the queue
fileQueue.process(async (job) => {
  const { type, data } = job.data; // Extract job type and associated data

  // Handle file deletion tasks
  if (type === 'delete') {
    console.log(`Processing deletion for file ${data.fileId}`);
    
    // Delete file record from the database
    await File.deleteOne({ _id: data.fileId });

    // Delete file from the filesystem
    await fs.unlink(data.filePath).catch((err) => {
      console.error(`Error deleting file from disk: ${err.message}`);
    });

  // Handle file sharing tasks
  } else if (type === 'share') {
    console.log(`Processing sharing for file ${data.fileId} with user ${data.userId}`);

    // Find the file in the database
    const file = await File.findOne({ _id: data.fileId });
    if (!file) throw new Error('File not found during sharing task');

    // If the file is not already shared with the user, add them to the sharedWith list
    if (!file.sharedWith.includes(data.userId)) {
      file.sharedWith.push(data.userId);
      await file.save(); // Save the updated file document
    }

  // Handle unknown job types
  } else {
    console.error(`Unknown job type: ${type}`);
  }
});

module.exports = fileQueue; // Export the configured file queue for use in other parts of the application
