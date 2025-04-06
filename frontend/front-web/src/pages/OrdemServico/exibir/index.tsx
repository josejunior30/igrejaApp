// File: ExibirOrdem.tsx
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
  const [servicoSelecionado, setServicoSelecionado] =
    useState<ServicoDTO | null>(null);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

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
    // Remove duplicações de materiais por id
    const materiaisUnicos = servico.materialObra.filter(
      (mat, index, self) => index === self.findIndex((m) => m.id === mat.id)
    );

    const servicoLimpo = { ...servico, materialObra: materiaisUnicos };

    setServicoSelecionado(servicoLimpo);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setServicoSelecionado(null);
    setModalOpen(false);
  };

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rid) => rid !== id) : [...prev, id]
    );
  };

  const handleToggleCheckin = (
    materialId: number,
    index: number,
    currentState: boolean
  ) => {
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

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Relatório do Serviço", pageWidth / 2, cursorY, {
      align: "center",
    });
    cursorY += 6;
    doc.setDrawColor(100);
    doc.line(margin, cursorY, pageWidth - margin, cursorY);
    cursorY += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      `Data de Emissão: ${new Date().toLocaleString("pt-BR")}`,
      margin,
      cursorY
    );
    cursorY += 8;
    doc.text(`ID Serviço: ${servicoSelecionado.id}`, margin, cursorY);
    cursorY += 8;
    doc.text(`Descrição: ${servicoSelecionado.descricao}`, margin, cursorY);
    cursorY += 8;
    doc.text(`Status: ${servicoSelecionado.statusServico}`, margin, cursorY);
    cursorY += 12;

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

    const footerY = doc.internal.pageSize.getHeight() - 15;
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("Sistema de Gestão de Ordens de Serviço", pageWidth / 2, footerY, {
      align: "center",
    });

    doc.save(`servico_${servicoSelecionado.id}.pdf`);
  };
  const formatarStatusServico = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return "Pendente";
      case "EM_ANDAMENTO":
        return "Em andamento";
      case "CONCLUIDA":
        return "Concluída";
      default:
        return status;
    }
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case "PENDENTE":
        return "status-pendente";
      case "EM_ANDAMENTO":
        return "status-andamento";
      case "CONCLUIDA":
        return "status-concluida";
      default:
        return "";
    }
  };

  return (
    <>
      <div className="row justify-content-center pt-5">
        <div className="col-8">
          <table className="table table-striped text-center mb-5">
            <thead className="thead ">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Descrição</th>
                <th scope="col">Serviços</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4}>Carregando...</td>
                </tr>
              ) : (
                ordensServico.map((ordem) => (
                  <>
                    <tr key={ordem.id}>
                      <td>{ordem.id}</td>
                      <td>{ordem.descricao}</td>
                      <td className="lista-serviços">
                        {ordem.servicos.length > 1 ? (
                          <div className="servico-toggle-wrapper">
                            <div
                              onClick={() => abrirModal(ordem.servicos[0])}
                              className="servico-click"
                            >
                              {ordem.servicos[0].descricao}
                            </div>
                            <span
                              onClick={() => toggleRow(ordem.id!)}
                              className="servico-seta"
                            >
                              ▼
                            </span>
                          </div>
                        ) : (
                          <div
                            onClick={() => abrirModal(ordem.servicos[0])}
                            className="servico-click"
                          >
                            {ordem.servicos[0].descricao}
                          </div>
                        )}
                      </td>
                      <td>{ordem.statusOrdem}</td>
                    </tr>
                    {expandedRows.includes(ordem.id!) &&
                      ordem.servicos.slice(1).map((servico) => (
                        <tr
                          key={`${ordem.id}-${servico.id}`}
                          className="sub-row"
                        >
                          <td></td>
                          <td
                            colSpan={2}
                            onClick={() => abrirModal(servico)}
                            className="servico-click-menu"
                          >
                            ↳ {servico.descricao}
                          </td>
                          <td></td>
                        </tr>
                      ))}
                  </>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && servicoSelecionado && (
        <div className="modal-overlay-ordem" onClick={fecharModal}>
          <div
            className="modal-content-ordem"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="modal-close" onClick={fecharModal}>
              &times;
            </button>

            <button
              onClick={handlePrint}
              className="btn btn-success mb-2 offset-9"
            >
              Imprimir
            </button>

            <h5 className="titulo-materias">Detalhes do Serviço</h5>
            <p>
              <strong>Nº Serviço:</strong> {servicoSelecionado.id}
            </p>
            <p>
              <strong>Descrição:</strong> {servicoSelecionado.descricao}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={getStatusClass(servicoSelecionado.statusServico)}
              >
                {formatarStatusServico(servicoSelecionado.statusServico)}
              </span>
            </p>

            <h5 className="titulo-materias">Materiais</h5>
            {servicoSelecionado.materialObra.length > 0 ? (
              <ul>
                {servicoSelecionado.materialObra.map((mat, idx) => (
                  <li
                    key={mat.id}
                    className="material-item align-content-center"
                  >
                    <div
                      className="mt-3"
                      onClick={() =>
                        handleToggleCheckin(mat.id, idx, mat.checkInConfirmado)
                      }
                    >
                      <span>{mat.nome}</span>
                      <div>
                        <label className="switch">
                          <input
                            type="checkbox"
                            checked={mat.checkInConfirmado}
                            readOnly
                          />
                          <span className="slider round"></span>
                        </label>
                      </div>
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
