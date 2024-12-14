import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { cursoDTO as CursoModel } from "../../../models/trilha";
import * as trilhoService from "../../../service/trilhoService";
import "./styles.css";

const MenuOpcao = () => {
  const [curso, setCurso] = useState<CursoModel | null>(null);
  const [selectedCursoId, setSelectedCursoId] = useState<number | null>(null); // Estado para armazenar o ID selecionado
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID recebido em MenuOpcao:", id); // Log do ID recebido
    if (id) {
      loadCurso(id);
    } else {
      console.error("ID inválido ou ausente."); // Log do ID inválido
    }
  }, [id]);

  const loadCurso = (id: string) => {
    console.log("Carregando curso com ID:", id); // Log antes da chamada da API
    trilhoService
      .findById(Number(id))
      .then((response) => {
        console.log("Detalhes do curso recebidos:", response.data); // Log dos dados recebidos
        setCurso(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do curso:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCheckboxChange = (id: number) => {
    setSelectedCursoId((prevId) => (prevId === id ? null : id)); // Alterna entre selecionar e desmarcar
  };

  const handleInscrever = () => {
    if (selectedCursoId) {
      console.log("Navegando para inscrição com EBDCurso ID:", selectedCursoId);
      navigate(`/trilho/inscrever/${selectedCursoId}`);
    } else {
      alert("Selecione um curso antes de prosseguir.");
    }
  };

  const handleAreaProfessor = () => {
    if (curso) {
      navigate(`/trilho/${curso.id}`);
    } else {
      alert("Não foi possível abrir o painel.");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-2">
        <button
          className="btn btn-danger text-center mt-5 ms-5"
          onClick={handleAreaProfessor}
        >
          Área do Professor
        </button>

        <h1 className="titulo-curso text-center">
          O que é o trilho{" "}
          <span className="curso-trilha">
            {loading ? "carregando..." : curso?.nome ?? "não encontrado"}?
          </span>
        </h1>

        <div className="row justify-content-center">
          <div className="section-trilho col-7 text-center align-self-center mt-3">
            <p className="sobre-trilha">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis,
              perspiciatis animi. Expedita accusamus cum quas enim temporibus,
              architecto voluptate iste! Eum voluptatibus adipisci ut quaerat
              hic tempora molestiae obcaecati et.
            </p>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="section-curso col-7 offset-4 mt-3">
            <h3>Escolha o curso disponível:</h3>

            {curso?.ebdCurso && curso.ebdCurso.length > 0 ? (
              <ul>
                {curso.ebdCurso.map((ebdCurso) => (
                  <li key={ebdCurso.id}>
                    <label className="checkbox-label">
                      <input
                        type="checkbox"
                        checked={selectedCursoId === ebdCurso.id}
                        onChange={() => handleCheckboxChange(ebdCurso.id)}
                      />
                      {ebdCurso.nome}
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum curso disponível.</p>
            )}
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="botoes mt-5 col-12 mx-auto mb-5">
            <button className="inscrever" onClick={handleInscrever}>
              Inscrever-se
            </button>
            <button
              className="voltar btn btn-primary ms-5"
              onClick={() => navigate(-1)}
            >
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuOpcao;
