import { useEffect, useState } from "react";
import { ebdCurso } from "../../../models/trilha";
import * as cursoTrilhoService from "../../../service/cursoTrilhoService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import "./styles.css";
import { TiArrowBack } from "react-icons/ti";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { PiPrinterFill } from "react-icons/pi";
const TrilhaId = () => {
  const [curso, setCurso] = useState<ebdCurso | null>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const navigate = useNavigate();

  const loadCurso = (id: string) => {
    cursoTrilhoService
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
  const formatPhoneNumber = (phoneNumber: string): string => {
    // Remove caracteres não numéricos
    const cleaned = phoneNumber.replace(/\D/g, "");

    // Verifica se o número tem ao menos 10 ou 11 dígitos (DDD + número)
    if (cleaned.length === 10) {
      // Formato: (XX) XXXX-XXXX
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(
        6
      )}`;
    } else if (cleaned.length === 11) {
      // Formato: (XX) XXXXX-XXXX
      return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(
        7
      )}`;
    }

    // Retorna o número original caso não seja válido
    return phoneNumber;
  };
  const handlePrint = () => {
    if (!curso) {
      alert("Não há dados para imprimir.");
      return;
    }

    const doc = new jsPDF();

    // Título do documento
    doc.setFontSize(18);
    doc.text(`Participantes da Trilha: ${curso.nome}`, 10, 10);

    // Dados da tabela
    const tableColumn = ["#", "Nome", "Idade", "Telefone", "Email", "Status"];
    const tableRows = getSortedParticipants().map((participant, index) => [
      index + 1,
      `${participant.nome} ${participant.sobrenome}`,
      participant.idade,
      formatPhoneNumber(participant.telefone),
      participant.email,
      participant.status,
    ]);

    // Adiciona a tabela ao PDF
    //@ts-ignore
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 20, // Posição da tabela no PDF
    });

    // Salva o arquivo
    doc.save(`Participantes_Trilha_${curso.nome}.pdf`);
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
            <div className="col-md-10 col-10 m-3 md-5 pb-3 text-center">
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
                  <div className="form-check form-check-inline offset-9 mb-3 dataNascimento  ">
                    <button className="btn btn-success " onClick={handlePrint}>
                      <PiPrinterFill /> Imprimir Tabela
                    </button>
                  </div>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Idade</th>
                        <th>Telefone</th>
                        <th>Email</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getSortedParticipants().map((participant, index) => (
                        <tr key={`${participant.status}-${participant.id}`}>
                          {/* Adicione uma coluna para o índice */}
                          <td>{index + 1}</td>
                          <td>{`${participant.nome} ${participant.sobrenome}`}</td>
                          <td>{`${participant.idade}`}</td>
                          <td>
                            <Link
                              to={`https://wa.me/${formatPhoneNumber(
                                participant.telefone
                              )}`}
                            >
                              <i className="bi bi-whatsapp"></i>{" "}
                              {formatPhoneNumber(participant.telefone)}
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
