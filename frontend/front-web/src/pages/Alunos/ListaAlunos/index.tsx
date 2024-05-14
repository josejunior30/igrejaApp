import React, { useEffect, useRef, useState } from "react";
import { alunosDTO } from "../../../models/alunos";
import *as alunosService from "../../../service/alunosService";
import './styles.css';
import { Link } from "react-router-dom";

import Sidebar from "../../../components/sidebar";
import Header from "../../../components/Header";
import { PiPrinterFill } from "react-icons/pi";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';


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
     <div className="container-fluid  ">

  

    <div className="row justify-content-center ">
    

      <div className="col-11 col-md-10 mt-5 pt-5 offset-1">

      <div className="row pt-3">
          <div className="container col-11 col-md-6 mt-5 ">
          
                <div className="row justify-content-center p-3" id="barra-pesquisa-secretaria">
                    <div className="col-md-5 col-4">
                        <input value=""
                            placeholder="Digite um nome"
                            className="form-control"
                          />
                            </div>
                          <div className="col-md-7 col-8" id="botoes">
                          <button type="submit" className="btn btn-primary me-2" id="btn-pesquisa">Pesquisar</button>
                          <Link to= "/membro/adicionar">
                                <button className="btn btn-primary"> Adicionar </button>
                                  
                            </Link>
                      </div>
                        

                      
                </div>
          </div>

        </div>
              
            <div className="row pt-2 justify-content-center">

                                  <div className="col-11 col-md-11  " >
                                  <div className="img-print-membro">
                                          <Link to="#">
                                              <button onClick={handlePrint} className="mr-2"><PiPrinterFill /> Imprimir</button>
                                            </Link>
                                          </div>
                                      
                                                <table className="table table-striped " ref={componentRef} id="col-tab-alunos-2">
                                                        <thead className="thead">
                                                              <tr>
                                                                <th scope="col">Data de Nascimento</th>
                                                                <th scope="col">Nome</th>
                                                                <th scope="col">Idade</th>
                                                                <th scope="col">Telefone</th>
                                                                <th scope="col">Projeto</th>
                                                            
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
             </div>

      </div>
 
  
    </div>


 
 </div>
      </>
    );
  };
  
  export default Alunos;
  