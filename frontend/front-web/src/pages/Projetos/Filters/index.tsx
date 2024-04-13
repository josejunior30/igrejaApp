import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './styles.css';
import { projetosDTO } from "../../../models/projetos";
import { findById } from "../../../service/projetosService";



const BarraAlunos = () =>{

  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const [projetosDTO, setProjetosDTO] = useState<projetosDTO>();
  useEffect(() => {
    const loadProjetoById = async (id: number) => {
        try {
            const response = await findById(Number(id));
            setProjetosDTO(response.data);
        } catch (error) {
            console.error("Erro ao buscar detalhes do projeto:", error);
        }
    };

    if (id) {
        loadProjetoById(Number(id));
    }
}, [id]);

  return(

   <div className="barra-container alunos-actions">
     
     <Link to= "#">
      <button className="barra-alunos">
      Assitencia Social
      </button>
      </Link>
      <Link to={`/enviarChamada/${projetosDTO?.id}`}>
      <button className="barra-alunos">
      Lista Presença
      </button>
      </Link>
      <Link to= "/enviarRelatorio">
      <button className="barra-alunos">
      Relatórios
      </button>
      </Link>
      <Link to= "/adicionarAlunos">
      <button className="barra-alunos">
        Adicionar alunos
      </button>
      </Link>
   </div> 

);

};
export default BarraAlunos;