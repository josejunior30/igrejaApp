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
 <div className="voltar-projetos-detalhes">
    <Link to="/projetos">
      <TiArrowBack />  Voltar
    </Link>
  </div>
      <div className="alunos-pj-container">
      <BarraAlunos/>
        {projetosDTO && (
          <table className="alunos-table" cellPadding="0" cellSpacing="0">
            <thead>
              <tr>
                <th>Nascimento</th>
                <th>Nome</th>
                <th>Idade</th>
                <th>Identidade</th>
                <th>Telefone</th>
              
              </tr>
            </thead>
            <tbody>
              {projetosDTO.alunos && (
                projetosDTO.alunos.map((aluno) => (
                  <tr key={aluno.id}>
                    <td>
                  {aluno.dataNascimento
                    ? new Date(aluno.dataNascimento).toLocaleDateString()
                    : "Data de Nascimento Não Disponível"}
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
                    <Link to={`/alunos/${aluno.id}`} className="dados-alunos">
                      {aluno.rg}
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
    </>
  );
 };

export default DetalheProjetos;
