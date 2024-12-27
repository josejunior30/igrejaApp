import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { cursoDTO as CursoModel } from "../../../models/trilha";
import * as trilhoService from "../../../service/trilhoService";
import "./styles.css";

const MenuOpcao = () => {
  const [curso, setCurso] = useState<CursoModel | null>(null);
  const [selectedCursoId, setSelectedCursoId] = useState<number | null>(null); // Gerencia o item selecionado
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadCurso(id);
    } else {
      console.error("ID inválido ou ausente.");
    }
  }, [id]);

  const loadCurso = (id: string) => {
    trilhoService
      .findById(Number(id))
      .then((response) => {
        setCurso(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do curso:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleItemClick = (ebdCursoId: number) => {
    // Atualiza o item selecionado e alterna o estado
    setSelectedCursoId((prevId) => (prevId === ebdCursoId ? null : ebdCursoId));
  };

  const handleInscrever = () => {
    if (selectedCursoId) {
      navigate(`/trilho/inscrever/${selectedCursoId}`);
    } else {
      alert("Selecione um curso antes de prosseguir.");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-2">
        <h1 className="titulo-curso text-center pt-5 mt-5">
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
          <h3 className="text-center escolha mt-3">
            Escolha o curso disponível:
          </h3>
          <div className="section-curso col-7  mt-3">
            {curso?.ebdCurso && curso.ebdCurso.length > 0 ? (
              <ul className="justify-content-center">
                {curso.ebdCurso.map((ebdCurso) => (
                  <li
                    key={ebdCurso.id}
                    className={`curso-item ${
                      selectedCursoId === ebdCurso.id ? "active" : ""
                    }`}
                    onClick={() => handleItemClick(ebdCurso.id)}
                  >
                    <input
                      className="custom-checkbox"
                      type="checkbox"
                      checked={selectedCursoId === ebdCurso.id}
                      onChange={() => handleItemClick(ebdCurso.id)}
                    />
                    {ebdCurso.nome}
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
