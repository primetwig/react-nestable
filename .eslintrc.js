module.exports = {
  "extends": ["eslint:recommended", "plugin:react/recommended"],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
    "sourceType": "module",
    "ecmaFeatures": {
      "globalReturn": true,
      "jsx": true,
    },
  },
  "env": {
    "browser": true,
    "node": true,
  },
  "settings": {
    "react": {
      "version": "18.2",
    },
  },
  "rules": {
    "no-console": "warn",
    "no-unused-vars": ["error", { "ignoreRestSiblings": true }],
  },
};
