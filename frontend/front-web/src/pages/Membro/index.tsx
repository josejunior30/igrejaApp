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
  const formatPhoneNumber = (phoneNumber:any) => {
    phoneNumber.replace(/\D/g, '');
    return `55${ phoneNumber}`;
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
  <div className="row justify-content-center">
    <div className="col-md-10 col-11 mt-5 pt-5 offset-1">
      <div className="row pt-3">
        <div className="container col-11 col-md-7 mt-5">
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
              <button type="submit" className="btn btn-primary me-2" id="btn-pesquisa" onClick={handleSearch}>
                Pesquisar
              </button>
              <Link to="/membro/adicionar">
                <button className="btn btn-primary">Adicionar</button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row pt-2 justify-content-center">
    
        <div className="col-11 col-md-10">
          <div className="img-print-membro ">
            <Link to="#">
              <button onClick={handlePrint}>
                <PiPrinterFill /> Imprimir
              </button>
            </Link>
          </div>
          <h3 className="text-center" id="membros">Membros</h3>
          <table className="table table-striped text-center"  ref={componentRef}>
            <thead className="thead">
              <tr>
                <th scope="col">Índice</th>
                <th scope="col">Data de Nascimento</th>
                <th scope="col">Nome</th>
                <th scope="col">Status</th>
                <th scope="col">Telefone</th>
              </tr>
            </thead>
            <tbody>
                    {MembroDTO.length > 0 ? (
                      MembroDTO.map((membro, index) => (
                        <tr
                          key={membro.id}
                          className={membro.status === false ? 'afastado' : ''}
                        >
                          <td><Link to={`${membro.id}`} className="name-link">{index + 1}</Link></td>
                          <td>
                          <Link to={`${membro.id}`} className="name-link">
                            {membro.dataNascimento
                              ? new Date(membro.dataNascimento).toLocaleDateString()
                              : "Data de Nascimento Não Disponível"}
                           </Link>
                          </td>
                          <td>
                            <Link to={`${membro.id}`} className="name-link">
                              {membro.nome} {membro.sobrenome}
                            </Link>
                          </td>
                          <td >
                          <Link to={`${membro.id}`} className="name-link">
                            {membro.status ? "ativo" : "afastado"}
                            </Link>
                          </td>
                          <td>
                            <Link to={`https://wa.me/${formatPhoneNumber(membro.telefone)}`} target="_blank" className="name-link">
                              <i className="bi bi-whatsapp"></i> {membro.telefone}
                            </Link>
                          </td>
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


