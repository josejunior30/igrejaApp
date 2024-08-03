import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { alunoDTO, projetos } from "../../../models/alunos";
import axios from "axios";
import { BASE_URL } from "../../../ultilitarios/system";
import { insertAluno } from "../../../service/alunosService";

import './styles.css';
import Header from "../../../components/Header";
import { useNavigate } from "react-router-dom";

const AddAlunos: React.FC = () => {
    const [projetos, setProjetos] = useState<projetos[]>([]);
    const navigate = useNavigate();
    const [alunosDTO, setAlunosDTO] = useState<alunoDTO>({
        id: 0,
        nome: "",
        dataNascimento: new Date(),
        telefone: "21",
        url: "",
        rg: "",
        cpfResponsavel: "",
        responsavel: "",
        email: "",
        sangue: "",
        pergunta: "",
        horario: "",
        AlunoDoenca: 0,
        rua: "", bairro: "", cep: "", numero: "", cidade: "", complemento: "",
        projetos: {
            id: 0,
            nome: "",
        },
    });

    useEffect(() => {
        const fetchGrupos = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/projetos`);
                setProjetos(response.data);
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
            if (!isNaN(dataNascimento.getTime())) {
                setAlunosDTO((prevAlunosDTO) => ({
                    ...prevAlunosDTO,
                    [name]: dataNascimento,
                }));
            }
        } else if (name === "telefone") {
            let telefone = value;
            if (!telefone.startsWith("21")) {
                telefone = "21" + telefone.replace(/^21/, '');
            }
            setAlunosDTO((prevAlunosDTO) => ({
                ...prevAlunosDTO,
                [name]: telefone,
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
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        try {
            console.log("Membro Detail antes do POST:", alunosDTO);
            await insertAluno(alunosDTO);

            setAlunosDTO({
                id: 0,
                nome: "",
                dataNascimento: new Date(),
                telefone: "21",
                url: "",
                rg: "",
                cpfResponsavel: "",
                responsavel: "",
                email: "",
                sangue: "",
                horario: "",
                pergunta: "",
                AlunoDoenca: 0,
                rua: "", bairro: "", cep: "", numero: "", cidade: "", complemento: "",
                projetos: {
                    id: 0,
                    nome: "",
                },
            });
        } catch (error) {
            console.error("Erro ao adicionar aluno:", error);
        }
    };

    return (
        <>
            <Header />
            <div className="container-fluid mt-5 pt-5">
                <div className="container col-md-8 pt-5">
                    <form onSubmit={handleSubmit} className="row g-4 px-4 pb-4" id="add-alunos">
                        <div className="col-md-12">
                            <h3>Dados pessoais</h3>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="nome" className="form-label">Nome:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="nome"
                                value={alunosDTO.nome}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="rg" className="form-label">Identidade:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="rg"
                                value={alunosDTO.rg}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-5">
                            <label htmlFor="email" className="form-label">E-mail:</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={alunosDTO.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="dataNascimento" className="form-label">Nascimento</label>
                            <input
                                type="date"
                                className="form-control"
                                name="dataNascimento"
                                value={alunosDTO.dataNascimento.toISOString().split('T')[0]}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="telefone" className="form-label">Telefone:</label>
                            <input
                                type="text"
                                className="form-control"
                                name="telefone"
                                value={alunosDTO.telefone}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="projetos" className="form-label">Projeto:</label>
                            <select
                                name="projetos"
                                className="form-select"
                                value={alunosDTO.projetos.id}
                                onChange={handleChange}
                                required
                            >
                                <option value="" selected>Selecione</option>
                                {projetos.map((projeto) => (
                                    <option key={projeto.id} value={projeto.id}>
                                        {projeto.id} - {projeto.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="horario" className="form-label">Horário:</label>
                            <input
                                type="time"
                                className="form-control"
                                name="horario"
                                value={alunosDTO.horario}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="AlunoDoenca" className="form-label">Doença ou alergia?:</label>
                            <select
                                name="AlunoDoenca"
                                className="form-select"
                                value={alunosDTO.AlunoDoenca}
                                onChange={handleChange}
                            >
                                <option value="" selected>ESCOLHA</option>
                                <option value="0">NÃO</option>
                                <option value="1">SIM</option>
                            </select>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="pergunta" className="form-label">Qual?</label>
                            <input
                                type="text"
                                className="form-control"
                                name="pergunta"
                                value={alunosDTO.pergunta}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-12">
                            <h3>Dados do Responsável</h3>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="responsavel" className="form-label">Nome:</label>
                            <input
                                type="text"
                                name="responsavel"
                                className="form-control"
                                value={alunosDTO.responsavel}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="cpfResponsavel" className="form-label">CPF ou RG do Responsável:</label>
                            <input
                                type="text"
                                name="cpfResponsavel"
                                className="form-control"
                                value={alunosDTO.cpfResponsavel}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-12">
                            <h3>Endereço</h3>
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="rua" className="form-label">Rua:</label>
                            <input
                                type="text"
                                name="rua"
                                className="form-control"
                                value={alunosDTO.rua}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="numero" className="form-label">Número:</label>
                            <input
                                type="text"
                                name="numero"
                                className="form-control"
                                value={alunosDTO.numero}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="bairro" className="form-label">Bairro:</label>
                            <input
                                type="text"
                                name="bairro"
                                className="form-control"
                                value={alunosDTO.bairro}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="cidade" className="form-label">Cidade:</label>
                            <input
                                type="text"
                                name="cidade"
                                className="form-control"
                                value={alunosDTO.cidade}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="complemento" className="form-label">Complemento:</label>
                            <input
                                type="text"
                                name="complemento"
                                className="form-control"
                                value={alunosDTO.complemento}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="cep" className="form-label">Cep:</label>
                            <input
                                type="text"
                                name="cep"
                                className="form-control"
                                value={alunosDTO.cep}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="d-grid gap-2 col-6 mx-auto">
                            <button className="btn btn-primary" type="submit">Adicionar</button>
                        </div>
                    </form>
                </div>
                <div className="col-md-12 col-11" id="voltar-alunos">
                    <button className="btn btn-primary" onClick={handleGoBack}>Voltar</button>
                </div>
            </div>
        </>
    );
};

export default AddAlunos;
