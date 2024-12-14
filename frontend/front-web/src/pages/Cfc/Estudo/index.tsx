import Header from "../../../components/Header";
import "./styles.css";
import { useState } from "react";
import { uploadPdf } from "../../../service/estudosService";

const Estudo = () => {
  const [cursoId, setCursoId] = useState<number | null>(null);
  const [nomeEstudo, setNomeEstudo] = useState<string>("");
  const [arquivo, setArquivo] = useState<File | null>(null);
  const [mensagem, setMensagem] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCursoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setCursoId(value === "selecione" ? null : parseInt(value));
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

      // Exibir ou manipular os dados recebidos
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

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5 text-center">
        <div className="row d-flex mt-5">
          <div className="col-3 curso">
            <h3>Escolha o Curso</h3>
            <select
              className="form-select"
              value={cursoId || "selecione"}
              onChange={handleCursoChange}
            >
              <option value="selecione">Selecione</option>
              <option value="1">Curso Gênesis</option>
              <option value="2">Salmos</option>
            </select>
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
            <button
              className="btn btn-primary mt-3"
              onClick={handleEnviar}
              disabled={isLoading}
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </button>
            {mensagem && <p className="mt-3">{mensagem}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default Estudo;
