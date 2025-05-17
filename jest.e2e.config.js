/** @type {import('jest').Config} */
module.exports = {
    rootDir: '.',
    testMatch: ['<rootDir>/test/e2e/**/*.e2e-spec.ts'],
    transform: { '^.+\\.(t|j)s$': 'ts-jest' },
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
    collectCoverage: false,
    verbose: true,
    testTimeout: 20000,
};
