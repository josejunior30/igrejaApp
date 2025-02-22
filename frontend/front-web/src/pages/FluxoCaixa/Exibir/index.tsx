import { useEffect, useState } from "react";
import "./styles.css";
import * as FluxoCaixaService from "../../../service/FluxoCaixaService";
import { Transacao } from "../../../models/transacao";
import * as TransacaoService from "../../../service/TransacaoService";
import { fluxoCaixa } from "../../../models/fluxoCaixa";

const FluxoCaixa = () => {
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [transacao, setTransacao] = useState<Transacao[]>([]);
  const [fluxo, setFluxo] = useState<fluxoCaixa | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
      FluxoCaixaService.findByFluxoMes(mes, ano)
        .then((response) => {
          setFluxo(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar fluxo de caixa:", error);
        });
    }
  }, [mes, ano]);

  const ganhos = transacao.filter((t) => t.isReceita);
  const despesas = transacao.filter((t) => !t.isReceita);

  return (
    <div className="container-fluid mt-4">
      <div className="row justify-content-center">
        <div className="col-md-10">
          <h2 className="text-center titulo-fluxo-caixa">Fluxo de Caixa</h2>

          <div className="d-flex justify-content-center mb-4">
            <select
              className="form-select mx-2"
              value={mes}
              onChange={(e) => setMes(Number(e.target.value))}
            >
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {new Date(0, i).toLocaleString("pt-BR", { month: "long" })}
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

          {error && (
            <div className="alert alert-danger text-center">{error}</div>
          )}

          {loading ? (
            <p className="text-center">Carregando...</p>
          ) : (
            <>
              <div className="d-flex justify-content-between">
                <div className="w-50">
                  <h4 className="text-center">Ganhos</h4>
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
                  <h4 className="text-center">Despesas</h4>
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
                  <div className="mt-4  offset-2">
                    <h4>Ganhos Totais </h4>
                    <hr className="my-2 linha" />
                    <p>
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
                  <div className="mt-4 offset-4 ">
                    <h4>Despesas Totais </h4>
                    <hr className="my-2 linha" />
                    <p>
                      Despesa Total: R${" "}

                      {fluxo.despesaTotal
                        ? fluxo.despesaFixa.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "0.00"}
                    </p>
                    <p>
                      Despesa Total: R${" "}
                      {fluxo.despesaTotal
                        ? fluxo.despesaVariavel.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })
                        : "0.00"}
                    </p>
                    <p>
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
              {fluxo && (
                <div className="mt-4 text-center saldo-liquido ">
                  <h4>Saldo Líquido </h4>
                  <p
                    style={{
                      color: fluxo.saldoLiquido < 0 ? "#f80000" : "inherit",
                    }}
                  >
                
                    {fluxo.saldoLiquido
                      ? fluxo.saldoLiquido.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })
                      : "0.00"}
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FluxoCaixa;
