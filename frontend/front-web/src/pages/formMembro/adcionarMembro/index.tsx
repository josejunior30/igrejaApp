import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

import './styles.css';
import SuccessModal from "../../../components/Modal";
import { insertMembro } from "../../../service/membroService";
import { MembrosDTO, pequenoGrupo } from "../../../models/membro";
import { BASE_URL } from "../../../ultilitarios/system";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; 
import Header from "../../../components/Header";
import Sidebar from "../../../components/sidebar";

const Formulario: React.FC = () => {
  const [listaDeGrupos, setListaDeGrupos] = useState<pequenoGrupo[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [membroDTO, setMembroDTO] = useState<MembrosDTO>({
    id: 0,
    nome: '',
    sobrenome: '',
    email: '',
   
    dataNascimento: new Date(),
    telefone: '',
    cpf: '',
    estadoCivil: 0,
    rua: '',
    bairro: '',
    cep: '',
    numero: 0,
    cidade: '',
    complemento: '',
    pequenoGrupo: {
      id: 0,
      apelido: '',
    },
  });
  const [imagem, setImagem] = useState<File | null>(null); // Estado para armazenar o arquivo de imagem
  const navigate = useNavigate();

  useEffect(() => {
    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/pg`);
        setListaDeGrupos(response.data);
      } catch (error) {
        console.error('Erro ao obter a lista de grupos:', error);
      }
    };

    fetchGrupos();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
  
    if (name === 'pequenoGrupo') {
      const grupoId = parseInt(value, 10);
  
      setMembroDTO(prevMembroDTO => ({
        ...prevMembroDTO,
        pequenoGrupo: {
          ...prevMembroDTO.pequenoGrupo,
          id: grupoId,
        },
      }));
    } else if (name === 'dataNascimento') {
      const dataNascimento = value ? new Date(value) : new Date();
  
      setMembroDTO(prevMembroDTO => ({
        ...prevMembroDTO,
        [name]: dataNascimento,
      }));
    } else {
      setMembroDTO(prevMembroDTO => ({
        ...prevMembroDTO,
        [name]: value,
      }));
    }
  };
  



  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // Enviar a imagem antes de enviar o membro
      let imageUrl = '';
      if (imagem) {
        const formData = new FormData();
        formData.append('file', imagem);

        const response = await axios.post(`${BASE_URL}/api/files/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        imageUrl = response.data.fileDownloadUri;
      }

      // Atualizar o objeto membroDTO com a URL da imagem, se existir
      const membroComImagem = {
        ...membroDTO,
        imageUrl: imageUrl,
      };

      // Utilizar a função insertMembro para adicionar o membro
      await insertMembro(membroComImagem);

      // Lógica de manipulação de sucesso, redirecionamento, etc.
      setIsModalVisible(true);
      setMembroDTO({
        id: 0,
        nome: '',
        sobrenome: '',
        email: '',
    
        dataNascimento: new Date(),
        telefone: '',
        cpf: '',
        estadoCivil: 0,
        rua: '',
        bairro: '',
        cep: '',
        numero: 0,
        cidade: '',
        complemento: '',
        pequenoGrupo: {
          id: 0,
          apelido: '',
        },
      });
    } catch (error) {
      console.error('Erro ao adicionar membro:', error);
      // Lógica de manipulação de erro
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsRedirecting(true);
  };

  if (isRedirecting) {
    navigate('/membro');
  }
  
  return (
    <>
     <Header/>
     <Sidebar/>
     <div className="container-fluid mt-5 pt-5">
     <div className="container col-md-8 pt-5 mb-5 col-11" >
    <form onSubmit={handleSubmit} className="row g-4 px-4 pb-4" id="add-alunos">
       <div className="col-md-12">
          <h3 >Dados pessoais </h3>
          </div>
          <div className="col-md-6" >
              <label htmlFor="nome" className="form-label">Nome:</label>
                <input 
                  type="text"
                className="form-control"
                  name="nome"
                  value={membroDTO.nome}
                  onChange={handleChange}
                  required
                />
           </div>
           <div className="col-md-6">
              <label htmlFor="sobrenome" className="form-label">Sobrenome:</label>
                  <input 
                    type="text"
                    className="form-control"
                    name="sobrenome"
                    value={membroDTO.sobrenome}
                    onChange={handleChange}
                    required
                  />
                      
            </div>
            <div className="col-md-4">
                    <label htmlFor="telefone" className="form-label">CPF:</label>
              <input 
                type="text"
                name="cpf"
                className="form-control"
                value={membroDTO.cpf}
                onChange={handleChange}
                required
              />
            </div>
        
    
            <div className="col-md-4">
            <label htmlFor="email" className="form-label">Email:</label>
      <input 
        type="email"
        name="email"
        className="form-control"
        value={membroDTO.email}
        onChange={handleChange}
        required
      />
            </div>

        <div className="col-md-4">
            <label htmlFor="estado Civil" className="form-label">Estado Civil:</label>
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
            <div className="col-md-4">
            <label htmlFor="telefone" className="form-label">Telefone:</label>
      <input placeholder="(21) 9 9999-9999"
        type="tel"
        className="form-control"
        name="telefone"
        value={membroDTO.telefone}
        onChange={handleChange}
        required
      />
              </div>

      <div className="col-md-4">
              <label htmlFor="data" className="form-label">Nascimento</label>
            <input
              type="date"
              className="form-control"
              name="dataNascimento"
              value={membroDTO.dataNascimento.toISOString().split('T')[0]}
              onChange={handleChange}
              required
            />
              </div>
              <div className="col-md-4">
              <label htmlFor="grupo" className="form-label">Pequeno Grupo:</label>
      <select
      name="pequenoGrupo"
        className="form-select"
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
              <div className="col-12">
              <h3 >Endereço </h3>
              </div>
        <div className="col-md-4">
              <label htmlFor="nome" className="form-label">Rua:</label>
              <input 
                type="text"
              className="form-control"
                name="rua"
                value={membroDTO.rua}
                onChange={handleChange}
                required
              />
    </div>
    <div className="col-md-4">
    <label htmlFor="nome" className="form-label">Cidade:</label>
      <input 
        type="text"
       className="form-control"
        name="cidade"
        value={membroDTO.cidade}
        onChange={handleChange}
        required
      />
    </div>
   
    <div className="col-md-4">
    <label htmlFor="bairro" className="form-label">Bairro:</label>
      <input 
        type="text"
        className="form-control"
        name="bairro"
        value={membroDTO.bairro}
        onChange={handleChange}
        required
      />
    </div>
    <div className="col-md-2">
    <label htmlFor="sobrenome" className="form-label">Numero:</label>
      <input 
        type="text"
        className="form-control"
        name="numero"
        value={membroDTO.numero}
        onChange={handleChange}
        required
      />
    </div>
    <div className="col-md-6">
    <label htmlFor="sobrenome" className="form-label">Complemento:</label>
      <input 
        type="text"
        className="form-control"
        name="complemento"
        value={membroDTO.complemento}
        onChange={handleChange}
        required
      />
    </div>
    <div className="col-md-4">
    <label htmlFor="sobrenome" className="form-label">cep:</label>
      <input 
        type="text"
        className="form-control"
        name="cep"
        value={membroDTO.cep}
        onChange={handleChange}
        required
      />
    </div>

    <div className="d-grid gap-2 col-6 mx-auto mt-5">
            <button className="btn btn-primary" type="submit">Adicionar</button>
      </div>
      </form>
      {isModalVisible && (
        <SuccessModal
          onClose={handleModalClose}
          onRedirect={() => setIsRedirecting(true)} 
          operation="adicionar"
        />
      )}
      </div>
     </div>

   
    </>
  );
};

export default Formulario;
