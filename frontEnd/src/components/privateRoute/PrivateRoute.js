import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token"); // Replace this with your token storage method
    return token ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
