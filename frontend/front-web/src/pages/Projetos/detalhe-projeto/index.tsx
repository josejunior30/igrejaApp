import React, { useEffect, useState } from "react";
import { projetosDTO } from "../../../models/projetos";
import { Link, useParams } from "react-router-dom";
import * as projetosService from '../../../service/projetosService';
import Sidebar from "../../../components/sidebar";

import './styles.css';

import BarraAlunos from "../Filters";
import Header from "../../../components/Header";
import { TiArrowBack } from "react-icons/ti";

const DetalheProjetos = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const [projetosDTO, setProjetosDTO] = useState<projetosDTO>();
  const [loading, setLoading] = useState(true);

  const loadProjetosDTO = (id: string) => {
    projetosService.findById(Number(id))
      .then(response => {
        console.log("Detalhes do Membro:", response.data);
        setProjetosDTO(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes do membro:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      loadProjetosDTO(id);
    }
  }, [id]);
  useEffect(() => {
    console.log("Dados de projetosDTO:", projetosDTO);
  }, [projetosDTO]);

  return (
    <>
 <Header/>
 <div className="voltar-projetos-detalhes pt-3">
    <Link to="/projetos">
      <TiArrowBack />  Voltar
    </Link>
  </div>
      
      <BarraAlunos/>
      <div className="container-fluid">
        <div className="row justify-content-center pt-4 " id="row-alunos">
          <div className="col-11 col-md-7"   id="col-tab-alunos" >
          {projetosDTO && (
          <table className="table  table-striped  text-center " >
            <thead className="thead">
              <tr>
                <th scope="col">Nascimento</th>
                <th scope="col">Nome</th>
                <th scope="col">Idade</th>
                <th scope="col">Telefone</th>
          
              
              </tr>
            </thead>
            <tbody>
              {projetosDTO.alunos && (
                projetosDTO.alunos.map((aluno) => (
                  <tr key={aluno.id} >

                    <td>
                    <Link to={`/alunos/${aluno.id}`}  className="dados-alunos">
                  {aluno.dataNascimento
                    ? new Date(aluno.dataNascimento).toLocaleDateString()
                    : "Data de Nascimento Não Disponível"}
                    </Link>
                </td>
                    <td >
                    <Link to={`/alunos/${aluno.id}`} className="dados-alunos">
                      {aluno.nome}
                      </Link>
                   </td>
                    <td > 
                    <Link to={`/alunos/${aluno.id}`} className="dados-alunos">
                      {aluno.idade}
                      </Link>
                      </td>
                    <td>
                    <Link to={`/alunos/${aluno.id}`}  className="dados-alunos">
                      {aluno.telefone}
                      </Link>

                  </td>
            
                </tr>
                ))
              )}
            </tbody>
          </table>
        )}
          </div>

        </div>
        
      </div>
    </>
  );
 };

export default DetalheProjetos;
