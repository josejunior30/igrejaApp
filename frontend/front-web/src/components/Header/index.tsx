import React, { useEffect, useState } from "react";
import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { getUserData } from "../../localstorage/access-token-repository";


const logoHeader = 'https://i.postimg.cc/JnzYtqZJ/Esta-o-siba-250-x-150-mm-3.png'


    const Header = () => {
        const [userName, setUserName] = useState(""); // Estado para armazenar o nome do usuário
    
        useEffect(() => {
            // Aqui você pode obter os dados do usuário logado do localStorage
            const userData = getUserData();
    
            // Se houver dados de usuário, atualize o estado com o nome do usuário
            if (userData && userData.name) {
                setUserName(userData.name);
            }
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
                    <h2>{userName ? `Olá, ${userName}` : "teste"}</h2> {/* Exibe o nome do usuário se estiver logado */}
                </div>
            </header>
        );
    };
    
export default Header;