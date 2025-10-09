import {BrowserRouter as Router , Routes , Route, Navigate} from "react-router-dom";
import LoginPage from "@/features/auth/Login.tsx"
import AuthLayout from "@/layouts/authLayout.tsx";
import {AuthProvider} from "@/context/AuthProvider.tsx";
import AdminLayout from "@/layouts/adminLayout.tsx";
import {PrivateRoute} from "@/routes/PrivateRoute.tsx";

export default function AppRouter() {
    return (
        <Router>
            <AuthProvider>
                <Routes>
                    {/* Routes publiques */}
                    <Route element={<AuthLayout/>}>
                        <Route path="/login" element={<LoginPage/>} />
                    </Route>

                    {/* Routes protégées pour admin */}
                    <Route
                        path="/admin"
                        element={
                            <PrivateRoute type_user="admin">
                                <AdminLayout />
                            </PrivateRoute>
                        }
                    >
                        <Route path="tableau-de-bord" element={<div>Hello Dashboard</div>} />
                        <Route path="users" element={<div>Users Page</div>} />
                        <Route path="history" element={<div>History Page</div>} />
                    </Route>

                    {/* Routes protégées pour restaurateur (exemple) */}
                    <Route
                        path="/restaurateur"
                        element={
                            <PrivateRoute type_user="restaurateur">
                                <div>Restaurateur Layout</div>
                            </PrivateRoute>
                        }
                    >
                        <Route path="tableau-de-bord" element={<div>Restaurateur Dashboard</div>} />
                    </Route>

                    {/* Routes protégées pour consumer (exemple) */}
                    <Route
                        path="/consumer"
                        element={
                            <PrivateRoute type_user="consumer">
                                <div>Consumer Layout</div>
                            </PrivateRoute>
                        }
                    >
                        <Route path="tableau-de-bord" element={<div>Consumer Dashboard</div>} />
                    </Route>

                    {/* Route par défaut */}
                    <Route path="/" element={<Navigate to="/login" replace />} />

                    {/* Route 404 */}
                    <Route path="*" element={<div>Page non trouvée</div>} />
                </Routes>
            </AuthProvider>
        </Router>
    )
}