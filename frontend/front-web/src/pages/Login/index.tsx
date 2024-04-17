import React, { useContext, useState } from "react";
import './styles.css';
import { CredentialsDTO } from "../../models/auth";
import *as authService from "../../service/AuthService";
import { useNavigate } from "react-router-dom";
import { ContextToken } from "../../ultilitarios/context-token";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { SubmitHandler, useForm } from "react-hook-form";


type FormValues = {
    username: string;
    password: string;
};

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setContextTokenPayload } = useContext(ContextToken);
    const { register, handleSubmit, formState: { errors }, setError } = useForm<FormValues>();

    const loginImagem = 'https://i.postimg.cc/zDy9k0jx/Ama.png';

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit: SubmitHandler<FormValues> = (data) => {
        authService.loginRequest(data)
            .then(response => {
                authService.saveAccessToken(response.data.access_token);
                setContextTokenPayload(authService.getAccessTokenPayload());
                navigate("/inicio");
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                setError("username", { message: "Usuário ou senha inválidos." });
            });
    };

    return (
        <>
            <div className="body-container">
                <img src={loginImagem} alt="imagem-login"/>
                <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
                    <h2>Login</h2>
                    <label>Usuário:</label>
                    <input 
                        type="text" 
                        id="username" 
                        placeholder="Email" 
                        {...register("username", { required: true })}
                    />
                
                    <div className="password-input-container">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            id="password" 
                       
                            placeholder="Senha" 
                            {...register("password", { required: true })}
                        />
                        
                        <button type="button" className="toggle-password" onClick={togglePasswordVisibility}>
                            {showPassword ? <FaRegEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    {errors.username && <p className="invalid-error-message">{errors.username.message}</p>}
                    
                    <button type="submit" className="btn-entrar">Entrar</button>
                </form>
            </div>
            <p className="copy">&copy; Segunda Igreja Batista de Pendotiba 1966-2024. Todos os direitos reservados</p>
        </>
    );
};

export default Login;