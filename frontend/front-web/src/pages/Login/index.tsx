import React from "react";
import './styles.css';

const Login =() => (
    <>
<body className="body-container">
    <form className="form-container">
        <h2>Login</h2>
            <label>Usuário:</label>
            <input type="text" id="username" name="username" required/>

            <label>Senha:</label>
            <input type="password" id="password" name="password" required/>

            <button type="submit" className="btn-entrar">Entrar</button>
    </form>
</body> 
<p className="copy">&copy; Segunda Igreja Batista de Pendotiba 1966-2024. Todos os direitos reservados</p>
        </>
);

export default Login;