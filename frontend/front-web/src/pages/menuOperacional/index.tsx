import React from "react";
import { GrDocumentPerformance } from "react-icons/gr";

import { Link } from "react-router-dom";
import "./styles.css";
import Header from "../../components/Header";
import { GrDocumentText } from "react-icons/gr";

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

      <div className="row justify-content-center ">
        <div className=" col-9 col-md-12 text-center" >
        <Link to="/numeroculto">
            <button className="btn-operacional"><GrDocumentPerformance />  Frequência
            </button>
          </Link>
          <Link to="/requerimento">
            <button className="btn-operacional"> <GrDocumentText />  Requerimento</button>
          </Link>
        </div>
      </div>
    </div>
  </>
);

export default OperacionalMenu;
