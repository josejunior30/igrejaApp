import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { alunosDTO, projetos } from "../../../models/alunos";
import * as alunosService from "../../../service/alunosService";
import axios from "axios";
import { BASE_URL } from "../../../ultilitarios/system";
import "./styles.css";
import Header from "../../../components/Header";

const EditarAlunos = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [listaDeGrupos, setListaDeGrupos] = useState<projetos[]>([]);

  const [alunosDTO, setAlunosDTO] = useState<alunosDTO>({
    id: 0,
    nome: "",
    dataNascimento: new Date(),
    telefone: "",
    url: "",
    rg: "",
    cpfResponsavel: "",
    email: "",
    responsavel: "",
    idade: 0,
    sangue: "",
    abandono: "",
    pergunta: "",
    horario: "",
    grauParentesco: "",
    dataReativado: new Date(),
    ativo: true,
    dataMatricula: new Date(),
    dataInativo: new Date(),
    AlunoDoenca: 0,
    rua: "",
    bairro: "",
    cep: "",
    numero: "",
    cidade: "",
    complemento: "",
    projetos: {
      id: 0,
      nome: "",
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await alunosService.findById(Number(id));
          setAlunosDTO(response.data || {});
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do membro:", error);
      }
    };

    fetchData();

    const fetchGrupos = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/projetos`);
        setListaDeGrupos(response.data);
      } catch (error) {
        console.error("Erro ao obter a lista de grupos:", error);
      }
    };

    fetchGrupos();
  }, [id]);

  const handleUpdateClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id && alunosDTO) {
      alunosService
        .updateMembro(Number(id), alunosDTO)
        .then((response) => {
          alert("Aluno atualizado com sucesso!");
          navigate("/alunos");
        })
        .catch((error) => {
          alert("Erro ao atualizar aluno");
        });
    }
  };

  if (!alunosDTO) {
    return <p>Carregando detalhes do membro...</p>;
  }

  return (
    <>
      <Header />
      <div className="container-fluid pt-5">
        <div className="container col-md-8 mt-5 pt-5 ">
          <form
            onSubmit={handleUpdateClick}
            className="row  g-4 px-4 pb-4"
            id="edit-alunos"
          >
            <div className="col-md-6">
              <label htmlFor="ativo" className="form-label">
                Ativo:
              </label>
              <select
                className="form-select"
                name="ativo"
                value={alunosDTO.ativo ? "true" : "false"}
                onChange={(e) =>
                  setAlunosDTO({
                    ...alunosDTO,
                    ativo: e.target.value === "true", // Converte para booleano
                  })
                }
              >
                <option value="true">Ativo</option>
                <option value="false">Inativo</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="data" className="form-label">
                Data Inativo
              </label>
              <input
                type="date"
                className="form-control"
                name="dataInativo"
                value={
                  alunosDTO.dataInativo instanceof Date
                    ? alunosDTO.dataInativo.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setAlunosDTO({
                    ...alunosDTO,
                    dataInativo: new Date(e.target.value),
                  })
                }
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="data" className="form-label">
                Data Rematricula
              </label>
              <input
                type="date"
                className="form-control"
                name="dataReativo"
                value={
                  alunosDTO.dataReativado instanceof Date
                    ? alunosDTO.dataReativado.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setAlunosDTO({
                    ...alunosDTO,
                    dataReativado: new Date(e.target.value),
                  })
                }
              />
            </div>

            <div className="col-md-12">
              <h3 className="titulo-form">Dados pessoais </h3>
            </div>

            <div className="col-md-6">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={alunosDTO.nome}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, nome: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="sobrenome" className="form-label">
                identidade:
              </label>
              <input
                type="text"
                className="form-control"
                name="rg"
                value={alunosDTO.rg}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, rg: e.target.value })
                }
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="email" className="form-label">
                E-mail:
              </label>
              <input
                type="text"
                className="form-control"
                name="email"
                value={alunosDTO.email}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, email: e.target.value })
                }
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="data" className="form-label">
                Nascimento
              </label>
              <input
                type="date"
                className="form-control"
                name="dataNascimento"
                value={
                  alunosDTO.dataNascimento instanceof Date
                    ? alunosDTO.dataNascimento.toISOString().split("T")[0]
                    : ""
                }
                onChange={(e) =>
                  setAlunosDTO({
                    ...alunosDTO,
                    dataNascimento: new Date(e.target.value),
                  })
                }
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="telefone" className="form-label">
                Telefone:
              </label>
              <input
                type="text"
                name="telefone"
                className="form-control"
                value={alunosDTO.telefone}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, telefone: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="projetos" className="form-label">
                Projeto:
              </label>
              <select
                name="projetos"
                className="form-select"
                value={alunosDTO.projetos.id}
                onChange={(e) =>
                  setAlunosDTO({
                    ...alunosDTO,
                    projetos: {
                      id: Number(e.target.value),
                      nome: "placeholder",
                    },
                  })
                }
              >
                <option selected>Selecione </option>
                {listaDeGrupos.map((projeto) => (
                  <option key={projeto.id} value={projeto.id}>
                    {projeto.id} - {projeto.nome}
                  </option>
                ))}
              </select>
            </div>

            <div className="col-md-4">
              <label htmlFor="horario" className="form-label">
                Horario
              </label>
              <input
                type="time"
                className="form-control"
                name="horario"
                value={alunosDTO.horario}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, horario: e.target.value })
                }
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="AlunoDoenca" className="form-label">
                Doença ou alergia?:
              </label>
              <select
                name="AlunoDoenca"
                className="form-select"
                value={alunosDTO.AlunoDoenca}
                onChange={(e) =>
                  setAlunosDTO({
                    ...alunosDTO,
                    AlunoDoenca: Number(e.target.value),
                  })
                }
              >
                <option selected>ESCOLHA</option>
                <option value="0">NÃO</option>
                <option value="1">SIM</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="telefone" className="form-label">
                Qual?
              </label>
              <input
                type="text"
                className="form-control"
                name="pergunta"
                value={alunosDTO.pergunta}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, pergunta: e.target.value })
                }
              />
            </div>

            <div className="col-md-12">
              <h3 className="titulo-form">Dados do Responsável </h3>
            </div>

            <div className="col-md-4">
              <label htmlFor="responsavel" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                name="responsavel"
                className="form-control"
                value={alunosDTO.responsavel}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, responsavel: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="telefone" className="form-label">
                Doc do Responsavel:
              </label>
              <input
                type="text"
                className="form-control"
                name="cpfResponsavel"
                value={alunosDTO.cpfResponsavel}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, cpfResponsavel: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="telefone" className="form-label">
                Grau Parentesco:
              </label>
              <input
                type="text"
                className="form-control"
                name="grauParentesco"
                value={alunosDTO.grauParentesco}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, grauParentesco: e.target.value })
                }
              />
            </div>

            <div className="col-md-12">
              <h3 className="titulo-form">Endereço</h3>
            </div>

            <div className="col-md-4">
              <label htmlFor="nome" className="form-label">
                Rua
              </label>
              <input
                type="text"
                className="form-control"
                name="rua"
                value={alunosDTO.rua}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, rua: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="sobrenome" className="form-label">
                Numero
              </label>
              <input
                type="text"
                className="form-control"
                name="numero"
                value={alunosDTO.numero}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, numero: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="bairro" className="form-label">
                Bairro
              </label>
              <input
                type="text"
                className="form-control"
                name="bairro"
                value={alunosDTO.bairro}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, bairro: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="nome" className="form-label">
                Cidade
              </label>
              <input
                type="text"
                className="form-control"
                name="cidade"
                value={alunosDTO.cidade}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, cidade: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="sobrenome" className="form-label">
                Complemento
              </label>
              <input
                type="text"
                className="form-control"
                name="complemento"
                value={alunosDTO.complemento}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, complemento: e.target.value })
                }
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="sobrenome" className="form-label">
                cep:
              </label>
              <input
                type="text"
                className="form-control"
                name="cep"
                value={alunosDTO.cep}
                onChange={(e) =>
                  setAlunosDTO({ ...alunosDTO, cep: e.target.value })
                }
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button className="btn btn-primary" type="submit">
                Atualizar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditarAlunos;
