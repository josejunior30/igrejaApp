import React, { useState } from "react";
import './styles.css';
import { CredentialsDTO } from "../../models/auth";
import { loginRequest } from "../../service/AuthService";


const Login =() => {
const [formData,setFormData]= useState<CredentialsDTO>({
    username: '',
    password:''
})
function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    loginRequest(formData);
    console.log('Formulário enviado:', formData);
}

function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = event.target;
    setFormData({ ...formData, [name]: value }); 
}


    return(
    <>
<div className="body-container">
    <form className="form-container" onSubmit={handleSubmit}>
        <h2>Login</h2>
            <label>Usuário:</label>
            <input type="text" id="username" name="username" value={formData.username} placeholder="Email" onChange={handleInputChange}/>

            <label>Senha:</label>
            <input type="password" id="password" name="password" value={formData.password} placeholder="senha" onChange={handleInputChange}/>

            <button type="submit" className="btn-entrar">Entrar</button>
    </form>
</div> 
<p className="copy">&copy; Segunda Igreja Batista de Pendotiba 1966-2024. Todos os direitos reservados</p>
        </>
    )
};

export default Login;