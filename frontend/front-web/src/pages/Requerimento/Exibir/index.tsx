import { useEffect, useState } from "react";
import { findAll } from "../../../service/requerimentoService";
import './styles.css';
import Header from "../../../components/Header";
import {requerimentoOrçamento}  from '../../../models/requerimentoOrçamento';

import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";


const RequerimentoExibir = () => {
const [requerimento, setRequerimento] = useState<requerimentoOrçamento[]>([])

  useEffect(() => {
    fetchRequerimento();
  }, []);

  const fetchRequerimento = () => {
    findAll()
      .then((response) => {
        setRequerimento(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar requerimentos:", error);
      });
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row" id="voltar">
          <div className="col">
            <Link to="/membro">
              <TiArrowBack /> Voltar
            </Link>
          </div>
        </div>
        <div className="row justify-content-center ">
      <div className="col-11 col-md-5 text-center" id="barra-requerimento">
            <Link to= "inserir">
            <button className="btn btn-primary  ">
              Criar Requerimento
            </button>
            </Link>
            
           
            <Link to= "/enviart">
            <button className="btn btn-primary">
           Pesquisar
            </button>
            </Link>
          
      </div>

    </div>

        <div className="container col-11 col-md-7">

          <div className="row justify-content-center mt-4 text-center">
            <div className="col-md-11 col-11 mb-5">
             
              <table className="table table-striped mb-5">
                <thead className="thead">
                  <tr>
                    <th scope="col">Data do pedido</th>
                    <th scope="col">Responsavel</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {requerimento.length > 0 ? (
                   requerimento.map((requerimento: any) => (
                    <tr
                        key={requerimento.id}
                        className={
                          requerimento.statusRequerimento === "APROVADO"
                            ? "aprovado"
                            : requerimento.statusRequerimento === "RECUSADO"
                            ? "recusado"
                            : ""
                        }
                      >
                      <td><Link to={`${requerimento.id}`}>{requerimento.dataRequerimento}</Link></td>
                      <td><Link to={`${requerimento.id}`}> {requerimento.responsavel}</Link></td>
                      <td><Link to={`${requerimento.id}`}>{requerimento.statusRequerimento}</Link></td>
                    </tr>

                    ))
                  ) : (
                    <tr>
                      <td colSpan={4}>Nenhuma presença encontrada</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequerimentoExibir;