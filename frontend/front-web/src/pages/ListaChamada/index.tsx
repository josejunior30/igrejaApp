import { useEffect, useState } from "react";
import { findAll, findByDate, findDataAndProjeto } from "../../service/presencaService";
import { PresencaDTO } from "../../models/presenca";
import './styles.css';
import Header from "../../components/Header";

import { PiPrinterFill } from "react-icons/pi";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";



 
const Presenca = () => {
  const [dataEscolhida, setDataEscolhida] = useState("");
  const [projeto, setProjeto] = useState<number | null>(null); 
  const [presencas, setPresencas] = useState<PresencaDTO[]>([]);
  
  useEffect(() => {
    fetchPresencas();
  }, []);

  const fetchPresencas = () => {
    findAll()
      .then((response) => {
        console.log("Presenças recebidas:", response.data);
        setPresencas(sortByHorario(response.data));
      })
      .catch((error) => {
        console.error("Erro ao buscar presenças:", error);
      });
  };

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataEscolhida(event.target.value);
  };

  const handleProjetoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const projectId = event.target.value === "null" ? null : Number(event.target.value);
    setProjeto(projectId);
  };

  const buscarPresencasPorDataEProjeto = () => {
    if (!dataEscolhida) {
      console.error("Data não especificada.");
      return;
    }

    let dataFormatada = new Date(dataEscolhida);

    const fetchPresencasCallback = (response: any) => {
      console.log("Presenças recebidas:", response.data);
      setPresencas(sortByHorario(response.data));
    };

    if (projeto === null) {
      findByDate(dataFormatada)
        .then(fetchPresencasCallback)
        .catch((error) => {
          console.error("Erro ao buscar alunos por data:", error);
        });
    } else {
      findDataAndProjeto(dataFormatada, projeto)
        .then(fetchPresencasCallback)
        .catch((error) => {
          console.error("Erro ao buscar presenças por data e projeto:", error);
        });
    }
  };

  const formatHorario = (horario: any) => {
    if (!horario) return '';
    const [hour, minute] = horario;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  const sortByHorario = (presencas: PresencaDTO[]) => {
    return presencas.slice().sort((a, b) => {
      const horarioA = formatHorario(a.alunos?.horario);
      const horarioB = formatHorario(b.alunos?.horario);
      return horarioA.localeCompare(horarioB);
    });
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row" id="voltar">
          <div className="col">
            <Link to="/membro">
              <TiArrowBack /> Voltar
            </Link>
          </div>
        </div>

        <div className="container col-11 col-md-7">
          <div className="row justify-content-center" id="pesquisa-chamada">
            <div className="col-md-4 col-8">
              <h3>Lista de Presença</h3>
              <label htmlFor="dataEscolhida" className="form-label">Escolha a data:</label>
              <input
                type="date"
                id="dataEscolhida"
                value={dataEscolhida}
                onChange={handleDataChange}
                className="form-control"
              />
            </div>
            <div className="col-md-12 p-4">
              {/* Radio buttons for selecting the project */}
              {/* ... */}
              <div className="d-grid gap-2 col-4 mx-auto">
                <button className="btn btn-primary mb-2" onClick={buscarPresencasPorDataEProjeto}>Buscar</button>
              </div>
            </div>
          </div>

          <div className="row justify-content-center mt-4 text-center">
            <div className="col-md-11 col-11">
              <div className="img-print-lista">
                <Link to="#">
                  <p><PiPrinterFill /> Imprimir</p>
                </Link>
              </div>
              <table className="table table-striped">
                <thead className="thead">
                  <tr>
                    <th scope="col">Aluno</th>
                    <th scope="col">Horario</th>
                    <th scope="col">Presença</th>
                    <th scope="col">Projeto</th>
                  </tr>
                </thead>
                <tbody>
                  {presencas.length > 0 ? (
                    presencas.map((presenca: any) => (
                      <tr key={presenca.id}>
                        <td>{presenca.alunos ? presenca.alunos.nome : 'Aluno não encontrado'}</td>
                        <td>{presenca.alunos ? formatHorario(presenca.alunos.horario) : 'Horário não encontrado'}</td>
                        <td
                          style={{ color: presenca.chamadaAluno === 'AUSENTE' ? '#eb6161' : 'white' }}>
                          {presenca.chamadaAluno}
                        </td>
                        <td>{presenca.projetosChamada ? presenca.projetosChamada.nome : 'Projeto não encontrado'}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>Nenhuma presença encontrada</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Presenca;