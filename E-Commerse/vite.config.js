import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Render backend URL / Localhost दोनों को support करने वाला logic
const backendUrl = process.env.VITE_BACKEND_URL || "http://localhost:5000";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": backendUrl
    }
  },
  base: "/"
});
