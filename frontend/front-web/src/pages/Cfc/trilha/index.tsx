import { useEffect, useState } from "react";
import { curso } from "../../../models/trilha";
import * as trilhoService from "../../../service/trilhoService";
import { Link, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import "./styles.css";
import { TiArrowBack } from "react-icons/ti";

const TrilhaId = () => {
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

  const formatPhoneNumber = (phoneNumber: any) => {
    phoneNumber.replace(/\D/g, "");
    return `55${phoneNumber}`;
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="voltar-projetos-menu">
          <Link to="/trilha">
            <TiArrowBack /> Voltar
          </Link>
        </div>
        <div className="row justify-content-center">
          {loading ? (
            <p>Carregando detalhes do curso...</p>
          ) : curso ? (
            <div className="col-md-6 col-10 m-3 md-5 pb-3 text-center">
              <h1 className="title">
                <span className="trilho-titulo">Trilha : </span>
                {curso.nome}
              </h1>

              <div className="botoes-container col-10 mx-auto">
                <button className="Painel-Menu">Inserir Estudo</button>
                <button className="Painel-Menu">Lista de Presenca</button>
                <button className="Painel-Menu">Avaliacoes</button>
              </div>
              {curso.membro && curso.membro.length > 0 ? (
                <div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {curso.membro.map((membro) => (
                        <tr key={membro.id}>
                          <td>
                            <Link to={`/membro/${membro.id}`}>
                              {`${membro.nome} ${membro.sobrenome}`}
                            </Link>
                          </td>
                          <td>{`${membro.idade}`}</td>
                          <td>
                            <Link
                              to={`https://wa.me/${formatPhoneNumber(
                                membro.telefone
                              )}`}
                            >
                              <i className="bi bi-whatsapp"></i>{" "}
                              {membro.telefone}
                            </Link>
                          </td>
                          <td>{membro.email}</td>
                          <td>Membro</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p>Não há inscrições para este curso.</p>
              )}
            </div>
          ) : (
            <p>Curso não encontrado.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default TrilhaId;
