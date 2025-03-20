export default {
  preset: 'ts-jest',
  testEnvironment: 'node',
  resetMocks: true,
  coverageDirectory: './coverage',
  coverageReporters: ['json', 'html', 'text'],
  moduleNameMapper: {
    '@/(.*)$': '<rootDir>/src/$1',
  },
};
