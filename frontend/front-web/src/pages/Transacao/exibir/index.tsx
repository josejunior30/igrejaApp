import { useEffect, useState } from "react";
import { Transacao } from "../../../models/transacao";
import * as TransacaoService from "../../../service/TransacaoService";
import Header from "../../../components/Header";
import "./styles.css";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Importação necessária para tabelas no PDF
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

  // Método para definir a classe CSS de fundo para "Ganho" e "Despesa"
  const getCorBackground = (isReceita: boolean) => {
    return isReceita ? "ganho-bg" : "despesa-bg";
  };

  // Método para definir a cor do texto no PDF (Verde para ganhos, Vermelho para despesas)
  const getTextColor = (isReceita: boolean) => {
    return isReceita ? [0, 128, 0] : [255, 0, 0]; // Verde para Ganhos, Vermelho para Despesas
  };
  // Método para gerar um PDF com os dados da tabela
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
        t.valor.toFixed(2),
        t.isReceita ? "Ganho" : "Despesa",
        t.tipoDespesa || "-",
      ]),
      didParseCell: function (data: any) {
        if (data.section === "body" && data.column.index === 3) {
          const isReceita = data.cell.text[0] === "Ganho";
          data.cell.styles.textColor = getTextColor(isReceita);
        }
      },
    });

    doc.save("relatorio_transacoes.pdf");
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir esta transação?");
    if (confirmed) {
      TransacaoService.deleteTransacao(id)
        .then(() => {
          setTransacao((prevState) => prevState.filter((t) => t.id !== id));
          setFilteredTransacao((prevState) => prevState.filter((t) => t.id !== id));
          alert("Transação excluída com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao excluir transação:", error);
          alert("Erro ao excluir a transação.");
        });
    }
  };
  
  return (
    <>
      <Header />

      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-11 mt-5 offset-1">
            {/* Filtros de Mês e Ano */}
            <div className="col-4 offset-4">
              <div className="d-flex justify-content-center mb-4">
                {/* Filtro de Mês */}
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

                {/* Filtro de Ano */}
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
              </div>
            </div>

            {/* Checkboxes de Filtro e Botões de Impressão */}
            <div className="d-flex justify-content-center align-items-center mb-3">
              <div className="form-check mx-3">
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
                      <td>R${t.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</td>

                      <td className={getCorBackground(t.isReceita)}>
                        {t.isReceita ? "Ganho" : "Despesa"}
                      </td>
                      <td>{t.tipoDespesa || "-"}</td>
                      <td>
                        <button className="btn btn-danger " onClick={() => handleDelete(t.id)}>
                          <PiTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>Nenhuma transação encontrada</td>
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
