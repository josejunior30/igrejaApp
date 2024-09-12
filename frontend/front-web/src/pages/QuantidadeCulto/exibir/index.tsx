import { useEffect, useState } from "react";
import { QuantidadePorCulto } from "../../../models/quantidade";
import * as quantidadePorCultoService from "../../../service/quantidadePorCultoService";
import Header from "../../../components/Header";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import './styles.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const NumeroCulto = () => {
    const [quantidadePorCulto, setQuantidadePorCulto] = useState<QuantidadePorCulto[]>([]);
    const [loading, setLoading] = useState(true);
    const [mesSelecionado, setMesSelecionado] = useState<number | string>("todos");
    const [mostrarGrafico, setMostrarGrafico] = useState(true);
    const [tipoGrafico, setTipoGrafico] = useState<string>("homensMulheres"); // Estado para controlar o tipo de gráfico

    const buscarCultos = async (mes: number | string) => {
        setLoading(true);
        try {
            let response;
            if (mes === "todos") {
                response = await quantidadePorCultoService.findAll();
                const mesAtual = new Date().getMonth() + 1;
                const cultosOrdenados = response.data
                    .filter((culto: QuantidadePorCulto) => new Date(culto.data).getMonth() + 1 <= mesAtual)
                    .sort((a: QuantidadePorCulto, b: QuantidadePorCulto) => new Date(a.data).getTime() - new Date(b.data).getTime());
                setQuantidadePorCulto(cultosOrdenados);
            } else {
                response = await quantidadePorCultoService.cultoPorMes(Number(mes));
                const cultosOrdenados = response.data.sort(
                    (a: QuantidadePorCulto, b: QuantidadePorCulto) => new Date(a.data).getTime() - new Date(b.data).getTime()
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

    // Função para calcular dados do gráfico de Homens e Mulheres
    const calcularDadosGraficoHomensMulheres = (dados: QuantidadePorCulto[]) => {
        const totalHomens = dados.reduce((acc, curr) => acc + curr.numeroHomem, 0);
        const totalMulheres = dados.reduce((acc, curr) => acc + curr.numeroMulher, 0);
        const total = totalHomens + totalMulheres;
        const percentualHomens = ((totalHomens / total) * 100).toFixed(2);
        const percentualMulheres = ((totalMulheres / total) * 100).toFixed(2);

        return {
            labels: [`Homens: ${percentualHomens}%`, `Mulheres: ${percentualMulheres}%`],
            datasets: [
                {
                    data: [totalHomens, totalMulheres],
                    backgroundColor: ["#36A2EB", "#FF6384"],
                    hoverBackgroundColor: ["#36A2EB", "#FF6384"],
                },
            ],
        };
    };

    // Função para calcular dados do gráfico de Membros e Visitantes
    const calcularDadosGraficoMembrosVisitantes = (dados: QuantidadePorCulto[]) => {
        const totalMembros = dados.reduce((acc, curr) => acc + curr.membro, 0);
        const totalVisitantes = dados.reduce((acc, curr) => acc + curr.visitante, 0);
        const total = totalMembros + totalVisitantes;
        const percentualMembros = ((totalMembros / total) * 100).toFixed(2);
        const percentualVisitantes = ((totalVisitantes / total) * 100).toFixed(2);

        return {
            labels: [`Membros: ${percentualMembros}%`, `Visitantes: ${percentualVisitantes}%`],
            datasets: [
                {
                    data: [totalMembros, totalVisitantes],
                    backgroundColor: ["#02fcfc", "#386c01"],
                    hoverBackgroundColor: ["#02fcfc", "#386c01"],
                },
            ],
        };
    };

    const dadosGrafico = tipoGrafico === "homensMulheres"
        ? calcularDadosGraficoHomensMulheres(quantidadePorCulto)
        : calcularDadosGraficoMembrosVisitantes(quantidadePorCulto);

    // Função para alternar visibilidade do gráfico
    const toggleGrafico = () => {
        setMostrarGrafico(!mostrarGrafico);
    };

    const handleTipoGraficoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTipoGrafico(event.target.value);
    };

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row justify-content-center pt-5 mt-4">
                    <div className="col-2 pt-5">
                        <div className="form-group">
                            <label htmlFor="selectMes" className="text-center" id="filtro-mes">
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
                 
                    <div className="col-2 pt-5 mb-5">
                        <div className="form-group">
                            <label htmlFor="selectTipoGrafico" className="text-center" id="filtro-tipo">
                                Tipo de Gráfico:
                            </label>
                            <select
                                id="selectTipoGrafico"
                                className="form-select"
                                value={tipoGrafico}
                                onChange={handleTipoGraficoChange}
                            >
                                <option value="homensMulheres">Homens e Mulheres</option>
                                <option value="membrosVisitantes">Membros e Visitantes</option>
                            </select>
                        </div>
                    </div>
                    <div className="col-2 pt-5 mt-4"><button className="btn btn-primary mb-3" onClick={toggleGrafico}>
                            {mostrarGrafico ? "Esconder Gráfico" : "Mostrar Gráfico"}
                        </button></div>
                    <div className="col-md-11">
                        

                        {mostrarGrafico && (
                            loading ? (
                                <p>Carregando dados...</p>
                            ) : (
                                <div className="mb-5">
                                    <h5 className="titulo-grafico ">
                                        {mesSelecionado === "todos" 
                                            ? `Total Acumulado até ${new Date().toLocaleDateString()}` 
                                            : `Mês de ${new Date(0, Number(mesSelecionado) - 1).toLocaleDateString('pt-BR', { month: 'long' })}`}
                                    </h5>
                                    <div className="chart-container">
                                        <Pie
                                            data={dadosGrafico}
                                            options={{
                                                plugins: {
                                                    tooltip: {
                                                        callbacks: {
                                                            label: (context) => {
                                                                const value = context.raw as number;
                                                                const total = (context.chart.data.datasets[0].data as number[]).reduce((acc, curr) => acc + curr, 0);
                                                                const percentage = ((value / total) * 100).toFixed(2);
                                                                return `${context.label}: ${value} (${percentage}%)`;
                                                            },
                                                        },
                                                    },
                                                },
                                            }}
                                        />
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                </div>

                <div className="row justify-content-center ">
                    <div className="col-md-7">
                        <table className="table table-striped text-center mb-5" id="col-tab-alunos-2">
                            <thead className="thead">
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Data</th>
                                    <th scope="col">Homens</th>
                                    <th scope="col">Mulheres</th>
                                    <th scope="col">Visitante</th>
                                    <th scope="col">Membros</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={7}>Carregando dados...</td>
                                    </tr>
                                ) : quantidadePorCulto.length > 0 ? (
                                    quantidadePorCulto.map((quantidade, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>
                                                {quantidade.data
                                                    ? new Date(quantidade.data).toLocaleDateString()
                                                    : "Data Não Disponível"}
                                            </td>
                                            <td>{quantidade.numeroHomem}</td>
                                            <td>{quantidade.numeroMulher}</td>
                                            <td>{quantidade.visitante}</td>
                                            <td>{quantidade.membro}</td>
                                            <td className="total-verde">{quantidade.total}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={7}>Nenhum dado encontrado.</td>
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
