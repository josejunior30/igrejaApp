import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { alunosDTO, projetos } from "../../../models/alunos";
import *as alunosService from '../../../service/alunosService';
import axios from "axios";
import { BASE_URL } from "../../../ultilitarios/system";
import SuccessModal from "../../../components/Modal";
import './styles.css';
import Header from "../../../components/Header";
const EditarAlunos =()=>{
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [listaDeGrupos, setListaDeGrupos] = useState<projetos[]>([]);
    
    const [alunosDTO, setAlunosDTO] = useState<alunosDTO>({
      
        id: 0,
      nome: "",
      dataNascimento: new Date(),
      telefone: "",
      url: "",
      rg: "",
      cpfResponsavel: "",
      responsavel: "",
      idade: 0,
      sangue:"",
      pergunta:"",
      AlunoDoenca:0,

      rua: "", bairro: "", cep: "", numero: "", cidade: "", complemento: "",
      
      projetos: {
        id: 0,
        nome: "",
      },
     
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Carregar os detalhes do membro ao montar o componente
          if (id) {
            const response = await alunosService.findById(Number(id));
            setAlunosDTO(response.data || {}); // Inicialize com os dados do ID escolhido
          }
        } catch (error) {
          console.error('Erro ao carregar detalhes do membro:', error);
        }
      };
  
      fetchData();

      const fetchGrupos = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/projetos`);
          setListaDeGrupos(response.data);
        } catch (error) {
          console.error('Erro ao obter a lista de grupos:', error);
        }
      };
  
      fetchGrupos();
    }, [id]);
  
    
const handleUpdateClick = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    if (id && alunosDTO) {
      alunosService
      .updateMembro(Number(id), alunosDTO)
        .then(response => {
          console.log("Membro atualizado com sucesso:", response.data);
          setIsModalVisible(true);
        })
        .catch(error => {
          console.error("Erro ao atualizar membro:", error);
          // Adicione algum feedback de erro, se necessário
        });
    }
  };
  if (!alunosDTO) {
    return <p>Carregando detalhes do membro...</p>;
  }
  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsRedirecting(true);
  };
  if (isRedirecting) {
    navigate('/secretaria/alunos');
  }

  return(

<>
<Header/>
<div className="container-fluid pt-5">
               
               <div className="container col-md-8 mt-5 pt-5 " >
                <form onSubmit={handleUpdateClick} className="row  g-4 px-4 pb-4" id="edit-alunos" >
                  <div className="col-md-12">
                  <h3 className="titulo-form">Dados pessoais </h3>
                  </div>
               
                  <div className="col-md-6">
                  <label htmlFor="nome" className="form-label">Nome:</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="nome"
                    value={alunosDTO.nome}
                    onChange={(e) => setAlunosDTO({ ...alunosDTO, nome: e.target.value })}
                 
                  />
                  </div>
              
                    <div className="col-md-6">
                    <label htmlFor="sobrenome" className="form-label">identidade:</label>
                                  <input 
                                    type="text"
                                    className="form-control"
                                    name="rg"
                                    value={alunosDTO.rg}
                                 
                                  />
                    </div>
                  <div className="col-md-4">
                  <label htmlFor="data" className="form-label">Nascimento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dataNascimento"
                    value={alunosDTO.dataNascimento instanceof Date ? alunosDTO.dataNascimento.toISOString().split('T')[0] : ''}
                      onChange={(e) => setAlunosDTO({ ...alunosDTO, dataNascimento: new Date(e.target.value) })}
                 
                    />
                  </div>
                  <div className="col-md-4">
                  <label htmlFor="telefone"className="form-label">Telefone:</label>
                  <input 
                    type="text"
                    name="telefone"
                    className="form-control"
                    value={alunosDTO.telefone}
                    onChange={(e) => setAlunosDTO({ ...alunosDTO, telefone: e.target.value })}
                  
                  />
                  </div>
    
                  <div className="col-md-4">
                   <label htmlFor="projetos" className="form-label">Projeto:</label>
                            <select
                            name="projetos"
                            className="form-select"
                              value={alunosDTO.projetos.id} 
                              onChange={(e) => setAlunosDTO({ ...alunosDTO, projetos: { id: Number(e.target.value), nome: "placeholder" } })}
                           
                            >
                            <option selected >Selecione </option>
                              {listaDeGrupos.map((projeto) => (
                              
                                <option key={projeto.id} value={projeto.id}>
                                  {projeto.id} - {projeto.nome}
                                </option>
                              ))}
                          </select>
              </div>
    
    
              <div className="col-md-4">
            <label htmlFor="telefone" className="form-label">Tipo Sanguíneo:</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="sangue"
                    value={alunosDTO.sangue}
                    onChange={(e) => setAlunosDTO({ ...alunosDTO, projetos: { id: Number(e.target.value), nome: "placeholder" } })}
                 
                  />
    </div>
        
    <div className="col-md-4">
    <label htmlFor="projetos" className="form-label">Doença ou alergia?:</label>
                  <select
                    name="AlunoDoenca"
                    className="form-select"
                    value={alunosDTO.AlunoDoenca} 
                    onChange={(e) => setAlunosDTO({ ...alunosDTO, projetos: { id: Number(e.target.value), nome: "placeholder" } })}
                   
                  >
                   <option selected>ESCOLHA</option>
                      <option value="0">NÃO</option>
                      <option value="1">SIM</option>
                    
                  </select>
    </div>
    <div className="col-md-4">
    <label htmlFor="telefone" className="form-label">Qual?</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="pergunta"
                    value={alunosDTO.pergunta}
                    onChange={(e) => setAlunosDTO({ ...alunosDTO, projetos: { id: Number(e.target.value), nome: "placeholder" } })}
                 
                  />
    
    </div>
              <div className="col-md-12">
                  <h3 className="titulo-form">Dados do Responsável </h3>
              </div>
    
                  <div className="col-md-6">
                  <label htmlFor="responsavel" className="form-label">Nome:</label>
                  <input 
                    type="text"
                    name="responsavel"
                    className="form-control"
                    value={alunosDTO.responsavel}
                    onChange={(e) => setAlunosDTO({ ...alunosDTO, responsavel: e.target.value })}
                 
                  />
                  </div>
                  
                <div className="col-md-6">
                <label htmlFor="telefone" className="form-label">Rg ou Cpf do Responsavel:</label>
                  <input placeholder="(21) 9 9999-9999"
                    type="text"
                    className="form-control"
                    name="cpfResponsavel"
                    value={alunosDTO.cpfResponsavel}
                    onChange={(e) => setAlunosDTO({ ...alunosDTO, telefone: e.target.value })}
                 
                  />
                  </div>
                 
              <div className="col-md-12">
              <h3 className="titulo-form">Endereço</h3>
              </div>
                      
              <div className="col-md-4">
              <label htmlFor="nome" className="form-label">Rua</label>
                            <input 
                              type="text"
                              className="form-control"
                              name="rua"
                              value={alunosDTO.rua}
                              onChange={(e) => setAlunosDTO({ ...alunosDTO, rua: e.target.value })}
                          
                            />
              </div>
                        <div className="col-md-4">
                        <label htmlFor="sobrenome"className="form-label">Numero</label>
                                      <input 
                                        type="text"
                                        className="form-control"
                                        name="numero"
                                        value={alunosDTO.numero}
                                        onChange={(e) => setAlunosDTO({ ...alunosDTO, numero: (e.target.value) })}
                                   
                                      />
              </div>
            <div className="col-md-4">
            <label htmlFor="bairro"className="form-label">Bairro</label>
                          <input 
                            type="text"
                            className="form-control"
                            name="bairro"
                            value={alunosDTO.bairro}
                            onChange={(e) => setAlunosDTO({ ...alunosDTO, bairro: e.target.value })}
                        
                          />
              </div>
              <div className="col-md-4">
              <label htmlFor="nome" className="form-label">Cidade</label>
                            <input 
                              type="text"
                              className="form-control"
                              name="cidade"
                              value={alunosDTO.cidade}
                              onChange={(e) => setAlunosDTO({ ...alunosDTO, cidade: e.target.value })}
                          
                            />
              </div>
    
          <div className="col-md-4">
          <label htmlFor="sobrenome"className="form-label">Complemento</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="complemento"
                    value={alunosDTO.complemento}
                   
                  />
          </div>
         
          <div className="col-md-4">
              <label htmlFor="sobrenome" className="form-label">cep:</label>
                            <input 
                              type="text"
                              className="form-control"
                              name="cep"
                              value={alunosDTO.cep}
                              onChange={(e) => setAlunosDTO({ ...alunosDTO, cep:( e.target.value) })}
                          
                            />
              </div>
            <div className="d-grid gap-2 col-6 mx-auto">
                  <button className="btn btn-primary" type="submit">Atualizar</button>
                  </div>
             </form>
           
            </div>
            
          </div>
      
        
         {/* ... (restante do código) */}
         {isModalVisible && (
            <SuccessModal
              onClose={handleModalClose}
              onRedirect={() => setIsRedirecting(true)} // Ajuste conforme necessário
              operation="atualizar"
            />
          )}
  </>
  
  )

};

export default EditarAlunos;