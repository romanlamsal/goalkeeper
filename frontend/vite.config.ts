import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        port: 9002,
        host: true
    },
    build: {
        outDir: "dist"
    },
    base: "/goalkeeper/"
})
