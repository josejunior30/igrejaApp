import { useEffect, useState } from "react";
import * as OrdemServicoService from "../../../service/OrdemServicoService";
import { OrdemServico, Servico } from "../../../models/ordemServico";
import "./styles.css";

const ExibirOrdem = () => {
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [servicoSelecionado, setServicoSelecionado] = useState<Servico | null>(null);

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

  const abrirModal = (servico: Servico) => {
    setServicoSelecionado(servico);
    setModalOpen(true);
  };

  const fecharModal = () => {
    setServicoSelecionado(null);
    setModalOpen(false);
  };

  return (
    <>
      <div className="container -fluid">
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
              <tr><td colSpan={4}>Carregando...</td></tr>
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

      {modalOpen && servicoSelecionado && (
        <div className="modal-overlay-ordem" onClick={fecharModal}>
          <div className="modal-content-ordem" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={fecharModal}>&times;</button>
            <h2>Detalhes do Serviço</h2>
            <p><strong>ID:</strong> {servicoSelecionado.id}</p>
            <p><strong>Descrição:</strong> {servicoSelecionado.descricao}</p>
            <p><strong>Status:</strong> {servicoSelecionado.statusServico}</p>
            <h4>Materiais</h4>
            {servicoSelecionado.materialObra.length > 0 ? (
              <ul>
                {servicoSelecionado.materialObra.map((mat, idx) => (
                  <li key={idx}>
                    {mat.nome} — Check-In: {mat.checkInConfirmado ? "✔️" : "❌"} 
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
