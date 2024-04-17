import React, { useEffect, useRef, useState } from "react";
import { alunosDTO } from "../../../models/alunos";
import *as alunosService from "../../../service/alunosService";

import { Link } from "react-router-dom";

import Sidebar from "../../../components/sidebar";
import Header from "../../../components/Header";
import { PiPrinterFill } from "react-icons/pi";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';

const Alunos = () => {
  const componentRef = useRef(null);
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
      
    const handlePrint = () => {
      const doc = new jsPDF();
    
      //@ts-ignore
      doc.autoTable({
        head: [['Data de Nascimento', 'Nome', 'Idade', 'Identidade', 'Telefone', 'Projetos']],
        body: alunosDTO.map((alunos) => [
          alunos.dataNascimento
            ? new Date(alunos.dataNascimento).toLocaleDateString()
            : "Data de Nascimento Não Disponível",
          `${alunos.nome} `,
          alunos.idade,
          alunos.rg,
          alunos.telefone,
          alunos.projetos.nome
        ]),
      });
    
      doc.save('alunos.pdf');
    };
    
  
    return (

        <>
         <Header/>
   <Sidebar/>
      <div className="page-container">
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
      <Link to= "/adicionarAlunos">
          <button className="add-membro"> Adicionar </button>
           
      </Link>
      </div>
     
   </div> 
   <div className="img-print-membro">
        <Link to="#">
            <button onClick={handlePrint}><PiPrinterFill /> Imprimir</button>
          </Link>
        </div>
        <table className="records-table" cellPadding="0" cellSpacing="0" ref={componentRef}>
          <thead>
            <tr>
              <th>Data de Nascimento</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Identidade</th>
              <th>Telefone</th>
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
                  <td>
                    <Link to={`${aluno.id}`} className="name-link">
                      {aluno.telefone}
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
  