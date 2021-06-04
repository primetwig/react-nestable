module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "@babel/eslint-parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "globalReturn": true,
    },
  },
  "env": {
    "browser": true,
    "node": true,
  },
  "settings": {
    "react": {
      "version": "15.3",
    },
  },
  "rules": {
    "no-console": "warn",
  },
};
