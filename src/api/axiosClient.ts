import axios, {type AxiosInstance} from "axios";
import {config} from "../lib/config.ts";
import {refreshToken} from "../lib/refreshToken.ts";

const BASE_URL =  config.env.apiBackend || "http://127.0.0.1:8000"
const axiosClient: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
   /*  timeout: 10000 */ // 10 secondes max pour une requête
})

// Intercepteur pour ajouter le token aux requêtes
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("accessToken")
        if(token) {
            config.headers.Authorization = `Bearer ${token}` ;
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
)

axiosClient.interceptors.response.use(
    (response) => response ,
    async  (error) => {
        const originalRequest = error.config ;
        const isPrivateRoute = window.location.pathname.startsWith('/admin')
            || window.location.pathname.startsWith('/restaurateur')
            || window.location.pathname.startsWith('/consumer');

        if(
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url.includes('api/token/refresh/')
        ){
            originalRequest._retry  = true;
            try{
                const newAccessToken = await refreshToken()
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
                return axiosClient(originalRequest)
            }catch(refreshError) {
                console.error('Refresh token failed:', refreshError);

                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');

                if (isPrivateRoute) {
                    window.location.href = '/login';
                }
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error)
    }
)

export  default axiosClient ;