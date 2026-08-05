import axios from "axios";

const api = axios.create({
    baseURL: "https://studentcrm-backend.onrender.com"
});

export default api;