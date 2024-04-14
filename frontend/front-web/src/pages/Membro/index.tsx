import React, { useEffect, useRef, useState } from "react";
import './styles.css';
import Filters from "../Filters";
import { Link } from "react-router-dom";
import { MembroDTO } from "../../models/membro";
import *as membroService from '../../service/membroService';
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import { useReactToPrint } from 'react-to-print';
import { PiPrinterFill } from "react-icons/pi";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
import { UserOptions } from 'jspdf-autotable';



const Membro = () => {
  const [MembroDTO, setMembroDTO] = useState<MembroDTO[]>([]);
  const componentRef = useRef(null);
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
    <div className="page-container" >
      <Filters />
      <div className="img-print-membro">
        <Link to="#">
            <button onClick={handlePrint}><PiPrinterFill /> Imprimir</button>
          </Link>
        </div>
      <table className="records-table" cellPadding="0" cellSpacing="0" ref={componentRef} >
        <thead>
          <tr>
            <th>Data de Nascimento</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Telefone</th>
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
                  {membro.idade}
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
    </>
  );
};

export default Membro;
function html2pdf() {
  throw new Error("Function not implemented.");
}

