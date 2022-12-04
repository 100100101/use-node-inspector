module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'eslint:recommended',
        'plugin:json/recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        commonjs: true,
        node: true,
        browser: false,
        es2022: true,
    },
    parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
    },
    rules: {
        'no-var': 'off',
        'no-console': 0,
        'no-unused-vars': 'off',
        'no-undef': 'off',
        'prettier/prettier': [
            'error',
            {},
            {
                usePrettierrc: true,
            },
        ],
        '@typescript-eslint/no-var-requires': 'off',
    },
    plugins: ['@typescript-eslint', 'prettier'],
}
