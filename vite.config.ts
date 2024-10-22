import { defineConfig, loadEnv } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import path from "path";

console.log({ API_URL: process.env.API_URL })

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

    return {
        plugins: [svelte()],
        resolve: {
            alias: {
                $lib: path.resolve("./src/lib"),
            },
        }
    }
})
