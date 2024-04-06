import React, { useContext, useState } from 'react';
import *as usuarioLogadoService from '../../../service/usuarioLogadoService';
import *as authService from '../../../service/AuthService';
import './styles.css';
import { getAccessTokenPayload } from '../../../service/AuthService';
import Header from '../../../components/Header';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../../ultilitarios/context-token';


function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { contextTokenPayload, setContextTokenPayload} = useContext(ContextToken);
const navigate = useNavigate();
    const handleChangePassword = async () => {
        if (newPassword !== confirmNewPassword) {
            setErrorMessage('As senhas não coincidem.');
            return;
        }

        try {
            const tokenPayload = getAccessTokenPayload(); // Obter payload do token de acesso
            if (!tokenPayload) {
                // Tratar caso o payload do token não exista
                return;
            }

            const { user_name } = tokenPayload; // Extrair o username do payload do token
            const credentialsDTO = {
                username: user_name, // Usando camelCase para o username
                oldPassword,
                newPassword
            };

            const response = await usuarioLogadoService.update(credentialsDTO);
            setSuccessMessage('Senha atualizada com sucesso!');
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
            handleLogoutClick();
        
        } catch (error) {
            setErrorMessage('Erro ao atualizar a senha. Por favor, tente novamente.');
            console.error('Erro ao atualizar a senha:', error);
        }
    };

    function handleLogoutClick(){
        authService.logout();
        setContextTokenPayload(undefined);
        navigate("/")
    }
    return (
        <>
        <Header/>
        <div className='container-redefinir'>
            <h2>Redefinir Senha Senha</h2>
            {errorMessage && <div>{errorMessage}</div>}
            {successMessage && <div>{successMessage}</div>}
            <div className='div-senha'>
                <label htmlFor="oldPassword">Senha Atual:</label>
                <input type="password" id="oldPassword" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
            </div>
            <div className='div-senha'>
                <label htmlFor="newPassword">Nova Senha:</label>
                <input type="password" id="newPassword" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
            </div>
            <div className='div-senha'>
                <label htmlFor="confirmNewPassword">Confirmar Nova Senha:</label>
                <input type="password" id="confirmNewPassword" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} />
            </div>
            <button className= 'btn-redefinir' onClick={handleChangePassword}>Alterar Senha</button>
        </div>
        </>
    );
}

export default ChangePassword;