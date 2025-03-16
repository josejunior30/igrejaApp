import { useNavigate, useParams } from "react-router-dom";
import {
  Produto,
  requerimentoOrçamento,
  StatusRequerimento,
} from "../../../models/requerimentoOrçamento";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { findById, updateStatus } from "../../../service/requerimentoService";
import Header from "../../../components/Header";
import "./styles.css";

const RequerimentoAprovar: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const loadingImage = "/imagens/loading.gif";
  const [loading, setLoading] = useState(false);
  const [requerimento, setRequerimento] = useState<requerimentoOrçamento>({
    id: 0,
    dataRequerimento: new Date(),
    dataEvento: new Date(),
    dataPagamento: new Date(),
    dataAprovacao: new Date(),
    statusRequerimento: StatusRequerimento.PENDENTE,
    responsavel: "",
    emailResponsavel: "",
    createdByRequerimento: "",
    local: "",
    Total: 0,
    pergunta1: "",
    conta_pagar_id:0,
    pergunta2: "",
    produto: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await findById(Number(id));
          console.log("Dados do requerimento:", response.data);

          if (response.data) {
            setRequerimento({
              ...response.data,
              Total: response.data.total || 0,
              dataAprovacao: response.data.dataAprovacao
                ? new Date(response.data.dataAprovacao)
                : new Date(),
            });
          }
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do requerimento:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateClick = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (id && requerimento) {
      updateStatus(
        Number(id),
        StatusRequerimento[requerimento.statusRequerimento]
      )
        .then((response) => {
          console.log(
            "Status do requerimento atualizado com sucesso:",
            response.data
          );
          setLoading(false);
          alert("Atualização feita com sucesso!");
          navigate("/requerimento");
        })
        .catch((error) => {
          console.error("Erro ao atualizar status do requerimento:", error);
          alert("Erro ao atualizar status do requerimento. Tente novamente.");
        });
    }
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setRequerimento((prevRequerimento) => ({
      ...prevRequerimento,
      [name]:
        name === "dataEvento"
          ? new Date(value)
          : name === "statusRequerimento"
          ? (value as unknown as StatusRequerimento)
          : value,
    }));
  };
  const formatarValor = (valor: string) => {
    const valorNumerico = valor.replace(/\D/g, "");
    if (valorNumerico === "") return "0,00";

    const valorFormatado = (Number(valorNumerico) / 100).toLocaleString(
      "pt-BR",
      {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }
    );

    return valorFormatado;
  };
  useEffect(() => {
    const novoTotal = requerimento.produto.reduce(
      (acc, p) => acc + (p.preço || 0) * (p.quantidade || 1),
      0
    );

    setRequerimento((prev) => ({ ...prev, Total: novoTotal }));
  }, [requerimento.produto]);

  const handleGoBack = () => {
    navigate(-1);
  };
  const formatarDataArray = (dataArray: number[]): string => {
    if (Array.isArray(dataArray) && dataArray.length === 3) {
      const data = new Date(dataArray[0], dataArray[1] - 1, dataArray[2]);
      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();
      return `${dia}/${mes}/${ano}`;
    }
    return "";
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-4 pt-5">
        <div className="container col-md-8 col-12" id="relatorio-add">
          <form onSubmit={handleUpdateClick} className="row p-4 g-4">
            <h3>Relatório de Orçamento</h3>

            <div className="col-4 col-md-4">
              <label htmlFor="responsavel" className="form-label">
                Responsável:
              </label>
              <input
                type="text"
                className="form-control"
                name="responsavel"
                value={requerimento.responsavel}
                readOnly
              />
            </div>

            <div className="col-4 col-md-4">
              <label htmlFor="local" className="form-label">
                Local:
              </label>
              <input
                type="text"
                className="form-control"
                name="local"
                value={requerimento.local}
                readOnly
              />
            </div>

            <div className="col-4 col-md-4">
              <label htmlFor="dataEvento" className="form-label">
                Data do Evento:
              </label>
              <input
                type="text"
                className="form-control"
                name="dataEvento"
                value={
                  Array.isArray(requerimento.dataPagamento)
                    ? formatarDataArray(requerimento.dataPagamento)
                    : ""
                }
                readOnly
              />
            </div>

            <div className="col-12">
              <label htmlFor="O que vai ser feito ?" className="form-label">
                O que vai ser feito?
              </label>
              <input
                type="text"
                className="form-control"
                name="O que vai ser feito ?"
                value={requerimento.pergunta1}
                readOnly
              />
            </div>

            <div className="col-12">
              <label
                htmlFor="Qual o motivo de ser feito ?"
                className="form-label"
              >
                Qual o motivo de ser feito?
              </label>
              <input
                type="text"
                className="form-control"
                name="Qual o motivo de ser feito ?"
                value={requerimento.pergunta2}
                readOnly
              />
            </div>

            <div className="mt-3">
              <label htmlFor="produtos" className="form-label mt-3">
                Produtos Adicionados:
              </label>
              <ul className="list-group">
                {requerimento.produto && requerimento.produto.length > 0 ? (
                  requerimento.produto.map((p: Produto, index: number) => (
                    <li key={index} className="list-group-item">
                      {p.nome} - R${p.preço.toFixed(2)} - quantidade:{" "}
                      {p.quantidade}
                    </li>
                  ))
                ) : (
                  <li className="list-group-item">
                    Nenhum produto adicionado.
                  </li>
                )}
              </ul>
            </div>

            <div className="col-4 col-md-3 mb-5">
              <label htmlFor="Total" className="form-label">
                Total:
              </label>
              <input
                type="text"
                className="form-control"
                name="Total"
                value={`R$ ${requerimento.Total.toFixed(2)}`}
                readOnly
              />
            </div>
            <div
              className="col-12 d-flex text-center justify-content-center gap-4"
              id="aprovacao"
            >
              <div className="col-12 col-md-3">
                <label htmlFor="dataAprovacao" className="form-label">
                  Data Aprovação:
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dataAprovacao"
                  value={
                    requerimento.dataAprovacao instanceof Date
                      ? requerimento.dataAprovacao.toISOString().split("T")[0]
                      : new Date().toISOString().split("T")[0] // Garante um valor válido
                  }
                  onChange={(e) =>
                    setRequerimento({
                      ...requerimento,
                      dataAprovacao: new Date(e.target.value),
                    })
                  }
                />
              </div>

              <div className="col-md-3">
                <label htmlFor="statusRequerimento" className="form-label">
                  Status:
                </label>
                <select
                  className="form-select"
                  name="statusRequerimento"
                  value={requerimento.statusRequerimento}
                  onChange={handleChange}
                >
                  <option value={StatusRequerimento.PENDENTE}>
                    {StatusRequerimento[StatusRequerimento.PENDENTE]}
                  </option>
                  <option value={StatusRequerimento.RECUSADO}>
                    {StatusRequerimento[StatusRequerimento.RECUSADO]}
                  </option>
                  <option value={StatusRequerimento.APROVADO}>
                    {StatusRequerimento[StatusRequerimento.APROVADO]}
                  </option>
                </select>
              </div>
            </div>

            <div className="col-12  mt-5 mb-5 text-center">
              {loading ? (
                <img
                  src={loadingImage}
                  alt="Carregando..."
                  className="rounded mx-auto d-block "
                  id="loading-image"
                />
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{
                    backgroundColor: "var(--color-coral)",
                    border: "none",
                  }}
                >
                  Enviar
                </button>
              )}
            </div>
          </form>
        </div>

        <div
          className="row justify-content-center mt-5 mb-5"
          id="btn-voltar-relatorio"
        >
          <div className="col-12 text-center">
            <button className="btn btn-primary" onClick={handleGoBack}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequerimentoAprovar;
