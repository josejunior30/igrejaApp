import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { alunosDTO, projetos } from "../../../models/alunos";

import axios from "axios";
import { BASE_URL } from "../../../ultilitarios/system";
import { insertMembro } from "../../../service/alunosService";
import SuccessModal from "../../../components/Modal";
import './styles.css';
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";
const AddAlunos: React.FC = () => {
    const [projetos, setProjetos] = useState<projetos[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const navigate = useNavigate();
    const [alunosDTO, setAlunosDTO] = useState<alunosDTO>({
      id: 0,
      nome: "",
      dataNascimento: new Date(),
      telefone: "",
      url: "",
      rg: "",
      cpfResponsavel: "",
      responsavel: "",
      idade: "",
      sangue:"",
      pergunta:"",
      AlunoDoenca:0,

      rua: "", bairro: "", cep: "", numero: "", cidade: "", complemento: "",
      
      projetos: {
        id: 0,
        nome: "",
      },
      chamada:{
        id:0,
        chamadaAluno:0,
      }
    });
  
    
    useEffect(() => {
      const fetchGrupos = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/projetos`);
          setProjetos((await response).data);
        } catch (error) {
          console.error("Erro ao obter a lista de grupos:", error);
        }
      };
  
      fetchGrupos();
    }, []);
  
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
  
      if (name === "projetos") {
        const projetoId = parseInt(value, 10);
  
        setAlunosDTO((prevAlunosDTO) => ({
          ...prevAlunosDTO,
          projetos: {
            ...prevAlunosDTO.projetos,
            id: projetoId,
          },
        }));
      } else if (name === "dataNascimento") {
        const dataNascimento = new Date(value);
  
        setAlunosDTO((prevAlunosDTO) => ({
          ...prevAlunosDTO,
          [name]: dataNascimento,
        }));
      } else {
        setAlunosDTO((prevAlunosDTO) => ({
          ...prevAlunosDTO,
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
        console.log("Membro Detail antes do POST:", alunosDTO);
        // Utilizando a função insertMembro para adicionar o membro
        await insertMembro(alunosDTO);
  
        // Lógica de manipulação de sucesso, redirecionamento, etc.
        setIsModalVisible(true);
        setAlunosDTO({
          id: 0,
      nome: "",
      dataNascimento: new Date(),
      telefone: "",
      url: "",
      rg: "",
      cpfResponsavel: "",
      responsavel: "",
      idade: "",
      sangue:"",
      pergunta:"",
      AlunoDoenca:0,
      rua: "", bairro: "", cep: "", numero: "", cidade: "", complemento: "",
      
      projetos: {
        id: 0,
        nome: "",
      },
      chamada:{
        id:0,
        chamadaAluno:0,
      }

    });
          
      
      } catch (error) {
        console.error("Erro ao adicionar aluno:", error);
        // Lógica de manipulação de erro
      }
    };
    const handleModalClose = () => {
      setIsModalVisible(false);
      setIsRedirecting(true);
    };
 
    return (
      <>

    <Header/>
        <form onSubmit={handleSubmit} className="alunos-container">
        
          <div   className="titulo-form">
          <h3 >Dados pessoais </h3>
             </div>
            <fieldset className="input-group-alunos">
              <div className="div-group-alunos">
                <label htmlFor="nome" className="a-nome">Nome:</label>
                <input 
                  type="text"
                  className="alunos-input"
                  name="nome"
                  value={alunosDTO.nome}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="sobrenome" className="a-nome">Identidade:</label>
                <input 
                  type="text"
                  className="alunos-input"
                  name="rg"
                  value={alunosDTO.rg}
                  onChange={handleChange}
                 
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="data" className="a-nome">Nascimento</label>
                <input
                  type="date"
                  className="alunos-input"
                  name="dataNascimento"
                  value={alunosDTO.dataNascimento.toISOString().split('T')[0]}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="telefone" className="a-nome">Telefone:</label>
                <input 
                  type="text"
                  className="alunos-input"
                  name="telefone"
                  value={alunosDTO.telefone}
                  onChange={handleChange}
                  required
                />
              </div>
          
              <div className="div-group-alunos">
                <label htmlFor="projetos" className="a-nome">Projeto:</label>
                <select
                  name="projetos"
                  className="alunos-input"
                  value={alunosDTO.projetos.id} 
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
            </fieldset>
            <fieldset className="input-group-alunos">
              <div className="div-group-alunos">
                <label htmlFor="telefone" className="a-nome">Tipo Sanguíneo:</label>
                <input 
                  type="text"
                  className="alunos-input"
                  name="sangue"
                  value={alunosDTO.sangue}
                  onChange={handleChange}
                  
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="projetos" className="a-nome">Doença ou alergia?:</label>
                <select
                  name="AlunoDoenca"
                  className="alunos-input"
                  value={alunosDTO.AlunoDoenca} 
                  onChange={handleChange}
                  required
                >
                 <option >ESCOLHA</option>
                    <option value="0">NÃO</option>
                    <option value="1">SIM</option>
                  
                </select>
              </div>
              <div className="div-group-alunos">
                <label htmlFor="telefone" className="a-nome">Qual?</label>
                <input 
                  type="text"
                  className="alunos-input"
                  name="pergunta"
                  value={alunosDTO.pergunta}
                  onChange={handleChange}
                  
                />
              </div>
          
              </fieldset>
    
         <div   className="titulo-form">
            <h3 >Dados do Responsável </h3>
          </div>
            <fieldset className="input-group-alunos">
              
          
              <div className="div-group-alunos">
                <label htmlFor="responsavel" className="a-nome">Nome:</label>
                <input 
                  type="text"
                  name="responsavel"
                  className="alunos-input"
                  value={alunosDTO.responsavel}
                  onChange={handleChange}
                  
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="cpfResponsavel" className="a-nome">CPF:</label>
                <input 
                  type="text"
                  name="cpfResponsavel"
                  className="alunos-input"
                  value={alunosDTO.cpfResponsavel}
                  onChange={handleChange}
                  
                />
              </div>
            </fieldset>
                    <div   className="titulo-form">
                      <h3 >Endereço</h3>
                    </div>
            
            <fieldset className="input-group-alunos">
              <div className="div-group-alunos">
                <label htmlFor="rua" className="a-nome">Rua:</label>
                <input 
                  type="text"
                  name="rua"
                  className="alunos-input"
                  value={alunosDTO.rua}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="numero" className="a-nome">Número:</label>
                <input 
                  type="text"
                  name="numero"
                  className="alunos-input"
                  value={alunosDTO.numero}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="bairro" className="a-nome">Bairro:</label>
                <input 
                  type="text"
                  name="bairro"
                  className="alunos-input"
                  value={alunosDTO.bairro}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="bairro" className="a-nome">Cep:</label>
                <input 
                  type="text"
                  name="cep"
                  className="alunos-input"
                  value={alunosDTO.cep}
                  onChange={handleChange}
                 
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="cidade" className="a-nome">Cidade:</label>
                <input 
                  type="text"
                  name="cidade"
                  className="alunos-input"
                  value={alunosDTO.cidade}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="div-group-alunos">
                <label htmlFor="complemento" className="a-nome">Complemento:</label>
                <input 
                  type="text"
                  name="complemento"
                  className="alunos-input"
                  value={alunosDTO.complemento}
                  onChange={handleChange}
                  
                />
              </div>
            </fieldset>
            
            <button className="btn-alunos" type="submit">Adicionar</button>
          
        </form>
        <button className="btn-aluno-voltar" onClick={handleGoBack}>Voltar</button>
      
        {isModalVisible && (
          <SuccessModal
            onClose={handleModalClose}
            onRedirect={() => setIsRedirecting(true)} 
            operation="adicionar"
          />
        )}
      </>
    );
    
  };
  
  export default AddAlunos;
  