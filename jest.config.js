module.exports = {
  "moduleNameMapper": {
    "^canvas/(.*)$": "<rootDir>/src/canvas/$1",
    "^common/(.*)$": "<rootDir>/src/common/$1",
    "^colorspace/(.*)$": "<rootDir>/src/colorspace/$1",
  },
  "testPathIgnorePatterns": ["/node_modules/"],
  "collectCoverage": true,
  "coverageDirectory": "<rootDir>/tests/"
}