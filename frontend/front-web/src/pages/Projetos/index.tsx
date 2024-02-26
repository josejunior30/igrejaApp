import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import './styles.css';
const Projetos = () => (
    <>
    <Header/>
    <div className="projeto-container">

    <div className=" pj-container">
        <div className="pj-text-container">
            <h1>Jiu-Jtsu</h1>
            <span className="text-lider">LIDER: 
                <span className="icon"><FontAwesomeIcon icon={faUser}/> </span>
                <span className="text-nome">Rhuan</span>
            </span>

        </div>
            <button className="btn-celula">Entrar</button>
        </div>
   
    <Link to="/inicio">
     <button className="btn-celula">Voltar </button>
     </Link>
        
</div>
</>
)

export default Projetos;