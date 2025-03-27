import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Header from "../../../components/Header";
import { cursoDTO as CursoModel } from "../../../models/trilha";
import * as trilhoService from "../../../service/trilhoService";
import { downloadPdf } from "../../../service/estudosService";
import "./styles.css";
import { TiArrowBack } from "react-icons/ti";

const MenuOpcao = () => {
  const [curso, setCurso] = useState<CursoModel | null>(null);
  const [selectedCursoId, setSelectedCursoId] = useState<number | null>(null);
  const [menuPosition, setMenuPosition] = useState<{
    top: number;
    left: number;
  } | null>(null); // Gerencia a posição do menu
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      loadCurso(id);
    } else {
      console.error("ID inválido ou ausente.");
    }
  }, [id]);

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

  const handleItemClick = (ebdCursoId: number, event: React.MouseEvent) => {
    const rect = (event.target as HTMLElement).getBoundingClientRect();
    const cursoId = curso?.id;

    if (!cursoId || cursoId <= 0) {
      alert("Curso inválido.");
      return;
    }

    setSelectedCursoId((prevId) => (prevId === ebdCursoId ? null : ebdCursoId));
    setMenuPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + window.scrollX - 80,
    });

    if (selectedCursoId !== ebdCursoId) {
      localStorage.setItem("selectedEbdCursoId", ebdCursoId.toString());
      localStorage.setItem("cursoId", cursoId.toString());
    }
  };

  const handleCheckboxChange = (ebdCursoId: number) => {
    setSelectedCursoId((prevId) => (prevId === ebdCursoId ? null : ebdCursoId));
  };

  const handleInscrever = () => {
    if (selectedCursoId) {
      navigate(`/trilho/inscrever/${selectedCursoId}`);
    } else {
      alert("Selecione um curso antes de prosseguir.");
    }
  };

  const handleAreaProfessor = () => {
    if (selectedCursoId) {
      navigate(`/trilho/${selectedCursoId}`);
    } else {
      alert("Selecione um curso antes de prosseguir.");
    }
  };

  const handleDownload = () => {
    if (selectedCursoId) {
      downloadPdf(selectedCursoId)
        .then((response: { data: BlobPart }) => {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", `curso-${selectedCursoId}.pdf`);
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error("Erro ao baixar o PDF:", error);
          alert("Não foi possível baixar o PDF. Tente novamente mais tarde.");
        });
    } else {
      alert("Selecione um curso antes de baixar.");
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-2 mb-5">
        <button
          className="btn btn-danger text-center mt-5 ms-5"
          onClick={handleAreaProfessor}
        >
          Área do Professor
        </button>
        <div className="voltar-projetos-detalhes ">
          <Link to="/trilho">
            <TiArrowBack /> Voltar
          </Link>
        </div>
        <h4 className="titulo-curso text-center pt-1 ">
          O que é o trilho{" "}
          <span className="curso-trilha">
            {loading ? "carregando..." : curso?.nome ?? "não encontrado"}?
          </span>
        </h4>
        <div className="row justify-content-center">
          <div className="section-trilho col-7 text-center align-self-center mt-3">
            <p className="sobre-trilha">{curso?.resumo}</p>
          </div>
        </div>
        <div className="row justify-content-center mb-5">
          <h5 className="text-center escolha mt-3">
            Escolha o curso disponível:
          </h5>
          <div className="section-curso col-12  mt-3">
            {curso?.ebdCurso && curso.ebdCurso.length > 0 ? (
              <ul className="justify-content-center">
                {curso.ebdCurso.map((ebdCurso) => (
                  <li
                    key={ebdCurso.id}
                    className={`curso-item ${
                      selectedCursoId === ebdCurso.id ? "active" : ""
                    }`}
                    onClick={(event) => handleItemClick(ebdCurso.id, event)}
                  >
                    <input
                      className="custom-checkbox"
                      type="checkbox"
                      checked={selectedCursoId === ebdCurso.id}
                      onChange={() => handleCheckboxChange(ebdCurso.id)}
                    />
                    {ebdCurso.nome}
                  </li>
                ))}
              </ul>
            ) : (
              <p>Nenhum curso disponível.</p>
            )}
          </div>
          {menuPosition && selectedCursoId && (
            <div
              className="menu-curso "
              style={{
                position: "absolute",
                top: menuPosition.top,
                left: menuPosition.left,
                maxWidth: "700px",
                minWidth: "600px",
                maxHeight: "400px", 
                overflow: "hidden",
              }}
            >
              {curso?.ebdCurso
                .filter((ebdCurso) => ebdCurso.id === selectedCursoId)
                .map((ebdCurso) => (
                  <p className="pt-2">
                    • {ebdCurso.resumo.replace(/;/g, ";\n• ")}
                  </p>
                ))}
              <div className="row">
                <div className=" col-7 d-flex botoes-menu mb-5">
                  <button className="inscrever" onClick={handleInscrever}>
                    Inscrever-se
                  </button>
                  <button className="baixar" onClick={handleDownload}>
                    Baixar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MenuOpcao;
