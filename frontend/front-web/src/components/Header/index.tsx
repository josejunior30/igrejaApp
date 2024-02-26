import React from "react";
import './styles.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const Header = () =>(

<header className="main-header">

    
    <div className="logo-text">
        <span  className="logo-text-1">APP</span>
        <span  className="logo-text-2"> SIBAPE</span>
       
    </div>
  
    <div className="login-container">
    <span><FontAwesomeIcon icon={faUser} /></span> 
        <h2>Login</h2>
      
    </div>
</header>

);

export default Header;