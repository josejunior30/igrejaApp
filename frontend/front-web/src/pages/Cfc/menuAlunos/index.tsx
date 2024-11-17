import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { curso } from "../../../models/trilha";
import * as trilhoService from "../../../service/trilhoService";
import "./styles.css";

const MenuOpcao = () => {
  const [curso, setCurso] = useState<curso | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>() ?? { id: "" };

  const loadCurso = (id: string) => {
    trilhoService
      .findById(Number(id))
      .then((response) => {
        console.log("Detalhes do curso:", response.data);
        setCurso(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do curso:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      loadCurso(id);
    }
  }, [id]);

  return (
    <>
      <Header />
      <div className="container-fluid  mt-5 pt-5">
        <button className="btn btn-danger text-center mt-3 ms-5">
          Area do Professor
        </button>

        {/* Conditional rendering for curso.nome */}
        <h1 className="titulo-curso text-center">
          O que é o trilho{" "}
          <span className="curso-trilha">
            {curso ? curso.nome : "carregando..."}?
          </span>
        </h1>

        <div className="row mt-3 justify-content-center">
          <div className="section-trilho col-7 text-center align-self-center mt-5">
            <p className="sobre-trilha">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Omnis,
              perspiciatis animi. Expedita accusamus cum quas enim temporibus,
              architecto voluptate iste! Eum voluptatibus adipisci ut quaerat
              hic tempora molestiae obcaecati et.
            </p>
          </div>
        </div>

        <div className="botoes mt-5 offset-4">
          <button className="inscrever ms-5">Inscrever-se</button>
          <button className="voltar btn btn-primary ms-5">Voltar</button>
        </div>
      </div>
    </>
  );
};

export default MenuOpcao;
