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
  const [relatorioDTO, setRelatorioDTO] = useState<RelatorioDTO | null>(null); 
  const [loading, setLoading] = useState(true);
  const estacao= 'https://i.postimg.cc/zX9nQ80Q/Esta-o-siba-250-x-150-mm-250-x-100-mm.png';

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
      <Header />
     
      <div className="container-fluid mt-5 pt-5" >
        <div className="row" id="voltar">
          <div className="col">
            <Link to="/membro">
              <TiArrowBack /> Voltar
            </Link>
          </div>
          <div className="col-4 justify-content-end" id="imprimir">
          
              <button onClick={generatePdf}><PiPrinterFill /> Imprimir</button>

          </div>
        </div>
  
        <div className="container-fluid">
        
          <div className="row justify-content-center ">
         
            <div className="col-md-8 col-11 p-4" id="relatorio-view" ref={componentRef}>
              {relatorioDTO ? (
                <>
                  <h3>Relatório Projeto: {relatorioDTO.projetosRelatorio.nome}</h3>
                  <p>Professor(a): {relatorioDTO.projetosRelatorio.lider}</p>
                  <p className="data-relatorio">Data : {new Date(relatorioDTO.data).toLocaleDateString()}</p>
                  <p className="pergunta">A aula ocorreu normalmente?</p>
                  <p className="resposta">{relatorioDTO["A aula ocorreu normalmente?"]}</p>
                  <p className="pergunta">Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?</p>
                  <p className="resposta">{relatorioDTO["Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?"]}</p>
                  <p className="pergunta">Houve dificuldade com o material das aulas?</p>
                  <p className="resposta">{relatorioDTO["Houve dificuldade com o material das aulas?"]}</p>
                  <p className="pergunta">Alguma sugestão para a equipe de trabalho?</p>
                  <p className="resposta">{relatorioDTO["Alguma sugestão para a equipe de trabalho?"]}</p>
                  <p className="pergunta">Mais alguma observação ou sugestão?</p>
                  <p className="resposta">{relatorioDTO["Mais alguma observação ou sugestão?"]}</p>

                
                <img src={estacao} alt="estacao"  className="img-fluid"/>
               
                </>
              ) : (
                <p>Carregando detalhes do membro...</p>
              )}
            </div>
          
          </div>

         
       
        </div>
      </div>
    </>
  );
  
};

export default DetalhesRelatorio;