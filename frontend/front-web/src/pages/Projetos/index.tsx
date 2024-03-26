import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import './styles.css';
import { projetosDTO } from "../../models/projetos";
import *as projetosService from '../../service/projetosService';
import BarraAlunos from "./Filters";

const Projetos = () => {
    const [projetosDTO, setProjetosDTO] = useState<projetosDTO[]>([]);
    const fotoCoordenador = 'https://i.postimg.cc/zGdVdHpN/gilson.png';
    useEffect(() => {
     projetosService.findAll()
        .then(response => {
          console.log("Dados recebidos:", response.data);
          setProjetosDTO(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar dados:", error);
          // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
        });
    }, []);
    return(
    <>
    <Header/>
    <div className="projeto-container">
      
                <div className="coordenador">
                    <img src={fotoCoordenador} alt="Foto do coordenador" className="foto-coordenador" />
                    <span className="text-coordenador">Coordenador de Projetos: </span>
                    <span className="nome-coordenador">Gilson Ornelas</span>
                    
                    </div>
    
<div className="projetos-linha">
      {projetosDTO.length > 0 ? (
          projetosDTO.map((projeto) => (
           
            <div key={projeto.id} className="pj-container">
            <Link to={`${projeto.id}`}>
              <div className="linha-container">
              <img src={projeto.foto_lider} alt="Foto do líder" className="foto-projeto" />
                <div className="text-coordenador">{projeto.nome}</div>
                <div className="text-lider-projeto">Líder (a): {projeto.lider}</div>
              
              </div>
              </Link>
            </div>
            
            ))
          ) : (
            <tr>
              <td colSpan={5}>Carregando dados...</td>
            </tr>
          )}

        </div>
   </div>
    <Link to="/inicio">
     <button className="btn-celula-voltar">Voltar </button>
     </Link>
        

</>
    )
};

export default Projetos;