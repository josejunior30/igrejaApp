import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { alunosDTO } from "../../../models/alunos";
import * as alunosService from '../../../service/alunosService';
import { deleteAluno } from "../excluirAlunos";
import { CgDanger } from "react-icons/cg";
import SuccessModal from "../../../components/Modal";
import Header from "../../../components/Header";
import jsPDF from "jspdf";
import 'jspdf-autotable';
import './styles.css';
import { fontWeight } from "html2canvas/dist/types/css/property-descriptors/font-weight";

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
    navigate('/alunos');
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (id !== undefined) {
      await deleteAluno(parseInt(id, 10));
      setIsModalVisible(true);
      setShowDeleteConfirmation(false);
      navigate(-1);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteConfirmation(false);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const generatePDF = () => {
    if (!alunosDTO) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 14;
    const titleWidth = pageWidth - 2 * margin; 
  
 

    doc.setFontSize(18);
    doc.text("Ficha de Matricula", pageWidth / 2, 15, { align: 'center' });

    
    doc.setFillColor(200, 200, 200); 
    doc.rect(margin, 23, titleWidth, 10, 'F'); 
    doc.setFontSize(14);
    doc.text("Dados Peessoais", pageWidth / 2, 30, { align: 'center' });
    
    doc.setFontSize(12);
    doc.text(`Nome: ${alunosDTO.nome}`, 14, 45);
    doc.text(`Idade: ${alunosDTO.idade}`, 120, 45);
    doc.text(`Nascimento: ${new Date(alunosDTO.dataNascimento).toLocaleDateString()}`, 150, 45); // Aligned horizontally with name
    doc.text(`Telefone: ${alunosDTO.telefone}`, 14, 55)
    doc.text(`Email: ${alunosDTO.email}`, 70, 55);
    if (alunosDTO.projetos) {
      doc.text(`Curso: ${alunosDTO.projetos.nome}`, 130, 55);

    }
    doc.text("Possui alguma doença ?", 14, 65);
    doc.text(` ${alunosDTO.AlunoDoenca}`, 14, 75)
    doc.text(`${alunosDTO.pergunta}`, 70, 75)
    doc.text(`Responsavel: ${alunosDTO.responsavel}`, 14, 85)
    doc.text(`CPF do Responsavel: ${alunosDTO.cpfResponsavel}`, 120, 85)
   
  
    doc.setFillColor(200, 200, 200); 
    doc.rect(margin, 93, titleWidth, 10, 'F'); 
    doc.setFontSize(14);
    doc.text("Endereço", pageWidth / 2, 100, { align: 'center' });
   
    doc.setFontSize(12);
    doc.text(`Rua: ${alunosDTO.rua}`, 14, 110);
    doc.text(`Bairro: ${alunosDTO.bairro}`, 120, 110);
    doc.text(`Cidade: ${alunosDTO.cidade}`, 14, 120);
    doc.text(`Número: ${alunosDTO.numero}`, 90, 120);
    doc.text(`Cep: ${alunosDTO.cep}`, 130, 120);
    doc.text(`Complemento: ${alunosDTO.complemento}`, 14, 130);

    doc.text(`Eu________________________________________,portador(a) do CPF: ____________________,

autorizo a participaçao deste aluno(a), do qual possuo o grau de prarentesco__________________,

no Projeto Estacao Sibape.

Estou ciente de que ele(a) estara sobe supervisao durante as atividades e me comprometo a 

fornecer o apoio ncessario para sua participacao. `, 14, 150);
      doc.text(`Eu autorizo o aluno(a) a voltar para a casa sozinho(a)? (    ) NAO        (    )SIM `, 14, 200);
      doc.text(`__________________________________________________________Data:___/___/_____
                                     
                                    Assinatura do Responsavel`, 14, 240);
      
    doc.save(`Detalhes_Aluno_${alunosDTO.nome}.pdf`);
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          {alunosDTO ? (
            <>
              <div className="col-md-4 col-9 m-5 md-5 pb-3 text-center" id="dados">
                <img src={alunosDTO.url} alt="Foto do Membro" className="img-fluid mb-3" />
                <span className="nome-id">{alunosDTO.nome}</span>
                <p className="dados"><span>Identidade:</span> {alunosDTO.rg}</p>
                <p className="dados"><span>Idade:</span> {alunosDTO.idade}</p>
                <p className="dados"><span>Data de Nascimento:</span> {new Date(alunosDTO.dataNascimento).toLocaleDateString()}</p>
                <p className="dados"><span>Email: </span>{alunosDTO.email}</p>
                <p className="dados"><span>Cpf Responsavel: </span>{alunosDTO.cpfResponsavel}</p>
                {alunosDTO.projetos && (
                  <p className="dados-Projeto"><span> Projeto: {alunosDTO.projetos.nome} </span> </p>
                )}
              </div>
              <div className="col-md-4 col-9 m-5 md-5 text-center align-content-center" id="endereço">
                <p className="text-h2">Endereço</p>
                <p className="dados"><span>Rua:</span> {alunosDTO.rua}</p>
                <p className="dados"><span>Bairro:</span> {alunosDTO.bairro}</p>
                <p className="dados"><span>Número:</span> {alunosDTO.numero}</p>
                <p className="dados"><span>Cidade:</span> {alunosDTO.cidade}</p>
                <p className="dados"><span>Complemento:</span> {alunosDTO.complemento}</p>
                <p className="dados"><span>Cep:</span> {alunosDTO.cep}</p>
                <div className="botoes-container mb-1">
                  <Link to={`/editarAlunos/${id}`}>
                    <button className="botao-editar">Editar</button>
                  </Link>
                  <button onClick={handleDeleteClick} className="botao-deletar">Deletar</button>
                  <button onClick={generatePDF} className="botao-gerar-pdf">Imprimir</button>
                </div>
              </div>
              {showDeleteConfirmation && (
                <div className="modal-confirm">
                  <span className="icone-confirm"><CgDanger /></span>
                  <p className="msg-confirm">Tem certeza disso?</p>
                  <button onClick={handleConfirmDelete} className="btn-confirma">Confirmar</button>
                  <button onClick={handleCancelDelete} className="btn-cancel">Cancelar</button>
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
