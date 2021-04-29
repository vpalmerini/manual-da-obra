module.exports = {
  env: {
    node: true,
    es6: true,
  },
  parserOptions: { ecmaVersion: 12 },
  ignorePatterns: ["node_modules/*", "!.prettierrc.js"],
  extends: [
    "eslint:recommended",
    "prettier",
    "airbnb-base",
    "plugin:prettier/recommended",
  ],
  rules: {
    "no-underscore-dangle": "off",
    "consistent-return": "off",
    "import/prefer-default-export": "off",
    camelcase: "off",
  },
};
