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
  const [totalPesquisa, setTotalPesquisa] = useState<number>(0);
  const [termoPesquisa, setTermoPesquisa] = useState<string>("");

  useEffect(() => {
    if (mes && ano) {
      TransacaoService.findByMesAno(mes, ano)
        .then((response) => {
          setTransacao(response.data);
          aplicarFiltros(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
        });
    }
  }, [mes, ano]);

  useEffect(() => {
    aplicarFiltros(transacao);
  }, [transacao, mostrarGanhos, mostrarDespesas]);

  const handleFetchAnual = () => {
    TransacaoService.findByAno(ano)
      .then((response) => {
        setTransacao(response.data);
        aplicarFiltros(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar transações do ano:", error);
      });
  };

  const handleSearch = (descricao: string) => {
    setTermoPesquisa(descricao); // Atualiza o estado do termo pesquisado

    if (descricao.trim() !== "") {
      TransacaoService.findBybuscarPorDescricao(descricao)
        .then((response) => {
          aplicarFiltros(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar transações por descrição:", error);
        });
    } else {
      aplicarFiltros(transacao);
    }
  };

  const aplicarFiltros = (lista: Transacao[]) => {
    let filtrado = lista;

    if (mostrarGanhos || mostrarDespesas) {
      filtrado = lista.filter(
        (t) =>
          (mostrarGanhos && t.isReceita) || (mostrarDespesas && !t.isReceita)
      );
    }

    setFilteredTransacao(filtrado);
    calcularTotal(filtrado);
  };

  const calcularTotal = (lista: Transacao[]) => {
    const total = lista.reduce((acc, t) => acc + t.valor, 0);
    setTotalPesquisa(total);
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
      didParseCell: function (data: any) {
        if (data.row.section === "body" && data.column.index === 3) {
          // Se for despesa, aplica cor vermelha
          if (data.cell.raw === "Despesa") {
            data.cell.styles.textColor = [255, 0, 0]; // Vermelho
          }
        }
      },
    });

    // Se houver pesquisa, adiciona o total de transações filtradas
    if (termoPesquisa.trim() !== "") {
      doc.text(
        `Total das Transações Filtradas: ${totalPesquisa.toLocaleString(
          "pt-BR",
          { style: "currency", currency: "BRL" }
        )}`,
        14,

        //@ts-ignore
        doc.autoTable.previous.finalY + 10
      );
    }

    doc.save("relatorio_transacoes.pdf");
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-11 mt-5">
            {/* Filtros de Mês, Ano e Pesquisa */}
            <div className="col-md-5 offset-4">
              <div className="d-flex justify-content-center mb-4">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Insira a descrição"
                  value={termoPesquisa}
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

           

            {/* Exibir Total SOMENTE se houver pesquisa */}
            {termoPesquisa.trim() !== "" && (
              <div className="text-center mt-2 totalFiltro">
                <h5>Total das Transações Filtradas:</h5>
                <p>
                  <strong>
                    {totalPesquisa.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </strong>
                </p>
              </div>
            )}
            <div className="col-12 text-end mb-2">
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
