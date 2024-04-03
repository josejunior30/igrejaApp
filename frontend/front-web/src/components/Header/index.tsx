import React, { useEffect, useState } from "react";
import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getUserData } from "../../localstorage/access-token-repository";
import { UsuarioDTO } from "../../models/usuario";
import * as usuarioLogadoService from '../../service/usuarioLogoadoService';


const logoHeader = 'https://i.postimg.cc/JnzYtqZJ/Esta-o-siba-250-x-150-mm-3.png'


    const Header = () => {
        const [userName, setUserName] = useState<UsuarioDTO>(); // Estado para armazenar o nome do usuário
    
        useEffect(() => {
         usuarioLogadoService.findMe()
         .then(response => {
            setUserName(response.data);
            console.log(response.data);
         })
         .catch(error => {
            console.log("error", error);
         })

        }, []);
    
        return (
            <header className="main-header">
                <div className="logo-img">
                    <Link to="/inicio">
                        <img src={logoHeader} alt="Logo da Empresa" />
                    </Link>
                </div>
                <div className="login-container">
                    <span><FontAwesomeIcon icon={faUser} /></span> 
                    <h2> {userName?.nome}</h2> {/* Exibe o nome do usuário se estiver logado */}
                </div>
            </header>
        );
    };
    
export default Header;