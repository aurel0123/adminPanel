import * as React from "react";
import {useUser} from "@/hooks/useUser.ts";
import {Navigate} from "react-router-dom";

type Props = {
    children?: React.ReactNode,
    type_user? : "restaurateur" | "consumer" | "admin",
}

export const PrivateRoute = ({children , type_user} : Props) => {
    const {user, loading} = useUser()

    // Afficher un loader pendant la vérification de l'authentification
    if(loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Chargement...</p>
                </div>
            </div>
        );
    }

    // Rediriger vers login si non authentifié
    if(!user){
        return <Navigate to="/login" replace />
    }

    if(type_user && user.type_user !== type_user){
        return <Navigate to={`/${user.type_user}/tableau-de-bord`} replace />
    }

    return <>{children}</>;
}