import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { alunosDTO } from "../../../models/alunos";
import * as alunosService from "../../../service/alunosService";
import { deleteAluno } from "../excluirAlunos";
import { CgDanger } from "react-icons/cg";
import SuccessModal from "../../../components/Modal";
import Header from "../../../components/Header";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./styles.css";

const DetalhesAlunos = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" };
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [alunosDTO, setAlunosDTO] = useState<alunosDTO>();
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState<string>();
  const estacao =
    "https://i.postimg.cc/zX9nQ80Q/Esta-o-siba-250-x-150-mm-250-x-100-mm.png";

  const loadAlunosDTO = (id: string) => {
    alunosService
      .findById(Number(id))
      .then((response) => {
        console.log("Detalhes do Membro:", response.data);
        setAlunosDTO(response.data);
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
      loadAlunosDTO(id);
    }
  }, [id]);

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigate("/alunos");
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
    doc.text("Ficha de Matricula", pageWidth / 2, 15, { align: "center" });

    doc.setFillColor(200, 200, 200);
    doc.rect(margin, 23, titleWidth, 10, "F");
    doc.setFontSize(14);
    doc.text("Dados Pessoais", pageWidth / 2, 30, { align: "center" });

    const nome = alunosDTO.nome ?? "-------";
    const idade = alunosDTO.idade ?? "-------";
    const dataNascimento = alunosDTO.dataNascimento
      ? new Date(alunosDTO.dataNascimento).toLocaleDateString()
      : "-------";
    const telefone = alunosDTO.telefone ?? "-------";
    const email = alunosDTO.email ?? "-------";
    const curso = alunosDTO.projetos ? alunosDTO.projetos.nome : "-------";
    const perguntaText = alunosDTO.pergunta
      ? `Sim, ${alunosDTO.pergunta}`
      : "Não";
    const responsavel = alunosDTO.responsavel ?? "-------";
    const cpfResponsavel = alunosDTO.cpfResponsavel ?? "-------";
    const rua = alunosDTO.rua ?? "-------";
    const bairro = alunosDTO.bairro ?? "-------";
    const cidade = alunosDTO.cidade ?? "-------";
    const numero = alunosDTO.numero ?? "-------";
    const cep = alunosDTO.cep ?? "-------";
    const complemento = alunosDTO.complemento ?? "-------";

    doc.setFontSize(12);
    doc.text(`Nome: ${nome}`, 14, 45);
    doc.text(`Idade: ${idade}`, 110, 45);
    doc.text(`Nascimento: ${dataNascimento}`, 130, 45);
    doc.text(`Telefone: ${telefone}`, 14, 55);
    doc.text(`Email: ${email}`, 70, 55);
    doc.text(`Curso: ${curso}`, 150, 55);
    doc.text("Possui alguma doença?", 14, 65);
    doc.text(perguntaText, 65, 65);
    doc.text(`Responsável: ${responsavel}`, 14, 75);
    doc.text(`CPF do Responsável: ${cpfResponsavel}`, 120, 75);

    doc.setFillColor(200, 200, 200);
    doc.rect(margin, 83, titleWidth, 10, "F");
    doc.setFontSize(14);
    doc.text("Endereço", pageWidth / 2, 90, { align: "center" });

    doc.setFontSize(12);
    doc.text(`Rua: ${rua}`, 14, 100);
    doc.text(`Bairro: ${bairro}`, 120, 100);
    doc.text(`Cidade: ${cidade}`, 14, 110);
    doc.text(`Número: ${numero}`, 90, 110);
    doc.text(`Cep: ${cep}`, 130, 110);
    doc.text(`Complemento: ${complemento}`, 14, 120);

    doc.text(
      `Eu________________________________________, portador(a) do CPF: ____________________,

autorizo a participação deste aluno(a), do qual possuo o grau de parentesco__________________,

no Projeto Estação Sibape.

Estou ciente de que ele(a) estará sob supervisão durante as atividades e me comprometo a

fornecer o apoio necessário para sua participação. `,
      14,
      150
    );
    doc.text(
      `Eu autorizo o aluno(a) a voltar para casa sozinho(a)? (    ) NÃO        (    ) SIM `,
      14,
      200
    );
    doc.text(
      `__________________________________________________________Data:___/___/_____

                                    Assinatura do Responsável`,
      14,
      240
    );

    const img = new Image();
    img.src = estacao;
    img.onload = () => {
      const imgWidth = 40;
      const imgHeight = 20;
      const imgX = (pageWidth - imgWidth) / 2;
      const imgY = doc.internal.pageSize.getHeight() - imgHeight - 5;

      doc.addImage(img, "PNG", imgX, imgY, imgWidth, imgHeight);
      doc.save(`Detalhes_Aluno_${alunosDTO.nome}.pdf`);
    };
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          {alunosDTO ? (
            <>
              <div
                className="col-md-4 col-9 m-5 md-5 pb-3 text-center"
                id="dados"
              >
                <img
                  src={alunosDTO.url ?? "-----"}
                  alt="Foto do Membro"
                  className="img-fluid mb-3 rounded mx-auto d-block "
                />
                <span className="nome-id">{alunosDTO.nome ?? "-----"}</span>
                <p
                  className={`dados-status ${
                    alunosDTO.ativo
                      ? "status-matriculado"
                      : "status-desmatriculado"
                  }`}
                >
          
                  {alunosDTO.ativo ? "MATRICULADO" : "DESLIGADO"}
                </p>

                <p className="dados">
                  <span>Data da Matricula:</span>{" "}
                  {alunosDTO.dataMatricula
                    ? new Date(alunosDTO.dataMatricula).toLocaleDateString()
                    : "-----"}
                </p>
                <p className="dados">
                  <span>Data de Inativo:</span>
                  <span className="dados-doença">
                    {" "}
                    {alunosDTO.dataInativo
                      ? new Date(alunosDTO.dataInativo).toLocaleDateString()
                      : "-----"}
                  </span>
                </p>

                <p className="dados">
                  <span>Identidade:</span> {alunosDTO.rg ?? "-----"}
                </p>
                <p className="dados">
                  <span>Idade:</span> {alunosDTO.idade ?? "-----"}
                </p>
                <p className="dados">
                  <span>Data de Nascimento:</span>{" "}
                  {alunosDTO.dataNascimento
                    ? new Date(alunosDTO.dataNascimento).toLocaleDateString()
                    : "-----"}
                </p>
                <p className="dados">
                  <span>Email: </span>
                  {alunosDTO.email ?? "-----"}
                </p>
                <p className="dados">
                  <span>Responsável: </span>
                  {alunosDTO.responsavel ?? "-----"}
                </p>
                <p className="dados">
                  <span>CPF Responsável: </span>
                  {alunosDTO.cpfResponsavel ?? "-----"}
                </p>
                <p className="dados">
                  <span>Doença: </span>
                  <span className="dados-doença">
                    {alunosDTO.pergunta ?? "-----"}
                  </span>
                </p>
                {alunosDTO.projetos && (
                  <p className="dados-Projeto">
                    <span> Projeto: {alunosDTO.projetos.nome} </span>{" "}
                  </p>
                )}
              </div>

              <div
                className="col-md-4 col-9 m-5 md-5 mb-5 -5 text-center align-content-center "
                id="endereço"
              >
                <p className="text-h2">Endereço</p>
                <p className="dados">
                  <span>Rua:</span> {alunosDTO.rua ?? "-----"}
                </p>
                <p className="dados">
                  <span>Bairro:</span> {alunosDTO.bairro ?? "-----"}
                </p>
                <p className="dados">
                  <span>Número:</span> {alunosDTO.numero ?? "-----"}
                </p>
                <p className="dados">
                  <span>Cidade:</span> {alunosDTO.cidade ?? "-----"}
                </p>
                <p className="dados">
                  <span>Complemento:</span> {alunosDTO.complemento ?? "-----"}
                </p>
                <p className="dados">
                  <span>Cep:</span> {alunosDTO.cep ?? "-----"}
                </p>
                <div className="botoes-container ">
                  <Link to={`/editarAlunos/${id}`}>
                    <button className="botao-editar">Editar</button>
                  </Link>
                  <button onClick={handleDeleteClick} className="botao-deletar">
                    Deletar
                  </button>
                  <button onClick={generatePDF} className="botao-gerar-pdf">
                    Imprimir
                  </button>
                </div>
              </div>

              {showDeleteConfirmation && (
                <div className="modal-confirm">
                  <span className="icone-confirm">
                    <CgDanger />
                  </span>
                  <p className="msg-confirm">Tem certeza disso?</p>
                  <button
                    onClick={handleConfirmDelete}
                    className="btn-confirma"
                  >
                    Confirmar
                  </button>
                  <button onClick={handleCancelDelete} className="btn-cancel">
                    Cancelar
                  </button>
                </div>
              )}
              {isModalVisible && (
                <SuccessModal
                  onClose={handleModalClose}
                  onRedirect={() => navigate("/alunos")}
                  operation={"deletar"}
                />
              )}
            </>
          ) : (
            <p>Carregando detalhes do membro...</p>
          )}
        </div>
        <div className="row">
          <div className="col-12 mb-5" id="voltar-alunos">
            <button className="btn btn-primary" onClick={handleGoBack}>
              Voltar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetalhesAlunos;
