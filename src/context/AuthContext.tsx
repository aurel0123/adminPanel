import {createContext} from "react"
import type {AuthContextType} from "@/types/global";



export const AuthContext = createContext<AuthContextType | undefined>(undefined)
