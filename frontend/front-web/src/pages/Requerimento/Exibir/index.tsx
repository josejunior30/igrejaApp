import { useEffect, useState } from "react";
import { deleteRequerimento, findAll } from "../../../service/requerimentoService";
import './styles.css';
import Header from "../../../components/Header";
import { requerimentoOrçamento } from '../../../models/requerimentoOrçamento';
import { IoMdArchive } from "react-icons/io";
import { Link } from "react-router-dom";
import { TiArrowBack } from "react-icons/ti";
import { PiTrashFill } from "react-icons/pi";
import { format } from 'date-fns';

const RequerimentoExibir = () => {
  const [requerimento, setRequerimento] = useState<requerimentoOrçamento[]>([]);

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

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir este requerimento?");
    if (confirmed) {
      deleteRequerimento(id)
        .then(() => {
          setRequerimento((prevState) => prevState.filter(req => req.id !== id));
          alert("Requerimento excluído com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao excluir requerimento:", error);
        });
    }
  };

  const handleArchive = (id: number) => {
    // Implementar a lógica para arquivar o requerimento (temporário)
    alert(`Requerimento com ID ${id} arquivado temporariamente!`);
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
            <Link to="inserir">
              <button className="btn btn-primary">
                Criar Requerimento
              </button>
            </Link>
            <Link to="/enviart">
              <button className="btn btn-primary">
                Pesquisar
              </button>
            </Link>
          </div>
        </div>

        <div className="container col-11 col-md-9">
          <div className="row justify-content-center mt-4 text-center">
            <div className="col-md-11 col-11 mb-5">
              <table className="table table-striped mb-5">
                <thead className="thead">
                  <tr>
                    <th scope="col">Data do pedido</th>
                    <th scope="col">Responsavel</th>
                    <th scope="col">Status</th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col">Excluir/Arquivar</th>
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
                        <td><Link to={`${requerimento.id}`}>  {format(new Date(requerimento.dataRequerimento), 'dd/MM/yyyy')}</Link></td>
                        <td><Link to= {`/requerimento-detalhe/${requerimento.id}`}>{requerimento.responsavel}</Link></td>
                        <td><Link to="#">{requerimento.statusRequerimento}</Link></td>
                        <td>
                          {requerimento.statusRequerimento !== "APROVADO" ? (
                            <Link to={`/requerimentoEditar/${requerimento.id}`}>
                              <span className="editar-req">EDITAR</span>
                            </Link>
                          ) : (
                            <span>&nbsp;</span>
                          )}
                        </td>
                        <td>
                          {requerimento.statusRequerimento !== "APROVADO" ? (
                       
                            <Link to={`/requerimentoAprovar/${requerimento.id}`}>
                              <span className="aprovar-req">APROVAR</span>
                            </Link>
                           ) : (
                            <span>&nbsp;</span>
                          )}
                        </td>
                        <td>
                          {requerimento.statusRequerimento === "APROVADO" ? (
                             <button className="btn btn-primary" onClick={() => handleArchive(requerimento.id)}>
                             <IoMdArchive />
                           </button>
                          ) : (
                            <button className="btn btn-danger" onClick={() => handleDelete(requerimento.id)}>
                            <PiTrashFill />
                          </button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6}>Nenhuma presença encontrada</td>
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
