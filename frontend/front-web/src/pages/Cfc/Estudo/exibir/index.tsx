import React, { useEffect, useState } from "react";
import { findAll, downloadPdf } from "../../../../service/estudosService";
import { EbdEstudo } from "../../../../models/EbdEstudo";

const ExibirPdfs = () => {
  const [estudos, setEstudos] = useState<EbdEstudo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEstudos = async () => {
      try {
        const response = await findAll();
        const dadosCorrigidos = response.data.map((estudo: EbdEstudo) => ({
          ...estudo,
          EBDCurso: estudo.ebdCurso || [],
        }));
        setEstudos(dadosCorrigidos);
        setLoading(false);
      } catch (err: any) {
        setError("Erro ao buscar os PDFs.");
        setLoading(false);
      }
    };

    fetchEstudos();
  }, []);

  const handleDownload = async (id: number) => {
    try {
      const response = await downloadPdf(id);
      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `estudo_${id}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (err: any) {
      setError(
        `Erro ao realizar o download do PDF: ${err.message || "Desconhecido"}`
      );
    }
  };

  if (loading) return <p>Carregando estudos...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!estudos.length) return <p>Nenhum estudo disponível.</p>;

  return (
    <div className="exibir-pdfs">
      <h2>Estudos Disponíveis</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>EBD Curso</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {estudos.map((estudo) => (
            <tr key={estudo.id}>
              <td>
                {Array.isArray(estudo.ebdCurso)
                  ? estudo.ebdCurso.map((curso) => curso.nome).join(", ")
                  : "Sem cursos"}
              </td>
              <td>{estudo.nome}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => handleDownload(estudo.id)}
                  aria-label={`Download do estudo ${estudo.nome}`}
                >
                  Download
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExibirPdfs;
