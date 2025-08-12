module.exports = {
    root: true,
    extends: [
        'universe/native',
        'universe/shared/typescript-analysis',
    ],
    overrides: [
        {
            files: ['*.ts', '*.tsx', '*.d.ts'],
            parserOptions: {
                project: './tsconfig.json',
            },
        },
    ],
    rules: {
        // Customize rules here
        'react/react-in-jsx-scope': 'off', // React 17+ doesn't require React import
        'no-console': ['warn', { allow: ['warn', 'error'] }], // Allow some console methods
    },
    ignorePatterns: ['node_modules/', 'ios/', 'android/', '.expo/'],
};
