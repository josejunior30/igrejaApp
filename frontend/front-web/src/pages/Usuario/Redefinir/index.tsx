import React, { useContext, useState } from 'react';
import *as usuarioLogadoService from '../../../service/usuarioLogadoService';
import *as authService from '../../../service/AuthService';
import './styles.css';
import { getAccessTokenPayload } from '../../../service/AuthService';
import Header from '../../../components/Header';
import { useNavigate } from 'react-router-dom';
import { ContextToken } from '../../../ultilitarios/context-token';
import { FaEye, FaRegEyeSlash } from 'react-icons/fa';

function ChangePassword() {
    const [showPassword, setShowPassword] = useState(false);
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
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    return (
        <>
        <Header/>
        <div className='container-fluid'>
            <div className='row justify-content-center mt-5 pt-5 mb-3'>
            <div className="col-8 col-md-4" id="login-redefinir">
            <h3>Redefinir Senha</h3>
           
            {errorMessage && <div>{errorMessage}</div>}
            {successMessage && <div>{successMessage}</div>}
            <div className='col-12' >
                <label htmlFor="oldPassword" className='form-label'>Senha Atual:</label>
                <div className="input-group">
                <input    type={showPassword ? "text" : "password"} className="form-control"
                 id="oldPassword" placeholder='Insira a senha '
                  value={oldPassword} 
                  onChange={(e) => setOldPassword(e.target.value)} />
                <button type="button" className="btn btn-outline-secondary" id="olho" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                     </button>
                     </div>
            </div>
          
            <div className='col-12' >
                <label htmlFor="newPassword" className='form-label'>Nova Senha:</label>
                <div className="input-group">
                <input  type={showPassword ? "text" : "password"} id="newPassword" className='form-control' placeholder='Insira a nova senha' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                <button type="button" className="btn btn-outline-secondary" id="olho" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                     </button>
                     </div>
            
            </div>
            <div className='col-12'>
                <label htmlFor="confirmNewPassword" className='form-label'>Confirmar Nova Senha:</label>
                
                <div className="input-group">
                <input  type={showPassword ? "text" : "password"} id="confirmNewPassword" className='form-control' 
                placeholder='Confirme a senha' 
                value={confirmNewPassword}
             onChange={(e) => setConfirmNewPassword(e.target.value)} 
             />
               <button type="button" className="btn btn-outline-secondary" id="olho" onClick={togglePasswordVisibility}>
                                        {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                     </button>
             </div>

            </div>
            <div className='col-11 mt-4'>
                <span>* A senha deve conter entre 4 a 8 caracteres e deve incluir pelo menos uma letra maiúscula e um número.</span>
            </div>
            
            <div className="d-grid gap-2 col-9 mx-auto mb-3" id='alterar-senha'>
                <button className="btn btn-primary" onClick={handleChangePassword}>Alterar Senha</button>
        </div>
            
           
          
        </div>
                </div>
            </div>
     
          
        </>
    );
}

export default ChangePassword;