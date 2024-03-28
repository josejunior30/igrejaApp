import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import './styles.css';
import SuccessModal from "../../../components/Modal";
import { insertMembro } from "../../../service/membroService";
import { MembroDTO, pequenoGrupo } from "../../../models/membro";
import { BASE_URL } from "../../../ultilitarios/system";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import Header from "../../../components/Header";
import Sidebar from "../../../components/sidebar";

const Formulario: React.FC = () => {
  const [listaDeGrupos, setListaDeGrupos] = useState<pequenoGrupo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const navigate = useNavigate();
  const [membroDTO, setMembroDTO] = useState<MembroDTO>({
    id: 0,
    nome: "",
    sobrenome: "",
    email: "",
    idade: 0,
    dataNascimento: new Date(),
    telefone: "",
    url: "",
    cpf: "",
    estadoCivil: 0,
    rua: "", bairro: "", cep: 0, numero: 0, cidade: "", complemento: "",
    pequenoGrupo: {
      id: 0,
      apelido: ""
    }
  });

  
  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/pg`);
        setListaDeGrupos((await response).data);
      } catch (error) {
        console.error("Erro ao obter a lista de grupos:", error);
      }
    };

    fetchGrupos();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === "pequenoGrupo") {
      const grupoId = parseInt(value, 10);

      setMembroDTO((prevMembroDTO) => ({
        ...prevMembroDTO,
        pequenoGrupo: {
          ...prevMembroDTO.pequenoGrupo,
          id: grupoId,
        },
      }));
    } else if (name === "dataNascimento") {
      const dataNascimento = new Date(value);

      setMembroDTO((prevMembroDTO) => ({
        ...prevMembroDTO,
        [name]: dataNascimento,
      }));
    } else {
      setMembroDTO((prevMembroDTO) => ({
        ...prevMembroDTO,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log("Membro Detail antes do POST:", membroDTO);
      // Utilizando a função insertMembro para adicionar o membro
      await insertMembro(membroDTO);

      // Lógica de manipulação de sucesso, redirecionamento, etc.
      setIsModalVisible(true);
      setMembroDTO({
        id: 0, nome: "", sobrenome: "", email: "",
        idade: 0, dataNascimento: new Date(), telefone: "", url: "", cpf: "", estadoCivil: 0,
        rua: "", bairro: "", cep: 0, numero: 0, cidade: "", complemento: "",
        pequenoGrupo: {
          id: 0, apelido: "",
        },
      });
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      // Lógica de manipulação de erro
    }
  };
  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsRedirecting(true);
  };
  if (isRedirecting) {
    navigate('/secretaria/membro');
  }
  return (
    <>
     <Header/>
     <Sidebar/>
    <form onSubmit={handleSubmit} className="fm-container">
      <div className="titulo-form">
      <h3 >Dados pessoais </h3>
      </div>
   <fieldset className="input-group-div">
    <div className="input-group">
      <label htmlFor="nome" className="f-nome">Nome:</label>
      <input 
        type="text"
       className="form-input"
        name="nome"
        value={membroDTO.nome}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
          <label htmlFor="sobrenome" className="f-nome">Sobrenome:</label>
      <input 
        type="text"
        className="form-input"
        name="sobrenome"
        value={membroDTO.sobrenome}
        onChange={handleChange}
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
        value={membroDTO.cpf}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
      <label htmlFor="email" className="f-nome">Email:</label>
      <input 
        type="email"
        name="email"
        className="form-input"
        value={membroDTO.email}
        onChange={handleChange}
        required
      />
      </div>
     <div className="input-group">
      <label htmlFor="estado Civil" className="f-nome">Estado Civil:</label>
      <select
      name="estadoCivil"
        className="form-select"
        value={membroDTO.estadoCivil} 
        onChange={handleChange}
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
        value={membroDTO.telefone}
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
  value={membroDTO.dataNascimento.toISOString().split('T')[0]}
  onChange={handleChange}
  required
/>
</div>

<div className="input-group">
      <label htmlFor="grupo" className="f-nome">Pequeno Grupo:</label>
      <select
      name="pequenoGrupo"
        className="form-select-pg"
        value={membroDTO.pequenoGrupo.id} 
        onChange={handleChange}
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
 <div className="input-group">
    <label htmlFor="foto" className="f-nome">Foto</label>
          <input
            type="file"
            name="url"
            className="form-input"
            value={membroDTO.url}
            onChange={handleChange}
            required
          />
    
      </div>
      
      <div className="titulo-form">
      <h3 >Endereço </h3>
      </div>
    
  <fieldset className="input-group-div">
    <div className="input-group">
      <label htmlFor="nome" className="f-nome">Rua</label>
      <input 
        type="text"
       className="form-input"
        name="rua"
        value={membroDTO.rua}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
          <label htmlFor="sobrenome" className="f-nome">Numero</label>
      <input 
        type="text"
        className="form-input"
        name="numero"
        value={membroDTO.numero}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
          <label htmlFor="bairro" className="f-nome">Bairro</label>
      <input 
        type="text"
        className="form-input"
        name="bairro"
        value={membroDTO.bairro}
        onChange={handleChange}
        required
      />
      </div>
      
      
    <div className="input-group">
      <label htmlFor="nome" className="f-nome">Cidade</label>
      <input 
        type="text"
       className="form-input"
        name="cidade"
        value={membroDTO.cidade}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
          <label htmlFor="sobrenome" className="f-nome">Complemento</label>
      <input 
        type="text"
        className="form-input"
        name="complemento"
        value={membroDTO.complemento}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
          <label htmlFor="sobrenome" className="f-nome">cep:</label>
      <input 
        type="number"
        className="form-input"
        name="cep"
        value={membroDTO.cep}
        onChange={handleChange}
        required
      />
      </div>
      
      </fieldset>

      <button className="btn-add" type="submit">Adicionar</button>
    </form>
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

export default Formulario;
