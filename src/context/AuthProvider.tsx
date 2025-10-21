import { type ReactNode, useCallback, useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { refreshToken } from "../lib/refreshToken.ts";
import axiosClient from "../api/axiosClient.ts";
import { AuthContext } from "./AuthContext";
import type { Auth, User } from "@/types/global";
import axios from "axios";
import { config } from "@/lib/config.ts";
import { getRestaurantsById } from "@/api/restaurant.api.ts";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const decodeToken = useCallback((token: string) => {
    try {
      if (!token) return null;
      return jwtDecode(token);
    } catch (error) {
      console.error("Erreur du decodage du token", error);
      return null;
    }
  }, []);

  const TokenExpired = useCallback(
    (token: string): boolean => {
      if (!token) return true;
      const decoded = decodeToken(token);
      if (!decoded || typeof (decoded as any).exp !== "number") return true;
      return (decoded as any).exp * 1000 < Date.now();
    },
    [decodeToken]
  );

  const isRefeshTokenExpired = useCallback((): boolean => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) return true;
    return TokenExpired(refreshToken);
  }, [TokenExpired]);

  const fetchUser = useCallback(async () => {
    try {
      const token = localStorage.getItem("accessToken");

      if (!token || TokenExpired(token)) {
        if (isRefeshTokenExpired()) {
          setUser(null);
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("idRestaurant");
          const protectedRoutes = ["/dashboard", "/admin", "/restaurateur", "/consumer"];
          const isProtectedRoute = protectedRoutes.some((route) =>
            window.location.pathname.startsWith(route)
          );

          if (isProtectedRoute) {
            navigate("/login");
          }
          return;
        }
        await refreshToken();
      }

      const response = await axiosClient.get("/api/user/user-info/");
      const { user, idRestaurant } = response.data;
      if (idRestaurant) {
        localStorage.setItem("idRestaurant", idRestaurant);
      }
      setUser({
        ...user,
        idRestaurant: idRestaurant || null,
      });
    } catch (error) {
      console.error(error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [TokenExpired, isRefeshTokenExpired, navigate]);

  const loginUser = useCallback(
    async (credentials: Auth) => {
      try {
        setError(null);
        const response = await axios.post(`${config.env.apiBackend}api/auth/login/`, credentials);

        if (!response.data || !response.data.user) {
          throw new Error("Format de reponse invalid");
        }

        const { access, refresh } = response.data.tokens;
        if (!access || !refresh) {
          throw new Error("Tokens manquants dans la réponse");
        }

        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);

        await fetchUser();

        navigate("/admin/tableau-de-bord");
        return { success: true };
      } catch (error) {
        console.error("Erreur de connexion:", error);
        return { success: false };
      }
    },
    [fetchUser, navigate]
  );

  const logoutUser = useCallback(async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        await axiosClient.post("/api/auth/logout", { refreshToken: refreshToken });
      }
    } catch (error) {
      console.log("Erreur lors de déconnexion", error);
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("idRestaurant");
      setUser(null);
      navigate("/login");
    }
  }, [navigate]);

  const getRestaurantUser = useCallback(async (id: string) => {
    const response = await getRestaurantsById(id);
    if (!response) {
      throw new Error("Votre restaurant n'existe pas ");
    }
    return response;
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const ContextData = useMemo(
    () => ({
      user,
      setUser,
      loginUser,
      logoutUser,
      getRestaurantUser,
      loading,
      error,
      isAuthenticated: !!user,
    }),
    [user, setUser, loginUser, logoutUser, getRestaurantUser, loading, error]
  );

  return <AuthContext.Provider value={ContextData}>{children}</AuthContext.Provider>;
};