import { useEffect, useState } from "react";
import * as visitanteService from "../../../service/visitanteService";

import { useParams } from "react-router-dom";
import SuccessModal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { visitante } from "../../../models/visitante";

const VisitanteEdite = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [VisitanteDTO, setVisitanteDTO] = useState<visitante>({
    id: 0,
    nome: "",
    sobrenome: "",
    email: "",
    dataNascimento: new Date(),
    telefone: "",
    cpf: "",
    estadoCivil: 0,
    rua: "",
    bairro: "",
    cep: "",
    numero: 0,
    cidade: "",
    complemento: "",
    visitanteStatus: "",
    opcaoCurso: "",
    apostila: false,
    idade: 0,
    url: "",
    ebdCursoVisitante: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Carregar os detalhes do membro ao montar o componente
        if (id) {
          const response = await visitanteService.findById(Number(id));
          setVisitanteDTO(response.data || {}); // Inicialize com os dados do ID escolhido
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do visitante:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id && VisitanteDTO) {
      visitanteService
        .updateVisitante(Number(id), VisitanteDTO)
        .then((response) => {
          alert("Visitante atualizado com sucesso!");
          setIsModalVisible(true);
        })
        .catch((error) => {
          alert("Erro ao atualizar aluno");
        });
    }
  };
  if (!VisitanteDTO) {
    return <p>Carregando detalhes do membro...</p>;
  }
  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsRedirecting(true);
  };
  if (isRedirecting) {
    navigate("/membro");
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setVisitanteDTO((prevVisitanteDTO) => ({
      ...prevVisitanteDTO,
      [name]:
        name === "dataNascimento" || name === "desligamento"
          ? value
            ? new Date(value)
            : null // Permite valores nulos para datas
          : name === "estadoCivil" || name === "numero"
          ? Number(value)
          : value,
    }));
  };

  return (
    <>
      <div className="container-fluid  mt-5 pt-5">
        <div className="container col-md-8 pt-5 mb-5 col-11">
          <form
            onSubmit={handleUpdateClick}
            className="row g-4 px-4 pb-4"
            id="add-alunos"
          >
            <div className="col-md-3">
              <label htmlFor="ativo" className="form-label">
                Status:
              </label>
              <select
                className="form-select"
                name="ativo"
                value={VisitanteDTO.visitanteStatus}
                onChange={(e) =>
                  setVisitanteDTO({
                    ...VisitanteDTO,
                    visitanteStatus: e.target.value,
                  })
                }
              >
                <option value="NIVEL_1">Nível 1</option>
                <option value="NIVEL_2">Nível 2</option>
                <option value="NIVEL_3">Nível 3</option>
              </select>
            </div>

            <div className="col-md-12">
              <h3>Dados pessoais </h3>
            </div>
            <div className="col-md-6">
              <label htmlFor="nome" className="form-label">
                Nome:
              </label>
              <input
                type="text"
                className="form-control"
                name="nome"
                value={VisitanteDTO.nome}
                onChange={(e) =>
                  setVisitanteDTO({ ...VisitanteDTO, nome: e.target.value })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="sobrenome" className="form-label">
                Sobrenome:
              </label>
              <input
                type="text"
                className="form-control"
                name="sobrenome"
                value={VisitanteDTO.sobrenome}
                onChange={(e) =>
                  setVisitanteDTO({
                    ...VisitanteDTO,
                    sobrenome: e.target.value,
                  })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="telefone" className="form-label">
                CPF:
              </label>
              <input
                type="text"
                name="cpf"
                className="form-control"
                value={VisitanteDTO.cpf}
                onChange={(e) =>
                  setVisitanteDTO({ ...VisitanteDTO, cpf: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={VisitanteDTO.email}
                onChange={(e) =>
                  setVisitanteDTO({ ...VisitanteDTO, email: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="estado Civil" className="form-label">
                Estado Civil:
              </label>
              <select
                name="estadoCivil"
                className="form-select"
                value={VisitanteDTO.estadoCivil}
                onChange={(e) =>
                  setVisitanteDTO({
                    ...VisitanteDTO,
                    estadoCivil: Number(e.target.value),
                  })
                }
              >
                <option>ESCOLHA</option>
                <option value="0">Solteiro</option>
                <option value="1">Casado</option>
                <option value="2">Divorciado</option>
                <option value="3">Viuvo(a)</option>
              </select>
            </div>
            <div className="col-md-4">
              <label htmlFor="telefone" className="form-label">
                Telefone:
              </label>
              <input
                placeholder="(21) 9 9999-9999"
                type="tel"
                className="form-control"
                name="telefone"
                value={VisitanteDTO.telefone}
                onChange={(e) =>
                  setVisitanteDTO({ ...VisitanteDTO, telefone: e.target.value })
                }
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="data" className="form-label">
                Nascimento
              </label>
              <input
                type="date"
                className="form-control"
                name="dataNascimento"
                value={
                  VisitanteDTO.dataNascimento instanceof Date &&
                  !isNaN(VisitanteDTO.dataNascimento.getTime())
                    ? VisitanteDTO.dataNascimento.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <h3>Endereço</h3>
            </div>

            <div className="col-md-4">
              <label htmlFor="nome" className="form-label">
                Rua
              </label>
              <input
                type="text"
                className="form-control"
                name="rua"
                value={VisitanteDTO.rua}
                onChange={(e) =>
                  setVisitanteDTO({ ...VisitanteDTO, rua: e.target.value })
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
                value={VisitanteDTO.bairro}
                onChange={(e) =>
                  setVisitanteDTO({ ...VisitanteDTO, bairro: e.target.value })
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
                value={VisitanteDTO.cidade}
                onChange={(e) =>
                  setVisitanteDTO({ ...VisitanteDTO, cidade: e.target.value })
                }
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="sobrenome" className="form-label">
                Numero
              </label>
              <input
                type="text"
                className="form-control"
                name="numero"
                value={VisitanteDTO.numero}
                onChange={(e) =>
                  setVisitanteDTO({
                    ...VisitanteDTO,
                    numero: Number(e.target.value),
                  })
                }
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="sobrenome" className="form-label">
                Complemento
              </label>
              <input
                type="text"
                className="form-control"
                name="complemento"
                value={VisitanteDTO.complemento}
                onChange={(e) =>
                  setVisitanteDTO({
                    ...VisitanteDTO,
                    complemento: e.target.value,
                  })
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
                value={VisitanteDTO.cep}
                onChange={(e) =>
                  setVisitanteDTO({ ...VisitanteDTO, cep: e.target.value })
                }
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button className="btn btn-primary" type="submit">
                Atualizar
              </button>
            </div>
          </form>

          {isModalVisible && (
            <SuccessModal
              onClose={handleModalClose}
              onRedirect={() => setIsRedirecting(true)} // Ajuste conforme necessário
              operation="atualizar"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default VisitanteEdite;
