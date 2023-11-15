/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  globals: {
    'ts-jest': {
        tsConfig: './packages/frontend/tsconfig.json',
    },
  },
  preset: 'ts-jest',
  // still not working due to folder path issue to tsconfig, will try to figure out later to fix it
  // projects: [
  //   {
  //     displayName: 'frontend',
  //     testEnvironment: 'jsdom',
  //     testMatch: ['/packages/frontend/**/*.test.tsx'],
  //   },
  //   {
  //     displayName: 'node',
  //     testEnvironment: 'node',
  //     testMatch: ['./**/*.node.test.jsx'],
  //   },
  // ],
   testEnvironment: 'jsdom',
};