import { useEffect, useState } from "react";
import './styles.css';
import { useParams } from "react-router-dom";
import 'jspdf-autotable';import 'jspdf-autotable';
import Header from "../../../components/Header";
import { AlunoPG, Pagamento } from "../../../models/pagamento";
import { findPagamentosByAluno } from "../../../service/pagamentoService";
import {  findById } from "../../../service/alunosService";
import { PiPrinterFill } from "react-icons/pi";
import jsPDF from "jspdf";



const AlunoPagamentos = () => {
  const { id } = useParams<{ id: string }>();
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [aluno, setAluno] = useState<AlunoPG | null>(null);

  // Mapeamento de ordem dos meses
  const mesReferenciaOrder: { [key: string]: number } = {
    "JANEIRO": 1,
    "FEVEREIRO": 2,
    "MARCO": 3,
    "ABRIL": 4,
    "MAIO": 5,
    "JUNHO": 6,
    "JULHO": 7,
    "AGOSTO": 8,
    "SETEMBRO": 9,
    "OUTUBRO": 10,
    "NOVEMBRO": 11,
    "DEZEMBRO": 12,
  };

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        try {
          // Buscar os pagamentos
          const pagamentosResponse = await findPagamentosByAluno(Number(id));
          console.log("Pagamentos recebidos:", pagamentosResponse);

          // Verificar e ordenar pagamentos
          const sortedPagamentos = pagamentosResponse.sort((a, b) => {
            const aMes = mesReferenciaOrder[a.mesReferencia] || 0;
            const bMes = mesReferenciaOrder[b.mesReferencia] || 0;
            return aMes - bMes;
          });

          console.log("Pagamentos ordenados:", sortedPagamentos);
          setPagamentos(sortedPagamentos);

          // Buscar o aluno
          const alunoResponse = await findById(Number(id));
          setAluno(alunoResponse.data);

        } catch (err) {
          console.error("Erro ao carregar dados:", err);
          setError('Erro ao carregar dados.');
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [id]);
 

  const handlePrint = () => {
    const doc = new jsPDF();
    const margin = 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const tableStartY = 40;
    const rowHeight = 10;
    const columnWidths = [20, 35, 40, 50, 40];
    const tableWidth = columnWidths.reduce((a, b) => a + b, 0);

    // Adicionar o título
    doc.setFontSize(18);
    doc.text(`Histórico de Pagamentos - ${aluno?.nome || 'Aluno Não Encontrado'}`, margin, margin + 10);
    doc.setFontSize(12);
    doc.text(`Curso: ${aluno?.projetos.nome || 'Curso Não Encontrado'}`, margin, margin + 20);

    // Desenhar cabeçalho da tabela
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text('#', margin, tableStartY);
    doc.text('Valor', margin + columnWidths[0], tableStartY);
    doc.text('Data de Pagamento', margin + columnWidths[0] + columnWidths[0], tableStartY);
    doc.text('Forma de Pagamento', margin + columnWidths[0] + columnWidths[1] + columnWidths[2], tableStartY);
    doc.text('Mês de Referência', margin + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], tableStartY);

    // Desenhar linhas do cabeçalho
    doc.setLineWidth(0.75);
    doc.line(margin, tableStartY + 2, margin + tableWidth, tableStartY + 2); // Linha de cabeçalho

    // Desenhar linhas da tabela
    let yOffset = tableStartY + rowHeight;
    pagamentos.forEach((pagamento, index) => {
      doc.text((index + 1).toString(), margin, yOffset);
      doc.text(pagamento.valor.toString(), margin +3 + columnWidths[0], yOffset);
      doc.text(new Date(pagamento.dataPagamento).toLocaleDateString(), margin +5 + columnWidths[0] + columnWidths[0], yOffset);
      doc.text(pagamento.formaPagamento, margin +6 + columnWidths[0] + columnWidths[1] + columnWidths[2], yOffset);
      doc.text(pagamento.mesReferencia, margin +6 + columnWidths[0] + columnWidths[1] + columnWidths[2] + columnWidths[3], yOffset);

      yOffset += rowHeight;
    });

    doc.save('historico_pagamentos.pdf');
  };


  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center mt-5 pt-5">
          <div className="col-11 col-md-7 mt-5">
            <h3 className="text-center" id="PG-titulo">
              Histórico de Pagamentos:
            </h3>
            <p className="text-center" id="PG-nome">{aluno?.nome || 'Aluno Não Encontrado'}</p>
            <p className="text-center" id="PG-curso">{aluno?.projetos.nome || 'Aluno Não Encontrado'}</p>
            <div className="img-print-membro">
                 
                    <button onClick={handlePrint} className="mr-2"><PiPrinterFill /> Imprimir</button>
              
                </div>
            {loading && <p>Carregando...</p>}
            {error && <p>{error}</p>}
            {!loading && !error && pagamentos.length === 0 && <p>Não há pagamentos para este aluno.</p>}
            {!loading && !error && pagamentos.length > 0 && (
              <table className="table table-striped mb-5" id="col-tab-alunos-2">
                <thead className="thead">
                  <tr>
                    <th scope="col">#</th> {/* Coluna de numeração */}
                    <th scope="col">Valor</th>
                    <th scope="col">Data de Pagamento</th>
                    <th scope="col">Forma de Pagamento</th>
                    <th scope="col">Mês de Referência</th>
                  </tr>
                </thead>
                <tbody>
                  {pagamentos.map((pagamento, index) => (
                    <tr key={pagamento.id}>
                      <td>{index + 1}</td> {/* Numeração sequencial */}
                      <td>{pagamento.valor}</td>
                      <td>{new Date(pagamento.dataPagamento).toLocaleDateString()}</td>
                      <td>{pagamento.formaPagamento}</td>
                      <td>{pagamento.mesReferencia}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};


export default AlunoPagamentos;



