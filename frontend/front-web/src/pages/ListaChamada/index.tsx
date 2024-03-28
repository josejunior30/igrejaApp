import { useEffect, useState } from "react";
import { findAll, findAlunosByDate, findDataAndProjeto } from "../../service/presencaService";
import { PresencaDTO } from "../../models/presenca";
import './styles.css';
import Header from "../../components/Header";
import AddAlunos from "../Alunos/addAlunos";
import AddLista from "./criarLista";
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
        setPresencas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar presenças:", error);
      });
  };


  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataEscolhida(event.target.value);
  };

  const handleProjetoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const projectId = event.target.value === "" ? null : Number(event.target.value);
    setProjeto(projectId);
  };
  

  const buscarPresencasPorDataEProjeto = () => {
    if (projeto === null) {
      fetchPresencas(); 
      return;
    }
  
    if (!dataEscolhida) {
      console.error("Data não especificada.");
      return;
    }
    const dataFormatada = new Date(dataEscolhida);
    findDataAndProjeto(dataFormatada, projeto)
      .then((response) => {
        console.log("Presenças recebidas:", response.data);
        setPresencas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar presenças por data e projeto:", error);
      });
  };
  const buscarAlunosPorData = () => {
    if (!dataEscolhida) {
      console.error("Data não especificada.");
      return;
    }
    
    const dataFormatada = new Date(dataEscolhida);
    findAlunosByDate(dataFormatada)
      .then((response) => {
        console.log("Alunos recebidos:", response.data);
        setPresencas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar alunos por data:", error);
      });
  };


  return (
    <>
    <Header/>
 
    <div className="voltar-relatorio-pesquisa">
    <Link to="/membro">
      <TiArrowBack />  Voltar
    </Link>
  </div>
    <div className="page-container-lista">
      </div>
    <div className="page-container-lista">
      <div className="filtro-data">
        <h3>Lista de Presença</h3>
        <div className="input-container">
          <label htmlFor="dataEscolhida">Escolha a data:</label>
          <input
            type="date"
            id="dataEscolhida"
            value={dataEscolhida}
            onChange={handleDataChange}
          />
        </div>
      
        <div className="input-container">
           
          <label htmlFor="projeto1">Artesanato</label>
          <input
            type="radio"
            id="projeto1"
            value="1"
            checked={projeto === 1}
            onChange={handleProjetoChange}
          />
          <label htmlFor="projeto2">Jiu-Jitsu</label>
          <input
            type="radio"
            id="projeto2"
            value="2"
            checked={projeto === 2}
            onChange={handleProjetoChange}
          />
          <label htmlFor="projeto3">Musica</label>
          <input
            type="radio"
            id="projeto3"
            value="3"
            checked={projeto === 3}
            onChange={handleProjetoChange}
          />

        <button onClick={buscarPresencasPorDataEProjeto}>Buscar</button>
        </div>
      </div>
     <div className="img-print-lista">
    <Link to="#">
        <p><PiPrinterFill /> Imprimir</p>
    </Link>
     </div>
      <table className="lista-table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Presença</th>
            <th>Projeto</th>
          </tr>
        </thead>
        <tbody>
        {presencas.length > 0 ? (
              presencas.map((presenca:any) => (
            <tr key={presenca.id}>
              <td>{presenca.alunos ? presenca.alunos.nome : 'Aluno não encontrado'}</td>
              <td>{presenca.chamadaAluno}</td>
              <td>{presenca.projetosChamada ? presenca.projetosChamada.nome : 'Projeto não encontrado'}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td>Nenhuma presença encontrada</td>
          </tr>
        )}

        </tbody>
      </table>
    </div>
    </>
  );
  
};

export default Presenca;
