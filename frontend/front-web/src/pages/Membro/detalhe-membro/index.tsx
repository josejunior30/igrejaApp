import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MembroDTO } from "../../../models/membro";
import './styles.css';
import * as membroService from '../../../service/membroService';
import { deleteMembro } from "../../formMembro/excluirMembro";
import SuccessModal from "../../../components/Modal";
import { CgDanger } from "react-icons/cg";
import Header from "../../../components/Header";
import { Foto } from "../../../models/foto";
import { uploadImagem } from "../../../service/imagemService";



const Detalhes = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" }; // Fornecendo uma string vazia como valor padrão
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [MembroDTO, setMembroDTO] = useState<MembroDTO>(); // Estado para armazenar os detalhes do membro
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [Foto, setFoto] = useState<Foto>();
  const [imageUrl, setImageUrl] = useState<string>();

  const loadMembroDTO = (id: number) => {
    membroService.findById(id)  // Não é necessário converter id para número
      .then(response => {
        console.log("Detalhes do Membro:", response.data);
        setMembroDTO(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes do membro:", error);
        // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
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
        // Trate o caso de um ID inválido (por exemplo, redirecione o usuário para uma página de erro)
      }
    }
  }, [id]);



  const handleModalClose = () => {
    setIsModalVisible(false);
    navigate('/membro');
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
    navigate(`/membro`);
  };

  const handleImageChange = async (event: any) => {
    const file = event.target.files[0];
    if (file) {
      try {
        if (MembroDTO) {
          const id = MembroDTO.id;
          const url = await uploadImagem(id, file);
          
          setFoto({
            id: id,
            fileDownloadUri: url,
           
          });
          
          setImageUrl(url); 
        } else {
          console.error('MembroDTO é undefined. Não é possível obter o ID do membro.');
        }
      } catch (error) {
        console.error('CHANGE:', error);
      }
    }
  };
  const inputRef = useRef<HTMLInputElement>(null);

  
  return (
    <>
      <Header/>
      <div className="container-fluid mt-5 pt-5">
  <div className="row justify-content-center">
   


    <div className="col-md-3 col-7 m-5 md-5 pb-3 text-center" id="dados">
      {MembroDTO ? (
        <>
          <img
            src={Foto?.fileDownloadUri}
            alt="Foto do Membro"
            className="img-fluid mb-3 rounded mx-auto d-block " id="foto-membro"
            onClick={() => inputRef.current?.click()}
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            ref={inputRef}
            style={{ display: 'none' }}
          />

          <span className="nome-id">{MembroDTO.nome} {MembroDTO.sobrenome}</span>
          <p className="dados"><span>CPF:</span> {MembroDTO.cpf}</p>
          <p className="dados"><span>Idade:</span> {MembroDTO.idade}</p>
          <p className="dados"><span>Estado Civil:</span> {MembroDTO.estadoCivil}</p>
          <p className="dados"><span>Data de Nascimento:</span> {new Date(MembroDTO.dataNascimento).toLocaleDateString()}</p>
          <p className="dados"><span>Email:</span> {MembroDTO.email}</p>
          <p className="dados"><span>Telefone:</span> {MembroDTO.telefone}</p>
       
          <div className="botoes-container">
            <Link to={`/membro/atualizar/${id}`}>
              <button className="botao-editar">Editar</button>
            </Link>
            <button onClick={handleDeleteClick} className="botao-deletar">Deletar</button>
          </div>
        </>
      ) : (
        <p>Carregando detalhes do membro...</p>
      )}
    </div>

    <div className="col-md-3 col-7 m-5 md-5 text-center align-content-center" id="endereço">
      {MembroDTO ? (
        <div className="conteudo-centralizado-endereço">
          <p className="text-h2">Endereço</p>
          <p className="dados"><span>Rua:</span> {MembroDTO.rua}</p>
          <p className="dados"><span>Bairro:</span> {MembroDTO.bairro}</p>
          <p className="dados"><span>Número:</span> {MembroDTO.numero}</p>
          <p className="dados"><span>Cidade:</span> {MembroDTO.cidade}</p>
          <p className="dados"><span>Complemento:</span> {MembroDTO.complemento}</p>
          <p className="dados"><span>CEP:</span> {MembroDTO.cep}</p>
        </div>
      ) : (
        <p>Carregando detalhes do membro...</p>
      )}
    </div>

    {showDeleteConfirmation && (
      <div className="modal-confirm">
        <span className="icone-confirm"><CgDanger /></span>
        <p className="msg-confirm">Tem certeza disso?</p>
        <button onClick={handleConfirmDelete} className="btn-confirma">Confirmar</button>
        <button onClick={handleCancelDelete} className="btn-confirma">Cancelar</button>
      </div>
    )}
    {isModalVisible && (
      <SuccessModal
        onClose={handleModalClose}
        onRedirect={() => navigate('/membro')}
        operation={'deletar'}
      />
    )}
  </div>
  <div className="row  text-center">
    <div className="col-2 offset-4 mb-5" id="voltar-membro"> 
    <button className="btn btn-primary" onClick={handleGoBack}>Voltar</button>
    </div>

  </div>


</div>
   
      </>
  );
};

export default Detalhes;