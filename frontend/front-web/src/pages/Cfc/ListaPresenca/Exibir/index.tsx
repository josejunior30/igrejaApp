import React, { useEffect, useState } from "react";
import { findVisitanteByMonthAndCurso } from "../../../../service/presencaVisitanteEBDService ";
import { findMembroByMonthAndCurso } from "../../../../service/presencaEBDService";
import { findAll } from "../../../../service/trilhoService";
import Header from "../../../../components/Header";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

interface Curso {
  id: number;
  nome: string;
}

interface Presenca {
  id: number;
  nome: string;
  presencas: string[];
}

const HistoricoChamadaEBD = () => {
  const [mes, setMes] = useState<number | null>(null);
  const [ano, setAno] = useState<number | null>(null);
  const [cursoId, setCursoId] = useState<number | null>(null);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [loading, setLoading] = useState(false);
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const navigate = useNavigate();

  const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const calcularSemanasNoMes = (ano: number, mes: number) => {
    const ultimoDia = new Date(ano, mes, 0);
    return Math.ceil(ultimoDia.getDate() / 7);
  };

  const buscarCursos = async () => {
    try {
      const response = await findAll();
      setCursos(response.data);
    } catch (error) {
      console.error("Erro ao buscar os cursos:", error);
    }
  };
  const organizarDados = (data: any[]) => {
    const map: { [key: string]: Presenca } = {};

    data.forEach((item) => {
      const nomeCompleto = `${item.visitante.nome} ${item.visitante.sobrenome}`;
      if (!map[nomeCompleto]) {
        map[nomeCompleto] = {
          id: item.visitante.id,
          nome: nomeCompleto,
          presencas: Array(5).fill("------"),
        };
      }
      const semana = getSemanaDoMes(
        new Date(item.data[0], item.data[1] - 1, item.data[2])
      );
      map[nomeCompleto].presencas[semana - 1] = item.chamadaVisitante;
    });

    return Object.values(map);
  };
  const buscarDadosVisitante = async () => {
    if (mes && ano && cursoId) {
      try {
        const response = await findVisitanteByMonthAndCurso(mes, ano, cursoId);
        return organizarDados(response.data); // Organiza os dados dos visitantes
      } catch (error) {
        console.error("Erro ao buscar os dados dos visitantes:", error);
        return [];
      }
    }
    return [];
  };

  const buscarDadosMembro = async () => {
    if (mes && ano && cursoId) {
      try {
        const response = await findMembroByMonthAndCurso(mes, ano, cursoId);
        return organizarDadosMembro(response.data); // Organiza os dados dos membros
      } catch (error) {
        console.error("Erro ao buscar os dados dos membros:", error);
        return [];
      }
    }
    return [];
  };
  const organizarDadosMembro = (data: any[]) => {
    const membrosMap: { [key: string]: Presenca } = {};

    data.forEach((item) => {
      const nomeCompleto = `${item.membro.nome} ${item.membro.sobrenome}`;
      if (!membrosMap[nomeCompleto]) {
        membrosMap[nomeCompleto] = {
          id: item.membro.id,
          nome: nomeCompleto,
          presencas: Array(5).fill("------"),
        };
      }
      const semana = getSemanaDoMes(
        new Date(item.data[0], item.data[1] - 1, item.data[2])
      );
      membrosMap[nomeCompleto].presencas[semana - 1] = item.chamadaMembro;
    });

    return Object.values(membrosMap);
  };
  const getSemanaDoMes = (date: Date): number => {
    const dia = date.getDate();
    return Math.ceil(dia / 7);
  };

  useEffect(() => {
    buscarCursos();
  }, []);

  useEffect(() => {
    const buscarDados = async () => {
      setLoading(true);
      try {
        const visitantes = await buscarDadosVisitante(); // Buscar visitantes
        const membros = await buscarDadosMembro(); // Buscar membros
        setPresencas([...visitantes, ...membros]); // Combinar e definir no estado
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setLoading(false);
      }
    };

    if (mes && ano && cursoId) {
      buscarDados();
    }
  }, [mes, ano, cursoId]);
  const semanasNoMes = mes && ano ? calcularSemanasNoMes(ano, mes) : 5;

  const handleVoltar = () => {
    navigate(-1);
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row" id="voltar">
          <div className="col">
            <button onClick={handleVoltar} className="btn btn-linkVoltar">
              <TiArrowBack /> Voltar
            </button>
          </div>
        </div>
        <div className="col-12 text-center" id="tituloChamada">
          <h2>Histórico de Chamada</h2>
        </div>
        <div className="row justify-content-center pt-5 mb-4" id="linha-menu">
          <div className="col-3 text-center">
            <label className="form-label dados-Historico">Curso</label>
            <select
              onChange={(e) => setCursoId(Number(e.target.value))}
              className="form-select"
            >
              <option value="">Selecione</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>
                  {curso.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2 text-center">
            <label className="form-label dados-Historico">Mês</label>
            <select
              onChange={(e) => setMes(Number(e.target.value))}
              className="form-select"
            >
              <option value="">Selecione</option>
              {meses.map((mesNome, index) => (
                <option key={index + 1} value={index + 1}>
                  {mesNome}
                </option>
              ))}
            </select>
          </div>
          <div className="col-2 text-center">
            <label className="form-label dados-Historico">Ano</label>
            <select
              onChange={(e) => setAno(Number(e.target.value))}
              className="form-select"
            >
              <option value="">Selecione</option>
              {[2024, 2025].map((a) => (
                <option key={a} value={a}>
                  {a}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row justify-content-center mb-4" id="linha-menu">
          <div className="col-9 justify-content-center">
            {loading ? (
              <div className="text-center">Carregando...</div>
            ) : presencas.length > 0 ? (
              <table className="table table-striped mb-5">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Nome</th>
                    {[...Array(semanasNoMes)].map((_, i) => (
                      <th key={i}>Semana {i + 1}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {presencas.map((pessoa, index) => (
                    <tr key={pessoa.id}>
                      <td>{index + 1}</td>
                      <td>{pessoa.nome}</td>
                      {pessoa.presencas
                        .slice(0, semanasNoMes)
                        .map((presenca, i) => (
                          <td
                            key={i}
                            style={{
                              color:
                                presenca === "AUSENTE"
                                  ? "red"
                                  : presenca === "PRESENTE"
                                  ? "white"
                                  : "inherit",
                              fontWeight:
                                presenca === "AUSENTE" ? "bold" : "normal",
                            }}
                          >
                            {presenca}
                          </td>
                        ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-center">Nenhum dado encontrado.</div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HistoricoChamadaEBD;
