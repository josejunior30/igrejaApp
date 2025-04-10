import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MembroDTO } from "../../../models/membro";
import "./styles.css";
import * as membroService from "../../../service/membroService";
import { deleteMembro } from "../../formMembro/excluirMembro";
import SuccessModal from "../../../components/Modal";
import { CgDanger } from "react-icons/cg";
import Header from "../../../components/Header";

import userDefault from "../../../assets/userDefault.jpeg";

const Detalhes = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [MembroDTO, setMembroDTO] = useState<MembroDTO>();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  

  const loadMembroDTO = (id: number) => {
    membroService
      .findById(id)
      .then((response) => {
        console.log("Detalhes do Membro:", response.data);
        setMembroDTO(response.data);
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

    membroService
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
      await deleteMembro(parseInt(id, 10));
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

  const getColorByStauts = (tipoCulto: string) => {
    switch (tipoCulto) {
      case "AFASTADO":
        return "var(--color-yellow)";
      case "DESLIGADO":
        return "var(--color-red)";
      default:
        return "var(--color-money)";
    }
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
            {MembroDTO ? (
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
                      src={MembroDTO.url ? MembroDTO.url : userDefault}
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
                    <span
                      className="status-membro"
                      style={{
                        color: getColorByStauts(MembroDTO.membroStatus),
                      }}
                    >
                      {MembroDTO.membroStatus}
                    </span>

                    {MembroDTO?.desligamento && (
                      <span className="desligamento-membro ">
                        {new Date(MembroDTO.desligamento).toLocaleDateString()}
                      </span>
                    )}
                    <p className="nome-membro">
                      {MembroDTO.nome} {MembroDTO.sobrenome}
                    </p>
                    <div className="d-flex">
                      <p className="dados-m">
                        <span>Data de Nascimento:</span>{" "}
                        {new Date(
                          MembroDTO.dataNascimento
                        ).toLocaleDateString()}
                      </p>
                      <p className="dados-m">
                        <span>Idade:</span> {MembroDTO.idade}
                      </p>
                    </div>
                    <div className="d-flex ">
                      <p className="dados-m">
                        <span>CPF:</span> {MembroDTO.cpf}
                      </p>
                      <p className="dados-m">
                        <span>Estado Civil:</span> {MembroDTO.estadoCivil}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="dados-m">
                        <span>Email:</span> {MembroDTO.email}
                      </p>
                      <p className="dados-m">
                        <span>Telefone:</span> {MembroDTO.telefone}
                      </p>
                    </div>
                    <div className="d-flex">
                      <p className="dados-m">
                        <span>Membro por: </span> {MembroDTO.membroTipo}{" "}
                      </p>
                      <p className="dados-m">
                        <span>Ano: </span> {MembroDTO.ano}
                      </p>
                    </div>
                  </div>
                </div>

                {MembroDTO.curso && (
                  <p className="dados-trilho offset-2 mb-5">
                    <span>Trilho:</span> {MembroDTO.curso.nome}
                  </p>
                )}
              </>
            ) : (
              <p>Carregando detalhes do membro...</p>
            )}
          </div>
          {MembroDTO ? (
            <div className="endereço-membro col-md-4 text-center m-5">
              <p className="titulo-endereço">Endereço</p>
              <div className="d-flex justify-content-center ">
                <p className="dados-m">
                  <span>Rua:</span> {MembroDTO.rua}
                </p>
                <p className="dados-m">
                  <span>Número:</span> {MembroDTO.numero}
                </p>
              </div>
              <div className="d-flex justify-content-center ">
                <p className="dados-m">
                  <span>Bairro:</span> {MembroDTO.bairro}
                </p>

                <p className="dados-m">
                  <span>Cidade:</span> {MembroDTO.cidade}
                </p>
              </div>
              <p className="dados-m">
                <span>Complemento:</span> {MembroDTO.complemento}
              </p>
              <p className="dados-m">
                <span>CEP:</span> {MembroDTO.cep}
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

export default Detalhes;
