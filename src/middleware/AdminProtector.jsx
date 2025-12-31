import { Navigate } from "react-router-dom";

const AdminProtector = ({ children }) => {
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to="/login-admin" replace />;
    }

    return children;
};

export default AdminProtector;
