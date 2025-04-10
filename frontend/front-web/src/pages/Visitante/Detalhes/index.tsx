import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./styles.css";
import * as visitanteService from "../../../service/visitanteService";
import { deleteVisitante } from "../../../service/visitanteService";
import SuccessModal from "../../../components/Modal";
import { CgDanger } from "react-icons/cg";
import Header from "../../../components/Header";
import { visitante } from "../../../models/visitante";
import userDefault from "../../../assets/userDefault.jpeg";

const DetalhesVisitante = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [visitanteDTO, setVisitanteDTO] = useState<visitante>();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  

  const loadMembroDTO = (id: number) => {
    visitanteService
      .findById(id)
      .then((response) => {
        console.log("Detalhes do Membro:", response.data);
        setVisitanteDTO(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar detalhes do membro:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      const idNumber = parseInt(id, 10);
      if (!isNaN(idNumber)) {
        loadMembroDTO(idNumber);
      } else {
        console.error("ID inválido:", id);
      }
    }
  }, [id]);
  const handleFileUpload = (file: File) => {
    if (!id || isNaN(+id)) return;

    visitanteService
      .patchFotoPerfil(+id, file)
      .then(() => {
        window.location.reload();
      })
      .catch((err) => console.error("Erro ao atualizar imagem:", err));
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      handleFileUpload(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigate("/membro");
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (id !== undefined) {
      await deleteVisitante(parseInt(id, 10));
      setIsModalVisible(true);
      setShowDeleteConfirmation(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };


  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 ">
        <div className="row pt-5">
          <div className="col-md-6 m-5 md-5 pb-3  dadosMembros">
            {visitanteDTO ? (
              <>
                <div className="d-flex">
                  <div
                    ref={dropRef}
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    className="dropzone-container"
                  >
                    <img
                      src={visitanteDTO.url ? visitanteDTO.url : userDefault}
                      alt="Foto do Membro"
                      className="img-fluid mb-3 d-block foto-de-membro"
                      style={{ cursor: "pointer" }}
                      onClick={() => inputRef.current?.click()}
                    />
                    <input
                      ref={inputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                    {isHovered && (
                      <p className="text-center small text-muted arraste">
                        Arraste aqui a foto
                      </p>
                    )}
                  </div>

                  <div className="dados-pessoais">
                  
                    <p className="nome-membro">
                      {visitanteDTO.nome} {visitanteDTO.sobrenome}
                    </p>
                    <div className="d-flex">
                      <p className="dados-m">
                        <span>Data de Nascimento:</span>{" "}
                        {new Date(
                         visitanteDTO.dataNascimento
                        ).toLocaleDateString()}
                      </p>
                      <p className="dados-m">
                        <span>Idade:</span> {visitanteDTO.idade}
                      </p>
                    </div>
                    <div className="d-flex ">
                      <p className="dados-m">
                        <span>CPF:</span> {visitanteDTO.cpf}
                      </p>
                      <p className="dados-m">
                        <span>Estado Civil:</span> {visitanteDTO.estadoCivil}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="dados-m">
                        <span>Email:</span> {visitanteDTO.email}
                      </p>
                      <p className="dados-m">
                        <span>Telefone:</span> {visitanteDTO.telefone}
                      </p>
                    </div>
                   
                  </div>
                </div>
              </>
            ) : (
              <p>Carregando detalhes do membro...</p>
            )}
          </div>
          {visitanteDTO ? (
            <div className="endereço-membro col-md-4 text-center m-5">
              <p className="titulo-endereço">Endereço</p>
              <div className="d-flex justify-content-center ">
                <p className="dados-m">
                  <span>Rua:</span> {visitanteDTO.rua}
                </p>
                <p className="dados-m">
                  <span>Número:</span> {visitanteDTO.numero}
                </p>
              </div>
              <div className="d-flex justify-content-center ">
                <p className="dados-m">
                  <span>Bairro:</span> {visitanteDTO.bairro}
                </p>

                <p className="dados-m">
                  <span>Cidade:</span> {visitanteDTO.cidade}
                </p>
              </div>
              <p className="dados-m">
                <span>Complemento:</span> {visitanteDTO.complemento}
              </p>
              <p className="dados-m">
                <span>CEP:</span> {visitanteDTO.cep}
              </p>
            </div>
          ) : (
            <p>Carregando detalhes do membro...</p>
          )}
          <div className="row"></div>
          {showDeleteConfirmation && (
            <div className="modal-confirm">
              <span className="icone-confirm">
                <CgDanger />
              </span>
              <p className="msg-confirm">Tem certeza disso?</p>
              <button onClick={handleConfirmDelete} className="btn-confirma">
                Confirmar
              </button>
              <button onClick={handleCancelDelete} className="btn-confirma">
                Cancelar
              </button>
            </div>
          )}
          {isModalVisible && (
            <SuccessModal
              onClose={handleModalClose}
              onRedirect={() => navigate("/membro")}
              operation={"deletar"}
            />
          )}
        </div>
        <div className="row  text-center justify-content-center">
          <div className="col-md-9">
            <div className="botoes-membros-container">
              <Link to={`/membro/atualizar/${id}`}>
                <button className="button-primary" id="botao-editar-membro">Editar</button>
              </Link>
              <button
                onClick={handleDeleteClick}
                className="button-deletar"
                id="botao-deletar-membro"
              >
                Deletar
              </button>
              <button
                className="btn btn-primary  voltar-detalhe-membro"
                onClick={handleGoBack}
              >
                Voltar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalhesVisitante;
