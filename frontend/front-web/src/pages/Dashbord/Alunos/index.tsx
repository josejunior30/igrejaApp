import { useState, useEffect } from "react";
import { alunosDTO } from "../../../models/alunos";
import { findAll } from "../../../service/membroService";
import { Chart, registerables, ChartData, ChartOptions } from 'chart.js';
import './styles.css';
Chart.register(...registerables);

const Dashboard = () => {
    const [data, setData] = useState<alunosDTO[]>([]);
    const [chart, setChart] = useState<Chart<'pie', number[], string> | null>(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await findAll();
            setData(response.data);
            createChart(response.data);
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    const createChart = (alunosData: alunosDTO[]) => {
        const ctx = document.getElementById('ageChart') as HTMLCanvasElement;

        if (ctx) {
            const ageGroups = alunosData.reduce((acc: { [key: string]: number }, aluno) => {
                const age = aluno.idade;
                const ageRange = getAgeRange(age);
                acc[ageRange] = (acc[ageRange] || 0) + 1;
                return acc;
            }, {});

            const labels = Object.keys(ageGroups);
            const values = Object.values(ageGroups);

            if (chart) {
                chart.destroy();
            }

            const newChart = new Chart(ctx, {
                type: 'pie',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Faixa Etária dos Alunos',
                        
                        data: values,
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.2)',
                            'rgba(54, 162, 235, 0.2)',
                            'rgba(255, 206, 86, 0.2)',
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                        ],
                        borderColor: [
                            'rgba(255, 99, 132, 1)',
                            'rgba(54, 162, 235, 1)',
                            'rgba(255, 206, 86, 1)',
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                        ],
                        borderWidth: 1,
                    }]
                } as ChartData<'pie', number[], string>, // Explicit type for data
                options: {
                    responsive: true,
                    
                    plugins: {
                        legend: {
                            position: 'top' as const,
                        },
                        tooltip: {
                            callbacks: {
                                label: function(tooltipItem) {
                                    return `${tooltipItem.label}: ${tooltipItem.raw} alunos`;
                                }
                            }
                        }
                    }
                } as ChartOptions<'pie'> // Explicit type for options
            });

            setChart(newChart);
        }
    };

    const getAgeRange = (age: number) => {
        if (age < 10) return '0-9';
        if (age < 20) return '10-19';
        if (age < 30) return '20-29';
        if (age < 40) return '30-39';
        if (age < 50) return '40-49';
        return '50+';
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-4">
                <h2>Distribuição Etária dos Alunos</h2>
                <canvas id="ageChart" ></canvas>

                </div>
            </div>
           
        </div>
    );
};

export default Dashboard;
