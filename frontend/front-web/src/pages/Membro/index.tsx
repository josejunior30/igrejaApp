import React, { useEffect, useState } from "react";
import './styles.css';
import axios from "axios";

import Filters from "../../components/Filters";
import { MembroResponse } from "./types";
import { Link } from "react-router-dom";

const BASE_URL = 'http://localhost:8080';




const Membro = () => {
  const [membroResponse, setMembroResponse] = useState<MembroResponse[]>([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/membro`)
      .then(response => {
        console.log("Dados recebidos:", response.data);
        setMembroResponse(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
        // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
      });
  }, []);

  return (
    <div className="page-container">
      <Filters />
      <table className="records-table" cellPadding="0" cellSpacing="0">
        <thead>
          <tr>
            <th>Data de Nascimento</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>Email</th>
            <th>Telefone</th>
          </tr>
        </thead>

        <tbody>
          {membroResponse.length > 0 ? (
            membroResponse.map((membro) => (
              <tr key={membro.id}>
                <td>
                  {membro.dataNascimento
                    ? new Date(membro.dataNascimento).toLocaleDateString()
                    : "Data de Nascimento Não Disponível"}
                </td>
                <td>
                  <Link to={`${membro.id}`} className="name-link">
                    {membro.nome} {membro.sobrenome}
                  </Link>
                </td>
                <td>
                <Link to={`${membro.id}`} className="name-link">
                  {membro.idade}
                  </Link>
                </td>
                <td>
                  <Link to={`${membro.id}`} className="name-link">
                    {membro.email}
                </Link>
                </td>
                <td>{membro.telefone}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Carregando dados...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Membro;
