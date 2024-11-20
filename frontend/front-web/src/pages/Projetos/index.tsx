import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import "./styles.css";
import { projetosDTO } from "../../models/projetos";
import * as projetosService from "../../service/projetosService";

import { TiArrowBack } from "react-icons/ti";

const Projetos = () => {
  const [projetosDTO, setProjetosDTO] = useState<projetosDTO[]>([]);
  const fotoCoordenador = "https://i.postimg.cc/zGdVdHpN/gilson.png";
  useEffect(() => {
    projetosService
      .findAll()
      .then((response) => {
        console.log("Dados recebidos:", response.data);
        setProjetosDTO(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="voltar-projetos-menu">
        <Link to="/inicio">
          <TiArrowBack /> Voltar
        </Link>
      </div>
      <div className="container-fluid  p-4" id="conteiner-projetos">
        <div className="row justify-content-center ">
          <div className="col-6 col-md-2 " id="img-coordenador">
            <img
              src={fotoCoordenador}
              alt="Foto do coordenador"
              className="img-fluid"
            />
            <p className="text-coordenador">Coordenador de Projetos: </p>
            <p className="nome-coordenador">Gilson Ornelas</p>
          </div>
        </div>

        <div className="row  mt-5 row justify-content-center ">
          {projetosDTO.length > 0 ? (
            projetosDTO.map((projeto) => (
              <div
                key={projeto.id}
                className="col-7 col-md-2  "
                id="col-projetos"
              >
                <Link to={`${projeto.id}`}>
                  <img
                    src={projeto.foto_lider}
                    alt="Foto do líder"
                    className="img-fluid "
                  />

                  <h3 className="nome-projeto  ">{projeto.nome}</h3>
                  <h3 className="nome-professor">
                    Professor (a): {projeto.lider}
                  </h3>
                </Link>
              </div>
            ))
          ) : (
            <tr>
              <td colSpan={5}>Carregando dados...</td>
            </tr>
          )}
        </div>
      </div>
    </>
  );
};

export default Projetos;
