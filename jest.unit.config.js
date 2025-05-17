/** @type {import('jest').Config} */
module.exports = {
    rootDir: '.',
    testMatch: ['<rootDir>/test/unit/**/*.spec.ts'],
    transform: { '^.+\\.(t|j)s$': 'ts-jest' },
    moduleFileExtensions: ['js', 'json', 'ts'],
    testEnvironment: 'node',
    // couverture uniquement sur le code métier
    collectCoverageFrom: ['src/**/{!(main|app).ts,*.ts}'],
};