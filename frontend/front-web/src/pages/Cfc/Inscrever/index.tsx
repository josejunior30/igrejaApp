import React, { useEffect, useState } from "react";
import { findAll, updateMembro } from "../../../service/membroService";
import * as trilhoService from "../../../service/trilhoService"; // Importe o serviço que busca detalhes do curso
import Header from "../../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";
const Inscrever = () => {
  const [membros, setMembros] = useState<any[]>([]);
  const [selectedMembroId, setSelectedMembroId] = useState<string>("");
  const [nomeCurso, setNomeCurso] = useState<string>(""); // Estado para armazenar o nome do curso
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>(); // Captura `id` da URL

  let cursoId = id ? Number(id) : NaN;
  console.log("Curso ID recebido em Inscrever:", cursoId); // Log para depuração

  useEffect(() => {
    if (isNaN(cursoId)) {
      console.error("Curso ID inválido ou ausente:", cursoId);
      alert("Curso inválido. Retornando à página anterior.");
      navigate("/trilho");
    } else {
      // Busca os detalhes do curso pelo ID
      trilhoService
        .findById(cursoId)
        .then((response) => {
          console.log("Detalhes do curso recebidos:", response.data);
          setNomeCurso(response.data.nome); // Armazena o nome do curso
        })
        .catch((error) => {
          console.error("Erro ao buscar detalhes do curso:", error);
          alert("Erro ao carregar os detalhes do curso.");
          navigate("/trilho");
        });
    }
  }, [cursoId, navigate]);

  useEffect(() => {
    findAll()
      .then((response) => {
        console.log("Lista de membros recebida:", response.data);
        setMembros(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar membros:", error);
      });
  }, []);

  const handleUpdateMembro = () => {
    if (!selectedMembroId) {
      alert("Selecione um membro para atualizar.");
      return;
    }

    const MembroDTO = { cursoId };
    console.log(
      "Atualizando membro com ID:",
      selectedMembroId,
      "e Curso ID:",
      cursoId
    );

    updateMembro(parseInt(selectedMembroId), MembroDTO)
      .then(() => {
        alert("Membro atualizado com sucesso!");
        navigate("/trilho/sucesso");
      })
      .catch((error) => {
        console.error("Erro ao atualizar membro:", error);
        alert("Erro ao atualizar membro.");
      });
  };

  return (
    <>
      <Header />

      <div className="container-fluid mt-5 pt-5">
        <div className="row mt-5 text-center">
          <div className="col-12">
            <h2 className="titulo">Ja é membro?</h2>
            <div className="opcao-membro">
              <label className="form-label">
                Sim
                <input type="radio" name="opcao" className="form-check-input" />
              </label>
              <label className="form-label">
                Não
                <input type="radio" name="opcao" className="form-check-input" />
              </label>
            </div>
            <div className="col-3 mt-4 mb-5 mx-auto">
              <select
                className="form-select"
                value={selectedMembroId}
                onChange={(e) => setSelectedMembroId(e.target.value)}
              >
                <option value="" selected>
                  Selecione um membro
                </option>
                {membros.map((membro) => (
                  <option key={membro.id} value={membro.id}>
                    {membro.nome}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <h3 className="curso-selecionado">
                Curso Selecionado: <span>{nomeCurso}</span>
              </h3>
            </div>
          </div>
          <div className="col-12 mx-auto">
            <button onClick={handleUpdateMembro} className="btn-inscrição">
              Concluir Atualização
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Inscrever;
