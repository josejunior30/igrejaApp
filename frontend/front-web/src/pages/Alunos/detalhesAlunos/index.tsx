import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { alunosDTO } from "../../../models/alunos";
import *as alunosService from '../../../service/alunosService';
import { deleteAluno } from "../excluirAlunos";
import { CgDanger } from "react-icons/cg";
import SuccessModal from "../../../components/Modal";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


const DetalhesAlunos = () => {
    const { id } = useParams<{ id: string }>() ?? { id: "" }; 
        const navigate = useNavigate();
    const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
    const [alunosDTO, setAlunosDTO] = useState<alunosDTO>(); 
        const [loading, setLoading] = useState(true);
      const [isModalVisible, setIsModalVisible] = useState(false);
      
    
    const loadAlunosDTO = (id: string) => {
      alunosService.findById(Number(id))  // Converte id para número
        .then(response => {
          console.log("Detalhes do Membro:", response.data);
          setAlunosDTO(response.data);
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
        loadAlunosDTO(id);
      }
    }, [id]);
  
   
    const getColorClassForPequenoGrupo = (id: number): string => {
      switch (id) {
        case 1:
          return "pg-id1";
        case 2:
          return "pg-id2";
        case 3:
          return "pg-id3";
          case 4:
            return "pg-id4";// Adicione mais casos conforme necessário
        default:
          return ""; // Adicione uma classe padrão ou deixe vazio para a cor padrão
      }
    };
    
    const handleModalClose = () => {
      setIsModalVisible(false);
      navigate('/secretaria/alunos')
    };
   
    const handleDeleteClick = () => {
      setShowDeleteConfirmation(true);
    };
    const handleConfirmDelete = async () => {
      if (id !== undefined) {
        await deleteAluno(parseInt(id, 10));
        setIsModalVisible(true);
        setShowDeleteConfirmation(false);
      }
    };
    const handleCancelDelete = () => {
      setShowDeleteConfirmation(false);
    };
    const handleNextClick = () => {
      if (id !== undefined) {
        const nextId = parseInt(id, 10) + 1;
        navigate(`/secretaria/alunos/${nextId}`);
      }
    };
  
    const handlePreviousClick = () => {
      if (id !== undefined) {
        const previousId = parseInt(id, 10) - 1;
        if (previousId > 0) {
          navigate(`/secretaria/alunos/${previousId}`);
        }
      }
    };
  
    return (
      <>
      <div className="membro-container">
        {alunosDTO ? (
          <div className="detalhe-container">
            <div className="conteudo-centralizado">
            <img src={alunosDTO.url} alt="Foto do Membro" className="foto-membro" />
              <span className="nome-id">{alunosDTO.nome}</span>
              <p className="dados"> Identidade: {alunosDTO.rg}</p>
              <p className="dados"> : {alunosDTO.idade}</p>
              <p className="dados">Data de Nascimento: {new Date(alunosDTO.dataNascimento).toLocaleDateString()}</p>
              <p className="dados"> Email: {alunosDTO.responsavel}</p>
              <p className="dados"> Cpf Responsavel: {alunosDTO.cpfResponsavel}</p>
           
              {alunosDTO.projetos && (
                <div >
                  <p className="dados">
        projetos:{" "}
        <span
          className={`pg ${getColorClassForPequenoGrupo(alunosDTO.projetos.id)}`}
        >
          {alunosDTO.projetos.nome}
        </span>
      </p>
              </div>
              )}
            </div>
          
            <div className="botoes-container">
            <Link to={`/editarAlunos/${id}`}>
              <button className="botao-editar">Editar</button>
              </Link>
              <button onClick={handleDeleteClick} className="botao-deletar">Deletar</button>
            </div>
            
          {showDeleteConfirmation && (
            <div className="modal-confirm" >
              <span className="icone-confirm"><CgDanger /></span>
              <p className="msg-confirm" >Tem certeza disso?</p>
              <button onClick={handleConfirmDelete} className="btn-confirma">Confirmar</button>
              <button onClick={handleCancelDelete} className="btn-confirma">Cancelar</button>
            </div>
          )}
            {isModalVisible && (
          <SuccessModal
            onClose={handleModalClose}
            onRedirect={() => navigate('/secretaria/alunos')}
            operation={'deletar'}
          />
          )}
          </div>
        ) : (
          <p>Carregando detalhes do membro...</p>
        )}
      </div>
      <div className="setas">
        <button onClick={handlePreviousClick} className="btn-left"> <FaChevronLeft /></button>
        <button onClick={handleNextClick} className="btn-right"><FaChevronRight /></button>
      </div>
      <div className="membro-container-endereço">
      <div className="detalhe-container-endereço">
        {alunosDTO ? (
            <div className="conteudo-centralizado-endereço">
              <p className="text-h2">Endereço</p>
            <p className="dados"> Rua: {alunosDTO.rua}</p>
              <p className="dados"> Bairro: {alunosDTO.bairro}</p>
              <p className="dados">Numero: {alunosDTO.numero}</p>
              <p className="dados">Cidade: {alunosDTO.cidade}</p>
              <p className="dados"> Complemento: {alunosDTO.complemento}</p>
              <p className="dados"> Cep: {alunosDTO.cep}</p>
            </div>
          ):(
            <p>Carregando detalhes do membro...</p>
            )}
            </div>
            </div>
  
       
         </>
    );
  };
  
  export default DetalhesAlunos;
  