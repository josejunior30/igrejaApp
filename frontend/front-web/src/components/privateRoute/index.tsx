
import { useNavigate } from 'react-router-dom';
import * as authService from '../../service/AuthService';
import { RoleEnum } from '../../models/auth';
import { useEffect } from 'react';

type Props = {
    children: JSX.Element;
    roles?: RoleEnum[];
}

export function PrivateRoute({ children, roles = [] }: Props) {
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        if (!authService.isAuthenticated() || !authService.hasAnyRoles(roles)) {
            alert('Sem Permissão! Entre em contato com o administrador.');
            navigate(-1); // Volta para a página anterior
        }
    }, [roles, navigate]);

    if (!authService.isAuthenticated() || !authService.hasAnyRoles(roles)) {
        return null; // Não renderiza nada se o usuário não estiver autorizado
    }

    return children;
}
