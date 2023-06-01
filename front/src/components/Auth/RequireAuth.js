import { Navigate } from "react-router-dom";
import { decrypt } from '../util';
import useAuth from './useAuth';

export const RequireAuth = ({ children, id }) => {
    const auth = useAuth();
    if(!auth.user || !id.includes(decrypt(auth.user.type))) {
        return <Navigate to='/'/>;
    }
    return children;
}