import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const base = {
    plugins: {
        '@typescript-eslint': tseslint,
        prettier: prettierPlugin,
    },
    rules: {
        ...tseslint.configs.recommended.rules,
        ...prettier.rules,
        'prettier/prettier': 'error',
    },
};

export default [
    {
        ...base,
        files: ['src/**/*.ts', 'src/**/*.tsx'],
        languageOptions: {
            parser: tsparser,
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    },
    {
        ...base,
        files: ['bundler/**/*.ts'],
        languageOptions: {
            parser: tsparser,
        },
    },
    {
        ignores: ['dist/', 'node_modules/'],
    },
];
