import { useState, useEffect } from "react";
import {
  findAllContaPagar,
  findByDescricaoAno,
  findByDescricaoMesAndAno,
  insertContaPagar,
  updateStatus,
} from "../../../service/ContaPagarService";
import { contaPagar, StatusPagamento } from "../../../models/contaPagar";
import Header from "../../../components/Header";
import "./styles.css";

const ContaPagar = () => {
  const [contas, setContas] = useState<contaPagar[]>([]);
  const [filtro, setFiltro] = useState({ descricao: "", mes: 0, ano: 2025 });
  const [totalPago, setTotalPago] = useState(0);
  const [novaConta, setNovaConta] = useState<Partial<contaPagar>>({
    descricao: "",
    dataVencimento: new Date(),
    valor: 0,
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await findAllContaPagar();
        setContas(response.data);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      }
    }
    fetchData();
  }, []);

  // Atualizar estado da nova conta dinamicamente
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    if (name === "valor") {
      let valor = value.replace(/\D/g, "");

      if (valor === "") valor = "0";

      let valorNumerico = parseFloat((parseInt(valor, 10) / 100).toFixed(2));

      setNovaConta((prev) => ({
        ...prev,
        valor: valorNumerico || 0,
      }));
    } else {
      setNovaConta((prev) => ({
        ...prev,
        [name]: name === "dataVencimento" ? new Date(value) : value,
      }));
    }
  };

  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await insertContaPagar(novaConta);

      if (response && response.data) {
        alert("Conta cadastrada com sucesso!");
        setContas((prev) => [...prev, response.data]);
        setNovaConta({ descricao: "", dataVencimento: new Date(), valor: 0 });
      } else {
        console.error("Resposta inválida", response);
        alert("Erro ao cadastrar conta!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar conta:", error);
      alert("Erro ao cadastrar conta!");
    }
  };
  const handlePagar = async (id: number) => {
    try {
      await updateStatus(id);
      setContas((prev) =>
        prev.map((conta) =>
          conta.id === id ? { ...conta, status: StatusPagamento.PAGO } : conta
        )
      );
      alert("Status atualizado para APROVADO!");
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status!");
    }
  };

  const handleFiltroChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFiltro((prev) => ({
      ...prev,
      [name]: name === "mes" || name === "ano" ? parseInt(value, 10) : value,
    }));
  };
  const handlePesquisar = async () => {
    if (!filtro.descricao.trim()) {
      alert("Por favor, digite uma descrição para a busca.");
      return;
    }

    try {
      let response;
      const mesValido =
        Number.isInteger(filtro.mes) && filtro.mes > 0 ? filtro.mes : null;

      if (!mesValido) {
        response = await findByDescricaoAno(filtro.ano, filtro.descricao);
      } else {
        response = await findByDescricaoMesAndAno(
          mesValido,
          filtro.ano,
          filtro.descricao
        );
      }

      setContas(response.data);

      const total = response.data
        .filter((conta: contaPagar) => conta.status === StatusPagamento.PAGO)
        .reduce((acc: number, conta: contaPagar) => acc + conta.valor, 0);

      setTotalPago(total);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
      alert("Erro ao buscar contas!");
    }
  };

  const handleLimpar = async () => {
    setFiltro({ descricao: "", mes: 0, ano: 2025 });
    setTotalPago(0);

    try {
      const response = await findAllContaPagar(); 
      setContas(response.data); 
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <h3 className="mt-3 text-center titulo-conta mb-5">
          Cadastro de Conta a Pagar
        </h3>
        <div className="row justify-content-center">
          <div className="col-md-10 ">
            <form onSubmit={handleSubmit} className="d-flex">
              <div className="col-md-3 insert-conta offset-2">
                <label className="form-label label-conta">Descrição</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Descrição"
                  name="descricao"
                  value={novaConta.descricao}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-2 insert-conta">
                <label className="form-label  label-conta">Vencimento</label>
                <input
                  type="date"
                  className="form-control"
                  name="dataVencimento"
                  value={formatDateForInput(novaConta.dataVencimento!)}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-1 insert-conta">
                <label className="form-label  label-conta">Valor</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="R$ 0,00"
                  name="valor"
                  value={(novaConta.valor ?? 0).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} 
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-3 mt-4 pt-2">
                <button type="submit" className="btn btn-primary">
                  Inserir
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
        <h4 className="text-center titulo-pesquisa-paga">Pesquisa contas pagas</h4>
          <div className="col-md-12 d-flex gap-2 offset-5">
         
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Digite a descrição"
                name="descricao"
                value={filtro.descricao}
                onChange={handleFiltroChange}
              />
            </div>
            <div className="col-md-1">
              <select
                className="form-control"
                name="mes"
                value={filtro.mes}
                onChange={handleFiltroChange}
              >
                <option value="0">Mês</option>{" "}
              
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-1">
              <select
                className="form-control"
                name="ano"
                value={filtro.ano}
                onChange={handleFiltroChange}
              >
                {[2024, 2025, 2026].map((ano) => (
                  <option key={ano} value={ano}>
                    {ano}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <button
                className="btn btn-primary btn-pesquisa-pagar"
                onClick={handlePesquisar}
              >
                Pesquisar
              </button>

              <button className="btn btn-secondary" onClick={handleLimpar}>
                Limpar
              </button>
            </div>
          </div>
          <div className="row justify-content-center mt-4">
            <div className="col-md-9 text-right">
              <h3 className="total-pago">
                Total Pago:{" "}
                <span className="text-success">
                  {totalPago.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </h3>
            </div>
          </div>
        </div>
        <div className="row justify-content-center">
          <div className="col-md-11">
            <table className="table table-striped mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Lancamento</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Status</th>
                  <th>Vencimento</th>
                  <th className="text-center">Pagamento</th>
                  <th>Usuario</th>
                </tr>
              </thead>
              <tbody>
                {contas.length > 0 ? (
                  contas.map((conta) => (
                    <tr key={conta.id}>
                      <td>{conta.id}</td>
                      <td>
                        {new Date(conta.dataCriacao).toLocaleDateString(
                          "pt-BR"
                        )}
                      </td>
                      <td>{conta.descricao}</td>

                      <td>
                        R${" "}
                        {conta.valor.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </td>

                      <td
                        style={{
                          color:
                            conta.status === StatusPagamento.ATRASADO
                              ? "#ff3e3e"
                              : "bolder",
                          fontWeight: "bold",
                        }}
                      >
                        {conta.status}
                        {conta.status !== StatusPagamento.PAGO && (
                          <button
                            onClick={() => handlePagar(conta.id)}
                            className="btn btn-success btn-pagar"
                          >
                            Pagar
                          </button>
                        )}
                      </td>
                      <td>
                        {new Date(conta.dataVencimento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </td>
                      <td className="text-center">
                        {conta.dataPagamento
                          ? new Date(conta.dataPagamento).toLocaleDateString("pt-BR")
                          : "-"}
                      </td>
                      <td>{conta.createdBy}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="text-center" colSpan={5}>
                      Nenhuma conta cadastrada
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContaPagar;
