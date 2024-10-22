/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL?: string
    readonly VITE_LOADER_PASS: string
    readonly VITE_ADMIN_PASS: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
