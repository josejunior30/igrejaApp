import { useEffect, useState } from "react";
import * as membroService from "../../../service/membroService";
import { MembroDTO } from "../../../models/membro";
import { useParams } from "react-router-dom";
import SuccessModal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";

const FormularioUpdate = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [MembroDTO, setMembroDTO] = useState<MembroDTO>({
    id: 0,
    nome: "",
    sobrenome: "",
    email: "",
    idade: 0,
    dataNascimento: new Date(),
    telefone: "",
    curso: {
      id: 0,
      nome: "",
      visitante: [],
      membro: [],
      EBDCurso: [],
    },

    membroStatus: "",
    ano: 0,
    desligamento: new Date(),
    membroTipo: "",
    cpf: "",
    estadoCivil: 0,
    rua: "",
    bairro: "",
    cep: "",
    numero: 0,
    url: "",
    cidade: "",
    apostila: false,
    opcaoCurso: "",
    complemento: "",
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
        console.error("Erro ao carregar detalhes do membro:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id && MembroDTO) {
      membroService
        .updateMembro(Number(id), MembroDTO)
        .then((response) => {
          alert("Membro atualizado com sucesso!");
          setIsModalVisible(true);
        })
        .catch((error) => {
          alert("Erro ao atualizar aluno");
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
    navigate("/membro");
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setMembroDTO((prevMembroDTO) => ({
      ...prevMembroDTO,
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
            <div className="col-md-12">
              <h3>Registro </h3>
            </div>
            <div className="col-md-3">
              <label htmlFor="ativo" className="form-label">
                Status:
              </label>
              <select
                className="form-select"
                name="ativo"
                value={MembroDTO.membroStatus}
                onChange={(e) =>
                  setMembroDTO({
                    ...MembroDTO,
                    membroStatus: e.target.value,
                  })
                }
              >
                <option value="ATIVO">Ativo</option>
                <option value="AFASTADO">Afastada</option>
                <option value="DESLIGADO">Desligado</option>
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="data" className="form-label">
                Data de Desligamento
              </label>
              <input
                type="date"
                className="form-control"
                name="desligamento"
                value={
                  MembroDTO.desligamento instanceof Date &&
                  !isNaN(MembroDTO.desligamento.getTime())
                    ? MembroDTO.desligamento.toISOString().split("T")[0]
                    : ""
                }
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="membroTipo" className="form-label">
                Afiliação
              </label>
              <select
                className="form-select"
                name="membroTipo"
                value={MembroDTO.membroTipo}
                onChange={(e) =>
                  setMembroDTO({
                    ...MembroDTO,
                    membroTipo: e.target.value,
                  })
                }
              >
                <option value="BATISMO">Batismo</option>
                <option value="TRANSFERENCIA">Transferência</option>
                <option value="ACLAMACAO">Aclamação</option>
              </select>
            </div>
            <div className="col-md-2">
              <label htmlFor="sobrenome" className="form-label">
                Ano de Afiliação
              </label>
              <input
                type="text"
                className="form-control"
                name="ano"
                value={MembroDTO.ano}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, ano: Number(e.target.value) })
                }
              />
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
                value={MembroDTO.nome}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, nome: e.target.value })
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
                value={MembroDTO.sobrenome}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, sobrenome: e.target.value })
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
                value={MembroDTO.cpf}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, cpf: e.target.value })
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
                value={MembroDTO.email}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, email: e.target.value })
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
                value={MembroDTO.estadoCivil}
                onChange={(e) =>
                  setMembroDTO({
                    ...MembroDTO,
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
                value={MembroDTO.telefone}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, telefone: e.target.value })
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
                  MembroDTO.dataNascimento instanceof Date &&
                  !isNaN(MembroDTO.dataNascimento.getTime())
                    ? MembroDTO.dataNascimento.toISOString().split("T")[0]
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
                value={MembroDTO.rua}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, rua: e.target.value })
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
                value={MembroDTO.bairro}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, bairro: e.target.value })
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
                value={MembroDTO.cidade}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, cidade: e.target.value })
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
                value={MembroDTO.numero}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, numero: Number(e.target.value) })
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
                value={MembroDTO.complemento}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, complemento: e.target.value })
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
                value={MembroDTO.cep}
                onChange={(e) =>
                  setMembroDTO({ ...MembroDTO, cep: e.target.value })
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

export default FormularioUpdate;
