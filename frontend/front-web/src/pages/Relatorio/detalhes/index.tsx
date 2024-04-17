import React, { useEffect, useRef, useState } from "react";
import { RelatorioDTO } from "../../../models/relatorio";
import * as relatorioService from '../../../service/relatorioService';
import { deleteRelatorio } from "../../../service/relatorioService";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'; 
import Header from "../../../components/Header";
import './styles.css';
import { PiPrinterFill } from "react-icons/pi";
import { TiArrowBack } from "react-icons/ti";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



const DetalhesRelatorio = () => {
  const { id } = useParams<{ id: string }>() ?? { id: "" }; 
  const navigate = useNavigate();
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [relatorioDTO, setRelatorioDTO] = useState<RelatorioDTO | null>(null); 
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const estacao= 'https://i.postimg.cc/KjkzLLPq/Esta-o-siba-250-x-150-mm-2.png';

  const componentRef = useRef(null);


  const loadRelatorioDTO = (id: string) => {
    relatorioService.findById(Number(id))
      .then(response => {
        console.log("Detalhes do relatorio:", response.data);
        setRelatorioDTO(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar detalhes do relatorio:", error);
        // Trate o estado de erro (por exemplo, exiba uma mensagem de erro)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (id) {
      loadRelatorioDTO(id);
    }
  }, [id]);

  const handleModalClose = () => {
    setIsModalVisible(false);
    navigate('/relatorio');
  };

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    if (id !== undefined) {
      await deleteRelatorio(parseInt(id, 10));
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
      navigate(`/relatorio/${nextId}`);
    }
  };

  const handlePreviousClick = () => {
    if (id !== undefined) {
      const previousId = parseInt(id, 10) - 1;
      if (previousId > 0) {
        navigate(`/relatorio/${previousId}`);
      }
    }
  };
  const generatePdf = () => {
    if (componentRef.current) {
      html2canvas(componentRef.current).then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        pdf.addImage(imgData, 'PNG', 0, 0, width, height);
        pdf.save('relatorio.pdf');
      });
    }
  };

  return (
    <>
    <Header/>
    <div className="voltar-relatorio">
       
     <Link to= "/relatorio">
        <TiArrowBack />   Voltar 
    </Link>
       
    </div>
 
      <div className="relatorio-detalhes" ref={componentRef}>
  
      <div className="img-print-relatorio-detalhe">
                <Link to="#">
                    <button onClick={generatePdf}><PiPrinterFill /> Imprimir</button>
                </Link>
         </div>
        {relatorioDTO ? (
          <div className="relatorio-detalhes-div">
             <div className="cabeçalho-detalhes">
                <h3>Relatório Projeto: {relatorioDTO.projetosRelatorio.nome}</h3>
                <p>Professor(a): {relatorioDTO.projetosRelatorio.lider}</p>
                <p className="data-relatorio">Data : {new Date(relatorioDTO.data).toLocaleDateString()}</p>
             </div>
        <div className="relatorio-detalhes-div2">
                    <p className="pergunta">A aula ocorreu normalmente?</p>
                    <p className="resposta"> {relatorioDTO["A aula ocorreu normalmente?"]}</p>
                    <p className="pergunta">Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?</p>
                    <p className="resposta">{relatorioDTO["Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?"]}</p>
                    <p className="pergunta">Houve dificuldade com o material das aulas? </p>
                    <p className="resposta">{relatorioDTO["Houve dificuldade com o material das aulas?"]}</p>
                    <p className="pergunta">Alguma sugestão para a equipe de trabalho? </p>
                    <p className="resposta">{relatorioDTO["Alguma sugestão para a equipe de trabalho?"]}</p>
                    <p className="pergunta">Mais alguma observação ou sugestão? </p>
                    <p className="resposta">{relatorioDTO["Mais alguma observação ou sugestão?"]}</p>
            </div>
            <div className="logo-relatorio">
                <img src={estacao} alt="estacao" />
            </div>

         </div>
        ) : (
          <p>Carregando detalhes do membro...</p>
        )}
      </div>
      <div className="setas">
        <button onClick={handlePreviousClick} className="btn-left"> <FaChevronLeft/></button>
        <button onClick={handleNextClick} className="btn-right"><FaChevronRight /></button>
      </div>
    </>
  );
};

export default DetalhesRelatorio;