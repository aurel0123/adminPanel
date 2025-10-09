import axios from "axios";

declare global {
    interface Window {
        refreshingToken?: Promise<string> | null;
    }
}

export const refreshToken = async () => {
    //récupérer le token refresh

    try{
        const refreshToken = localStorage.getItem("refreshToken")
        if(!refreshToken){
            throw new Error("Token refresh not found")
        }else {
            if(window.refreshingToken ) {
                return window.refreshingToken
            }
        }

        window.refreshingToken = axios
            .post('api/token/refresh' ,{
                "refresh" : refreshToken
            })
            .then ( response => {
                if(!response.data || !response.data.access) {
                    throw new Error("Invalid token format ")
                }
                const {access} = response.data
                localStorage.setItem("accessToken", access)
                return access
            })
            .finally(() => {
                window.refreshingToken = null
            })

        return await window.refreshingToken
    }catch(error){
        console.error("Error",error)
        throw error
    }
}