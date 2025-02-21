import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";
import * as requerimentoService from "../../../service/requerimentoService";
import {
  Produto,
  requerimentoOrçamento,
  StatusRequerimento,
} from "../../../models/requerimentoOrçamento";
import Header from "../../../components/Header";

const RequerimentoDetalhe: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [requerimento, setRequerimento] =
    useState<requerimentoOrçamento | null>(null);
  const [total, setTotal] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await requerimentoService.findById(Number(id));
          setRequerimento(response.data || null);
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do requerimento:", error);
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (requerimento) {
      const novoTotal = requerimento.produto.reduce(
        (acc, p) => acc + p.preço * (p.quantidade || 1),
        0
      );
      setTotal(novoTotal);
    }
  }, [requerimento]);

  const handleGoBack = () => {
    navigate("/requerimento");
  };

  if (!requerimento) {
    return <p>Carregando...</p>;
  }

  return (
    <>
      <Header />
      <div className="container-fluid mt-4 pt-5">
        <div className="row mt-5">
          <div className="container col-md-8 col-12" id="relatorio-view">
            <h3>Relatório de Orçamento</h3>
            <p>
              <strong>Responsável:</strong> {requerimento.responsavel}
            </p>
            <p>
              <strong>Local:</strong> {requerimento.local}
            </p>
            <p>
              <strong>Data do Evento:</strong>{" "}
              {new Date(requerimento.dataEvento).toLocaleDateString()}
            </p>
            <p>
              <strong>O que vai ser feito?</strong> {requerimento.pergunta1}
            </p>
            <p>
              <strong>Motivo:</strong> {requerimento.pergunta2}
            </p>
            <p>
              <strong>Data da Aprovaçao: </strong>
              {new Date(requerimento.dataAprovacao).toLocaleDateString()}
            </p>
            <p>
              <strong>Data da Pagamento: </strong>
              {new Date(requerimento.dataPagamento).toLocaleDateString()}
            </p>

            <h4>Produtos:</h4>
            <ul className="list-group">
              {requerimento.produto.map((p: Produto, index: number) => (
                <li key={index} className="list-group-item">
                  {p.nome} - R${p.preço.toFixed(2)} - Quantidade:{" "}
                  {p.quantidade ?? "Não informado"}
                </li>
              ))}
            </ul>

            <h4 className="mt-4">Total: R$ {total.toFixed(2)}</h4>

            <div className="col-12 mt-5 mb-5 text-center">
              <button className="btn btn-primary" onClick={handleGoBack}>
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequerimentoDetalhe;
