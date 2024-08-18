import { useEffect, useState } from "react";
import { alunosDTO, alunosPG } from "../../../models/alunos";
import { Link, useParams } from "react-router-dom";
import * as alunosService from '../../../service/alunosService';
import Header from "../../../components/Header";
import { Pagamento } from "../../../models/pagamento";





const AlunoPagamentos = () => {
    const [alunosDTO, setAlunosDTO] = useState<alunosPG | null>(null);
    const { id } = useParams<{ id: string }>() ?? { id: "" };
    const [loading, setLoading] = useState(true);

    const loadAlunosDTO = (id: string) => {
        alunosService.findById(Number(id))
          .then(response => {
            console.log("Detalhes do Aluno:", response.data);
            setAlunosDTO(response.data);
          })
          .catch(error => {
            console.error("Erro ao buscar detalhes do aluno:", error);
          })
          .finally(() => {
            setLoading(false);
          });
    };

    useEffect(() => {
      if (id) {
        loadAlunosDTO(id);
      }
    }, [id]);

    // Se alunosDTO estiver definido, obtenha a lista de pagamentos
    const pagamentos = alunosDTO?.pagamento ?? [];

    return (
        <>
          <Header />
          <div className="container-fluid">
            <div className="row justify-content-center">
              <div className="col-11 col-md-10 mt-5 pt-5 offset-1">
                <div className="row pt-3">
                  <div className="col-12">
                    <table className="table table-striped" id="col-tab-alunos-2">
                      <thead className="thead">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">MesReferencia</th>
                          <th scope="col">Valor</th>
                          <th scope="col">Forma de Pagamento</th>
                        </tr>
                      </thead>
                      <tbody>
                        {loading ? (
                          <tr>
                            <td colSpan={4}>Carregando dados...</td>
                          </tr>
                        ) : pagamentos.length > 0 ? (
                          pagamentos.map((pagamento, index) => (
                            <tr key={pagamento.id}>
                              <td>{index + 1}</td>
                              <td>{pagamento.mesReferencia}</td>
                              <td>{pagamento.valor}</td>
                              <td>{pagamento.formaPagamento}</td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={4}>Nenhum pagamento encontrado.</td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
    );
};


export default AlunoPagamentos;
