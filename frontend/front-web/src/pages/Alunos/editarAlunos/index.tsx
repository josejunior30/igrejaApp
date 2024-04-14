import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { alunosDTO, projetos } from "../../../models/alunos";
import *as alunosService from '../../../service/alunosService';
import axios from "axios";
import { BASE_URL } from "../../../ultilitarios/system";
import SuccessModal from "../../../components/Modal";

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
    <form onSubmit={handleUpdateClick} className="fm-container">
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
      onChange={(e) => setAlunosDTO({ ...alunosDTO, nome: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="sobrenome" className="f-nome">identidade:</label>
    <input 
      type="text"
      className="form-input"
      name="sobrenome"
      value={alunosDTO.rg}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, rg: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
    <label htmlFor="data" className="f-nome">Nascimento</label>
  <input
      type="date"
      className="form-input"
      name="dataNascimento"
      value={alunosDTO.dataNascimento instanceof Date ? alunosDTO.dataNascimento.toISOString().split('T')[0] : ''}
        onChange={(e) => setAlunosDTO({ ...alunosDTO, dataNascimento: new Date(e.target.value) })}
      required
      />
  </div>
    </fieldset>

<fieldset className="input-group-div">
  <div className="input-group">
  <label htmlFor="telefone" className="f-nome">telefone:</label>
    <input 
      type="text"
      name="telefone"
      className="form-input"
      value={alunosDTO.telefone}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, telefone: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
    <label htmlFor="email" className="f-nome">responsavel:</label>
    <input 
      type="text"
      name="responsavel"
      className="form-input"
      value={alunosDTO.responsavel}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, responsavel: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
  <label htmlFor="telefone" className="f-nome">Cpf do Responsavel:</label>
    <input placeholder="(21) 9 9999-9999"
      type="text"
      className="form-input"
      name="telefone"
      value={alunosDTO.telefone}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, telefone: e.target.value })}
      required
    />
</div>
  
</fieldset>


<fieldset className="input-group-div">

<div className="input-group">
    <label htmlFor="grupo" className="f-nome">Projeto:</label>
    <select
    name="pequenoGrupo"
      className="form-select-pg"
      value={alunosDTO.projetos.id} 
      onChange={(e) => setAlunosDTO({ ...alunosDTO, projetos: { id: Number(e.target.value), nome: "placeholder" } })}
      required
    >
    <option >Selecione </option>
      {listaDeGrupos.map((projeto) => (
      
        <option key={projeto.id} value={projeto.id}>
          {projeto.id} - {projeto.nome}
        </option>
      ))}
  </select>
</div>
</fieldset>
 </fieldset>
    <h3 className="titulo-form">Endereço</h3>
  <fieldset>
    <fieldset className="input-group-div">
  <div className="input-group">
    <label htmlFor="nome" className="f-nome">Rua</label>
    <input 
      type="text"
     className="form-input"
      name="rua"
      value={alunosDTO.rua}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, rua: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="sobrenome" className="f-nome">Numero</label>
    <input 
      type="text"
      className="form-input"
      name="numero"
      value={alunosDTO.numero}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, numero: (e.target.value) })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="bairro" className="f-nome">Bairro</label>
    <input 
      type="text"
      className="form-input"
      name="bairro"
      value={alunosDTO.bairro}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, bairro: e.target.value })}
      required
    />
    </div>
    </fieldset>
    <fieldset className="input-group-div">
  <div className="input-group">
    <label htmlFor="nome" className="f-nome">Cidade</label>
    <input 
      type="text"
     className="form-input"
      name="cidade"
      value={alunosDTO.cidade}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, cidade: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="sobrenome" className="f-nome">Complemento</label>
    <input 
      type="text"
      className="form-input"
      name="complemento"
      value={alunosDTO.complemento}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, complemento: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="sobrenome" className="f-nome">cep:</label>
    <input 
      type="number"
      className="form-input"
      name="cep"
      value={alunosDTO.cep}
      onChange={(e) => setAlunosDTO({ ...alunosDTO, cep:( e.target.value) })}
      required
    />
    </div>
    </fieldset>
    </fieldset>

    <button className="btn-add" type="submit">Atualizar</button>
  </form>
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