import React, { useState, ChangeEvent, FormEvent } from "react";

import "./styles.css";

import { insertMembro } from "../../../service/membroService";
import { MembrosDTO } from "../../../models/membro";
import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/sidebar";

const Formulario: React.FC = () => {
  const [membroDTO, setMembroDTO] = useState<MembrosDTO>({
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
    ano: 0,
    membroTipo: "",
    cidade: "",
    complemento: "",
    membroStatus: "ATIVO",
  });
  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "dataNascimento") {
      const dataNascimento = value ? new Date(value) : new Date();

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
      await insertMembro(membroDTO);

      alert("Membro adicionado com sucesso!");
      setMembroDTO({
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
        ano: 0,
        membroTipo: "",
        membroStatus: "",
      });

      navigate("/membro");
    } catch (error) {
      console.error("Erro ao adicionar membro:", error);
    }
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="container-fluid mt-5 pt-5">
        <div className="container col-md-8 pt-5 mb-5 col-11">
          <form
            onSubmit={handleSubmit}
            className="row g-4 px-4 pb-4"
            id="add-alunos"
          >
            <div className="col-md-12">
              <h3>Afiliação </h3>
            </div>
            <div className="col-md-4 ">
              <label htmlFor="membrotipo" className="form-label">
                Tipo de Afilição
              </label>
              <select
                name="membroTipo"
                className="form-select"
                value={membroDTO.membroTipo}
                onChange={handleChange}
              >
                <option>Escolha</option>
                <option value="BATISMO">Batismo</option>
                <option value="TRANSFERENCIA">Transferência</option>
                <option value="ACLAMACAO">Aclamação</option>
              </select>
            </div>
            <div className="col-md-2 offset-1 ">
              <label htmlFor="ano" className="form-label">
                Ano de Afiliação:
              </label>
              <input
                type="text"
                className="form-control"
                name="ano"
                value={membroDTO.ano}
                onChange={handleChange}
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
                value={membroDTO.nome}
                onChange={handleChange}
                required
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
                value={membroDTO.sobrenome}
                onChange={handleChange}
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
                value={membroDTO.cpf}
                onChange={handleChange}
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
                value={membroDTO.email}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="estado Civil" className="form-label">
                Estado Civil:
              </label>
              <select
                name="estadoCivil"
                className="form-select"
                value={membroDTO.estadoCivil}
                onChange={handleChange}
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
                value={membroDTO.telefone}
                onChange={handleChange}
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
                value={membroDTO.dataNascimento.toISOString().split("T")[0]}
                onChange={handleChange}
              />
            </div>

            <div className="col-12">
              <h3>Endereço </h3>
            </div>
            <div className="col-md-4">
              <label htmlFor="nome" className="form-label">
                Rua:
              </label>
              <input
                type="text"
                className="form-control"
                name="rua"
                value={membroDTO.rua}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="nome" className="form-label">
                Cidade:
              </label>
              <input
                type="text"
                className="form-control"
                name="cidade"
                value={membroDTO.cidade}
                onChange={handleChange}
              />
            </div>

            <div className="col-md-4">
              <label htmlFor="bairro" className="form-label">
                Bairro:
              </label>
              <input
                type="text"
                className="form-control"
                name="bairro"
                value={membroDTO.bairro}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <label htmlFor="sobrenome" className="form-label">
                Numero:
              </label>
              <input
                type="text"
                className="form-control"
                name="numero"
                value={membroDTO.numero}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="sobrenome" className="form-label">
                Complemento:
              </label>
              <input
                type="text"
                className="form-control"
                name="complemento"
                value={membroDTO.complemento}
                onChange={handleChange}
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
                value={membroDTO.cep}
                onChange={handleChange}
              />
            </div>

            <div className="d-grid gap-2 col-6 mx-auto mt-5">
              <button className="btn btn-primary" type="submit">
                Adicionar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formulario;
