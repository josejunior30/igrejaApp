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


const logoHeader = 'https://i.postimg.cc/rp1CWvCZ/Esta-o-siba-250-x-150-mm-250-x-50-mm.png'
const navigate = useNavigate;
   
const Header = () => {
        
    const { contextTokenPayload, setContextTokenPayload} = useContext(ContextToken);
        const [userName, setUserName] = useState<UsuarioDTO>(); 
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
function redefinirsenha(){
    navigate("/redefinirsenha")
}
           
        return (
            
            <div className="container-fluid vertical fixed-top" >
                <div className="row align-items-center"  id="cabeçalho">
                    <div className="col-5 col-md-7">
                    <Link to="/inicio">
                    <img src={logoHeader} alt="Logo da Empresa" id="logo"className="img-fluid"/>
                  </Link>
                    </div>
                    <div className="col-5 col-md-4 " onClick={toggleMenu} id="usuario">
                    <h2><i className="bi bi-person-circle"></i> {userName?.nome}</h2>
                    {showMenu && (
                      
                        <button type="button" className="btn btn-secondary" onClick={redefinirsenha}>Redefinir Senha</button>
                       
                    )}
                </div>
                <div className="col-1 " id="sair-header">
                <span onClick={handleLogoutClick}>Sair</span>
                </div>
         </div>
        </div>
                

        );
    };
    
export default Header;