import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { alunosDTO } from "../../../models/alunos";
import *as alunosService from '../../../service/alunosService';
import { deleteAluno } from "../excluirAlunos";
import { CgDanger } from "react-icons/cg";
import SuccessModal from "../../../components/Modal";

import Header from "../../../components/Header";
import './styles.css';

const DetalhesAlunos = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" }; 
      const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [alunosDTO, setAlunosDTO] = useState<alunosDTO>(); 
      const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [imageUrl, setImageUrl] = useState<string>();
  
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


  const handleModalClose = () => {
    setIsModalVisible(false);
    navigate('/alunos')
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


  const handleGoBack = () => {
    navigate(-1);
  }
  const handleNextClick = () => {
    if (id !== undefined) {
      const nextId = parseInt(id, 10) + 1;
      navigate(`/alunos/${nextId}`);
    }
  };

  const handlePreviousClick = () => {
    if (id !== undefined) {
        const previousId = parseInt(id, 10) - 1;
        navigate(`/alunos/${previousId}`);
    }
};
return (
  <>
    <Header />
    <div className="container-fluid mt-5 pt-5">
      
      <div className="row justify-content-center">
      

        {alunosDTO ? (
          <>
          

            <div className="col-md-3 col-7 m-5 md-5 pb-3 text-center" id="dados">
              <img src={alunosDTO.url} alt="Foto do Membro" className="img-fluid " />
              <span className="nome-id">{alunosDTO.nome}</span>
              <p className="dados"><span>Identidade:</span> {alunosDTO.rg}</p>
              <p className="dados"><span>Idade:</span> {alunosDTO.idade}</p>
              <p className="dados"><span>Data de Nascimento:</span> {new Date(alunosDTO.dataNascimento).toLocaleDateString()}</p>
              <p className="dados"><span>Email: </span>{alunosDTO.email}</p>
              <p className="dados"><span>Cpf Responsavel: </span>{alunosDTO.cpfResponsavel}</p>

              {alunosDTO.projetos && (
                <p className="dados-Projeto"><span> Projeto:{alunosDTO.projetos.nome} </span> </p>
              )}

            
            </div>

            <div className="col-md-3 col-7 m-5 md-5 text-center align-content-center" id="endereço">
              <p className="text-h2">Endereço</p>
              <p className="dados"><span>Rua:</span> {alunosDTO.rua}</p>
              <p className="dados"><span>Bairro:</span> {alunosDTO.bairro}</p>
              <p className="dados"><span>Número:</span> {alunosDTO.numero}</p>
              <p className="dados"><span>Cidade:</span> {alunosDTO.cidade}</p>
              <p className="dados"><span>Complemento:</span> {alunosDTO.complemento}</p>
              <p className="dados"><span>Cep:</span> {alunosDTO.cep}</p>
              <div className="botoes-container">
                <Link to={`/editarAlunos/${id}`}>
                  <button className="botao-editar">Editar</button>
                </Link>
                <button onClick={handleDeleteClick} className="botao-deletar">Deletar</button>
              </div>
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
                onRedirect={() => navigate('/alunos')}
                operation={'deletar'}
              />
            )}
          </>
        ) : (
          <p>Carregando detalhes do membro...</p>
        )}

      </div>
<div className="row ">
  <div className="col-12 mb-5" id="voltar-alunos"> 
  <button className="btn btn-primary" onClick={handleGoBack}>Voltar</button>
  </div>

</div>
    
    </div>
  </>
);

};

export default DetalhesAlunos;
