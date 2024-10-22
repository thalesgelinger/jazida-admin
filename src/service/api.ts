import axios from "axios";

const baseUrl = import.meta.env.VITE_API_URL ?? "http://localhost:8080"
export const api = axios.create({
    baseURL: `${baseUrl}/api`
})

export const ws = new WebSocket(`${baseUrl}/new-load-added`);
