/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__test__/**/*.test.ts"],
  moduleFileExtensions: ["js", "ts", "json"],
  verbose: true,
  globalTeardown: "./src/__test__/teardown.ts",
};
