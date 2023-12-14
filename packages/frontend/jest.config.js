/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  globals: {
    "ts-jest": {
      "tsconfig": "./tsconfig.test.json"
    }
  },
  collectCoverage: true,
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/src/.internal/",
  ],
  coverageProvider: "v8",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleDirectories: ["node_modules", "src"],
};
