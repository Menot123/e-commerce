import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

interface PrivateRouteProps {
    allowedRoles: string[];
    redirectPath: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ allowedRoles, redirectPath }) => {
    const isLoggedIn = Cookies.get('isLoggedIn');
    const userRole = Cookies.get('role');

    if (!isLoggedIn || !allowedRoles.includes(userRole!)) {
        return <Navigate to={redirectPath} replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;