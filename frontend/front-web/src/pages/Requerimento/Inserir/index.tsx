
import { useState, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

import "./styles.css";
import {
  Produto,
  requerimentoOrçamento,
} from "../../../models/requerimentoOrçamento";
import Header from "../../../components/Header";
import { StatusRequerimento } from "../../../models/requerimentoOrçamento";
import { insertRequerimento } from "../../../service/requerimentoService";

const RequerimentoOrçamento: React.FC = () => {
  const navigate = useNavigate();
  const loadingImage = "/imagens/loading.gif";
  const [loading, setLoading] = useState(false);
  const [requerimentoOrçamento, setRequerimentoOrçamento] =
    useState<requerimentoOrçamento>({
      id: 0,
      dataRequerimento: new Date(),
      dataEvento: new Date(),
      dataPagamento: new Date(),
      dataAprovacao: new Date(),
      statusRequerimento: StatusRequerimento.PENDENTE,
      emailResponsavel: "",
      responsavel: "",
      createdByRequerimento:"",
      local: "",
      Total: 0,
      pergunta1: "",
      pergunta2: "",
      produto: [],
    });

  const [newProduto, setNewProduto] = useState<
    Produto & { quantidade: number }
  >({
    id: 0,
    nome: "",
    preço: 0,
    quantidade: 1, 
  });

  const formatarDataEvento = (data: any) => {
    const dataValida = new Date(data);
    if (!isNaN(dataValida.getTime())) {
      return dataValida.toISOString().split("T")[0];
    }
    return "";
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setRequerimentoOrçamento((prevData: any) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleProductChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setNewProduto((prevProduto) => ({
      ...prevProduto,
      [name]:
        name === "preço" || name === "quantidade" ? Number(value) || 1 : value,
    }));
  };

  const handleAddProduct = () => {
    if (
      !newProduto.nome ||
      newProduto.preço <= 0 ||
      newProduto.quantidade <= 0
    ) {
      alert("Preencha corretamente os dados do produto!");
      return;
    }

    setRequerimentoOrçamento((prevState) => {
      const novoProduto: Produto = {
        id: prevState.produto.length + 1,
        nome: newProduto.nome,
        preço: newProduto.preço,
        quantidade: newProduto.quantidade, 
      };

      console.log("Produto adicionado:", novoProduto);

      const novoTotal = (
        prevState.Total +
        novoProduto.preço * novoProduto.quantidade
      ).toFixed(2);

      return {
        ...prevState,
        produto: [...prevState.produto, novoProduto],
        Total: parseFloat(novoTotal),
      };
    });

    setNewProduto({ id: 0, nome: "", preço: 0, quantidade: 1 });
  };

  const handlePrecoChange = (e: ChangeEvent<HTMLInputElement>) => {
    let valor = e.target.value.replace(/\D/g, ""); 

    if (valor === "") valor = "0";

    let valorNumerico = (parseInt(valor, 10) / 100).toFixed(2); 

    setNewProduto((prevProduto) => ({
      ...prevProduto,
      preço: parseFloat(valorNumerico), 
    }));
  };
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    console.log(
      "Requerimento antes do POST:",
      JSON.stringify(requerimentoOrçamento, null, 2)
    );
    setLoading(true);
    try {

      const response = await insertRequerimento(requerimentoOrçamento);

      console.log("Resposta da API:", response.data);
      alert("Requerimento enviado com sucesso!");

     
      setRequerimentoOrçamento({
        id: 0,
        dataRequerimento: new Date(),
        dataEvento: new Date(),
        dataPagamento: new Date(),
        dataAprovacao: new Date(),
        statusRequerimento: StatusRequerimento.PENDENTE,
        emailResponsavel: "",
        responsavel: "",
        local: "",
        Total: 0,
        createdByRequerimento: "",
        pergunta1: "",
        pergunta2: "",
        produto: [],
      });

    } catch (error) {
      console.error("Erro ao enviar requerimento:", error);
      alert("Erro ao enviar o requerimento. Por favor, tente novamente.");
    }finally{
      setLoading(false);
    }
};

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-4 pt-5">
        <div className="container col-md-8 col-12" id="relatorio-add">
          <form onSubmit={handleSubmit} className="row p-4 g-4">
            <h3>Relatório de Orçamento</h3>


            <div className="col-md-4">
              <label htmlFor="responsavel" className="form-label">
                Responsável:
              </label>
              <input
                type="text"
                className="form-control"
                name="responsavel"
                value={requerimentoOrçamento.responsavel}
                onChange={handleChange}
                placeholder="Nome do responsável"
                required
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="local" className="form-label">
                Local:
              </label>
              <input
                type="text"
                className="form-control"
                name="local"
                value={requerimentoOrçamento.local}
                onChange={handleChange}
                placeholder="Local do evento"
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="local" className="form-label">
                email:
              </label>
              <input
                type="email"
                className="form-control"
                name="emailResponsavel"
                value={requerimentoOrçamento.emailResponsavel}
                onChange={handleChange}
                placeholder="Local do evento"
                required
              />
            </div>
       
            <div className="col-md-4">
              <label htmlFor="dataEvento" className="form-label">
                Data do Evento:
              </label>
              <input
                type="date"
                className="form-control"
                name="dataEvento"
                value={formatarDataEvento(requerimentoOrçamento.dataEvento)}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="dataEvento" className="form-label">
                Data limite para pagamento:
              </label>
              <input
                type="date"
                className="form-control"
                name="dataPagamento"
                value={formatarDataEvento(requerimentoOrçamento.dataPagamento)}
                onChange={handleChange}
                required
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
                value={requerimentoOrçamento.pergunta1}
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
                name="pergunta2"
                value={requerimentoOrçamento.pergunta2}
                onChange={handleChange}
                placeholder="Motivo da ação"
                required
              />
            </div>

            <div className=" col-md-4">
              <label htmlFor="nome" className="form-label">
                Produto:
              </label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={newProduto.nome}
                onChange={handleProductChange}
                placeholder="Nome do produto"
              />
            </div>

            <div className=" col-5 col-md-3">
              <label htmlFor="preço" className="form-label">
                Preço do Produto:
              </label>
              <input
                type="text"
                className="form-control"
                name="preço"
                value={newProduto.preço.toFixed(2).replace(".", ",")} // 🔹 Sempre exibe corretamente
                onChange={handlePrecoChange}
                placeholder="Preço do produto"
                required
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
                onChange={handleProductChange}
                placeholder="Quantidade"
                required
              />
            </div>

            <div className="col-1 col-md-3">
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
                {requerimentoOrçamento.produto.map((prod, index) => (
                  <li className="list-group-item" key={index}>
                    {prod.nome} - R$ {prod.preço.toFixed(2).replace(".", ",")} -
                    Quantidade: {prod.quantidade} - SubTotal: R${" "}
                    {(prod.preço * prod.quantidade)
                      .toFixed(2)
                      .replace(".", ",")}
                  </li>
                ))}
              </ul>
            </div>
            <label>
              Total: R${" "}
              {requerimentoOrçamento.Total.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </label>

            <div className="d-grid gap-2 col-md-6 mx-auto mt-5">
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
                      id="btn-logar"
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
          <div className="col-12 col-md-8 text-center">
            <button className="btn btn-primary " onClick={handleGoBack}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequerimentoOrçamento;
