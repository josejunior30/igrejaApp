import { useEffect, useState } from "react";
import { findByMesAno, deleteRequerimento } from "../../../service/requerimentoService";
import './styles.css';
import Header from "../../../components/Header";
import { requerimentoOrçamento } from '../../../models/requerimentoOrçamento';
import { Link, useNavigate } from "react-router-dom";
import { PiTrashFill } from "react-icons/pi";
import { format } from 'date-fns';
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Botoes from "../../../components/botoes";

const RequerimentoExibir = () => {
  const [requerimento, setRequerimento] = useState<requerimentoOrçamento[]>([]);
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const [filtro, setFiltro] = useState({
    descricao: "",
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear(),
  });
  const navigate = useNavigate();
   useEffect(() => {
    fetchRequerimento(filtro.mes, filtro.ano);
  }, [filtro]);

  const fetchRequerimento = (month: number, year: number) => {
    findByMesAno(month, year)
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



  const filteredRequerimentos = showPendingOnly
    ? requerimento.filter(req => req.statusRequerimento === "PENDENTE")
    : requerimento;
    const handleMesAnterior = () => {
      setFiltro((prev) => {
        const novoMes = prev.mes === 1 ? 12 : prev.mes - 1;
        const novoAno = prev.mes === 1 ? prev.ano - 1 : prev.ano;
        return { ...prev, mes: novoMes, ano: novoAno };
      });
    };
  
    const handleMesProximo = () => {
      setFiltro((prev) => {
        const novoMes = prev.mes === 12 ? 1 : prev.mes + 1;
        const novoAno = prev.mes === 12 ? prev.ano + 1 : prev.ano;
        return { ...prev, mes: novoMes, ano: novoAno };
      });
    };
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-3">
        <div className="row justify-content-center">
          <Botoes/>
     
        </div>
        <div className="row justify-content-center ">
          <div className="col-11 col-md-5 text-center" id="barra-requerimento">
            <Link to="inserir">
              <button className="btn btn-primary">Criar Requerimento</button>
            </Link>
            <Link to="/enviart">
              <button className="btn btn-primary">Pesquisar</button>
            </Link>
          </div>
        </div>
            <span className="mes-contaPagar">
                  <button className="btn-left-conta" onClick={handleMesAnterior}>
                    <FaAngleLeft />
                  </button>
                  {filtro.mes} / {filtro.ano}
                  <button className="btn-right-conta" onClick={handleMesProximo}>
                    <FaAngleRight />
                  </button>
                </span>

        <div className="container col-11 col-md-9">
          <div className="row justify-content-center mt-4 text-center">
            <div className="col-md-11 col-11 mb-5">

              <div className="col-md-5 mb-3">
                <input 
                  type="checkbox" 
                  className="form-check-input" 
                  id="pendingOnly" 
                  checked={showPendingOnly} 
                  onChange={() => setShowPendingOnly(!showPendingOnly)}
                />
                <label className="form-check-label pendente-requerimento" htmlFor="pendingOnly">
                  Mostrar apenas pendentes
                </label>
              </div>
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
                  {filteredRequerimentos.length > 0 ? (
                    filteredRequerimentos.map((requerimento: any) => (
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
                        <td><Link to={`${requerimento.id}`}>{format(new Date(requerimento.dataRequerimento), 'dd/MM/yyyy')}</Link></td>
                        <td><Link to={`/requerimento-detalhe/${requerimento.id}`}>{requerimento.responsavel}</Link></td>
                        <td><Link to="#">{requerimento.statusRequerimento}</Link></td>
                        <td>
                          {requerimento.statusRequerimento !== "APROVADO" && (
                            <Link to={`/requerimentoEditar/${requerimento.id}`}>
                              <span className="editar-req">EDITAR</span>
                            </Link>
                          )}
                        </td>
                        <td>
                          {requerimento.statusRequerimento !== "APROVADO" && (
                            <Link to={`/requerimentoAprovar/${requerimento.id}`}>
                              <span className="aprovar-req">APROVAR</span>
                            </Link>
                          )}
                        </td>
                        <td>
                            <button className="btn btn-danger" onClick={() => handleDelete(requerimento.id)}>
                              <PiTrashFill />
                            </button>
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