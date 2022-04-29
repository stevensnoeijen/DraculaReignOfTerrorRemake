module.exports = {
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/src'],
    transform: {
        "^.+\\.(t|j)sx?$": "@swc/jest"
    },
    testRegex: '((\\.|/)spec)\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    reporters: ["default", "jest-junit"]
}