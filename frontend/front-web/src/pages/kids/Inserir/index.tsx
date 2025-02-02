import React, { useState, ChangeEvent, FormEvent } from "react";

import "./styles.css";

import { insertKids } from "../../../service/kidsService";

import { useNavigate } from "react-router-dom";
import Header from "../../../components/Header";
import Sidebar from "../../../components/sidebar";
import { Kids } from "../../../models/kids";

const AddKids: React.FC = () => {
  const [kidsDTO, setKidsDTO] = useState<Kids>({
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

  const navigate = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "dataNascimento") {
      const dataNascimento = value ? new Date(value) : new Date();

      setKidsDTO((prevKidsDTO) => ({
        ...prevKidsDTO,
        [name]: dataNascimento,
      }));
    } else {
      setKidsDTO((prevKidsDTO) => ({
        ...prevKidsDTO,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await insertKids(kidsDTO);

      alert("Visitante adicionado com sucesso!");
      setKidsDTO({
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

      navigate("/kids");
    } catch (error) {
      console.error("Erro ao adicionar criança:", error);
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
                value={kidsDTO.nome}
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
                value={kidsDTO.sobrenome}
                onChange={handleChange}
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
                value={kidsDTO.telefone}
                onChange={handleChange}
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
                value={kidsDTO.dataNascimento.toISOString().split("T")[0]}
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
                value={kidsDTO.rua}
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
                value={kidsDTO.cidade}
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
                value={kidsDTO.bairro}
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
                value={kidsDTO.numero}
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
                value={kidsDTO.complemento}
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
                value={kidsDTO.cep}
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

export default AddKids;
