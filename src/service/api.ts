import axios from "axios";

const apiUrl = import.meta.env?.VITE_API_URL ?? "https://localhost:8080"
export const api = axios.create({
    baseURL: `${apiUrl}/api`
})

export const ws = new WebSocket(`${apiUrl}/new-load-added`);
