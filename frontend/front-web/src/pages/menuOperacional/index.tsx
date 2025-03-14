import React from "react";

import { Link } from "react-router-dom";
import "./styles.css";
import Header from "../../components/Header";

const controle = "https://i.postimg.cc/PJQGzWw6/pexels-goumbik-590020.jpg";
const requerimento =
  "https://i.postimg.cc/zDtF3L65/pexels-mikhail-nilov-6963017.jpg";

const OperacionalMenu = () => (
  <>
    <Header />
    <div className="container-fluid mt-5 pt-5" id="conteiner-inicio">
      <div className="row p-2" id="bem-vindo">
        <div className="col-12">
          <h3 className="mt-5 mb-5">Escolha uma seção!</h3>
        </div>
      </div>

      <div className="row justify-content-center mt-7 gap-4" id="row-menu">
        <div className=" col-9 col-md-3" id="col-img">
          <img
            src={controle}
            alt="Calendario"
            className="img-fluid"
            id="img-menu"
          />
          <h3>Frequência</h3>
          <Link to="/numeroculto">
            <button className="btn btn-info">Clique aqui</button>
          </Link>
        </div>
        <div className="col-9 col-md-3" id="col-img">
          <img
            src={requerimento}
            alt="Calendario"
            className="img-fluid"
            id="img-menu"
          />
          <h3>Requerimento</h3>
          <Link to="/requerimentoExibir">
            <button className="btn btn-info">Clique aqui</button>
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default OperacionalMenu;
