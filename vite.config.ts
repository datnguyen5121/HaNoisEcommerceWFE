import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': 'https://hanoisecommercewbe.onrender.com'
            // '/api': 'http://localhost:8080'
        }
    },
    plugins: [react()]
})
