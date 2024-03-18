import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { alunosDTO, projetos } from "../../../models/alunos";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../ultilitarios/system";
import { insertMembro } from "../../../service/alunosService";
import SuccessModal from "../../../components/Modal";

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

      rua: "", bairro: "", cep: "", numero: "", cidade: "", complemento: "",
      
      projetos: {
        id: 0,
        nome: "",
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
      navigate(-1); // Utiliza a função goBack do hook useNavigate para voltar para a página anterior
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

      rua: "", bairro: "", cep: "", numero: "", cidade: "", complemento: "",
      
      projetos: {
        id: 0,
        nome: "",
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
      <form onSubmit={handleSubmit} className="fm-container">
        <h3 className="titulo-form">Dados pessoais </h3>
        <fieldset className="dados-pessoais">
            <fieldset className="input-group-div">
                <div className="input-group">
                <label htmlFor="nome" className="f-nome">Nome:</label>
                    <input 
                    type="text"
                    className="form-input"
                    name="nome"
                    value={alunosDTO.nome}
                    onChange={handleChange}
                    required
                    />
                    </div>
           <div className="input-group">
            <label htmlFor="sobrenome" className="f-nome">Identidade:</label>
                <input 
                type="text"
                className="form-input"
                name="rg"
                value={alunosDTO.rg}
                onChange={handleChange}
                required
                />
          </div>
        <div className="input-group">
        <label htmlFor="data" className="f-nome">Nascimento</label>
            <input
                type="date"
                className="form-input"
                name="dataNascimento"
                value={alunosDTO.dataNascimento.toISOString().split('T')[0]}
                onChange={handleChange}
                required
            />
            </div>
            <div className="input-group">
            <label htmlFor="sobrenome" className="f-nome">Telefone:</label>
                <input 
                type="text"
                className="form-input"
                name="rg"
                value={alunosDTO.telefone}
                onChange={handleChange}
                required
                />
          </div>
    </fieldset>
  
    <fieldset className="input-group-div">
                <div className="input-group">
                <label htmlFor="telefone" className="f-nome">Responsavel:</label>
                    <input 
                    type="text"
                    name="responsavel"
                    className="form-input"
                    value={alunosDTO.responsavel}
                    onChange={handleChange}
                    required
                    />
                    </div>
                    <div className="input-group">
                    <label htmlFor="email" className="f-nome">Cpf do Responsável:</label>
                    <input 
                    type="text"
                    name="cpfResponsavel"
                    className="form-input"
                    value={alunosDTO.cpfResponsavel}
                    onChange={handleChange}
                    required
                    />
                    </div>
                
        </fieldset>
  
  
         <fieldset className="input-group-div">
            
            <div className="input-group">
                    <label htmlFor="grupo" className="f-nome">Projeto:</label>
                    <select
                    name="projetos"
                    className="form-select-pg"
                    value={alunosDTO.projetos.id} 
                    onChange={handleChange}
                    required
                    >
                    <option >Selecione </option>
                    {projetos.map((projeto) => (
                    
                        <option key={projeto.id} value={projeto.id}>
                        {projeto.id} - {projeto.nome}
                        </option>
                    ))}
                </select>
            </div>
  
        </fieldset> 
        
    <fieldset className="input-group-div">
                <div className="input-group">
                <label htmlFor="telefone" className="f-nome">Responsavel:</label>
                    <input 
                    type="text"
                    name="responsavel"
                    className="form-input"
                    value={alunosDTO.responsavel}
                    onChange={handleChange}
                    required
                    />
                    </div>
                    <div className="input-group">
                    <label htmlFor="email" className="f-nome">Cpf do Responsável:</label>
                    <input 
                    type="text"
                    name="cpfResponsavel"
                    className="form-input"
                    value={alunosDTO.cpfResponsavel}
                    onChange={handleChange}
                    required
                    />
                    </div>

                 
                
        </fieldset>
        <h3 className="titulo-form">Endereço</h3>
        <fieldset className="input-group-div">
                <div className="input-group">
                <label htmlFor="telefone" className="f-nome">Rua:</label>
                    <input 
                    type="text"
                    name="responsavel"
                    className="form-input"
                    value={alunosDTO.rua}
                    onChange={handleChange}
                    required
                    />
                    </div>
                    <div className="input-group">
                    <label htmlFor="email" className="f-nome">numero:</label>
                    <input 
                    type="text"
                    name="cpfResponsavel"
                    className="form-input"
                    value={alunosDTO.numero}
                    onChange={handleChange}
                    required
                    />
                    </div>
                    <div className="input-group">
                    <label htmlFor="email" className="f-nome">bairro:</label>
                    <input 
                    type="text"
                    name="cpfResponsavel"
                    className="form-input"
                    value={alunosDTO.bairro}
                    onChange={handleChange}
                    required
                    />
                    </div>
                    <div className="input-group">
                    <label htmlFor="cidade" className="f-nome">Cidade:</label>
                    <input 
                    type="text"
                    name="cidade"
                    className="form-input"
                    value={alunosDTO.cidade}
                    onChange={handleChange}
                    required
                    />
                    </div>
                    <div className="input-group">
                    <label htmlFor="complemento" className="f-nome">Complemento:</label>
                    <input 
                    type="text"
                    name="complemento"
                    className="form-input"
                    value={alunosDTO.complemento}
                    onChange={handleChange}
                    required
                    />
                    </div>
                
        </fieldset>
        
        <button className="btn-add" type="submit">Adicionar</button>
        </fieldset>
      </form>
      <button className="btn-celula-voltar" onClick={handleGoBack}>Voltar</button>
      
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
  