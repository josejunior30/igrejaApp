import { useEffect, useState } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as OrdemServicoService from "../../../service/OrdemServicoService";
import { OrdemServicoDTO, ServicoDTO } from "../../../models/ordemServico";
import "./styles.css";

const ExibirOrdem = () => {
  const [ordensServico, setOrdensServico] = useState<OrdemServicoDTO[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<ServicoDTO | null>(null);

  useEffect(() => {
    OrdemServicoService.findAll()
      .then((response) => {
        setOrdensServico(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }, []);

  const abrirModal = (servico: ServicoDTO) => {
    setServicoSelecionado(servico);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setServicoSelecionado(null);
    setModalOpen(false);
  };

  const handleToggleCheckin = (materialId: number, index: number, currentState: boolean) => {
    const novoValor = !currentState;

    OrdemServicoService.patchMaterial(materialId, novoValor)
      .then(() => {
        if (!servicoSelecionado) return;

        const updatedServ = { ...servicoSelecionado };
        updatedServ.materialObra = updatedServ.materialObra.map((m, i) =>
          i === index ? { ...m, checkInConfirmado: novoValor } : m
        );
        setServicoSelecionado(updatedServ);
      })
      .catch((error) => {
        console.error("Erro ao atualizar check-in:", error);
      });
  };

  const handlePrint = () => {
    if (!servicoSelecionado) return;
  
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 15;
    let cursorY = 20;
  
    // Título principal
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Relatório do Serviço", pageWidth / 2, cursorY, { align: "center" });
  
    // Linha separadora
    cursorY += 6;
    doc.setDrawColor(100);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 10;
  
    // Informações básicas
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(`Data de Emissão: ${new Date().toLocaleString("pt-BR")}`, margin, cursorY);
    cursorY += 8;
    doc.text(`ID Serviço: ${servicoSelecionado.id}`, margin, cursorY);
    cursorY += 8;
    doc.text(`Descrição: ${servicoSelecionado.descricao}`, margin, cursorY);
    cursorY += 8;
    doc.text(`Status: ${servicoSelecionado.statusServico}`, margin, cursorY);
    cursorY += 12;
  
    // Tabela de materiais
    if (servicoSelecionado.materialObra.length > 0) {
      const tableData = servicoSelecionado.materialObra.map((mat) => [
        mat.id,
        mat.nome,
        mat.checkInConfirmado
          ? {
              content: "ok",
              styles: { textColor: [0, 150, 0] as [number, number, number] },
            }
          : {
              content: "X",
              styles: { textColor: [200, 0, 0] as [number, number, number] },
            },
      ]);
      
      
      autoTable(doc, {
        head: [["ID", "Nome do Material", "Check-in"]],
        body: tableData,
        startY: cursorY,
        margin: { left: margin, right: margin },
        styles: { halign: "center" },
        headStyles: {
          fillColor: [41, 128, 185],
          textColor: 255,
          fontStyle: "bold",
        },
      });
      
    } else {
      doc.text("Nenhum material registrado.", margin, cursorY);
    }
  
    // Rodapé
    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Sistema de Gestão de Ordens de Serviço", pageWidth / 2, footerY, {
      align: "center",
    });
  
    // Salvar
    doc.save(`servico_${servicoSelecionado.id}.pdf`);
  };

  return (
    <>
      <div className="row justify-content-center pt-5">
        <div className="col-8">

        
        <table className="table table-striped text-center">
          <thead className="thead ">
            <tr>
              <th>ID</th>
              <th>Descrição</th>
              <th>Serviços</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4}>Carregando...</td>
              </tr>
            ) : (
              ordensServico.map((ordem) => (
                <tr key={ordem.id}>
                  <td>{ordem.id}</td>
                  <td>{ordem.descricao}</td>
                  <td>
                    {ordem.servicos?.map((servico) => (
                      <div
                        key={servico.id}
                        className="servico-click"
                        onClick={() => abrirModal(servico)}
                      >
                        {servico.descricao}
                      </div>
                    ))}
                  </td>
                  <td>{ordem.statusOrdem}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      </div>
      {modalOpen && servicoSelecionado && ordensServico && (
        <div className="modal-overlay-ordem" onClick={fecharModal}>
          <div className="modal-content-ordem" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={fecharModal}>&times;</button>

            <button onClick={handlePrint}>Imprimir</button>
            <h5 className="titulo-materias">Detalhes do Serviço</h5>
            <p><strong>Nº Serviço:</strong> {servicoSelecionado.id}</p>
            <p><strong>Descrição:</strong> {servicoSelecionado.descricao}</p>
            <p><strong>Status:</strong> {servicoSelecionado.statusServico}</p>

            <h5 className="titulo-materias">Materiais</h5>
            {servicoSelecionado.materialObra.length > 0 ? (
              <ul>
                {servicoSelecionado.materialObra.map((mat, idx) => (
                  <li key={idx} className="material-item">
                    <div className="mt-3" onClick={() => handleToggleCheckin(mat.id, idx, mat.checkInConfirmado)}>
                      <span>{mat.nome}</span>
                      <label className="switch">
                        <input type="checkbox" checked={mat.checkInConfirmado} readOnly />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum material registrado.</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ExibirOrdem;
