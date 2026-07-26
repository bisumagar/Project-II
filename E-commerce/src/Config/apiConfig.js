import axios from "axios";

export const API_BASE_URL = "/api";

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

// Add Authorization header only when JWT exists (avoids "Bearer null" causing 401)
api.interceptors.request.use((config) => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
        config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
});