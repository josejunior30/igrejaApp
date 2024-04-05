
import { Navigate } from 'react-router-dom';
import * as authService from '../../service/AuthService'
import { RoleEnum } from '../../models/auth';

type Props ={
    children: JSX.Element;
    roles?: RoleEnum[];
}
export function PrivateRoute({children, roles= []}: Props){
    if(!authService.isAuthenticationService()){
        return <Navigate to="/"/>;
    }
    if(!authService.hasAnyRoles(roles)){
        return <Navigate to="/inicio"/>
    }
    return children;
}