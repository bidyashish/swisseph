import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 10000,
    include: ['test/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: [
      'node_modules', 
      'build', 
      'dist',
      'test/test.js',      // Legacy test file
      'test/datetime.js'   // Legacy test file  
    ],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'build/',
        'deps/',
        'examples/',
        'test/',
        'vitest.config.js',
        'binding.gyp',
        '*.md'
      ],
      include: [
        'lib/**',
        'src/**'
      ]
    },
    reporters: ['verbose']
  }
}) 