import { useEffect, useState } from "react";
import * as kidsService from "../../../service/kidsService";

import { useParams } from "react-router-dom";
import SuccessModal from "../../../components/Modal";
import { useNavigate } from "react-router-dom";
import { Kids } from "../../../models/kids";

const EditarKids = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [KidsDTO, setKidsDTO] = useState<Kids>({
    id: 0,
    nome: "",
    sobrenome: "",
    dataNascimento: new Date(),
    telefone: "",
    rua: "",
    bairro: "",
    cep: "",
    numero: 0,
    cidade: "",
    complemento: "",
    idade: 0,
    url: "",
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const response = await kidsService.findById(Number(id));
          if (response.data) {
            setKidsDTO({
              ...response.data,
              dataNascimento: response.data.dataNascimento
                ? new Date(response.data.dataNascimento).toLocaleDateString(
                    "pt-BR"
                  )
                : "", // Formato DD/MM/AAAA
            });
          }
        }
      } catch (error) {
        console.error("Erro ao carregar detalhes do visitante:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdateClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id && KidsDTO) {
      kidsService
        .updateKids(Number(id), KidsDTO)
        .then((response) => {
          alert("Visitante atualizado com sucesso!");
          setIsModalVisible(true);
        })
        .catch((error) => {
          alert("Erro ao atualizar aluno");
        });
    }
  };
  if (!KidsDTO) {
    return <p>Carregando detalhes do membro...</p>;
  }
  const handleModalClose = () => {
    setIsModalVisible(false);
    setIsRedirecting(true);
  };
  if (isRedirecting) {
    navigate("/kids");
  }
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setKidsDTO((prevKidsDTO) => ({
      ...prevKidsDTO,
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
                value={KidsDTO.nome}
                onChange={(e) =>
                  setKidsDTO({ ...KidsDTO, nome: e.target.value })
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
                value={KidsDTO.sobrenome}
                onChange={(e) =>
                  setKidsDTO({
                    ...KidsDTO,
                    sobrenome: e.target.value,
                  })
                }
              />
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
                value={KidsDTO.telefone}
                onChange={(e) =>
                  setKidsDTO({ ...KidsDTO, telefone: e.target.value })
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
                  KidsDTO.dataNascimento instanceof Date &&
                  !isNaN(KidsDTO.dataNascimento.getTime())
                    ? KidsDTO.dataNascimento.toISOString().split("T")[0]
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
                value={KidsDTO.rua}
                onChange={(e) =>
                  setKidsDTO({ ...KidsDTO, rua: e.target.value })
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
                value={KidsDTO.bairro}
                onChange={(e) =>
                  setKidsDTO({ ...KidsDTO, bairro: e.target.value })
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
                value={KidsDTO.cidade}
                onChange={(e) =>
                  setKidsDTO({ ...KidsDTO, cidade: e.target.value })
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
                value={KidsDTO.numero}
                onChange={(e) =>
                  setKidsDTO({
                    ...KidsDTO,
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
                value={KidsDTO.complemento}
                onChange={(e) =>
                  setKidsDTO({
                    ...KidsDTO,
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
                value={KidsDTO.cep}
                onChange={(e) =>
                  setKidsDTO({ ...KidsDTO, cep: e.target.value })
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

export default EditarKids;
