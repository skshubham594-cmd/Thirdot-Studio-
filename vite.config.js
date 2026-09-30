import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Photographs, films and fonts live in public/assets and are copied to
    // dist/assets unchanged. Hashed JS/CSS bundles go to dist/bundle so the
    // two never mix.
    assetsDir: 'bundle'
  }
});
