import React, { useState, useEffect } from "react";
import axios from "axios";
import { findAlunosByDate } from "../../service/presencaService";
import { PresencaDTO } from "../../models/presenca";
import './styles.css';

const Presenca = () => {
  const [presencas, setPresencas] = useState<PresencaDTO[]>([]);
  const [dataEscolhida, setDataEscolhida] = useState("");

  useEffect(() => {
    fetchPresencas();
  }, []);

  const fetchPresencas = () => {
    // Coloque a lógica aqui para buscar todas as presenças
  };

  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDataEscolhida(event.target.value);
  };

  const buscarPresencasPorData = () => {
    const dataFormatada = new Date(dataEscolhida);
    findAlunosByDate(dataFormatada)
      .then((response) => {
        console.log("Resposta da API recebida:", response.data);
        setPresencas(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar presenças por data:", error);
      });
  };

  return (
    <div className="chamada">
      <h1>Página de Presenças</h1>
      <label htmlFor="dataEscolhida">Escolha a data:</label>
      <input
        type="date"
        id="dataEscolhida"
        value={dataEscolhida}
        onChange={handleDataChange}
      />
      <button onClick={buscarPresencasPorData}>Buscar</button>
      <ul>
  {presencas.map((presenca) => (
    <li key={presenca.id}>
      Data: {presenca.data instanceof Date ? presenca.data.toLocaleDateString() : presenca.data}, 
      Chamada do Aluno: {presenca.chamadaAluno}
    </li>
  ))}
</ul>
<h2>Alunos:</h2>
<h2>Alunos:</h2>
<ul>
  {presencas.length > 0 && presencas[0].alunos && presencas[0].alunos.length > 0 ? (
    presencas[0].alunos.map((aluno) => (
      <li key={aluno.id}>{aluno.nome}</li>
    ))
  ) : (
    <li>Nenhum aluno presente</li>
  )}
</ul>



    </div>
  );
};

export default Presenca;
