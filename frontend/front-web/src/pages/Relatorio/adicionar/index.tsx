import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RelatorioDTO, projetosRelatorio } from "../../../models/relatorio";
import { useNavigate } from "react-router-dom";
import { insert } from "../../../service/relatorioService";
import Header from "../../../components/Header";
import SuccessModal from "../../../components/Modal";
import axios from "axios";
import { BASE_URL } from "../../../ultilitarios/system";

import './styles.css';

const AddRelatorio: React.FC = () => {
  
    const [projetos, setProjetos] = useState<projetosRelatorio[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const navigate = useNavigate();
    const [relatorioDTO, setRelatorioDTO] = useState<RelatorioDTO>({
      
        id: 0,
      data: new Date(),
     "A aula ocorreu normalmente?": "",
    "Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?": "",
    "Houve dificuldade com o material das aulas?": "",
    "Alguma sugestão para a equipe de trabalho?": "",
    "Mais alguma observação ou sugestão?": "",

     
      projetosRelatorio: {
        id: 0,
        nome: "",
        lider: "",
      },
      
    });
  
    useEffect(() => {
      const fetchGrupos = async () => {
          try {
              const response = await axios.get(`${BASE_URL}/projetos`);
              setProjetos(response.data);
          } catch (error) {
              console.error("Erro ao buscar projetos:", error);
          }

      };
  
      fetchGrupos();
    }, []);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      if (name === "projetosRelatorio") {
          const projetoId = parseInt(value, 10);

          setRelatorioDTO(prevDTO => ({
              ...prevDTO,
              projetosRelatorio: {
                  ...prevDTO.projetosRelatorio,
                  id: projetoId,
              },
          }));
      
          
      } else if (name === "data") {
          const data = new Date(value);

          setRelatorioDTO(prevDTO => ({
              ...prevDTO,
              [name]: data,
          }));
      } else {
          setRelatorioDTO(prevDTO => ({
              ...prevDTO,
              [name]: value,
          }));
      }
  };

    const handleGoBack = () => {
      navigate(-1); 
    }
    const handleSubmit = async (e: FormEvent) => {
      e.preventDefault();
  
      try {
        console.log("relatorio Detail antes do POST:", relatorioDTO);
        
        await insert(relatorioDTO);
  
      
        setIsModalVisible(true);
        setRelatorioDTO({
            id: 0,
            data: new Date(),
           "A aula ocorreu normalmente?": "",
          "Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?": "",
          "Houve dificuldade com o material das aulas?": "",
          "Alguma sugestão para a equipe de trabalho?": "",
          "Mais alguma observação ou sugestão?": "",
      
          
            projetosRelatorio: {
              id: 0,
              nome: "",
              lider: "",
            },
            
          });
          
      
      } catch (error) {
        console.error("Erro ao adicionar relatorio:", error);
    
      }
    };
    const handleModalClose = () => {
      setIsModalVisible(false);
      setIsRedirecting(true);
    }
    if (isRedirecting) {
        navigate('/relatorio');
      }
    
    return (
        <>
  
      <Header/>
      <div className="container-fluid mt-4 pt-5">
  
  <div className="container col-md-8 col-12" id="relatorio-add">
     <form onSubmit={handleSubmit} className="row p-4  g-4">
   
               <h3 >Relatorio </h3>
             <div className="col-4 col-md-4">
             <label htmlFor="projetos" className="form-label" >Projeto:</label>
                   <select
                   name="projetosRelatorio"
                   className="form-control"
                   value={relatorioDTO.projetosRelatorio.id} 
                   onChange={handleChange}
                   required
                   >
                     
                   <option>Selecione</option>
                   {projetos.map((projeto) => (
                       <option key={projeto.id} value={projeto.id}>
                       {projeto.id} - {projeto.nome}
                       </option>
                   ))}
                   </select>
             </div>
                   <div className="col-4 col-md-4">

                   <label htmlFor="projetos" className="form-label">Professor:</label>
                   <select
                   name="lider"
                   className="form-control"
                   value={relatorioDTO.projetosRelatorio.lider} 
                   onChange={handleChange}
                   required
                   >
                   <option>Selecione</option>
                   {projetos.map((projeto) => (
                       <option key={projeto.id} value={projeto.id}>
                       {projeto.id} - {projeto.lider}
                       </option>
                   ))}
                   </select>
             
                </div>
               
       
                 <div className="col-4 col-md-4">
                 <label htmlFor="data" className="form-label"> Data:</label>
                   <input
                       type="date"
                       className="form-control"
                       name="data"
                       value={relatorioDTO.data.toISOString().split('T')[0]}
                       onChange={handleChange}
                       required
                   />
           
            </div>
                <div className="col-12 mt-5">
                <label htmlFor="telefone" className="form-label ">A aula ocorreu normalmente?</label>
                   <input 
                       type="text"
                       className="form-control"
                       name="A aula ocorreu normalmente?"
                       value={relatorioDTO["A aula ocorreu normalmente?"]}
                       onChange={handleChange}
                       placeholder="insira sua resposta"
                       required
                   />
                
                </div>
                 <div className="col-12 mt-5">

                 <label htmlFor="telefone" className="form-label">Alguma sugestão para a equipe de trabalho?</label>
                   <input 
                       type="text"
                       className="form-control"
                       name="Alguma sugestão para a equipe de trabalho?"
                       value={relatorioDTO["Alguma sugestão para a equipe de trabalho?"]}
                       onChange={handleChange}
                       placeholder="insira sua resposta"
                       required
                   />
              
                 </div>
                  
               <div className="col-12 mt-5">
               <label htmlFor="telefone" className="form-label">Houve dificuldade com o material das aulas?</label>
                   <input 
                       type="text"
                       className="form-control"
                       name="Houve dificuldade com o material das aulas?"
                       value={relatorioDTO["Houve dificuldade com o material das aulas?"]}
                       onChange={handleChange}
                       placeholder="insira sua resposta"
                       required
                   />
                  
               </div>
                 <div className="col-12 mt-5">

                 <label htmlFor="projetos" className="form-label">Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?</label>
                   <input type="textarea" 
                       name="Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?"
                       className="form-control"
                       value={relatorioDTO["Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?"]} 
                       onChange={handleChange}
                       placeholder="insira sua resposta"
                       required
                       />
                 </div>
                   
                  <div className="col-12 mt-5 mb-5">
                  <label htmlFor="telefone" className="form-label">Mais alguma observação ou sugestão?</label>
                   <input 
                       type="text"
                       className="form-control"
                       name="Mais alguma observação ou sugestão?"

                       value={relatorioDTO["Mais alguma observação ou sugestão?"]}
                       onChange={handleChange}
                       placeholder="insira sua resposta"
                       required
                   />
                 
                  </div>
                  <div className="d-grid gap-2 col-6 mx-auto">
                
         <button className="btn btn-primary" type="submit">Enviar</button>

         </div>
     

     </form>
     
     
   </div>
   <div className="row justify-content-center mt-5" id="btn-voltar-relatorio">
       <div className="col-2 col-md-1">
       <button className="btn btn-primary " onClick={handleGoBack}>Voltar</button>
       </div>
   
     </div>
       </div>
       {isModalVisible && (
       <SuccessModal
         onClose={handleModalClose}
         onRedirect={() => setIsRedirecting(true)} 
         operation="adicionar"
       />
     )}
        </>
      );
      
}
 export default AddRelatorio;