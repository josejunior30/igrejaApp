import { useEffect, useState } from "react";
import { Transacao } from "../../../models/transacao";
import * as TransacaoService from "../../../service/TransacaoService";
import Header from "../../../components/Header";
import "./styles.css";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PiTrashFill } from "react-icons/pi";

const TransacaoExibir = () => {
  const [transacao, setTransacao] = useState<Transacao[]>([]);
  const [filteredTransacao, setFilteredTransacao] = useState<Transacao[]>([]);
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [mostrarGanhos, setMostrarGanhos] = useState(false);
  const [mostrarDespesas, setMostrarDespesas] = useState(false);

  useEffect(() => {
    if (mes && ano) {
      TransacaoService.findByMesAno(mes, ano)
        .then((response) => {
          setTransacao(response.data);
          setFilteredTransacao(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [mes, ano]);

  useEffect(() => {
    if (!mostrarGanhos && !mostrarDespesas) {
      setFilteredTransacao(transacao);
    } else {
      const filtrado = transacao.filter(
        (t) =>
          (mostrarGanhos && t.isReceita) || (mostrarDespesas && !t.isReceita)
      );
      setFilteredTransacao(filtrado);
    }
  }, [transacao, mostrarGanhos, mostrarDespesas]);

  const handleFetchAnual = () => {
    TransacaoService.findByAno(ano)
      .then((response) => {
        setTransacao(response.data);
        setFilteredTransacao(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar transações do ano:", error);
      });
  };

  const getCorBackground = (isReceita: boolean) => {
    return isReceita ? "ganho-bg" : "despesa-bg";
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    doc.text("Relatório de Transações", 14, 10);

    //@ts-ignore
    doc.autoTable({
      startY: 20,
      head: [["Data", "Descrição", "Valor (R$)", "Tipo", "Tipo de Despesa"]],
      body: filteredTransacao.map((t) => [
        new Date(t.data).toLocaleDateString(),
        t.descricao,
        t.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 }),
        t.isReceita ? "Ganho" : "Despesa",
        t.tipoDespesa || "-",
      ]),
    });

    doc.save("relatorio_transacoes.pdf");
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Tem certeza que deseja excluir esta transação?")) {
      TransacaoService.deleteTransacao(id)
        .then(() => {
          setTransacao((prevState) => prevState.filter((t) => t.id !== id));
          setFilteredTransacao((prevState) =>
            prevState.filter((t) => t.id !== id)
          );
          alert("Transação excluída com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao excluir transação:", error);
          alert("Erro ao excluir a transação.");
        });
    }
  };

  const handleSearch = (descricao: string) => {
    if (descricao.trim() !== "") {
      TransacaoService.findBybuscarPorDescricao(descricao)
        .then((response) => {
          setFilteredTransacao(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar transações por descrição:", error);
        });
    } else {
      setFilteredTransacao(transacao);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-11 mt-5">
            {/* Filtros de Mês e Ano */}

            <div className="col-md-5 offset-4">
              <div className="d-flex justify-content-center mb-4">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Insira a descrição"
                  onChange={(e) => handleSearch(e.target.value)}
                />

                <select
                  className="form-select mx-2"
                  value={mes}
                  onChange={(e) => setMes(Number(e.target.value))}
                >
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("pt-BR", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>

                <select
                  className="form-select mx-2"
                  value={ano}
                  onChange={(e) => setAno(Number(e.target.value))}
                >
                  {[...Array(5)].map((_, i) => (
                    <option key={i} value={new Date().getFullYear() - i}>
                      {new Date().getFullYear() - i}
                    </option>
                  ))}
                </select>

                <button
                  className="btn btn-secondary mx-3"
                  onClick={handleFetchAnual}
                >
                  Anual
                </button>
              </div>
            </div>

            {/* Checkboxes de Filtro e Botões de Impressão */}
            <div className="d-flex offset-4 align-items-center mb-3">
              <div className="form-check mx-2">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={mostrarGanhos}
                  onChange={() => setMostrarGanhos(!mostrarGanhos)}
                />
                <label className="form-check-label">Mostrar Ganhos</label>
              </div>

              <div className="form-check mx-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={mostrarDespesas}
                  onChange={() => setMostrarDespesas(!mostrarDespesas)}
                />
                <label className="form-check-label">Mostrar Despesas</label>
              </div>

              <button className="btn btn-secondary mx-3" onClick={handlePrint}>
                Imprimir
              </button>
            </div>

            {/* Tabela de Transações */}
            <table className="table table-striped text-center">
              <thead className="thead">
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Tipo de Despesa</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransacao.length > 0 ? (
                  filteredTransacao.map((t) => (
                    <tr key={t.id}>
                      <td>{new Date(t.data).toLocaleDateString()}</td>
                      <td>{t.descricao}</td>
                      <td>
                        R$
                        {t.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td className={getCorBackground(t.isReceita)}>
                        {t.isReceita ? "Ganho" : "Despesa"}
                      </td>
                      <td>{t.tipoDespesa || "-"}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(t.id)}
                        >
                          <PiTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>Nenhuma transação encontrada</td>
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

export default TransacaoExibir;
