/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ['next', 'plugin:prettier/recommended', 'turbo'],
    plugins: ['unused-imports'],
    parserOptions: {
        tsconfigRootDir: __dirname,
        project: ['./apps/*/tsconfig.json', './packages/*/tsconfig.json'],
    },
    settings: {
        next: {
            rootDir: ['apps/*/', 'packages/*/'],
        },
    },
    rules: {
        '@next/next/no-html-link-for-pages': 'off',
        'react-hooks/exhaustive-deps': 'warn',
    },
};
