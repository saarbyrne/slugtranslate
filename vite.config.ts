import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import { resolve } from 'path';

export default defineConfig({
  plugins: [preact()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: false,
    target: 'es2015',
    rollupOptions: {
      input: {
        contentScript: resolve(__dirname, 'src/content-script.tsx'),
        background:    resolve(__dirname, 'src/background.ts'),
        // ...popup o demás
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        format: 'es'
      }
    }
  }
});
