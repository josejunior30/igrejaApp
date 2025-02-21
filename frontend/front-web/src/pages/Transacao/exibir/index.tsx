import { useEffect, useState } from "react";
import { Transacao } from "../../../models/transacao";
import * as TransacaoService from "../../../service/TransacaoService";
import Header from "../../../components/Header";

const TransacaoExibir = () => {
  const [transacao, setTransacao] = useState<Transacao[]>([]);

  useEffect(() => {
    TransacaoService.findAll()
      .then((response) => {
        setTransacao(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  return (
    <>
      <Header />

      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-11 mt-5 pt-5 offset-1">
            <table className="table table-striped text-center">
              <thead className="thead ">
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Descriçao</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Receita</th>
                  <th scope="col">Tipo de Despesa</th>
                </tr>
              </thead>
              <tbody>
                <td></td>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransacaoExibir;
