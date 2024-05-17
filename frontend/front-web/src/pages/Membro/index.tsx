import React, { useEffect, useRef, useState } from "react";
import './styles.css';

import { Link } from "react-router-dom";
import { MembroDTO } from "../../models/membro";
import *as membroService from '../../service/membroService';
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";

import { PiPrinterFill } from "react-icons/pi";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';




const Membro = () => {
  const [MembroDTO, setMembroDTO] = useState<MembroDTO[]>([]);
  const componentRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredMembros, setFilteredMembros] = useState<MembroDTO[]>([]);
  
  useEffect(() => {
   membroService.findAll()
      .then(response => {
        console.log("Dados recebidos:", response.data);
        setMembroDTO(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
        // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
      });
  }, []);
  const handleSearch = async () => {
    try {
      const response = await membroService.findByNome(searchTerm);
      setMembroDTO(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
    }
  };
  
  const handlePrint = () => {
    const doc = new jsPDF();
  
    //@ts-ignore
    doc.autoTable({
      head: [['Data de Nascimento', 'Nome', 'Idade', 'Email', 'Telefone']],
      body: MembroDTO.map((membro) => [
        membro.dataNascimento
          ? new Date(membro.dataNascimento).toLocaleDateString()
          : "Data de Nascimento Não Disponível",
        `${membro.nome} ${membro.sobrenome}`,
        membro.idade,
        membro.email,
        membro.telefone,
      ]),
    });
  
    doc.save('membros.pdf');
  };
  
  return (
    <>
    <Header/>
<Sidebar/>
<div className="container-fluid">

  <div className="row  justify-content-center">

    <div className="col-md-10 col-11 mt-5 pt-5 offset-1">

    <div className="row pt-3">
            <div className="container col-11 col-md-7 mt-5 ">
            
                  <div className="row justify-content-center p-3" id="barra-pesquisa-secretaria">
                      <div className="col-md-5 col-4">
                      <input
                          value={searchTerm}
                          placeholder="Digite um nome"
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="form-control"
                        />
                              </div>
                        <div className="col-md-7 col-8" id="botoes">
                            <button type="submit"  className="btn btn-primary me-2 " id="btn-pesquisa" onClick={handleSearch}>Pesquisar</button>
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
                <button onClick={handlePrint}><PiPrinterFill /> Imprimir</button>
              </Link>
            </div>
      <table className="table table-striped text-center " id="col-tab-alunos-2" ref={componentRef} >
        <thead className="thead">
          <tr>
            <th scope="col">Data de Nascimento</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Telefone</th>
          </tr>
        </thead>

        <tbody>
          {MembroDTO.length > 0 ? (
            MembroDTO.map((membro) => (
              <tr key={membro.id}>
                <td>
                  {membro.dataNascimento
                    ? new Date(membro.dataNascimento).toLocaleDateString()
                    : "Data de Nascimento Não Disponível"}
                </td>
                <td>
                  <Link to={`${membro.id}`} className="name-link">
                    {membro.nome} {membro.sobrenome}
                  </Link>
                </td>
                <td>
                  <Link to={`${membro.id}`} className="name-link">
                    {membro.email}
                </Link>
                </td>
                <td>{membro.telefone}</td>
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

export default Membro;


