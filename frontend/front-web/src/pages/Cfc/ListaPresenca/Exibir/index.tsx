import React, { useEffect, useState } from "react";
import { findVisitanteByMonthAndCurso } from "../../../../service/presencaVisitanteEBDService ";
import { findMembroByMonthAndCurso } from "../../../../service/presencaEBDService";
import { findAllCurso } from "../../../../service/cursoTrilhoService";
import Header from "../../../../components/Header";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { ebdCurso } from "../../../../models/trilha";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

interface Presenca {
  id: number;
  nome: string;
  presencas: string[];
}

const HistoricoChamadaEBD = () => {
  const navigate = useNavigate();
  const [cursos, setCursos] = useState<ebdCurso[]>([]);
  const [presencas, setPresencas] = useState<Presenca[]>([]);
  const [loading, setLoading] = useState(false);
  const [cursoId, setCursoId] = useState<number | null>(null);
  const [filtro, setFiltro] = useState({
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear(),
  });

  useEffect(() => {
    const buscarCursos = async () => {
      try {
        const response = await findAllCurso();
        setCursos(response.data);
      } catch (error) {
        console.error("Erro ao buscar os cursos:", error);
      }
    };
    buscarCursos();
  }, []);

  useEffect(() => {
    const buscarDados = async () => {
      if (cursoId) {
        setLoading(true);
        try {
          const visitantes = await findVisitanteByMonthAndCurso(filtro.mes, filtro.ano, cursoId);
          const membros = await findMembroByMonthAndCurso(filtro.mes, filtro.ano, cursoId);
          setPresencas([...organizarDados(visitantes.data), ...organizarDados(membros.data)]);
        } catch (error) {
          console.error("Erro ao buscar os dados:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    buscarDados();
  }, [cursoId, filtro]);

  const handleMesAnterior = () => {
    setFiltro((prev) => ({
      mes: prev.mes === 1 ? 12 : prev.mes - 1,
      ano: prev.mes === 1 ? prev.ano - 1 : prev.ano,
    }));
  };

  const handleMesProximo = () => {
    setFiltro((prev) => ({
      mes: prev.mes === 12 ? 1 : prev.mes + 1,
      ano: prev.mes === 12 ? prev.ano + 1 : prev.ano,
    }));
  };

  const organizarDados = (data: any[]): Presenca[] => {
    const map: { [key: string]: Presenca } = {};
    data.forEach((item) => {
      const nomeCompleto = item.visitante 
        ? `${item.visitante.nome} ${item.visitante.sobrenome}` 
        : `${item.membro.nome} ${item.membro.sobrenome}`;
      if (!map[nomeCompleto]) {
        map[nomeCompleto] = {
          id: item.id,
          nome: nomeCompleto,
          presencas: Array(5).fill("------"),
        };
      }
      const semana = Math.ceil(new Date(item.data[0], item.data[1] - 1, item.data[2]).getDate() / 7);
      map[nomeCompleto].presencas[semana - 1] = item.chamadaVisitante || item.chamadaMembro;
    });
    return Object.values(map);
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <button onClick={() => navigate(-1)} className="btn btn-linkVoltar">
          <TiArrowBack /> Voltar
        </button>
        <h3 className="text-center titulo-chamada-historico">Histórico de Chamada</h3>
        <div className="row justify-content-center mb-4">
          <div className="col-3 text-center mb-4">
            <label>Curso</label>
            <select onChange={(e) => setCursoId(Number(e.target.value))} className="form-select">
              <option value="">Selecione o Curso</option>
              {cursos.map((curso) => (
                <option key={curso.id} value={curso.id}>{curso.nome}</option>
              ))}
            </select>
            <span className="mes-chamada-cfc">
            <button className="btn-left-conta-Pagar" onClick={handleMesAnterior}>
              <FaAngleLeft />
            </button>
            {new Date(filtro.ano, filtro.mes - 1).toLocaleString("pt-BR", { month: "long" })} / {filtro.ano}
            <button className="btn-right-conta-Pagar" onClick={handleMesProximo}>
              <FaAngleRight />
            </button>
          </span>
          </div>
     
          {loading ? (
            <div className="text-center">Carregando...</div>
          ) : presencas.length > 0 ? (
            <div className="col-11">
            <table className="table table-striped tabela-chamada">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Nome</th>
                  {[...Array(5)].map((_, i) => <th key={i}>Semana {i + 1}</th>)}
                </tr>
              </thead>
              <tbody>
                {presencas.map((pessoa, index) => (
                  <tr key={`${pessoa.id}-${index}`}>
                    <td>{index + 1}</td>
                    <td>{pessoa.nome}</td>
                    {pessoa.presencas.map((presenca, i) => (
                      <td key={i} style={{ color: presenca === "AUSENTE" ? "red" : "white" }}>{presenca}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            </div>
          ) : (
            <div className="text-center">Nenhum dado encontrado.</div>

          )}
        </div>
        
      </div>
    </>
  );
};

export default HistoricoChamadaEBD;
