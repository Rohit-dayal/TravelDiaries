import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // proxy server 
  server:{
    proxy:{
      '/api': {
        target: 'http://localhost:3000',
        secure: false,
      },
    },
  },
  // proxy server ends here
  plugins: [react()],
})
