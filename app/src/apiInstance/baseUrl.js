let url = "";

url = import.meta.env.VITE_APP_BASE_URL || "http://localhost:5000/api";

export const BACKEND_BASE_URL = url;
