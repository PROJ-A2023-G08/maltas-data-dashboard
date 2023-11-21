module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        'plugin:@typescript-eslint/recommended',
        'prettier/@typescript-eslint',
        'prettier/react',
    ],
    "overrides": [
        {
            "env": {
                "node": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
        "unused-imports/no-unused-imports": "error",
        "unused-imports/no-unused-vars": "off",
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": "off",
    }
}
