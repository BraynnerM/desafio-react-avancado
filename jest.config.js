module.exports = { 
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  setupFiles: ['./jest.setup.js'],
  transformIgnorePatterns: ['<rootDir>/src/assets/'],
};

