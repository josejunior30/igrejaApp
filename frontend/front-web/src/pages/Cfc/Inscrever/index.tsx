import React, { useEffect, useState } from "react";
import * as membroService from "../../../service/membroService";
import * as visitanteService from "../../../service/visitanteService";
import * as trilhoService from "../../../service/trilhoService";
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { MembroDTO } from "../../../models/membro";
import { visitante } from "../../../models/visitante";
import { ebdCurso } from "../../../models/trilha";
import * as cursoTrilhoService from "../../../service/cursoTrilhoService";
const Inscrever: React.FC = () => {
  const [membros, setMembros] = useState<MembroDTO[]>([]);
  const [visitantes, setVisitantes] = useState<visitante[]>([]);
  const [selectedMembroId, setSelectedMembroId] = useState<string>("");
  const [selectedVisitanteId, setSelectedVisitanteId] = useState<string>("");
  const [nomeCurso, setNomeCurso] = useState<string>("");
  const [ebdCursos, setEbdCursos] = useState<ebdCurso[]>([]);
  const [isMember, setIsMember] = useState<boolean | null>(null);
  const [isVisitor, setIsVisitor] = useState<boolean | null>(null);
  const [selectedOpcaoCurso, setSelectedOpcaoCurso] = useState<string>("");
  const [selectedApostila, setSelectedApostila] = useState<boolean>(false);
  const [cadastroNome, setCadastroNome] = useState<string>("");
  const [cadastroDataNascimento, setCadastroDataNascimento] =
    useState<string>("");
  const [cadastroCelular, setCadastroCelular] = useState<string>("");
  const [cadastroEmail, setCadastroEmail] = useState<string>("");
  const [cadastroOpcao, setCadastroOpcao] = useState<string>("");
  const [cadastroApostila, setCadastroApostila] = useState<boolean>(false);
  const navigate = useNavigate();

  // Recuperar cursoId e ebdCursoId do localStorage
  const cursoId = parseInt(localStorage.getItem("cursoId") || "0", 10);
  const ebdCursoId = parseInt(
    localStorage.getItem("selectedEbdCursoId") || "0",
    10
  );

  useEffect(() => {
    const cursoId = parseInt(localStorage.getItem("cursoId") || "0", 10);
    const ebdCursoId = parseInt(
      localStorage.getItem("selectedEbdCursoId") || "0",
      10
    );

    if (
      isNaN(cursoId) ||
      isNaN(ebdCursoId) ||
      cursoId <= 0 ||
      ebdCursoId <= 0
    ) {
      alert("IDs inválidos. Retornando à página anterior.");
      navigate("/trilho");
      return;
    }
    cursoTrilhoService
      .findAllCurso()
      .then((response) => setEbdCursos(response.data))
      .catch(() => alert("Erro ao carregar lista de cursos EBD."));

    trilhoService
      .findById(cursoId)
      .then((response) => setNomeCurso(response.data.nome))
      .catch(() => {
        alert("Erro ao carregar os detalhes do curso.");
        navigate("/trilho");
      });
  }, [navigate]);

  useEffect(() => {
    membroService
      .findAll()
      .then((response) => {
        // Ordena os membros pelo nome em ordem alfabética
        const sortedMembros = response.data.sort((a: MembroDTO, b: MembroDTO) =>
          a.nome.localeCompare(b.nome)
        );
        setMembros(sortedMembros);
      })
      .catch(() => alert("Erro ao carregar lista de membros."));
  }, []);

  useEffect(() => {
    visitanteService
      .findAll()
      .then((response) => {
        // Ordena os visitantes pelo nome em ordem alfabética
        const sortedVisitantes = response.data.sort(
          (a: visitante, b: visitante) => a.nome.localeCompare(b.nome)
        );
        setVisitantes(sortedVisitantes);
      })
      .catch(() => alert("Erro ao carregar lista de visitantes."));
  }, []);

  const handlePatchMembroCurso = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMembroId || !selectedOpcaoCurso) {
      alert("Selecione um membro e um curso.");
      return;
    }

    try {
      // Atualizar o curso principal do membro
      await membroService.patchUpdateCurso(
        parseInt(selectedMembroId),
        cursoId,
        ebdCursoId
      );

      // Atualizar a opção de curso do membro
      await membroService.patchOpcao(
        parseInt(selectedMembroId),
        selectedOpcaoCurso
      );

      await membroService.patchApostila(
        parseInt(selectedMembroId),
        selectedApostila
      );
      alert("Inscrição e opção de curso atualizadas com sucesso!");
      navigate("/trilho");
    } catch (error) {
      console.error("Erro ao atualizar curso ou opção do membro:", error);
      alert("Erro ao atualizar o curso ou a opção do membro.");
    }
  };

  const handlePatchVisitanteCurso = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedVisitanteId || !selectedOpcaoCurso) {
      alert("Selecione um visitante e um curso.");
      return;
    }

    try {
      await visitanteService.patchUpdateCurso(
        parseInt(selectedVisitanteId),
        cursoId,
        ebdCursoId
      );

      await visitanteService.patchUpdateOpcao(
        parseInt(selectedVisitanteId),
        selectedOpcaoCurso
      );

      await visitanteService.patchUpdateApostila(
        parseInt(selectedVisitanteId),
        selectedApostila
      );
      alert("Inscrição e opção de curso atualizadas com sucesso!");
      navigate("/trilho");
    } catch (error) {
      console.error("Erro ao atualizar curso ou opção do visitante:", error);
      alert("Erro ao atualizar o curso ou a opção do visitante.");
    }
  };

  const handleCadastroVisitante = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !cadastroNome ||
      !cadastroDataNascimento ||
      !cadastroOpcao ||
      !cadastroCelular ||
      !cadastroApostila ||
      !cadastroEmail
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    try {
      const visitanteData = {
        nome: cadastroNome,
        dataNascimento: cadastroDataNascimento,
        telefone: cadastroCelular,
        email: cadastroEmail,
        apostila: false,
        opcaoCurso: cursoId,
        ebdCursoId,
      };

      await visitanteService.insertVisitante(visitanteData);
      alert("Cadastro realizado e inscrição no curso efetuada com sucesso!");
      navigate("/trilho");
    } catch (error) {
      console.error("Erro ao cadastrar visitante:", error);
      alert("Erro ao cadastrar visitante.");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5  mb-5">
        <div className="row text-center">
          {/* Pergunta "Já é membro?" */}
          <div className="col-12">
            <h3 className="curso-selecionado">{nomeCurso}</h3>
            <h2 className="titulo mt-5">Já é membro?</h2>
            <div className="opcao-membro">
              <label className="form-label Sim">
                Sim
                <input
                  type="radio"
                  name="isMember"
                  className="form-check-input input-sim"
                  onChange={() => {
                    setIsMember(true);
                    setIsVisitor(null);
                  }}
                />
              </label>
              <label className="form-label Nao">
                Não
                <input
                  type="radio"
                  name="isMember"
                  className="form-check-input input-sim"
                  onChange={() => {
                    setIsMember(false);
                    setIsVisitor(null); // Limpa a resposta de "Já tem cadastro?"
                  }}
                />
              </label>
            </div>
          </div>

          {/* Se o usuário é membro */}
          {isMember && (
            <form onSubmit={handlePatchMembroCurso}>
              <div className="col-3 mt-4 mb-5 mx-auto">
                <select
                  className="form-select"
                  value={selectedMembroId}
                  onChange={(e) => setSelectedMembroId(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione seu nome
                  </option>
                  {membros.map((membro) => (
                    <option key={membro.id} value={membro.id}>
                      {membro.nome}
                      {membro.sobrenome}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-3 mt-4 mb-5 mx-auto">
                <label className="form-label labelOpcao">
                  Segunda opção de Curso
                </label>
                <select
                  className="form-select"
                  value={selectedOpcaoCurso}
                  onChange={(e) => setSelectedOpcaoCurso(e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Selecione
                  </option>
                  {ebdCursos.map((curso) => (
                    <option key={curso.id} value={curso.nome}>
                      {curso.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-3 mt-4 mb-5 mx-auto">
                <label className="form-label labelApostla">
                  Marque se quiser Apostila impressa
                </label>
                <input
                  type="checkbox"
                  checked={selectedApostila}
                  onChange={(e) => setSelectedApostila(e.target.checked)}
                />
              </div>
              <button type="submit" className="btn-inscricao">
                Concluir
              </button>
            </form>
          )}

          {/* Se o usuário não é membro */}
          {!isMember && isMember !== null && (
            <>
              {/* Pergunta "Já tem cadastro?" */}
              <div className="col-12">
                <h2 className="titulo mt-5">Já tem cadastro?</h2>
                <div className="opcao-membro">
                  <label className="form-label Sim">
                    Sim
                    <input
                      type="radio"
                      name="isVisitor"
                      className="form-check-input input-sim"
                      onChange={() => setIsVisitor(true)}
                    />
                  </label>
                  <label className="form-label Nao">
                    Não
                    <input
                      type="radio"
                      name="isVisitor"
                      className="form-check-input input-sim"
                      onChange={() => setIsVisitor(false)}
                    />
                  </label>
                </div>
              </div>

              {/* Se o usuário já tem cadastro (visitante) */}
              {isVisitor && (
                <form onSubmit={handlePatchVisitanteCurso}>
                  <div className="col-3 mt-4 mb-5 mx-auto">
                    <select
                      className="form-select"
                      value={selectedVisitanteId}
                      onChange={(e) => setSelectedVisitanteId(e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        Selecione seu nome
                      </option>
                      {visitantes.map((visitante) => (
                        <option key={visitante.id} value={visitante.id}>
                          {visitante.nome}
                          {visitante.sobrenome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-3 mt-4 mb-5 mx-auto">
                    <label className="form-label labelOpcao">
                      Segunda opção de Curso
                    </label>
                    <select
                      className="form-select"
                      value={selectedOpcaoCurso}
                      onChange={(e) => setSelectedOpcaoCurso(e.target.value)}
                      defaultValue=""
                    >
                      <option value="" disabled>
                        selecione
                      </option>
                      {ebdCursos.map((curso) => (
                        <option key={curso.id} value={curso.nome}>
                          {curso.nome}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-3 mt-4 mb-5 mx-auto">
                    <label className="form-label labelApostla">
                      Marque se quiser Apostila impressa
                    </label>
                    <input
                      type="checkbox"
                      checked={selectedApostila}
                      onChange={(e) => setSelectedApostila(e.target.checked)}
                    />
                  </div>
                  <button type="submit" className="btn-inscricao">
                    Concluir
                  </button>
                </form>
              )}

              {/* Se o usuário não tem cadastro */}
              {!isVisitor && isVisitor !== null && (
                <div className="container col-md-8 offset-2 mt-5 mb-5">
                  <form
                    className="row g-4 px-4 pb-4 form-visitante mb-5"
                    onSubmit={handleCadastroVisitante}
                  >
                    <h2>Cadastre-se</h2>
                    <div className="col-md-8 ">
                      <label className="form-label dados-visitante">
                        Nome Completo
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={cadastroNome}
                        onChange={(e) => setCadastroNome(e.target.value)}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label dados-visitante">
                        Data de Nascimento
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        value={cadastroDataNascimento}
                        onChange={(e) =>
                          setCadastroDataNascimento(e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label dados-visitante">
                        Celular
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        value={cadastroCelular}
                        onChange={(e) => setCadastroCelular(e.target.value)}
                      />
                    </div>
                    <div className="col-md-6 ">
                      <label className="form-label dados-visitante">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        value={cadastroEmail}
                        onChange={(e) => setCadastroEmail(e.target.value)}
                      />
                    </div>
                    <div className="col-4 mt-4 mb-5 mx-auto">
                      <label className="form-label labelOpcao">
                        Segunda opção de Curso
                      </label>
                      <select
                        className="form-select"
                        value={cadastroOpcao}
                        onChange={(e) => setCadastroOpcao(e.target.value)}
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Selecione
                        </option>
                        {ebdCursos.map((curso) => (
                          <option key={curso.id} value={curso.nome}>
                            {curso.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6 mt-5 pt-3">
                      <label className="form-label  pe-3 dados-visitante">
                        Marque se quiser Apostila impressa
                      </label>
                      <input
                        type="checkbox"
                        checked={cadastroApostila}
                        onChange={(e) => setCadastroApostila(e.target.checked)}
                      />
                    </div>
                    <div className="col-12 mt-5 mx-auto">
                      <button type="submit" className="btn-inscricao">
                        Concluir
                      </button>
                    </div>
                  </form>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Inscrever;
