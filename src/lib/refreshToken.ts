import axios from "axios";
import {config} from '@/lib/config'

declare global {
    interface Window {
        refreshingToken?: Promise<string> | null;
    }
}

export const refreshToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
            throw new Error("Token refresh not found");
        }

        if (window.refreshingToken) {
            return window.refreshingToken;
        }

        window.refreshingToken = axios
            .post(`${config.env.apiBackend}api/token/refresh/`, {
                "refresh": refreshToken
            })
            .then(response => {
                if (!response.data || !response.data.access) {
                    throw new Error("Invalid token format");
                }

                const { access, refresh: newRefreshToken } = response.data;

                // Stocker le nouveau access token
                localStorage.setItem("accessToken", access);

                // Stocker le nouveau refresh token s'il est fourni
                if (newRefreshToken) {
                    localStorage.setItem("refreshToken", newRefreshToken);
                }

                return access;
            })
            .finally(() => {
                window.refreshingToken = null;
            });

        return await window.refreshingToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        // En cas d'erreur, nettoyer les tokens
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw error;
    }
}