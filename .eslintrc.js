module.exports = {
    env: {
        node: true
    },
    extends: [
        "eslint:recommended",
        "plugin:vue/vue3-recommended",
        "prettier"
    ],
    parserOptions: {
        parser: "@babel/eslint-parser",
        requireConfigFile: false
    },
    rules: {
        eqeqeq: "error"
    }
}