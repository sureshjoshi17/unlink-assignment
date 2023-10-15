module.exports = {
    "env": {
        "node": true,
        "es2021": true
    },
    "overrides": [
        {
            "env": {
                "node": true,
                "es6": true
            },
            "files": [
                ".eslintrc.{js,cjs}"
            ],
            "parserOptions": {
                "sourceType": "script"
            }
        }
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "rules": {
        // quotes: ["error", "double"],
    }
}
