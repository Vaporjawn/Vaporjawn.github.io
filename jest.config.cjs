module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  testPathIgnorePatterns: ['<rootDir>/old_files_backup/'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(pdf|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/__mocks__/fileMock.js',
    '^../../assets/logos/(.*)$': '<rootDir>/__mocks__/fileMock.js',
    '^../../assets/(.*)$': '<rootDir>/__mocks__/fileMock.js'
  },
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,
      tsconfig: '<rootDir>/jest.tsconfig.json',
      // Define globals that will be available during transformation
      globals: {
        'import.meta': {
          env: {
            MODE: 'test',
            PROD: false,
            DEV: false,
            VITE_GA_MEASUREMENT_ID: 'TEST_GA_ID',
            VITE_HOTJAR_SITE_ID: 'TEST_HOTJAR_ID',
            VITE_HOTJAR_VERSION: '6',
            VITE_SENTRY_DSN: 'TEST_SENTRY_DSN',
            VITE_APP_VERSION: '1.0.0-test',
            VITE_FORM_ENDPOINT: 'https://test.formspree.io/test',
            VITE_GOOGLE_SITE_VERIFICATION: 'TEST_VERIFICATION_CODE'
          }
        }
      }
    }]
  },
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/main.tsx',
    '!src/vite-env.d.ts',
    '!src/pages/resume/resumePage.tsx'
  ],
  coverageReporters: ['text', 'lcov', 'html'],
  coverageDirectory: 'coverage'
};