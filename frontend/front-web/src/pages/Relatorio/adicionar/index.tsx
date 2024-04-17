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
          <form onSubmit={handleSubmit} className="quiz-container">
            <div   className="titulo-quiz">
                    <h3 >Relatorio </h3>
                    </div>
            <fieldset className="relatorio-fieldset">
                        <div className="header-relatorio">
                    <div className="header-relatorio-projetos">
                        <label htmlFor="projetos" className="r-nome">Projeto:</label>
                        <select
                        name="projetosRelatorio"
                        className="alunos-input"
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
                    <div className="header-relatorio-projetos">
                        <label htmlFor="projetos" className="r-nome">Professor:</label>
                        <select
                        name="professor"
                        className="alunos-input"
                        value={relatorioDTO.projetosRelatorio.nome} 
                        onChange={handleChange}
                        required
                        >
                          
                        <option>Selecione</option>
                        {projetos.map((projetos) => (
                            <option key={projetos.id} value={projetos.id}>
                             {projetos.nome}
                            </option>
                        ))}
                        </select>
                    </div>

                        <div className="header-relatorio-data">
                        <label htmlFor="data" className="r-nome"> Data:</label>
                        <input
                            type="date"
                            className="relatorio-input"
                            name="data"
                            value={relatorioDTO.data.toISOString().split('T')[0]}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        </div>
                        <div className="relatorio-quiz">
                        <label htmlFor="telefone" className="r-nome">A aula ocorreu normalmente?</label>
                        <input 
                            type="text"
                            className="relatorio-input"
                            name="A aula ocorreu normalmente?"
                            value={relatorioDTO["A aula ocorreu normalmente?"]}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div className="relatorio-quiz">
                        <label htmlFor="telefone" className="r-nome">Alguma sugestão para a equipe de trabalho?</label>
                        <input 
                            type="text"
                            className="relatorio-input"
                            name="Alguma sugestão para a equipe de trabalho?"
                            value={relatorioDTO["Alguma sugestão para a equipe de trabalho?"]}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div className="relatorio-quiz">
                        <label htmlFor="telefone" className="r-nome">Houve dificuldade com o material das aulas?</label>
                        <input 
                            type="text"
                            className="relatorio-input"
                            name="Houve dificuldade com o material das aulas?"
                            value={relatorioDTO["Houve dificuldade com o material das aulas?"]}
                            onChange={handleChange}
                            required
                        />
                        </div>
                        <div className="relatorio-quiz">
                        <label htmlFor="projetos" className="r-nome">Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?</label>
                        <input type="textarea" 
                            name="Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?"
                            className="relatorio-input"
                            value={relatorioDTO["Algum(a) aluno(a) apresentou problemas de comportamento, aprendizagem, assistência social ou espiritual? Qual?"]} 
                            onChange={handleChange}
                            required
                            />
                            </div>
                    <div className="relatorio-quiz">
                        <label htmlFor="telefone" className="r-nome">Mais alguma observação ou sugestão?</label>
                        <input 
                            type="text"
                            className="relatorio-input"
                            name="Mais alguma observação ou sugestão?"
                            value={relatorioDTO["Mais alguma observação ou sugestão?"]}
                            onChange={handleChange}
                            required
                        />
                        </div>
                    
                    </fieldset>
        
                    <button className="btn-quiz" type="submit">Enviar</button>
                    
          </form>
          <button className="btn-quiz-voltar" onClick={handleGoBack}>Voltar</button>
        
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