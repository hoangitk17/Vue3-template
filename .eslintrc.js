module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ["plugin:vue/vue3-essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    semi: "error",
    // "no-console": "off",
    // "vue/max-attributes-per-line": "off",
    // "vue/singleline-html-element-content-newline": "off",
    // "vue/multiline-html-element-content-newline": "off",
    "no-unused-vars": "off",
    // "vue/no-v-html": "off",
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
        },
      },
    ],
    "prettier/prettier": [
      "error",
      {
        semi: true,
        htmlWhitespaceSensitivity: "ignore",
      },
    ],
  },
};
