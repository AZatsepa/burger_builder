module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
  },
  extends: [
    'airbnb',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
    'babel',
  ],
  parser: 'babel-eslint',
  rules: {
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": [0],
    "react/state-in-constructor": [0],
    "jsx-a11y/click-events-have-key-events": [0],
    "jsx-a11y/no-noninteractive-element-interactions": [0],
    "react/static-property-placement": ["warn", "static public field"],
    "no-console": [0],
    "operator-linebreak": [0],
    "react/prop-types": [1, { ignore: ["history"] }]
  },
};
