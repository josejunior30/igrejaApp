import React, { useContext, useEffect, useState } from "react";
import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { getUserData } from "../../localstorage/access-token-repository";
import { UsuarioDTO } from "../../models/usuario";
import * as usuarioLogadoService from '../../service/usuarioLogadoService';
import * as authService from '../../service/AuthService';
import { Link, useNavigate } from "react-router-dom";
import { ContextToken } from "../../ultilitarios/context-token";



const logoHeader = 'https://i.postimg.cc/JnzYtqZJ/Esta-o-siba-250-x-150-mm-3.png'


    const Header = () => {
        
    const { contextTokenPayload, setContextTokenPayload} = useContext(ContextToken);
        const [userName, setUserName] = useState<UsuarioDTO>(); // Estado para armazenar o nome do usuário
        const navigate = useNavigate();
        const [showMenu, setShowMenu] = useState(false);
        useEffect(() => {
         usuarioLogadoService.findMe()
         .then(response => {
            setUserName(response.data);
            console.log(response.data);
         })
    
        }, []);

        function handleLogoutClick(){
            authService.logout();
            setContextTokenPayload(undefined);
            navigate("/")
        }
        const toggleMenu = () => {
            setShowMenu(!showMenu);
        };
    
        return (
            <header className="main-header">
            <div className="logo-img">
                <Link to="/inicio">
                    <img src={logoHeader} alt="Logo da Empresa" />
                </Link>
            </div>
            <div className="login-container">
                <div className="user-profile" onClick={toggleMenu}>
                    <span className="img-perfil"><FontAwesomeIcon icon={faUser} /></span>
                    <h2>{userName?.nome}</h2>
                    {showMenu && (
                        <div className="dropdown-menu">
                            <ul>
                                <Link to="/redefinirsenha">
                                <li >Redefinir Senha</li>
                                </Link>
                            </ul>
                        </div>
                    )}
                </div>
                <span className="sair-header" onClick={handleLogoutClick}>Sair</span>
            </div>
        </header>
        );
    };
    
export default Header;