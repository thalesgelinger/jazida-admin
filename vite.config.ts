import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path";

console.log({ BASE_URL: process.env.BASE_URL })

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [svelte()],
    resolve: {
        alias: {
            $lib: path.resolve("./src/lib"),
        },
    },
    server: {
        port: 3000,
        proxy: {
            "/api": {
                target: "https://jazida-api-production.up.railway.app",
                changeOrigin: true,
                secure: false,
                rewrite: (p) => p.replace(/^\/api/, '')
            },
            "/new-load-added": {
                target: "https://jazida-api-production.up.railway.app/new-load-added",
                changeOrigin: true,
                secure: false,
                rewrite: (p) => p.replace(/^\/new-load-added/, '')
            }

        }
    }
})
