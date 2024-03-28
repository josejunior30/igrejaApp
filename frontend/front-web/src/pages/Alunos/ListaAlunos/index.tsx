import React, { useEffect, useState } from "react";
import { alunosDTO } from "../../../models/alunos";
import *as alunosService from "../../../service/alunosService";

import { Link } from "react-router-dom";
import Filters from "../../Filters";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/Header";



const Alunos = () => {
    const [alunosDTO, setAlunosDTO] = useState<alunosDTO[]>([]);
    const [alunos, setAlunos] = useState<alunosDTO[]>([]);

    useEffect(() => {
     alunosService.findAll()
        .then(response => {
          console.log("Dados recebidos:", response.data);
          setAlunosDTO(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar dados:", error);
          // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
        });
    }, []);
  
    return (

        <>
         <Header/>
   <Sidebar/>
      <div className="page-container">
        <Filters />
        <table className="records-table" cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>Data de Nascimento</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Identidade</th>
              <th>Projeto</th>
          
            </tr>
          </thead>
  
          <tbody>
            {alunosDTO.length > 0 ? (
              alunosDTO.map((aluno) => (
                <tr key={aluno.id}>
                  <td>
                    {aluno.dataNascimento
                      ? new Date(aluno.dataNascimento).toLocaleDateString()
                      : "Data de Nascimento Não Disponível"}
                  </td>
                  <td>
                    <Link to={`${aluno.id}`} className="name-link">
                      {aluno.nome}
                    </Link>
                  </td>
                  <td>
                  <Link to={`${aluno.id}`} className="name-link">
                    {aluno.idade}
                    </Link>
                  </td>
                  <td>
                    <Link to={`${aluno.id}`} className="name-link">
                      {aluno.rg}
                  </Link>
                  </td>
                  {aluno.projetos && (
                       
                          <td>
                            <Link to="#" className="name-link">
                              {aluno.projetos.nome}
                            </Link>
                          </td>
                         
                      )}
                 
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>Carregando dados...</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </>
    );
  };
  
  export default Alunos;
  