import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

    // Added to connect with the backend of the ContactForm
    server: {
        proxy: {
            // Proxy all requests starting with /api to your backend
            '/api': {
                target: 'http://localhost:8080/ContactForm-1.0-SNAPSHOT', // Your backend server URL
                changeOrigin: true, // Changes the origin of the host header to the target URL
            }
        }
    }
})
