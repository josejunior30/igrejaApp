import React from "react";
import './styles.css';
import { faUser, faBookBible, faBook } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link } from "react-router-dom";

const Celulas = () =>(

    <div className="celula-container">

        <div className=" pg-container">
        <div className="text-container">
            <h1>Azul</h1>
            <span className="text-lider">LIDER: <span className="icon"><FontAwesomeIcon icon={faUser}/> </span><span className="text-nome">Rhuan</span></span>
            <span className="text-lider">ANFITRIÃO: <span className="icon"><FontAwesomeIcon icon={faUser}/> </span><span className="text-nome">Alex</span></span> 
            </div>
            <button className="btn-celula">Entrar</button>
        </div>
       <div className=" pg-container">
       <div className="text-container">
            <h1>Amarelo</h1>
            <span className="text-lider">LIDER:  <span className="icon"><FontAwesomeIcon icon={faUser}/> </span> <span  className="text-nome">Rhuan</span></span>
            <span className="text-lider">ANFITRIÃO: <span className="icon"><FontAwesomeIcon icon={faUser}/> </span><span className="text-nome">Alex</span></span>  
        </div>
            <button className="btn-celula">Entrar</button>
       </div> 
     <div  className=" pg-container">
     <div className="text-container">
            <h1>Roxo</h1>
            <span className="text-lider">LIDER: <span className="icon"><FontAwesomeIcon icon={faUser}/> </span><span  className="text-nome">Rhuan</span></span>
            <span className="text-lider">ANFITRIÃO: <span className="icon"><FontAwesomeIcon icon={faUser}/> </span><span className="text-nome">Alex</span></span> 
     </div>
            <button className="btn-celula">Entrar</button>
           
            
     </div>
     <div  className=" pg-container">
           <div className="text-container">
           <h1>Laranja</h1>
           <span className="text-lider">LIDER: <span className="icon"><FontAwesomeIcon icon={faUser}/> </span><span></span><span className="text-nome">Rhuan</span></span>
            <span className="text-lider">ANFITRIÃO: <span className="icon"><FontAwesomeIcon icon={faUser}/> </span> <span className="text-nome">Alex</span></span> 
            </div>
            <button className="btn-celula">Entrar</button>
     </div>
     <div  className=" pg-estudo">
           <div className="text-container">
            
           <h1><span><FontAwesomeIcon icon={faBookBible} /></span> ESTUDOS</h1>
            </div>
            <button className="btn-celula">Clique Aqui </button>
     </div>
     <div  className=" pg-relatorio">
           <div className="text-container">
           <h1><span><FontAwesomeIcon icon={faBook} /></span> RELATÓRIOS</h1>
           
            </div>
            <button className="btn-celula">Clique Aqui </button>
     </div>
        <Link to="/inicio">
         <button className="btn-celula">Voltar </button>
         </Link>
            
    </div>
);

export default Celulas;