import {type ReactNode, useCallback, useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import {refreshToken} from "../lib/refreshToken.ts";
import axiosClient from "../api/axiosClient.ts";
import {AuthContext} from "./AuthContext";
import type {Auth, User} from "@/types/global";

export const AuthProvider = ({children}:{children : ReactNode}) => {
    const [user , setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const decodeToken = useCallback((token:string) => {
        try {
            if(!token) return null;
            return jwtDecode(token);
        }catch(error) {
            console.error("Erreur du decodage du token",error);
            return null;
        }
    }, [])

    // Vérifier si le token est déjà expiré
    const TokenExpired = useCallback((token: string): boolean => {
            if (!token) return true;
            const decoded = decodeToken(token);
            if (!decoded || typeof decoded.exp !== 'number') return true;
            return decoded.exp * 1000 < Date.now();
        },
        [decodeToken])

    // Vérifier si le refresh token est expiré
    const isRefeshTokenExpired = useCallback(() : boolean => {
        const refreshToken = localStorage.getItem("refreshToken");
        if(!refreshToken) return true;
        return TokenExpired(refreshToken);
    }, [TokenExpired])

    // Fonction pour récupérer les infos d'un utilisateur spécifique
    const fetchUser = useCallback(async () => {
        try {
            const token = localStorage.getItem("accessToken");

            if(!token || TokenExpired(token)){

                if(isRefeshTokenExpired()){
                    setUser(null);
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");

                    // Rediriger seulement si on est sur une route protégée
                    const protectedRoutes = ['/dashboard', '/admin', '/restaurateur', '/consumer'];
                    const isProtectedRoute = protectedRoutes.some(route =>
                        window.location.pathname.startsWith(route)
                    );

                    if(isProtectedRoute){
                        navigate('/login');
                    }
                    return;
                }
                await refreshToken();
            }

            const response = await axiosClient.get('/api/user/user-info/');
            setUser(response.data.user);
        }catch (error) {
            console.error(error)
            setUser(null);
        }finally {
            setLoading(false);
        }
    }, [TokenExpired , isRefeshTokenExpired , navigate])

    // Fonction pour la connexion
    const loginUser = async (credentials : Auth) => {
        try{
            setError(null);
            const response = await axiosClient.post('/api/auth/login/', credentials);

            if(!response.data || !response.data.user){
                throw new Error("Format de reponse invalid");
            }

            const {access , refresh} = response.data.tokens;

            if (!access || !refresh) {
                throw new Error('Tokens manquants dans la réponse');
            }

            localStorage.setItem('accessToken', access);
            localStorage.setItem('refreshToken', refresh);

            await fetchUser();

            navigate('/admin/tableau-de-bord');
            return { success: true };
        }catch(error){
            console.error('Erreur de connexion:', error);
            return { success: false};
        }
    }

    const logoutUser = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            if(refreshToken){
                await axiosClient.post('/api/auth/logout', {refreshToken: refreshToken});
            }
        }catch(error){
            console.log("Erreur lors de déconnexion" ,error);
        }finally {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setUser(null);
            navigate('/login');
        }
    }

    // Vérifier l'authentification au chargement
    useEffect(() => {
        fetchUser();
    }, [fetchUser])



    const ContextData = {
        user,
        setUser,
        loginUser,
        logoutUser,
        loading,  // IMPORTANT: Exposer loading dans le contexte
        error,
        isAuthenticated: !!user
    }

    return (
        <AuthContext.Provider value={ContextData}>
            {children}
        </AuthContext.Provider>
    )
}