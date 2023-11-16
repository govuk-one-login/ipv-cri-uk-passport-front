module.exports = {
  env: {
    node: true,
    es6: true,
    es2020: true,
    mocha: true,
    browser: true
  },
  globals: {
    sinon: true,
    expect: true,
    setupDefaultMocks: true,
  },
  root: true,
  extends: ['eslint:recommended', 'prettier'],
  rules: {
    'global-require': 0,
    'no-console': 2,
    'comma-dangle': 0,
    'padding-line-between-statements': [
      'error',
      { blankLine: 'any', prev: '*', next: '*' },
    ],
  },
};
