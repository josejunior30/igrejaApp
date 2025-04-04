import { useEffect, useState } from "react";
import * as OrdemServicoService from "../../../service/OrdemServicoService";
import { OrdemServico } from "../../../models/ordemServico";

const ExibirOrdem = () => {
  const [ordensServico, setOrdensServico] = useState<OrdemServico[]>([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <table className="table table-striped text-center">
            <thead className="thead">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Descrição</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={3}>Carregando dados...</td>
                </tr>
              ) : ordensServico.length > 0 ? (
                ordensServico.map((ordem) => (
                  <tr key={ordem.id}>
                    <td>{ordem.id}</td>
                    <td>{ordem.descricao}</td>
                    <td>{ordem.statusOrdem}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3}>Nenhuma ordem encontrada.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExibirOrdem;