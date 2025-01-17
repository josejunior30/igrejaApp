import React, { useState, useEffect, useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import * as cursoTrilhoService from "../../../../service/cursoTrilhoService";
import * as presencaEBDService from "../../../../service/presencaEBDService";
import "./styles.css";
import { ebdCurso } from "../../../../models/trilha";
import Header from "../../../../components/Header";
import * as presencaVisitanteEBDService from "../../../../service/presencaVisitanteEBDService ";
import { ListaChamadaEBD } from "../../../../models/ListaChamadaEBD";
import { ListaChamadaVisitanteEBD } from "../../../../models/ListaChamadaVisitanteEBD";

const InserirPresencaEBD = () => {
  const [curso, setCurso] = useState<ebdCurso | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const [presencas, setPresencas] = useState<
    Record<string, "presente" | "ausente" | null>
  >({});
  const [dataPresenca, setDataPresenca] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carregar detalhes do curso
  const loadCurso = (id: string) => {
    cursoTrilhoService
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

  useEffect(() => {
    if (id) {
      loadCurso(id);
    }
  }, [id]);

  // Obter participantes ordenados e com IDs únicos
  const sortedParticipants = useMemo(() => {
    if (!curso) return [];
    const allParticipants = [
      ...(curso.membro || []).map((membro) => ({
        ...membro,
        status: "Membro",
        uniqueId: `membro-${membro.id}`,
      })),
      ...(curso.visitante || []).map((visitante) => ({
        ...visitante,
        status: "Visitante",
        uniqueId: `visitante-${visitante.id}`,
      })),
    ];
    return allParticipants.sort((a, b) => a.nome.localeCompare(b.nome));
  }, [curso]);

  // Atualizar presenças
  const handleCheckboxChange = (
    uniqueId: string,
    status: "presente" | "ausente"
  ) => {
    setPresencas((prevState) => {
      const newState = {
        ...prevState,
        [uniqueId]: prevState[uniqueId] === status ? null : status,
      };
      console.log("Novo estado após mudança:", newState);
      return newState;
    });
  };

  // Enviar lista de presenças
  const enviarListaDePresenca = async () => {
    if (!curso || !dataPresenca) {
      alert("Por favor, selecione uma data válida antes de enviar.");
      return;
    }

    const listaPresencaVisitantes: ListaChamadaVisitanteEBD[] =
      sortedParticipants
        .filter(
          (participant) =>
            participant.status === "Visitante" &&
            presencas[participant.uniqueId] === "presente"
        )
        .map((participant) => ({
          id: 0,
          data: new Date(dataPresenca),
          chamadaVisitante: 1,
          curso: {
            id: curso.id,
            nome: curso.nome,
            membro: [],
            visitante: [],
            EBDCurso: [],
          },
          visitante: { id: participant.id, nome: participant.nome },
        }));

    const listaPresencaMembros: ListaChamadaEBD[] = sortedParticipants
      .filter(
        (participant) =>
          participant.status === "Membro" &&
          presencas[participant.uniqueId] === "presente"
      )
      .map((participant) => ({
        id: 0,
        data: new Date(dataPresenca),
        chamadaMembro: 1,
        curso: {
          id: curso.id,
          nome: curso.nome,
          membro: [],
          visitante: [],
          EBDCurso: [],
        },
        membro: { id: participant.id, nome: participant.nome },
        visitante: null,
      }));

    setIsSubmitting(true);

    try {
      await Promise.all(
        listaPresencaVisitantes.map((presenca) =>
          presencaVisitanteEBDService.insertPresencaVisitante(presenca)
        )
      );
      await Promise.all(
        listaPresencaMembros.map((presenca) =>
          presencaEBDService.insert(presenca)
        )
      );
      alert("Lista de presença enviada com sucesso!");
      navigate(`/trilho/${curso.id}`);
    } catch (error) {
      console.error("Erro ao enviar lista de presença:", error);
      alert("Erro ao enviar lista de presença. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleHistorico = () => {
    if (curso) {
      navigate(`/trilho/presenca/historicoChamada`);
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
            <div className="col-md-7 col-10 m-3 md-5 pb-3 text-center">
              <h1 className="title">
                <span className="trilho-titulo">Trilha : </span>
                {curso.nome}
              </h1>
              <div className="col-md-10 d-flex  col-10" id="containerData">
                <div className="col-md-4  col-10 m-3 md-5 pb-3 text-center align-content-center">
                  <label
                    htmlFor="data-presenca"
                    id="LabelDataPresenca"
                    className="form-label"
                  >
                    Data da Chamada:
                  </label>
                  <input
                    type="date"
                    id="data-presenca"
                    className="form-control mb-3 "
                    value={dataPresenca}
                    onChange={(e) => setDataPresenca(e.target.value)}
                  />
                </div>
                <button className="Painel-Menu-btn" onClick={handleHistorico}>
                  Historico de Chamada
                </button>
              </div>
              {sortedParticipants.length ? (
                <div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Presente</th>
                        <th>Ausente</th>
                      </tr>
                    </thead>

                    <tbody>
                      {sortedParticipants.map((participant, index) => (
                        <tr key={participant.uniqueId}>
                          <td>{index + 1}</td>
                          <td>
                            {participant.nome} {participant.sobrenome}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                presencas[participant.uniqueId] === "presente"
                              }
                              onChange={() =>
                                handleCheckboxChange(
                                  participant.uniqueId,
                                  "presente"
                                )
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={
                                presencas[participant.uniqueId] === "ausente"
                              }
                              onChange={() =>
                                handleCheckboxChange(
                                  participant.uniqueId,
                                  "ausente"
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button
                    className="btn btn-primary mt-4"
                    onClick={enviarListaDePresenca}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Enviando..." : "Enviar Presença"}
                  </button>
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

export default InserirPresencaEBD;
