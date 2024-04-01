import React, { useState } from "react";
import './styles.css';
import { CredentialsDTO } from "../../models/auth";
import *as authService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<CredentialsDTO>({
        username: '',
        password: ''
    });

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        console.log('Enviando formulário:', formData);
        authService.loginRequest(formData)
            .then(token => {
                console.log('Token recebido:', token);
                authService.saveAccessToken(token);
                console.log('Token salvo com sucesso.');
                navigate("/inicio")
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                // Tratar o erro conforme necessário, como exibir uma mensagem de erro para o usuário
            });
    }

    function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { value, name } = event.target;
        console.log('Input alterado:', { name, value });
        setFormData({ ...formData, [name]: value });
    }

    return (
        <>
            <div className="body-container">
                <form className="form-container" onSubmit={handleSubmit}>
                    <h2>Login</h2>
                    <label>Usuário:</label>
                    <input type="text" id="username" name="username" value={formData.username} placeholder="Email" onChange={handleInputChange} />

                    <label>Senha:</label>
                    <input type="password" id="password" name="password" value={formData.password} placeholder="Senha" onChange={handleInputChange} />

                    <button type="submit" className="btn-entrar">Entrar</button>
                </form>
            </div>
            <p className="copy">&copy; Segunda Igreja Batista de Pendotiba 1966-2024. Todos os direitos reservados</p>
        </>
    );
};

export default Login;