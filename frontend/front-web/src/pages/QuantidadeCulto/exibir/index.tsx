import { useEffect, useState } from "react";
import { QuantidadePorCulto } from "../../../models/quantidade";
import * as quantidadePorCultoService from "../../../service/quantidadePorCultoService";
import Header from "../../../components/Header";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import "./styles.css";
import { Link } from "react-router-dom";
import { PiTrashFill } from "react-icons/pi";
import { deleteQuantidade } from "../../../service/quantidadePorCultoService";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const NumeroCulto = () => {
  const [quantidadePorCulto, setQuantidadePorCulto] = useState<
    QuantidadePorCulto[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [mesSelecionado, setMesSelecionado] = useState<number | string>(
    "todos"
  );
  const [mostrarGrafico, setMostrarGrafico] = useState(true);

  const buscarCultos = async (mes: number | string) => {
    setLoading(true);
    try {
      let response;
      if (mes === "todos") {
        response = await quantidadePorCultoService.findAll();
        const mesAtual = new Date().getMonth() + 1;
        const cultosOrdenados = response.data
          .filter(
            (culto: QuantidadePorCulto) =>
              new Date(culto.data).getMonth() + 1 <= mesAtual
          )
          .sort(
            (a: QuantidadePorCulto, b: QuantidadePorCulto) =>
              new Date(a.data).getTime() - new Date(b.data).getTime()
          );
        setQuantidadePorCulto(cultosOrdenados);
      } else {
        response = await quantidadePorCultoService.cultoPorMes(Number(mes));
        const cultosOrdenados = response.data.sort(
          (a: QuantidadePorCulto, b: QuantidadePorCulto) =>
            new Date(a.data).getTime() - new Date(b.data).getTime()
        );
        setQuantidadePorCulto(cultosOrdenados);
      }
    } catch (error) {
      console.error("Erro ao buscar quantidade:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    buscarCultos(mesSelecionado);
  }, [mesSelecionado]);

  const handleMesChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMesSelecionado(event.target.value);
  };

  const calcularDadosGraficoMembrosVisitantes = (
    dados: QuantidadePorCulto[]
  ) => {
    const totalMembros = dados.reduce((acc, curr) => acc + curr.membro, 0);
    const totalVisitantes = dados.reduce(
      (acc, curr) => acc + curr.visitante,
      0
    );
    const total = totalMembros + totalVisitantes;
    const percentualMembros = ((totalMembros / total) * 100).toFixed(2);
    const percentualVisitantes = ((totalVisitantes / total) * 100).toFixed(2);

    return {
      labels: [
        `Membros: ${percentualMembros}%`,
        `Visitantes: ${percentualVisitantes}%`,
      ],
      datasets: [
        {
          data: [totalMembros, totalVisitantes],
          backgroundColor: ["#134190", "#248154"],
        },
      ],
    };
  };

  const calcularDadosGraficoTotalPorMes = (dados: QuantidadePorCulto[]) => {
    const meses = dados.map((dado) =>
      new Date(dado.data).toLocaleDateString("pt-BR", { month: "long" })
    );

    const totais = dados.map((dado) => dado.total);

    const colors = dados.map((dado) => getColorByTipoCulto(dado.tipoCulto));

    return {
      labels: meses,
      datasets: [
        {
          label: "Total por Mês",
          data: totais,
          backgroundColor: colors,
          borderColor: "#ffffff",
          borderWidth: 1,
        },
      ],
    };
  };

  const getColorByTipoCulto = (tipoCulto: string) => {
    switch (tipoCulto) {
      case "CULTO_DA_MANHA":
        return "#fcba03";
      case "CULTO_DA_NOITE":
        return "#134190";
      default:
        return "#02fcfc";
    }
  };
  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir ?");
    if (confirmed) {
      deleteQuantidade(id)
        .then(() => {
          setQuantidadePorCulto((prevState) =>
            prevState.filter((req) => req.id !== id)
          );
          alert(" excluído com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao excluir :", error);
        });
    }
  };

  const dadosGrafico =
    calcularDadosGraficoMembrosVisitantes(quantidadePorCulto);
  const dadosGraficoTotalPorMes =
    calcularDadosGraficoTotalPorMes(quantidadePorCulto);

  const toggleGrafico = () => {
    setMostrarGrafico(!mostrarGrafico);
  };

  return (
    <>
      <Header />
      <div className="container-fluid">
        <div className="row justify-content-center pt-5 mt-4">
          <div className="col-md-2 col-6 pt-5 offset-1">
            <div className="form-group">
              <label
                htmlFor="selectMes"
                className="text-center"
                id="escolha-mes"
              >
                Escolha o mês:
              </label>
              <select
                id="selectMes"
                className="form-select"
                value={mesSelecionado}
                onChange={handleMesChange}
              >
                <option value="todos">Todos</option>
                <option value="1">Janeiro</option>
                <option value="2">Fevereiro</option>
                <option value="3">Março</option>
                <option value="4">Abril</option>
                <option value="5">Maio</option>
                <option value="6">Junho</option>
                <option value="7">Julho</option>
                <option value="8">Agosto</option>
                <option value="9">Setembro</option>
                <option value="10">Outubro</option>
                <option value="11">Novembro</option>
                <option value="12">Dezembro</option>
              </select>
            </div>
          </div>

          <div className="col-md-4 col-11 justify-content-center pt-5 mt-4">
            <button className="btn btn-primary" onClick={toggleGrafico}>
              {mostrarGrafico ? "Esconder Gráfico" : "Mostrar Gráfico"}
            </button>
            <Link to={"/quantidade"}>
              <button className="btn-inserir-numeros mb-3">
                Inserir Dados
              </button>
            </Link>
          </div>

          <div className="row">
            <div className="col-md-7 col-12 offset-2">
              {mostrarGrafico &&
                (loading ? (
                  <p>Carregando dados...</p>
                ) : (
                  <div className="d-flex">
                    <div className="chart-container">
                      <Pie
                        data={dadosGrafico}
                        options={{
                          plugins: {
                            tooltip: {
                              callbacks: {
                                label: (context) => {
                                  const value = context.raw as number;
                                  const total = (
                                    context.chart.data.datasets[0]
                                      .data as number[]
                                  ).reduce((acc, curr) => acc + curr, 0);
                                  const percentage = (
                                    (value / total) *
                                    100
                                  ).toFixed(2);
                                  return `${context.label}: ${value} (${percentage}%)`;
                                },
                              },
                            },
                            legend: {
                              position: "top",
                              labels: {
                                color: "white",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                    <div className="chart-container-torre">
                      <Bar
                        data={dadosGraficoTotalPorMes}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: "top",
                              labels: {
                                color: "white",
                              },
                            },
                            tooltip: {
                              callbacks: {
                                label: (context) => {
                                  return `${context.label}: ${context.raw}`;
                                },
                              },
                            },
                          },
                          scales: {
                            x: {
                              ticks: {
                                color: "#FFFFFF",
                              },
                            },
                            y: {
                              ticks: {
                                color: "#FFFFFF",
                              },
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="row justify-content-center ">
          <div className="col-md-7 col-10">
            <table
              className="table table-striped text-center mb-5"
              id="col-tab-alunos-2"
            >
              <thead className="thead">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Data</th>
                  <th scope="col">Visitante</th>
                  <th scope="col">Membros</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Total</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={6}>Carregando dados...</td>
                  </tr>
                ) : quantidadePorCulto.length > 0 ? (
                  quantidadePorCulto.map((quantidade, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        {quantidade.data
                          ? new Date(quantidade.data).toLocaleDateString(
                              "pt-BR"
                            )
                          : "Data Não Disponível"}
                      </td>
                      <td>{quantidade.visitante}</td>
                      <td>{quantidade.membro}</td>
                      <td
                        style={{
                          color: "#fff",
                          backgroundColor: getColorByTipoCulto(
                            quantidade.tipoCulto
                          ),
                          fontWeight: "bold",
                          padding: "8px",
                          borderRadius: "5px",
                        }}
                      >
                        {quantidade.tipoCulto === "CULTO_DA_MANHA"
                          ? "Culto da Manhã"
                          : quantidade.tipoCulto === "CULTO_DA_NOITE"
                          ? "Culto da Noite"
                          : quantidade.tipoCulto}
                      </td>
                      <td className="total-verde">{quantidade.total}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(quantidade.id)}
                        >
                          <PiTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6}>Nenhum dado encontrado.</td>
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

export default NumeroCulto;
