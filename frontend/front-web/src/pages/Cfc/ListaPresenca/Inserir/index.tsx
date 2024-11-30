// File: src/pages/InserirPresencaEBD.tsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import * as trilhoService from "../../../../service/trilhoService";
import * as presencaEBDService from "../../../../service/presencaEBDService";

import { curso } from "../../../../models/trilha";
import Header from "../../../../components/Header";

const InserirPresencaEBD = () => {
  const [curso, setCurso] = useState<curso | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const [presencas, setPresencas] = useState<
    Record<number, "presente" | "ausente" | null>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Carregar detalhes do curso
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

  useEffect(() => {
    if (id) {
      loadCurso(id);
    }
  }, [id]);

  // Obter participantes ordenados
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

  // Atualizar presenças
  const handleCheckboxChange = (id: number, status: "presente" | "ausente") => {
    setPresencas((prevState) => ({
      ...prevState,
      [id]: prevState[id] === status ? null : status, // Alternar entre selecionado e desmarcado
    }));
  };

  // Enviar lista de presenças
  const enviarListaDePresenca = async () => {
    if (!curso) return;

    const participantes = getSortedParticipants();

    // Construir lista de presenças para enviar
    const listaPresenca = participantes
      .filter((participant) => presencas[participant.id]) // Apenas participantes com presença marcada
      .map((participant) => ({
        id: 0,
        data: new Date(), // Data atual
        chamadaMembro: participant.status === "Membro" ? 1 : 0,
        chamadaVisitante: participant.status === "Visitante" ? 1 : 0,
        curso: { id: curso.id, nome: curso.nome, membro: [], visitante: [] },
        membro:
          participant.status === "Membro"
            ? { id: participant.id, nome: participant.nome }
            : { id: 0, nome: "" }, // Objeto padrão para membros
        visitante:
          participant.status === "Visitante"
            ? { id: participant.id, nome: participant.nome }
            : { id: 0, nome: "" }, // Objeto padrão para visitantes
      }));

    setIsSubmitting(true);

    try {
      await Promise.all(
        listaPresenca.map((presenca) => presencaEBDService.insert(presenca))
      );
      alert("Lista de presença enviada com sucesso!");
    } catch (error) {
      console.error("Erro ao enviar lista de presença:", error);
      alert("Erro ao enviar lista de presença. Por favor, tente novamente.");
    } finally {
      setIsSubmitting(false);
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
              <select className="form-select mb-3">
                <option>Selecione o mês</option>
                <option>Janeiro</option>
                <option>Fevereiro</option>
                <option>Março</option>
              </select>
              {curso.membro?.length || curso.visitante?.length ? (
                <div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Presente</th>
                        <th>Ausente</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedParticipants().map((participant) => (
                        <tr key={`${participant.status}-${participant.id}`}>
                          <td>
                            {`${participant.nome} ${participant.sobrenome}`}
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={presencas[participant.id] === "presente"}
                              onChange={() =>
                                handleCheckboxChange(participant.id, "presente")
                              }
                            />
                          </td>
                          <td>
                            <input
                              type="checkbox"
                              checked={presencas[participant.id] === "ausente"}
                              onChange={() =>
                                handleCheckboxChange(participant.id, "ausente")
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
