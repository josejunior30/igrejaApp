import axios from "axios";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { MembroDetail, pequenoGrupo } from "./types";
import './styles.css';
import SuccessModal from "../../components/Modal";
import { Link } from "react-router-dom";


const BASE_URL = 'http://localhost:8080';

const Formulario: React.FC =() => {
  const [membroDetail, setMembroDetail] = useState<MembroDetail>({
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
    pequenoGrupo: {
    id: 0,
      apelido: ""
    }
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name === "pequenoGrupo") {
      const grupoId = parseInt(value, 10);
  
      setMembroDetail((prevMembroDetail) => ({
        ...prevMembroDetail,
        pequenoGrupo: {
          ...prevMembroDetail.pequenoGrupo,
          id: grupoId,
        },
      }));
    }else if(name === "dataNascimento") {
      const dataNascimento = new Date(value);
      
      setMembroDetail((prevMembroDetail) => ({
        ...prevMembroDetail,
        [name]: dataNascimento,
      }));
    } else {
      setMembroDetail((prevMembroDetail) => ({
        ...prevMembroDetail,
        [name]: value,
      }));
    }
  };
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      console.log("Membro Detail antes do POST:", membroDetail);
      // Faça a chamada para adicionar o membro utilizando axios aqui
       await axios.post<{ id: number }>(`${BASE_URL}/membro`, membroDetail);
    
      // Lógica de manipulação de sucesso, redirecionamento, etc.
      setMembroDetail((prevMembroDetail) => ({
        ...prevMembroDetail
        
      })); setShowSuccessModal(true);
      setMembroDetail({
        id: 0, nome: "", sobrenome: "", email: "",
        idade: 0,dataNascimento: new Date(), telefone: "",url: "", cpf: "", estadoCivil: 0,
        pequenoGrupo: {
          id: 0, apelido: "",
        },
      });
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
      // Lógica de manipulação de erro
      console.error("Erro ao adicionar membro:", error);
    }
  };
  const [listaDeGrupos, setListaDeGrupos] = useState<pequenoGrupo[]>([]);


useEffect(() => {
  const fetchGrupos = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/pg`);
      setListaDeGrupos(response.data);
    } catch (error) {
      console.error("Erro ao obter a lista de grupos:", error);
    }
  };

  fetchGrupos();
}, []); // O 

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
        value={membroDetail.nome}
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
        value={membroDetail.sobrenome}
        onChange={handleChange}
        required
      />
      </div>
      </fieldset>

  <fieldset className="input-group-div">
    <div className="input-group">
    <label htmlFor="telefone" className="f-nome">CPF:</label>
      <input 
        type="cpf"
        className="form-input"
        value={membroDetail.cpf}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
      <label htmlFor="email" className="f-nome">Email:</label>
      <input 
        type="text"
        className="form-input"
        value={membroDetail.email}
        onChange={handleChange}
        required
      />
      </div>
     <div className="input-group">
      <label htmlFor="estado Civil" className="f-nome">Estado Civil:</label>
      <select
        className="form-select"
        value={membroDetail.estadoCivil} 
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
        value={membroDetail.telefone}
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
  value={membroDetail.dataNascimento.toISOString().split('T')[0]}
  onChange={handleChange}
  required
/>
</div>

<div className="input-group">
      <label htmlFor="grupo" className="f-nome">Pequeno Grupo:</label>
      <select
        className="form-select-pg"
        value={membroDetail.pequenoGrupo.id} 
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
            className="form-input"
            value={membroDetail.url}
            onChange={handleChange}
            required
          />
    
      </div>
      </fieldset>
      <h3 className="titulo-form">Endereço</h3>
      <fieldset>
      <fieldset className="input-group-div">
    <div className="input-group">
      <label htmlFor="nome" className="f-nome">Rua</label>
      <input 
        type="text"
       className="form-input"
        name="nome"
        value={membroDetail.nome}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
          <label htmlFor="sobrenome" className="f-nome">Numero</label>
      <input 
        type="text"
        className="form-input"
        name="sobrenome"
        value={membroDetail.sobrenome}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
          <label htmlFor="sobrenome" className="f-nome">Bairro</label>
      <input 
        type="text"
        className="form-input"
        name="sobrenome"
        value={membroDetail.sobrenome}
        onChange={handleChange}
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
        name="nome"
        value={membroDetail.nome}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
          <label htmlFor="sobrenome" className="f-nome">Complemento</label>
      <input 
        type="text"
        className="form-input"
        name="sobrenome"
        value={membroDetail.sobrenome}
        onChange={handleChange}
        required
      />
      </div>
      <div className="input-group">
          <label htmlFor="sobrenome" className="f-nome">cep:</label>
      <input 
        type="text"
        className="form-input"
        name="sobrenome"
        value={membroDetail.sobrenome}
        onChange={handleChange}
        required
      />
      </div>
      </fieldset>
      </fieldset>

      <button className="btn-add" type="submit">Adicionar</button>
    </form>
    
    {showSuccessModal && <SuccessModal onClose={() => setShowSuccessModal(false)} />}
    </>
  );
};

export default Formulario;
