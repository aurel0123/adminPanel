import {useContext} from "react";
import { AuthContext } from '../context/AuthContext.tsx'

export const useUser = () =>{
    const  context = useContext(AuthContext)
    if(!context){
        throw new Error("useUser() must be used within the context")
    }
    return context
}