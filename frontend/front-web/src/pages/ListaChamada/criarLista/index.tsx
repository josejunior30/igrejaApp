import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { PresencaDTO, alunos, projetosChamada } from "../../../models/presenca";
import { BASE_URL } from "../../../ultilitarios/system";
import axios from "axios";
import './styles.css';
import { insert } from "../../../service/presencaService";
import Header from "../../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";


const AddLista = () => {
    const [listaDeAlunos, setListaDeAlunos] = useState<alunos[]>([]);
    const navigate = useNavigate();
    const [listaDeProjetos, setListaDeProjetos] = useState<projetosChamada[]>([]);
    const [presencas, setPresencas] = useState<PresencaDTO>({
        id:  0,
        data: new Date,
        chamadaAluno: 0,
        alunos: {
            id:0,
            nome:""
        },
        projetosChamada: {
            id:0,
            nome:"",
        }
});
        useEffect(() => {
            const fetchAlunos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/alunos`);
                setListaDeAlunos((await response).data);
            } catch (error) {
                console.error("Erro ao obter a lista de alunos:", error);
            }
            };
            fetchAlunos();
        },[]);
        useEffect(() => {
            const fetchProjetos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projetos`);
                setListaDeProjetos((await response).data);
            } catch (error) {
                console.error("Erro ao obter a lista de projetos:", error);
            }
            };

            fetchProjetos();
        },[]);

        const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            const { name, value } = e.target;
        
            if (name === "alunos") {
              const alunosId = parseInt(value, 10);
        
              setPresencas((prevPresencas) => ({
                ...prevPresencas,
                alunos: {
                  ...prevPresencas.alunos,
                  id: alunosId,
                },
              }));
            } else if (name === "data") {
              const data = new Date(value);
        
              setPresencas((prevPresencas) => ({
                ...prevPresencas,
                [name]: data,
              }));
            } else if (name === "projetos") {
                const projetosId = parseInt(value, 10);
          
                setPresencas((prevPresencas) => ({
                    ...prevPresencas,
                    projetosChamada: {
                      ...prevPresencas.projetosChamada,
                      id: projetosId,
                    },
                  }));

            } else {
              setPresencas((prevPresencas) => ({
                ...prevPresencas,
                [name]: value,
              }));
            }
          };
        const handleSubmit = async (e: FormEvent) => {
            e.preventDefault();
        
            try {
              console.log("Membro Detail antes do POST:", presencas);
            
              await insert(presencas);
              setPresencas({
                id: 0, data: new Date(), 
               chamadaAluno: 0,
                alunos: {
                  id: 0,  nome: ""
                },
                projetosChamada:{
                    id:0, nome:""
                }
              });
            } catch (error) {
              console.error("Erro ao adicionar Lista:", error);
    
            }
          }; 
          const handleGoBack = () => {
            navigate(-1); 
          }

          return (
            <>
            <Header/>
         <div className="voltar-lista-criar">
            <Link to={"/projetos"}>
              <TiArrowBack />  Voltar
            </Link>
          </div>
        <form onSubmit={handleSubmit} className="form-lista-criar">
             
        <fieldset className="lista-input-criar">
        <h3 className="lista-titulo-criar">Criar Lista de Presença</h3>
          
             <div className="div-input-grupo-criar">
                    <label htmlFor="data" className="c-nome">Data</label>
                        <input
                        type="date"
                        className="form-input-criar"
                        name="data"
                        value={presencas.data ? presencas.data.toISOString().split('T')[0] : ''}

                        onChange={handleChange}
                        required
                        />
                         <label htmlFor="projetos" className="c-nome">Projeto:</label>
                    <select
                    name="projetos"
                        className="form-select-criar"
                        value={presencas.projetosChamada.id} 
                        onChange={handleChange}
                        required
                    >
                    <option >Selecione </option>
                 {listaDeProjetos.map((projeto) => (
                    <option key={projeto?.id} value={projeto?.id}>
                        {projeto?.id} - {projeto?.nome}
                    </option>
                ))}

                </select>
            </div>
            
            <div className="div-input-grupo-criar">
                <label htmlFor="alunos" className="c-nome">Aluno:</label>
                <select
                name="alunos"
                    className="form-select-criar"
                    value={presencas.alunos.id} 
                    onChange={handleChange}
                    required
                >
                <option >Selecione </option>
                    {listaDeAlunos.map((aluno) => (
                    <option key={aluno?.id} value={aluno?.id}>
                        {aluno?.id} - {aluno?.nome}
                    </option>
                    ))}
                </select>
                <label htmlFor="estado Civil" className="c-nome">Presença:</label>
                    <select
                    name="chamadaAluno"
                        className="form-select-criar"
                        value={presencas.chamadaAluno} 
                        onChange={handleChange}
                        required
                    >
                    
                    <option >ESCOLHA</option>
                        <option value="0">PRESENTE</option>
                        <option value="1">AUSENTE</option>
                        <option value="2">LICENÇA</option>
                    </select>
        </div>
    
        <button className="btn-lista-criar" type="submit">Enviar</button>
     </fieldset>
    
 </form>

</>
)
    };

export default AddLista;