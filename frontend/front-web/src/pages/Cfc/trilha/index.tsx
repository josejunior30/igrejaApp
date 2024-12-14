import { useEffect, useState } from "react";
import { curso } from "../../../models/trilha";
import * as trilhoService from "../../../service/trilhoService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import "./styles.css";
import { TiArrowBack } from "react-icons/ti";

const TrilhaId = () => {
  const [curso, setCurso] = useState<curso | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const navigate = useNavigate();

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

  // Helper function to merge and sort participants
  const getSortedParticipants = () => {
    if (!curso) return [];
    const allParticipants = [
      ...(curso.membro || []).map((membro) => ({
        ...membro,
        status: "Membro",
        sobrenome: membro.sobrenome || "", // Garantir sobrenome nos membros
      })),
      ...(curso.visitante || []).map((visitante) => ({
        ...visitante,
        status: "Visitante",
        sobrenome: visitante.sobrenome || "(Sem Sobrenome)", // Adicionar sobrenome padrão para visitantes
      })),
    ];
    return allParticipants.sort(
      (a, b) =>
        a.nome.localeCompare(b.nome) || a.sobrenome.localeCompare(b.sobrenome)
    );
  };
  const handleAreaProfessor = () => {
    if (curso) {
      navigate(`/trilho/presenca/inserir/${curso.id}`);
    } else {
      alert("Nao foi possivel abrir o painel.");
    }
  };
  const handleInserirEstudo = () => {
    if (curso) {
      navigate(`/trilho/estudo`);
    } else {
      alert("Nao foi possivel abrir o painel.");
    }
  };
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="voltar-projetos-menu mt-5">
            <Link to="/trilho">
              <TiArrowBack /> Voltar
            </Link>
          </div>
          {loading ? (
            <p>Carregando detalhes do curso...</p>
          ) : curso ? (
            <div className="col-md-8 col-10 m-3 md-5 pb-3 text-center">
              <h1 className="title">
                <span className="trilho-titulo">Trilha : </span>
                {curso.nome}
              </h1>

              <div className="botoes-container col-10 mx-auto">
                <button className="Painel-Menu" onClick={handleInserirEstudo}>
                  Inserir Estudo
                </button>
                <button className="Painel-Menu" onClick={handleAreaProfessor}>
                  Lista de Presenca
                </button>
                <button className="Painel-Menu">Avaliacoes</button>
              </div>
              {curso.membro?.length || curso.visitante?.length ? (
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
                      {getSortedParticipants().map((participant) => (
                        <tr key={`${participant.status}-${participant.id}`}>
                          <td>
                            {`${participant.nome} ${participant.sobrenome}`}
                          </td>
                          <td>{`${participant.idade}`}</td>
                          <td>
                            <Link
                              to={`https://wa.me/${formatPhoneNumber(
                                participant.telefone
                              )}`}
                            >
                              <i className="bi bi-whatsapp"></i>{" "}
                              {participant.telefone}
                            </Link>
                          </td>
                          <td>{participant.email}</td>
                          <td>{participant.status}</td>
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
