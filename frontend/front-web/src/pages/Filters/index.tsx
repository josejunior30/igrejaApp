import React from "react";
import { Link } from "react-router-dom";

const Filters = () =>(

   <div className="filters-container records-actions">
       <p className="seletor">  pesquisar por:</p>
     
       <label >
     
        <select value="">
          <option value="nome">Nome</option>
          <option value="idade">Idade</option>
          <option value="sexo">Sexo</option>
        </select>
        </label>
     
      <input/>
      <button type="submit" className="clean-filters">Pesquisar</button>
    <div> 
      <Link to= "/membro/adicionar">
          <button className="add-membro"> Adicionar </button>
           
      </Link>
      </div>
     
   </div> 

);


export default Filters;