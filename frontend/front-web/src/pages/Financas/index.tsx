import { useEffect, useState } from "react";
import "./styles.css";
import { fluxoCaixa } from "../../models/fluxoCaixa";
import * as FluxoCaixaService from "../../service/FluxoCaixaService";
import * as ContaPagarService from "../../service/ContaPagarService";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import { TransacaoDTO } from "../../models/transacao";
import { findByAno } from "../../service/TransacaoService";
import Header from "../../components/Header";
import Botoes from "../../components/botoes";
import { FiDollarSign } from "react-icons/fi";


const Financas = () => {
  const [fluxo, setFluxo] = useState<fluxoCaixa | null>(null);
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [ano, setAno] = useState<number>(new Date().getFullYear());
  const [modoAnual, setModoAnual] = useState<boolean>(false);
  const [contasAtrasadas, setContasAtrasadas] = useState<number>(0);

  const [despesas, setDespesas] = useState<
    { descricao: string; valor: number }[]
  >([]);
  const [receitas, setReceitas] = useState<
    { descricao: string; valor: number }[]
  >([]);
  const [acumulado, setAcumulado] = useState<
    { mes: string; receita: number; despesa: number }[]
  >([]);

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

  useEffect(() => {
    ContaPagarService.findAllContaPagar()
      .then((response) => {
        const contas = response.data;
        const atrasadas = contas.filter(
          (conta: { status: string }) => conta.status === "ATRASADO"
        );
        setContasAtrasadas(atrasadas.length);
      })
      .catch((error) => console.error("Erro ao buscar contas a pagar:", error));
  }, []);

  useEffect(() => {
    findByAno(ano)
      .then((response) => {
        const transacoes: TransacaoDTO[] = response.data;

        // Processando Despesas
        const despesasFiltradas = transacoes.filter((t) => !t.isReceita);
        const totalDespesas = despesasFiltradas.reduce(
          (sum, t) => sum + t.valor,
          0
        );
        const despesasAgrupadas = despesasFiltradas.reduce((acc, t) => {
          acc[t.descricao] =
            (((acc[t.descricao] || 0) + t.valor) / totalDespesas) * 100;
          return acc;
        }, {} as Record<string, number>);

        setDespesas(
          Object.keys(despesasAgrupadas).map((desc) => ({
            descricao: desc,
            valor: despesasAgrupadas[desc],
          }))
        );

        // Processando Receitas
        const receitasFiltradas = transacoes.filter((t) => t.isReceita);
        const totalReceitas = receitasFiltradas.reduce(
          (sum, t) => sum + t.valor,
          0
        );
        const receitasAgrupadas = receitasFiltradas.reduce((acc, t) => {
          acc[t.descricao] =
            (((acc[t.descricao] || 0) + t.valor) / totalReceitas) * 100;
          return acc;
        }, {} as Record<string, number>);

        setReceitas(
          Object.keys(receitasAgrupadas).map((desc) => ({
            descricao: desc,
            valor: receitasAgrupadas[desc],
          }))
        );
      })
      .catch((error) => console.error("Erro ao buscar transações:", error));
  }, [mes, ano]);

  useEffect(() => {
    findByAno(ano)
      .then((response) => {
        const transacoes: TransacaoDTO[] = response.data;
        const meses = [
          "Jan",
          "Fev",
          "Mar",
          "Abr",
          "Mai",
          "Jun",
          "Jul",
          "Ago",
          "Set",
          "Out",
          "Nov",
          "Dez",
        ];

        const despesasFiltradas = transacoes.filter((t) => !t.isReceita);
        const totalDespesas = despesasFiltradas.reduce(
          (sum, t) => sum + t.valor,
          0
        );
        const despesasAgrupadas = despesasFiltradas.reduce((acc, t) => {
          acc[t.descricao] =
            (((acc[t.descricao] || 0) + t.valor) / totalDespesas) * 100;
          return acc;
        }, {} as Record<string, number>);

        setDespesas(
          Object.keys(despesasAgrupadas).map((desc) => ({
            descricao: desc,
            valor: despesasAgrupadas[desc],
          }))
        );

        const receitasFiltradas = transacoes.filter((t) => t.isReceita);
        const totalReceitas = receitasFiltradas.reduce(
          (sum, t) => sum + t.valor,
          0
        );
        const receitasAgrupadas = receitasFiltradas.reduce((acc, t) => {
          acc[t.descricao] =
            (((acc[t.descricao] || 0) + t.valor) / totalReceitas) * 100;
          return acc;
        }, {} as Record<string, number>);

        setReceitas(
          Object.keys(receitasAgrupadas).map((desc) => ({
            descricao: desc,
            valor: receitasAgrupadas[desc],
          }))
        );

        const acumuladoData = meses.map((mes, index) => {
          const transacoesMes = transacoes.filter(
            (t) => new Date(t.data).getMonth() === index
          );
          const receitaTotal = transacoesMes
            .filter((t) => t.isReceita)
            .reduce((sum, t) => sum + t.valor, 0);
          const despesaTotal = transacoesMes
            .filter((t) => !t.isReceita)
            .reduce((sum, t) => sum + t.valor, 0);
          return { mes, receita: receitaTotal, despesa: despesaTotal };
        });

        setAcumulado(acumuladoData);
      })
      .catch((error) => console.error("Erro ao buscar transações:", error));
  }, [ano]);
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#FF4560",
    "#7D3C98",
    "#C70039",
  ];

  return (
    <>
      <Header />
 
      <div className="container-fluid pt-5 mt-3">
    
        <div className="row d-flex justify-content-center ">
        <Botoes/>
          <div className="col-12 d-flex justify-content-center">
            <div className="dados-fin col-2">
              <span><FiDollarSign />Saldo Líquido:</span>
              <span>
                {fluxo
                  ? fluxo.saldoLiquido.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "R$ 0,00"}
              </span>
            </div>
            <div className="dados-fin col-2">
              <span><FiDollarSign />Receita Mês:</span>
              <span>
                {fluxo
                  ? fluxo.receitaTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "R$ 0,00"}
              </span>
            </div>
            <div className="dados-fin col-2">
              <span><FiDollarSign />Despesa no Mês:</span>
              <span>
                {fluxo
                  ? fluxo.despesaTotal.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })
                  : "R$ 0,00"}
              </span>
            </div>
            <div className="dados-fin col-2">
              <span><FiDollarSign />Contas Atrasadas:</span>
              <span>{contasAtrasadas}</span>
            </div>
          </div>
        </div>

        <div className="row d-flex justify-content-center mt-4">
          <div className="col-4">
            <h5 className="titulo-graf-fin mb-4">Distribuição de Despesas</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={despesas}
                  dataKey="valor"
                  nameKey="descricao"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                >
                  {despesas.map((_, index) => (
                    <Cell
                      key={`cell-despesa-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${Number(value).toFixed(0)}%`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="col-4">
            <h5 className="titulo-graf-fin mb-4">Distribuição de Receitas</h5>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={receitas}
                  dataKey="valor"
                  nameKey="descricao"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ name, percent }) =>
                    `${(percent * 100).toFixed(0)}%`
                  }
                >
                  {receitas.map((_, index) => (
                    <Cell
                      key={`cell-receita-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => `${Number(value).toFixed(0)}%`}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="row d-flex justify-content-center pt-4 mb-5 ">
          <div className="col-10">
            <h5 className="titulo-graf-fin mb-4">
              Receita e Despesa Acumuladas
            </h5>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={acumulado}>
                <CartesianGrid
                  stroke="#ccc"
                  strokeDasharray="0"
                  vertical={false}
                />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="receita" fill="#00C49F" name="Receita" />
                <Bar dataKey="despesa" fill="#FF4560" name="Despesa" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
};

export default Financas;
