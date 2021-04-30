const { resolve } = require('path')
const { pathsToModuleNameMapper } = require('ts-jest/utils')
const { compilerOptions } = require('./tsconfig.json')

module.exports = {
    roots: ['<rootDir>'],
    modulePaths: ['<rootDir>'],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),
    moduleFileExtensions: [
        'ts',
        'js',
        'vue',
        'json'
    ],
    transform: {
        "^.+\\.ts$": "ts-jest",
        '^.+\\.js$': 'babel-jest',
        '.*\\.(vue)$': 'vue-jest'
    },
    collectCoverage: true,
    collectCoverageFrom: [
        '<rootDir>/components/**/*.vue',
        '<rootDir>/pages/**/*.vue'
    ]
}
