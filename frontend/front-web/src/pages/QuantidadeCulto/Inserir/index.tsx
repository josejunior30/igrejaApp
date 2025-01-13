import React, { useState } from "react";
import { QuantidadePorCulto } from "../../../models/quantidade";
import Header from "../../../components/Header";
import "./styles.css";
import { insertQuantidade } from "../../../service/quantidadePorCultoService";
import { TiArrowBack } from "react-icons/ti";
import { Link } from "react-router-dom";

const InsertQuantidade: React.FC = () => {
  const [quantidadePorCulto, setQuantidadePorCulto] =
    useState<QuantidadePorCulto>({
      id: 0,
      visitante: 0,
      data: new Date(),
      membro: 0,
      total: 0,
      tipoCulto: 0,
      resumo: "",
    });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let newValue: any = value;
    if (name === "TipoCulto") {
      newValue = Number(value);
    } else if (["visitante", "membro"].includes(name)) {
      newValue = Number(value);
    }

    setQuantidadePorCulto((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting form with values:", quantidadePorCulto);
    alert("Adicionado com sucesso!");
    try {
      await insertQuantidade(quantidadePorCulto);
      setQuantidadePorCulto({
        id: 0,
        visitante: 0,
        data: new Date(),
        membro: 0,
        total: 0,
        tipoCulto: 0,
        resumo: "",
      });
    } catch (error) {
      console.error("Erro ao adicionar valores:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="voltar-projetos-menu">
          <Link to="/numeroculto">
            <TiArrowBack /> Voltar
          </Link>
        </div>
        <div className="container col-md-6 col-12 justify-content-center">
          <form
            onSubmit={handleSubmit}
            className="row justify-content-center g-4 px-4 pb-4"
          >
            <div className="col-md-11 text-center">
              <h3 className="text-center pt-4" id="QuantidadeTitulo">
                Quantidade por cultos
              </h3>
            </div>
            <div
              className="col-md-4 col-6 text-center offset-1"
              id="quantidade"
            >
              <label htmlFor="data">Data:</label>
              <input
                type="date"
                name="data"
                className="form-control"
                value={quantidadePorCulto.data.toISOString().split("T")[0]}
                onChange={handleChange}
                required
              />
            </div>
            <div
              className="col-md-4 col-9 text-center offset-1"
              id="quantidade"
            >
              <label htmlFor="TipoCulto">Tipo de Culto:</label>
              <select
                name="tipoCulto"
                className="form-select"
                value={quantidadePorCulto.tipoCulto}
                onChange={handleChange}
              >
                <option value="">Selecione</option>
                <option value="0">Culto de Manhã</option>
                <option value="1">Culto de Noite</option>
                <option value="2">Batismo</option>
                <option value="3">Aniversário</option>
                <option value="4">Ordenação</option>
              </select>
            </div>
            <div
              className="col-md-2 col-4 text-center offset-1 mt-5"
              id="quantidade"
            >
              <label>Visitantes</label>
              <input
                type="number"
                name="visitante"
                className="form-control"
                value={
                  quantidadePorCulto.visitante !== null &&
                  quantidadePorCulto.visitante !== undefined
                    ? quantidadePorCulto.visitante
                    : ""
                }
                onChange={handleChange}
                required
              />
            </div>
            <div className="col-md-2 col-4 text-center mt-5" id="quantidade">
              <label htmlFor="membro">Membros:</label>
              <input
                type="number"
                name="membro"
                className="form-control"
                value={
                  quantidadePorCulto.membro !== null &&
                  quantidadePorCulto.membro !== undefined
                    ? quantidadePorCulto.membro
                    : ""
                }
                onChange={handleChange}
                required
              />
            </div>
            <div className="row justify-content-center">
              <div
                className="col-md-9 col-11  text-center mt-5"
                id="quantidade"
              >
                <label htmlFor="numeroHomem">Observação:</label>
                <input
                  type="text"
                  name="resumo"
                  className="form-control"
                  value={quantidadePorCulto.resumo || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="col-md-12 col-9 text-center mt-4 mb-4">
              <button type="submit" className="btn-EnviarQuantiade mt-4">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default InsertQuantidade;
