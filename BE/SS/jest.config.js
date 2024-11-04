module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    testEnvironment: 'jsdom',  // Ensure Jest uses jsdom to simulate a browser environment
    transform: {
        '^.+\\.(js|jsx)$': 'babel-jest', // Use babel-jest to transform JavaScript and JSX files
      },
    transformIgnorePatterns: [
    '/node_modules/(?!(react-markdown)/)', // Tell Jest to transform react-markdown
    ],
  };
  