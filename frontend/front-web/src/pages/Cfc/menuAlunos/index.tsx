import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { curso as CursoModel } from "../../../models/trilha";
import * as trilhoService from "../../../service/trilhoService";
import "./styles.css";

const MenuOpcao = () => {
  const [curso, setCurso] = useState<CursoModel | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ID recebido em MenuOpcao:", id); // Adiciona log para depurar o ID recebido
    if (id) {
      loadCurso(id);
    } else {
      console.error("ID inválido ou ausente."); // Log se o ID for inválido
    }
  }, [id]);

  const loadCurso = (id: string) => {
    console.log("Carregando curso com ID:", id); // Log do ID antes da chamada da API
    trilhoService
      .findById(Number(id))
      .then((response) => {
        console.log("Detalhes do curso recebidos:", response.data); // Log dos detalhes do curso
        setCurso(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do curso:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleInscrever = () => {
    if (curso) {
      console.log("Navegando para inscrição com curso ID:", curso.id); // Log do ID do curso antes da navegação
      navigate(`/trilho/inscrever/${curso.id}`);
    } else {
      alert("Curso não encontrado. Tente novamente.");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-2">
        <button className="btn btn-danger text-center mt-5 ms-5">
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

        <div className="botoes mt-5 offset-4 mb-5">
          <button className="inscrever ms-5" onClick={handleInscrever}>
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
    </>
  );
};

export default MenuOpcao;
