
import { Navigate, useNavigate } from 'react-router-dom';
import * as authService from '../../service/AuthService'
import { RoleEnum } from '../../models/auth';
import Modal from '../Modal/Autorização';
import { useEffect, useState } from 'react';


type Props ={
    children: JSX.Element;
    roles?: RoleEnum[];
}

export function PrivateRoute({ children, roles = [] }: Props) {
    const [showModal, setShowModal] = useState(false); // Estado para controlar a exibição do modal
    const navigate = useNavigate(); // Hook para navegação

    useEffect(() => {
        if (!authService.isAuthenticated() || !authService.hasAnyRoles(roles)) {
            setShowModal(true);
        }
    }, [roles]);

    const handleCloseModal = () => {
        setShowModal(false);
        navigate(-1); // Volta para a página anterior
    };

    if (!authService.isAuthenticated() || !authService.hasAnyRoles(roles)) {
        return (
            <Modal showModal={showModal} setShowModal={setShowModal}>
        <div className="modal-content">
           
            <p>Você não está autorizado a acessar o conteúdo.</p>
            <button onClick={handleCloseModal}>Fechar</button>
            
        </div>
            </Modal>
        );
    }

    return children;
}