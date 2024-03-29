import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import Home from "../pages";
import RegisterPage from "../pages/register";
import LoginPage from "../pages/login";
import ProtectedRoute from "../component/protected-route";



const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Home />
            </ProtectedRoute>
        )
    },
    {
        path: "/login",
        element: <LoginPage />
    }, {
        path: "/register",
        element: <RegisterPage />
    }
]);

export default function Router() {
    return <RouterProvider router={router} />
}