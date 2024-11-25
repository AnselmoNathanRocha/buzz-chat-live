import axios from "axios";

const API_BASE_URL = 
"http://localhost:3001/"
// "https://buzz-chat-f70b79635e3e.herokuapp.com/"
;

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken")

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
