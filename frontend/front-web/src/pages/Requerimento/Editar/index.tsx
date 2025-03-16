import { useState, ChangeEvent, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
import * as requerimentoService from "../../../service/requerimentoService";
import {
  Produto,
  requerimentoOrçamento,
  StatusRequerimento,
} from "../../../models/requerimentoOrçamento";
import Header from "../../../components/Header";

const RequerimentoEditar: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [requerimento, setRequerimento] = useState<requerimentoOrçamento>({
    id: 0,
    dataRequerimento: new Date(),
    dataEvento: new Date(),
    dataPagamento: new Date(),
    dataAprovacao: new Date(),
    statusRequerimento: StatusRequerimento.PENDENTE,
    responsavel: "",
    emailResponsavel: "",
    createdByRequerimento:"",
    conta_pagar_id:0,
    local: "",
    Total: 0,
    pergunta1: "",
    pergunta2: "",
    produto: [],
  });

  const [newProduto, setNewProduto] = useState<Produto>({
    id: 0,
    nome: "",
    preço: 0,
    quantidade: 1,
  });
  const [atualizado, setAtualizado] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await requerimentoService.findById(Number(id));
          setRequerimento(response.data || {});
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do requerimento:", error);
      }
    };
    fetchData();
  }, [id]);

  const handleUpdateClick = () => {
    if (id && requerimento) {
      setIsUpdating(true);
      requerimentoService
        .updateRequerimento(Number(id), requerimento)
        .then((response) => {
          console.log("Requerimento atualizado com sucesso:", response.data);
          setAtualizado(true);
          alert("Atualização feita com sucesso!");
          navigate("/requerimento");
        })
        .catch((error) => {
          console.error("Erro ao atualizar requerimento:", error);
          alert("Erro ao atualizar requerimento. Tente novamente.");
          setIsUpdating(false);
        });
    }
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
          ? Number(value)
          : value,
    }));
  };

  const handleAddProduct = () => {
    if (newProduto.nome && newProduto.preço > 0) {
      setRequerimento((prevRequerimento) => ({
        ...prevRequerimento,
        produto: [...prevRequerimento.produto, newProduto],
      }));
      setNewProduto({ id: 0, nome: "", preço: 0, quantidade: 1 });
    } else {
      alert("Preencha os campos do produto corretamente!");
    }
  };

  const handleGoBack = () => {
    navigate("/requerimento");
  };
  useEffect(() => {
    const novoTotal = requerimento.produto.reduce(
      (acc, p) => acc + p.preço * (p.quantidade || 1),
      0
    );
    setRequerimento((prev) => ({ ...prev, Total: novoTotal }));
    console.log("Total atualizado:", novoTotal);
  }, [requerimento.produto]);

  const handleRemoveProduct = (index: number) => {
    setRequerimento((prevRequerimento) => ({
      ...prevRequerimento,
      produto: prevRequerimento.produto.filter((_, i) => i !== index),
    }));
  };
  useEffect(() => {
    if (isUpdating && atualizado) {
      navigate("/requerimento");
      setIsUpdating(false);
      setAtualizado(false);
    }
  }, [isUpdating, atualizado, navigate]);

  useEffect(() => {
    const novoTotal = requerimento.produto
      .reduce((acc, p) => acc + p.preço * (p.quantidade || 1), 0) // Soma total
      .toFixed(2); // Garante apenas 2 casas decimais

    setRequerimento((prev) => ({ ...prev, Total: parseFloat(novoTotal) })); // Salva corretamente
  }, [requerimento.produto]);

  return (
    <>
      <Header />
      <div className="container-fluid mt-4 pt-5">
        <div className="container col-md-8 col-12" id="relatorio-add">
          <form className="row p-4 g-4">
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
                onChange={handleChange}
                placeholder="Nome do responsável"
                required
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
                onChange={handleChange}
                placeholder="Local do evento"
                required
              />
            </div>

            <div className="col-4 col-md-4">
              <label htmlFor="dataEvento" className="form-label">
                Data do Evento:
              </label>
              <input
                type="date"
                className="form-control"
                name="dataEvento"
                value={
                  requerimento.dataEvento instanceof Date
                    ? requerimento.dataEvento.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setRequerimento({
                    ...requerimento,
                    dataEvento: new Date(e.target.value),
                  })
                }
              />
            </div>

            <div className="col-12">
              <label htmlFor="O que vai ser feito ?" className="form-label">
                O que vai ser feito?
              </label>
              <input
                type="text"
                className="form-control"
                name="pergunta1"
                value={requerimento.pergunta1}
                onChange={handleChange}
                placeholder="Descrição do que será feito"
                required
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
                onChange={handleChange}
                placeholder="Motivo da ação"
                required
              />
            </div>

            <div className="col-4 col-md-4">
              <label htmlFor="nome" className="form-label">
                Produto:
              </label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={newProduto.nome}
                onChange={(e) =>
                  setNewProduto({ ...newProduto, nome: e.target.value })
                }
                placeholder="Nome do produto"
              />
            </div>

            <div className=" col-md-2">
              <label htmlFor="preço" className="form-label">
                Preço do Produto:
              </label>
              <input
                type="text"
                className="form-control"
                name="preço"
                value={newProduto.preço.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })} // Exibir sempre com 2 casas decimais
                onChange={(e) => {
                  let valorNumerico = e.target.value.replace(/\D/g, ""); // Remove caracteres não numéricos

                  if (!valorNumerico) {
                    valorNumerico = "0"; // Garante que sempre tenha um valor válido
                  }

                  const valorFormatado = (
                    parseInt(valorNumerico, 10) / 100
                  ).toFixed(2); // Sempre insere duas casas decimais
                  setNewProduto({
                    ...newProduto,
                    preço: parseFloat(valorFormatado), // Salva corretamente
                  });
                }}
                placeholder="Preço do produto"
              />
            </div>
            <div className=" col-3 col-md-2">
              <label htmlFor="quantidade" className="form-label">
                Quantidade:
              </label>
              <input
                type="number"
                className="form-control"
                name="quantidade"
                value={newProduto.quantidade}
                onChange={(e) =>
                  setNewProduto({
                    ...newProduto,
                    quantidade: Number(e.target.value),
                  })
                }
                placeholder="Quantidade"
                required
              />
            </div>
            <div className="col-3 col-md-3">
              <button
                type="button"
                className="btn btn-secondary mt-4"
                id="add-produto"
                onClick={handleAddProduct}
              >
                Adicionar
              </button>
            </div>

            <div className=" mt-3">
              <label htmlFor="quantidade" className="form-label mt-3">
                Produtos Adicionados:
              </label>
              <ul className="list-group">
                {requerimento.produto.map((p: Produto, index: number) => (
                  <li
                    key={index}
                    className="list-group-item d-flex justify-content-between"
                  >
                    {p.nome} - R${p.preço.toFixed(2)}
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      onClick={() => handleRemoveProduct(index)}
                    >
                      Remover
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <label>Total: R$ {requerimento.Total}</label>
            <div className="col-12  mt-5 mb-5 text-center">
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  backgroundColor: "var(--color-coral)",
                  border: "none",
                }}
                onClick={handleUpdateClick}
              >
                Atualizar
              </button>
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

export default RequerimentoEditar;
