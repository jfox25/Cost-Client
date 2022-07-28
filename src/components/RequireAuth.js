import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AccountInfo from "./Pages/AccountInfo";
import Navbar from "./Navbar";
import Logo from "./Logo";
import Footer from "./Extra/Footer";

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();


    return (
        auth?.roles?.find(roles => allowedRoles?.includes(roles))
            ? (
                <div>
                    <div className="generalContainer">
                        <Logo />
                        <AccountInfo />
                        <Navbar />
                        <Outlet />
                    </div>
                    <Footer />
                </div>
            )
            : auth?.email
                ? <Navigate to="/unauthorized" state={{ from: location}} replace  />
                : <Navigate to="/login" state={{ from: location , message: "Your session has expired."}} replace />
    );
}

export default RequireAuth;