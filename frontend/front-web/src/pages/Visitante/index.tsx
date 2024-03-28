import React, { useEffect, useState } from "react";
import './styles.css';
import axios from "axios";
import { VisitanteResponse } from "./types";
import Filters from "../Filters";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";

const BASE_URL = 'http://localhost:8080';


const Visitante = () => {
    const [visitanteResponse, setVisitanteResponse] = useState<VisitanteResponse[]>([]);
    console.log(visitanteResponse);
  
    useEffect(() => {
      axios.get(`${BASE_URL}/visitante`)
        .then(response => {
          console.log("Dados recebidos:", response.data);
          setVisitanteResponse(response.data);
        })
        .catch(error => {
          console.error("Erro ao buscar dados:", error);
          // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
        });
    }, []);
  
    return (
     <>
     <Header/>
     <Sidebar/>
      <div className="page-container">
       
       <Filters/>
        <table className="records-table" cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              <th>Nome</th>
              <th>telefone</th>
              <th>sexo</th>
            </tr>
          </thead>
  
          <tbody>
            {visitanteResponse.length > 0 ? (
              visitanteResponse.map((visitante, index) => (
                <tr key={index}>
                  <td>{visitante.nome} {visitante.sobrenome}</td>
                  <td>{visitante.telefone}</td>
                  <td>{visitante.sexo}</td>
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
      </>
    );
  };

export default Visitante;