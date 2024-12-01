const i18next = require('i18next'); // Import i18next for internationalization support
const Backend = require('i18next-fs-backend'); // Import file system backend to load translation files
const middleware = require('i18next-http-middleware'); // Import middleware to handle language detection and translation
const path = require('path'); // Import path module for working with file paths

// Initialize i18next with the file system backend and language detection middleware
i18next
  .use(Backend) // Use the file system backend to load translation files
  .use(middleware.LanguageDetector) // Use middleware to detect the user's preferred language
  .init({
    fallbackLng: 'en', // Fallback language if the user's preferred language is not available
    backend: {
      loadPath: path.join(__dirname, '../locales/{{lng}}/{{ns}}.json'), // Path to load translation files based on language and namespace
    },
    ns: ['common', 'file', 'auth', 'job'], // Namespaces for organizing translation files
    defaultNS: 'common', // Default namespace used if none is specified
    preload: ['en', 'fr'], // Preload English ('en') and French ('fr') translations
    saveMissing: true, // Save missing translations to the backend (useful in development)
    debug: process.env.NODE_ENV === 'development' // Enable debug mode in development environment
  });

module.exports = { i18next, middleware }; // Export the configured i18next instance and middleware for use in the application
