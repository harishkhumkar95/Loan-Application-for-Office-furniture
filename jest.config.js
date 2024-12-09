module.exports = {
  testEnvironment: "node", 
  verbose: true, // Provides detailed test results
  collectCoverage: true, // Enables code coverage collection
  collectCoverageFrom: [
      "routes/**/*.js", // Includes all files in the `routes` directory for coverage
      "controllers/**/*.js", // Includes controller files if applicable
      "models/**/*.js", // Includes models for database logic
      "!**/node_modules/**", // Excludes node_modules from coverage
      "!**/tests/**" // Excludes test files themselves
  ],
  coverageDirectory: "coverage", // Outputs coverage reports to a `coverage` directory
  coverageThreshold: { // Optional: Define coverage thresholds
      global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
      }
  },
  setupFiles: ["dotenv/config"], // Loads environment variables from a .env file
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/coverage/"], 
  modulePathIgnorePatterns: ["<rootDir>/node_modules/"], 
};
