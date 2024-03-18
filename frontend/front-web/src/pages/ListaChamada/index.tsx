import React, { useState, useEffect } from "react";
import { findAlunosByDate, findAll } from "../../service/presencaService"; // Importe também o método findAll
import { PresencaDTO } from "../../models/presenca";
import './styles.css';

const Presenca = () => {
  const [presencas, setPresencas] = useState<PresencaDTO[]>([]);
  const [dataEscolhida, setDataEscolhida] = useState("");

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

  const buscarPresencasPorData = () => {
    if (!dataEscolhida) {
      console.error("Data não especificada.");
      return;
    }

    const dataFormatada = new Date(dataEscolhida);
    findAlunosByDate(dataFormatada)
      .then((response) => {
        console.log("Presenças recebidas:", response.data);
        setPresencas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar presenças por data:", error);
      });
  };

  return (
    <div className="page-container">
      <div className="filtro-data">
      <h1>Página de Presenças</h1>
   
            <label htmlFor="dataEscolhida">Escolha a data:</label>
            <input
              type="date"
              id="dataEscolhida"
              value={dataEscolhida}
              onChange={handleDataChange}
            />
            <button onClick={buscarPresencasPorData}>Buscar</button>
      </div>
            <table className="records-table">
                <thead>
                  <tr>
                    <th>Aluno</th>
                   <th>Presença</th>
                   <th>Projeto</th>
                
                  </tr>
            </thead>
           <tbody>
           {presencas.length > 0 ? (
  presencas.map((presenca) => (
    <tr key={presenca.id}>
      <td>{presenca.alunos ? presenca.alunos.nome : 'Aluno não encontrado'}</td>
      <td>{presenca.chamadaAluno}</td>
     <td>{presenca.projetos.nome}</td>
    </tr>
  ))
) : (
  <tr>
    <td >Nenhuma presença encontrada</td>
  </tr>
)}

           </tbody>
      </table>
    </div>
  );
};

export default Presenca;
