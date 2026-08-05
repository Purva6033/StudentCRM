import { Navigate, useLocation } from "react-router-dom";

function ProtectedRoute({ children }) {

    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");

    const location = useLocation();

    if (!token) {
        return <Navigate to="/" replace />;
    }

    // ADMIN can access everything
    if (role === "ADMIN") {
        return children;
    }

    // COUNSELOR routes
    if (role === "COUNSELOR") {

        const allowedRoutes = [
            "/counselor-dashboard",
            "/leads",
            "/calls",
            "/admissions",
            "/followups",
            "/change-password"
        ];
        if (!allowedRoutes.includes(location.pathname)) {
            return <Navigate to="/counselor-dashboard" replace />;
        }

        return children;
    }

    // STUDENT routes
    if (role === "STUDENT") {

        const allowedRoutes = [
            "/student-dashboard",
            "/student/edit-profile",
            "/change-password"
        ];

        if (!allowedRoutes.includes(location.pathname)) {
            return <Navigate to="/student-dashboard" replace />;
        }

        return children;
    }

    return <Navigate to="/" replace />;
}

export default ProtectedRoute;