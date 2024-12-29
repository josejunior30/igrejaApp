import React, { useEffect, useState } from "react";
import { uploadPdf } from "../../../service/estudosService";
import { findAllCurso } from "../../../service/cursoTrilhoService";
import { EbdEstudo } from "../../../models/EbdEstudo";
import Header from "../../../components/Header";
import "./styles.css";
import { ebdCurso } from "../../../models/trilha";
import { useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";

const Estudo = () => {
  const [cursoId, setCursoId] = useState<number | null>(null);
  const [ebdCurso, setEbdCurso] = useState<ebdCurso[]>([]);
  const [nomeEstudo, setNomeEstudo] = useState<string>("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [mensagem, setMensagem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCursos, setIsLoadingCursos] = useState<boolean>(true);
  const navigator = useNavigate();
  // Carregar lista de cursos do backend
  useEffect(() => {
    const fetchCursos = async () => {
      try {
        setIsLoadingCursos(true);
        const response = await findAllCurso();
        setEbdCurso(response.data); // Atualiza o estado com os cursos recebidos
      } catch (error: any) {
        console.error("Erro ao carregar cursos:", error.message);
        setMensagem(
          error.response?.data?.message || "Erro ao carregar a lista de cursos."
        );
        setEbdCurso([]);
      } finally {
        setIsLoadingCursos(false);
      }
    };

    fetchCursos();
  }, []);

  const handleCursoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCursoId(value === "selecione" ? null : parseInt(value, 10));
  };

  const handleArquivoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type !== "application/pdf") {
        setMensagem("Por favor, selecione um arquivo PDF válido.");
        return;
      }
      setArquivo(file);
    }
  };

  const handleEnviar = async () => {
    if (!cursoId || !arquivo || !nomeEstudo.trim()) {
      setMensagem("Por favor, preencha todos os campos.");
      return;
    }

    setIsLoading(true);
    try {
      const resultado = await uploadPdf(cursoId, arquivo, nomeEstudo);
      console.log("Estudo criado:", resultado);

      // Exibe um alert de sucesso
      alert(
        `Estudo '${resultado.nome}' enviado com sucesso! ID: ${resultado.id}`
      );

      setMensagem(
        `Estudo '${resultado.nome}' enviado com sucesso! ID: ${resultado.id}`
      );
      setCursoId(null);
      setArquivo(null);
      setNomeEstudo("");
    } catch (error: any) {
      console.error("Erro ao enviar estudo:", error.message);
      setMensagem(error.message || "Erro inesperado ao enviar o estudo.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleGoBack = () => {
    navigator(-1);
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <button className="voltar-botao " onClick={handleGoBack}>
          <TiArrowBack /> Voltar
        </button>
        <div className="row d-flex mt-5 justify-content-center text-center">
          <div className="col-3 curso">
            <h3>Escolha o Curso</h3>
            {isLoadingCursos ? (
              <p>Carregando cursos...</p>
            ) : ebdCurso.length > 0 ? (
              <select
                className="form-select"
                value={cursoId || "selecione"}
                onChange={handleCursoChange}
              >
                <option value="selecione">Selecione</option>
                {ebdCurso.map((curso) => (
                  <option key={curso.id} value={curso.id}>
                    {curso.nome}
                  </option>
                ))}
              </select>
            ) : (
              <p>Nenhum curso disponível.</p>
            )}
          </div>
        </div>
        <div className="row pt-5 mt-5">
          <div className="col-4 mx-auto">
            <input
              className="form-control"
              type="text"
              placeholder="Nome do Estudo"
              value={nomeEstudo}
              onChange={(e) => setNomeEstudo(e.target.value)}
            />
            <input
              className="form-control mt-3"
              type="file"
              onChange={handleArquivoChange}
            />
            <div className="justify-content-center text-center">
              <button
                className="btn btn-primary mt-3 "
                onClick={handleEnviar}
                disabled={isLoading}
              >
                {isLoading ? "Enviando..." : "Enviar"}
              </button>
              {mensagem && <p className="mt-3">{mensagem}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Estudo;
