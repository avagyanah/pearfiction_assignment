export default {
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': ['ts-jest', {
            tsconfig: {
                module: 'CommonJS',
                moduleResolution: 'node',
            },
        }],
    },
};
