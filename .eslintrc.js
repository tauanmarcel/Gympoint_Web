module.exports = {
    env: {
      browser: true,
      es6: true,
    },
    extends: [
      'airbnb',
      'prettier',
      'prettier/react'
    ],
    globals: {
      Atomics: 'readonly',
      SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 2018,
      sourceType: 'module',
    },
    plugins: [
      'react',
      'prettier',
      'react-hooks'
    ],
    rules: {
        'camelcase': 'off',
        'eqeqeq': 'off',
        "global-require": "off",
        'import/prefer-default-export': 'off',
        "no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        'no-console': ["error", { allow: ["tron"]}],
        'no-param-reassign': 'off',
        'no-underscore-dangle': 'off',
        'prettier/prettier': 'error',
        'react/jsx-filename-extension': [
            'warn',
            { extensions: ['.jsx', '.js']}
        ],
        "react/jsx-one-expression-per-line": "off",
        'react/prop-types': 'off',
        "react-native/no-raw-text": "off",
        'react/state-in-constructor': 'off',
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'warn',
        'react/jsx-props-no-spreading': 'off'
    },
    settings: {
        "import/resolver": {
          "babel-plugin-root-import": {
            rootPathSuffix: "src"
          },
        },
      },
  };
