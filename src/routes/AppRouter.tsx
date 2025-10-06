import {BrowserRouter as Router , Routes , Route} from "react-router-dom";
import LoginPage from "../features/auth/Login.tsx"
import AuthLayout from "../layouts/authLayout.tsx";
export  default function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route element={<AuthLayout/>} >
                  <Route path="/login" element={<LoginPage/>} />
                </Route>
            </Routes>
        </Router>
    )
}