import React from "react";
import { Link } from "react-router-dom";
import './styles.css';
const BarraAlunos = () =>(

   <div className="barra-container alunos-actions">
     
     <Link to= "adicionar">
      <button className="barra-alunos">
      Assitencia Social
      </button>
      </Link>
      <Link to= "/chamada">
      <button className="barra-alunos">
      Lista Presença
      </button>
      </Link>
      <Link to= "/enviarRelatorio">
      <button className="barra-alunos">
      Relatórios
      </button>
      </Link>
      <Link to= "/adicionar/alunos">
      <button className="barra-alunos">
        Adicionar alunos
      </button>
      </Link>
   </div> 

);


export default BarraAlunos;