import { useEffect, useState } from 'react';
import * as membroService from '../../../service/membroService';
import { MembroDTO, pequenoGrupo } from "../../../models/membro";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../../../ultilitarios/system';
import SuccessModal from '../../../components/Modal';
import { useNavigate } from 'react-router-dom'; 

const FormularioUpdate =()=>{
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isRedirecting, setIsRedirecting] = useState(false);
    const [listaDeGrupos, setListaDeGrupos] = useState<pequenoGrupo[]>([]);
    const [MembroDTO, setMembroDTO] = useState<MembroDTO>({
      id: 0,
      nome: "",
      sobrenome: "",
      email: "",
      idade: 0,
      dataNascimento: new Date(),
      telefone: "",

      cpf: "",
      estadoCivil: 0,
      rua: "", bairro: "", cep: "", numero: 0, cidade: "", complemento: "",
      pequenoGrupo: {
        id: 0,
        apelido: ""
      }
    });
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          // Carregar os detalhes do membro ao montar o componente
          if (id) {
            const response = await membroService.findById(Number(id));
            setMembroDTO(response.data || {}); // Inicialize com os dados do ID escolhido
          }
        } catch (error) {
          console.error('Erro ao carregar detalhes do membro:', error);
        }
      };
  
      fetchData();

      const fetchGrupos = async () => {
        try {
          const response = await axios.get(`${BASE_URL}/pg`);
          setListaDeGrupos(response.data);
        } catch (error) {
          console.error('Erro ao obter a lista de grupos:', error);
        }
      };
  
      fetchGrupos();
    }, [id]);
  
    
const handleUpdateClick = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
    if (id && MembroDTO) {
      membroService
      .updateMembro(Number(id), MembroDTO)
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
  if (!MembroDTO) {
    return <p>Carregando detalhes do membro...</p>;
  }
  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsRedirecting(true);
  };
  if (isRedirecting) {
    navigate('/membro');
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    setMembroDTO(prevMembroDTO => ({
      ...prevMembroDTO,
      [name]: name === 'dataNascimento'
        ? value ? new Date(value) : new Date() // Verificar se value é válido
        : name === 'estadoCivil' || name === 'pequenoGrupo'
        ? Number(value)
        : value,
    }));
  };
  
  
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
      value={MembroDTO.nome}
      onChange={(e) => setMembroDTO({ ...MembroDTO, nome: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="sobrenome" className="f-nome">Sobrenome:</label>
    <input 
      type="text"
      className="form-input"
      name="sobrenome"
      value={MembroDTO.sobrenome}
      onChange={(e) => setMembroDTO({ ...MembroDTO, sobrenome: e.target.value })}
      required
    />
    </div>
    </fieldset>

<fieldset className="input-group-div">
  <div className="input-group">
  <label htmlFor="telefone" className="f-nome">CPF:</label>
    <input 
      type="text"
      name="cpf"
      className="form-input"
      value={MembroDTO.cpf}
      onChange={(e) => setMembroDTO({ ...MembroDTO, cpf: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
    <label htmlFor="email" className="f-nome">Email:</label>
    <input 
      type="email"
      name="email"
      className="form-input"
      value={MembroDTO.email}
      onChange={(e) => setMembroDTO({ ...MembroDTO, email: e.target.value })}
      required
    />
    </div>
   <div className="input-group">
    <label htmlFor="estado Civil" className="f-nome">Estado Civil:</label>
    <select
    name="estadoCivil"
      className="form-select"
      value={MembroDTO.estadoCivil} 
      onChange={(e) => setMembroDTO({ ...MembroDTO, estadoCivil: Number(e.target.value) })}
      required
    >
    
    <option >ESCOLHA</option>
      <option value="0">Solteiro</option>
      <option value="1">Casado</option>
      <option value="2">Divorciado</option>
      <option value="3">Viuvo(a)</option>
  </select>
  </div>

</fieldset>


<fieldset className="input-group-div">
  <div className="input-group">
  <label htmlFor="telefone" className="f-nome">Telefone:</label>
    <input placeholder="(21) 9 9999-9999"
      type="tel"
      className="form-input"
      name="telefone"
      value={MembroDTO.telefone}
      onChange={(e) => setMembroDTO({ ...MembroDTO, telefone: e.target.value })}
      required
    />
</div>
<div className="input-group">
    <label htmlFor="data" className="f-nome">Nascimento</label>
  <input
      type="date"
      className="form-input"
      name="dataNascimento"
      value={MembroDTO.dataNascimento instanceof Date && !isNaN(MembroDTO.dataNascimento.getTime()) ? MembroDTO.dataNascimento.toISOString().split('T')[0] : ''}
      onChange={handleChange}
      required
      />
  </div>

<div className="input-group">
    <label htmlFor="grupo" className="f-nome">Pequeno Grupo:</label>
    <select
    name="pequenoGrupo"
      className="form-select-pg"
      value={MembroDTO.pequenoGrupo.id} 
      onChange={(e) => setMembroDTO({ ...MembroDTO, pequenoGrupo: { id: Number(e.target.value), apelido: "placeholder" } })}
      required
    >
    <option >Selecione </option>
      {listaDeGrupos.map((grupo) => (
      
        <option key={grupo.id} value={grupo.id}>
          {grupo.id} - {grupo.apelido}
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
      value={MembroDTO.rua}
      onChange={(e) => setMembroDTO({ ...MembroDTO, rua: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="sobrenome" className="f-nome">Numero</label>
    <input 
      type="text"
      className="form-input"
      name="numero"
      value={MembroDTO.numero}
      onChange={(e) => setMembroDTO({ ...MembroDTO, numero: Number(e.target.value) })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="bairro" className="f-nome">Bairro</label>
    <input 
      type="text"
      className="form-input"
      name="bairro"
      value={MembroDTO.bairro}
      onChange={(e) => setMembroDTO({ ...MembroDTO, bairro: e.target.value })}
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
      value={MembroDTO.cidade}
      onChange={(e) => setMembroDTO({ ...MembroDTO, cidade: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="sobrenome" className="f-nome">Complemento</label>
    <input 
      type="text"
      className="form-input"
      name="complemento"
      value={MembroDTO.complemento}
      onChange={(e) => setMembroDTO({ ...MembroDTO, complemento: e.target.value })}
      required
    />
    </div>
    <div className="input-group">
        <label htmlFor="sobrenome" className="f-nome">cep:</label>
    <input 
      type="number"
      className="form-input"
      name="cep"
      value={MembroDTO.cep}
      onChange={(e) => setMembroDTO({ ...MembroDTO, cep: e.target.value })}
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

export default FormularioUpdate;