import { useEffect, useState } from "react";
import "./styles.css";
import * as FluxoCaixaService from "../../../service/FluxoCaixaService";
import { TransacaoDTO } from "../../../models/transacao";
import * as TransacaoService from "../../../service/TransacaoService";
import { fluxoCaixa } from "../../../models/fluxoCaixa";
import Header from "../../../components/Header";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from "react-router-dom";

const FluxoCaixa = () => {
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [transacao, setTransacao] = useState<TransacaoDTO[]>([]);
  const [fluxo, setFluxo] = useState<fluxoCaixa | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [saldoTotal, setSaldoTotal] = useState<number>(0);
  const [modoAnual, setModoAnual] = useState<boolean>(false);

  useEffect(() => {
    if (mes && ano) {
      TransacaoService.findByMesAno(mes, ano)
        .then((response) => {
          setTransacao(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
          setError("Erro ao carregar transações.");
        });
    }
  }, [mes, ano]);

  useEffect(() => {
    if (mes && ano) {
      TransacaoService.findByMesAno(mes, ano)
        .then((response) => {
          setTransacao(
            response.data.sort(
              (
                a: { data: string | number | Date },
                b: { data: string | number | Date }
              ) => new Date(a.data).getTime() - new Date(b.data).getTime()
            )
          );
        })
        .catch((error) => {
          console.error("Erro ao buscar dados:", error);
          setError("Erro ao carregar transações.");
        });
    }
  }, [mes, ano]);

  useEffect(() => {
    if (mes && ano && !modoAnual) {
      FluxoCaixaService.findByFluxoMes(mes, ano)
        .then((response) => {
          setFluxo(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar fluxo de caixa:", error);
        });
    }
  }, [mes, ano, modoAnual]);

  const handleFetchAnual = () => {
    setModoAnual(true);
    setLoading(true);
    setError(null);

    FluxoCaixaService.findByMesAnoAcumulado(mes, ano)
      .then((response) => {
        setFluxo(response.data);
        setSaldoTotal(response.data.saldoLiquido);
      })
      .catch((error) => {
        console.error("Erro ao buscar fluxo de caixa anual:", error);
        setError("Erro ao carregar fluxo de caixa anual.");
      });

    TransacaoService.findAno(ano)
      .then((response) => {
        setTransacao(
          response.data.sort(
            (
              a: { data: string | number | Date },
              b: { data: string | number | Date }
            ) => new Date(a.data).getTime() - new Date(b.data).getTime()
          )
        );
      })
      .catch((error) => {
        console.error("Erro ao buscar transações do ano:", error);
        setError("Erro ao carregar transações.");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const ganhos = transacao.filter((t) => t.isReceita);
  const despesas = transacao.filter((t) => !t.isReceita);
  const handlePrint = () => {
    const doc = new jsPDF();
    let y = 10; // Posição inicial

    doc.setFontSize(16);
    doc.text("Relatório de Fluxo de Caixa", 14, y);
    y += 10;

    // Tabela de Ganhos
    doc.setFontSize(14);
    doc.text("Ganhos", 14, y);
    y += 5;
    //@ts-ignore
    const ganhosTable = doc.autoTable({
      startY: y,
      head: [["Data", "Descrição", "Valor (R$)"]],
      body: ganhos.map((t) => [
        new Date(t.data).toLocaleDateString(),
        t.descricao,
        t.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      ]),
      didParseCell: (data: any) => {
        if (data.section === "body" && data.column.index === 2) {
          data.cell.styles.textColor = [0, 128, 0]; // Verde para ganhos
        }
      },
    });

    y = ganhosTable.lastAutoTable.finalY + 10; // Atualiza posição Y

    // Tabela de Despesas
    doc.text("Despesas", 14, y);
    y += 5;
    //@ts-ignore
    const despesasTable = doc.autoTable({
      startY: y,
      head: [["Data", "Descrição", "Valor (R$)", "Tipo"]],
      body: despesas.map((t) => [
        new Date(t.data).toLocaleDateString(),
        t.descricao,
        t.valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
        t.tipoDespesa || "N/A",
      ]),
      didParseCell: (data: any) => {
        if (data.section === "body" && data.column.index === 2) {
          data.cell.styles.textColor = [255, 0, 0]; // Vermelho para despesas
        }
      },
    });

    y = despesasTable.lastAutoTable.finalY + 10; // Atualiza posição Y

    // Totais do Fluxo de Caixa
    if (fluxo) {
      doc.text("Resumo do Fluxo de Caixa", 14, y);
      y += 5;
      //@ts-ignore
      doc.autoTable({
        startY: y,
        body: [
          [
            "Receita Total",
            fluxo.receitaTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
          ],
          [
            "Despesa Fixa",
            fluxo.despesaFixa.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
          ],
          [
            "Despesa Variável",
            fluxo.despesaVariavel.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
          ],
          [
            "Despesa Total",
            fluxo.despesaTotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
          ],
          [
            "Saldo Líquido",
            fluxo.saldoLiquido.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            }),
          ],
        ],
        theme: "grid",
        didParseCell: (data: any) => {
          if (data.row.index === 4) {
            data.cell.styles.textColor =
              fluxo.saldoLiquido < 0 ? [255, 0, 0] : [0, 128, 0];
          }
        },
      });
    }

    doc.save("relatorio_fluxo_caixa.pdf");
  };
  // Busca o fluxo de caixa acumulado ao carregar a página
  useEffect(() => {
    setLoading(true);
    FluxoCaixaService.findByMesAnoAcumulado(mes, ano)
      .then((response) => {
        setSaldoTotal(response.data.saldoLiquido); // Atualiza o saldo total acumulado
      })
      .catch((error) => {
        console.error("Erro ao buscar saldo total acumulado:", error);
        setError("Erro ao carregar saldo total.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [mes, ano]);

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5 mb-5">
        <div className="row justify-content-center pt-4">
          <div className="col-10 text-center">
            <Link to="/requerimento">
              <button className="menu-transferencia">Pedido de Compra</button>
            </Link>

            <Link to="/transacao-exibir">
              <button className="menu-transferencia">Ganhos</button>
            </Link>
            <Link to="/fluxo-caixa">
              <button className="menu-transferencia">Fluxo de Caixa</button>
            </Link>
            <Link to="/conta-pagar">
              <button className="menu-transferencia">Contas a Pagar </button>
            </Link>
          </div>
          <div className="col-md-11">
            <div className="col-md-8 d-flex offset-3">
              <h2 className="text-center titulo-fluxo-caixa">Fluxo de Caixa</h2>

              <div className="d-flex justify-content-center ">
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
              </div>
              <button className="btn btn-primary  " onClick={handlePrint}>
                Imprimir
              </button>
              <button
                className="btn btn-primary btn-anual"
                onClick={handleFetchAnual}
              >
                Anual
              </button>
            </div>

            {error && (
              <div className="alert alert-danger text-center">{error}</div>
            )}

            {loading ? (
              <p className="text-center">Carregando...</p>
            ) : (
              <>
                <div className="d-flex justify-content-between mt-5">
                  <div className="w-50">
                    <h4 className="text-center titulo-transacao">Ganhos</h4>
                    <table className="table table-striped text-center">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Descrição</th>
                          <th>Valor</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ganhos.length > 0 ? (
                          ganhos.map((t) => (
                            <tr key={t.id}>
                              <td>{new Date(t.data).toLocaleDateString()}</td>
                              <td>{t.descricao}</td>
                              <td>
                                R${" "}
                                {t.valor.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={3}>Nenhum ganho encontrado</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>

                  <div className="vr mx-3 "></div>

                  <div className="w-50 mb-4">
                    <h4 className="text-center titulo-transacao">Despesas</h4>
                    <table className="table table-striped text-center">
                      <thead>
                        <tr>
                          <th>Data</th>
                          <th>Descrição</th>
                          <th>Valor</th>
                          <th>Tipo</th>
                        </tr>
                      </thead>
                      <tbody>
                        {despesas.length > 0 ? (
                          despesas.map((t) => (
                            <tr key={t.id}>
                              <td>{new Date(t.data).toLocaleDateString()}</td>
                              <td>{t.descricao}</td>
                              <td>
                                R${" "}
                                {t.valor.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </td>
                              <td>{t.tipoDespesa || "N/A"}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4}>Nenhuma despesa encontrada</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
                <hr className="my-2 linha" />
                <div className="d-flex fluxo-caixa-container">
                  {fluxo && (
                    <div className="mt-4  offset-1">
                      <h4>Ganhos Totais </h4>
                      <hr className="my-2 linha" />
                      <p className="DespesaTotal">
                        Receita Total: R${" "}
                        {fluxo.receitaTotal
                          ? fluxo.receitaTotal.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : " 0.00"}
                      </p>
                    </div>
                  )}
                  {fluxo && (
                    <div className="mt-4 offset-5 ">
                      <h4 className="titulo-transacao">Despesas Totais </h4>
                      <hr className="my-2 linha" />
                      <p>
                        Despesa Fixa: R${" "}
                        {fluxo.despesaTotal
                          ? fluxo.despesaFixa.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "0.00"}
                      </p>
                      <p>
                        Despesa Variavel: R${" "}
                        {fluxo.despesaTotal
                          ? fluxo.despesaVariavel.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "0.00"}
                      </p>
                      <hr className="my-2 linha" />
                      <p className="DespesaTotal">
                        Despesa Total: R${" "}
                        {fluxo.despesaTotal
                          ? fluxo.despesaTotal.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })
                          : "0.00"}
                      </p>
                    </div>
                  )}
                </div>
                <hr className="my-2 linha" />
                {fluxo && (
                  <div className="mt-4 d-flex justify-content-center align-items-center mb-5 fluxo-caixa-container">
                    {/* Saldo Líquido */}
                    <div className="text-center me-5">
                      <h4>Saldo Líquido no Mes</h4>
                      <hr className="my-2 linha" />
                      <p
                        className="saldo-liquido"
                        style={{
                          color: fluxo.saldoLiquido < 0 ? "#f80000" : "inherit",
                        }}
                      >
                        {modoAnual
                          ? "-"
                          : fluxo.saldoLiquido.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                      </p>
                    </div>

                    {/* Saldo Total (Acumulado) */}
                    <div className="text-center">
                      <h4>Saldo Liquido Total</h4>
                      <hr className="my-2 linha" />
                      <p
                        className="saldo-liquido"
                        style={{
                          color: saldoTotal < 0 ? "#f80000" : "inherit",
                        }}
                      >
                        {saldoTotal.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default FluxoCaixa;
