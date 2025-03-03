import { useState, useEffect } from "react";
import {
  findAllContaPagar,
  insertContaPagar,
  updateStatus,
} from "../../../service/ContaPagarService";
import { contaPagar, StatusPagamento } from "../../../models/contaPagar";
import Header from "../../../components/Header";
import "./styles.css";
const ContaPagar = () => {
  const [contas, setContas] = useState<contaPagar[]>([]);
  const [novaConta, setNovaConta] = useState<Partial<contaPagar>>({
    descricao: "",
    dataVencimento: new Date(),
    valor: 0,
  });

  // Buscar todas as contas ao carregar o componente
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
      const formattedValue = formatCurrencyInput(value);
      setNovaConta((prev) => ({
        ...prev,
        valor: parseFloat(formattedValue.replace(/\D/g, "")) / 100, // Mantém o valor como número internamente
      }));
    } else {
      setNovaConta((prev) => ({
        ...prev,
        [name]: name === "dataVencimento" ? new Date(value) : value,
      }));
    }
  };

  const formatCurrencyInput = (value: string): string => {
    let numericValue = value.replace(/\D/g, ""); // Remove tudo que não for número
    numericValue = (parseInt(numericValue, 10) / 100).toFixed(2); // Ajusta para decimal

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(parseFloat(numericValue));
  };

  // Formatar data para o input date (YYYY-MM-DD)
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  // Submissão do formulário
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await insertContaPagar(novaConta);

      if (response && response.data) {
        alert("Conta cadastrada com sucesso!");

        // Atualiza a lista de contas
        setContas((prev) => [...prev, response.data]);

        // Resetar o formulário
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
      await updateStatus(id, StatusPagamento.PAGO);
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
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <h2 className="mt-3">Cadastro de Conta a Pagar</h2>
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
                <label className="form-label  label-conta">
                  Data de Vencimento
                </label>
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
                  value={formatCurrencyInput((novaConta.valor ?? 0).toString())}
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

        <div className="row">
          <div className="col-md-12">
            <table className="table table-striped mt-4">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Lancamento</th>
                  <th>Descrição</th>
                  <th>Data de Vencimento</th>
                  <th>Valor</th>
                  <th>Status</th>
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
                        {new Date(conta.dataVencimento).toLocaleDateString(
                          "pt-BR"
                        )}
                      </td>

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
