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

  
    <div className="container-fluid mt-5 pt-5">

    <div className="row justify-content-center ">
      <div className="col-12 col-md-7 " id="barra-projeto">
            <Link to= "#">
            <button className="btn btn-primary  ">
            Assitencia Social
            </button>
            </Link>
            <Link to={`/enviarChamada/${projetosDTO?.id}`}>
            <button className="btn btn-primary">
            Lista Presença
            </button>
            </Link>
            <Link to= "/enviarRelatorio">
            <button className="btn btn-primary">
            Relatórios
            </button>
            </Link>
            <Link to= "/adicionarAlunos">
            <button className="btn btn-primary">
              Adicionar alunos
            </button>
            </Link>
      </div>

    </div>
     
     
   </div> 


);

};
export default BarraAlunos;