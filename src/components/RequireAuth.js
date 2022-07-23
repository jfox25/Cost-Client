import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AccountInfo from "./AccountInfo";
import Navbar from "./Navbar";
import Logo from "./Logo";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();


    return (
        auth?.roles?.find(roles => allowedRoles?.includes(roles))
            ? (
                <>
                <Logo />
                <AccountInfo />
                <Navbar />
                <Outlet />
                </>
            )
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location}} replace  />
                : <Navigate to="/login" state={{ from: location , message: "Your session has expired."}} replace />
    );
}

export default RequireAuth;