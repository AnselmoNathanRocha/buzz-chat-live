import axios from "axios";

// const API_BASE_URL = "http://localhost:5000/";
const API_BASE_URL = "https://total-track-52852a7cf2b1.herokuapp.com/";

export const httpClient = axios.create({
  baseURL: API_BASE_URL,
});

httpClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
