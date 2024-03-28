import React from "react";
import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";


const logoHeader = 'https://i.postimg.cc/JnzYtqZJ/Esta-o-siba-250-x-150-mm-3.png'
const Header = () =>(

<header className="main-header">


<div className="logo-img">
<Link to="/">
        <img src={logoHeader} alt="Logo da Empresa" />
        </Link>
    </div>
   

    <div className="login-container">
    <span><FontAwesomeIcon icon={faUser} /></span> 
        <h2>Login</h2>
      
    </div>
</header>

);

export default Header;