import { useState, useEffect } from "react";
import {
  deleteContaPagar,
  findAllDescricao,
  findByDescricaoAno,
  findByDescricaoMesAndAno,
  findByMesAno,
  insertContaPagar,
  updateStatus,
} from "../../../service/ContaPagarService";
import {
  contaPagar,
  DescricaoConta,
  StatusPagamento,
  TipoDespesa,
} from "../../../models/contaPagar";
import Header from "../../../components/Header";
import "./styles.css";
import { FaSearch } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";
import { hasAnyRoles } from "../../../service/AuthService";
import Botoes from "../../../components/botoes";
import { PiTrashFill } from "react-icons/pi";
import { Button, Modal } from "react-bootstrap";

const ContaPagar = () => {
  const [contas, setContas] = useState<contaPagar[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [descricaoContas, setDescricaoContas] = useState<DescricaoConta[]>([]);
  const handleShowSearch = () => setShowSearchModal(true);
  const handleCloseSearch = () => setShowSearchModal(false);
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const [totalPesquisa, setTotalPesquisa] = useState(0);
  const [filtro, setFiltro] = useState({
    descricao: "",
    mes: new Date().getMonth() + 1,
    ano: new Date().getFullYear(),
  });

  const [novaConta, setNovaConta] = useState<Partial<contaPagar>>({
    descricao: "",
    descricaoConta: undefined,
    dataVencimento: new Date(),
    valor: 0,
    tipoDespesa: TipoDespesa.VARIAVEL,
  });
  const isAdmin = hasAnyRoles(["ROLE_ADMIN"]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await findByMesAno(filtro.ano, filtro.mes);
        setContas(response.data);
      } catch (error) {
        console.error("Erro ao buscar contas:", error);
      }
    }
    fetchData();
  }, [filtro.mes, filtro.ano]);
  useEffect(() => {
    async function fetchDescricaoContas() {
      try {
        const response = await findAllDescricao(); 
        setDescricaoContas(response.data);
      } catch (error) {
        console.error("Erro ao buscar descrições de contas:", error);
      }
    }
    fetchDescricaoContas();
  }, []);

  // Atualizar estado da nova conta dinamicamente
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;

    if (name === "descricaoConta") {
      const descricaoObj = descricaoContas.find(
        (desc) => desc.descricao === value
      );
      setNovaConta((prev) => ({ ...prev, descricaoConta: descricaoObj })); // Sem null, apenas undefined ou objeto válido
    } else {
      setNovaConta((prev) => ({
        ...prev,
        [name]: name === "dataVencimento" ? new Date(value) : value,
      }));
    }
  };
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
  const formatDateForInput = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await insertContaPagar(novaConta);

      if (response && response.data) {
        alert("Conta cadastrada com sucesso!");
        setContas((prev) => [...prev, response.data]);
        setNovaConta({ descricao: "", dataVencimento: new Date(), valor: 0 });
      } else {
        console.error("Resposta inválida", response);
        alert("Erro ao cadastrar conta!");
      }
    } catch (error) {
      console.error("Erro ao cadastrar conta:", error);
      alert("Erro ao cadastrar conta!");
    }
  };
  const handlePagar = async (id: number, status: StatusPagamento) => {
    const confirmacao = window.confirm("Tem certeza que deseja pagar?");
    if (!confirmacao) return;

    try {
      await updateStatus(id, status);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status!");
    }
  };

  const handleFiltroChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFiltro((prev) => ({
      ...prev,
      [name]: name === "mes" || name === "ano" ? parseInt(value, 10) : value,
    }));
  };
  const handlePesquisar = async () => {
    if (!filtro.descricao.trim()) {
      alert("Por favor, digite uma descrição para a busca.");
      return;
    }

    try {
      let response;
      const mesValido =
        Number.isInteger(filtro.mes) && filtro.mes > 0 ? filtro.mes : null;

      if (!mesValido) {
        response = await findByDescricaoAno(filtro.ano, filtro.descricao);
      } else {
        response = await findByDescricaoMesAndAno(
          mesValido,
          filtro.ano,
          filtro.descricao
        );
      }

      setContas(response.data);

      // 🔹 Calcula o total da pesquisa
      const total = response.data.reduce(
        (acc: number, conta: contaPagar) => acc + conta.valor,
        0
      );
      setTotalPesquisa(total);
    } catch (error) {
      console.error("Erro ao buscar contas:", error);
      alert("Erro ao buscar contas!");
    }
  };

  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir ?");
    if (confirmed) {
      deleteContaPagar(id)
        .then(() => {
          setContas((prevState) => prevState.filter((req) => req.id !== id));
          alert(" excluído com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao excluir :", error);
        });
    }
  };
  const handleTogglePagamento = async (id: number, status: StatusPagamento) => {
    const confirmacao = window.confirm(
      status === StatusPagamento.PAGO
        ? "Tem certeza que deseja cancelar o pagamento?"
        : "Tem certeza que deseja pagar?"
    );
    if (!confirmacao) return;
  
    try {
      let novoStatus: StatusPagamento;
  
      if (status === StatusPagamento.PAGO) {
        novoStatus = StatusPagamento.PENDENTE;
      } else {
        novoStatus = StatusPagamento.PAGO; // Agora cobre PENDENTE e ATRASADO
      }
  
      await updateStatus(id, novoStatus);
      window.location.reload();
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Erro ao atualizar status!");
    }
  };
  
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-3">
        <div className="row justify-content-center">
          <Botoes />
          <div className="col-12 d-flex">
            <span className="mes-contaPagar-Pagar">
              <button
                className="btn-left-conta-Pagar"
                onClick={handleMesAnterior}
              >
                <FaAngleLeft />
              </button>
              {new Date(filtro.ano, filtro.mes - 1).toLocaleString("pt-BR", {
                month: "long",
              })}{" "}
              / {filtro.ano}
              <button
                className="btn-right-conta-Pagar"
                onClick={handleMesProximo}
              >
                <FaAngleRight />
              </button>
            </span>
          </div>
          <Modal show={showModal} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title>Cadastro de Conta a Pagar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <select
                    className="form-control"
                    name="descricaoConta"
                    value={novaConta.descricaoConta?.descricao || ""}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Selecione...
                    </option>
                    {descricaoContas.map((desc) => (
                      <option key={desc.descricao} value={desc.descricao}>
                        {desc.descricao}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Vencimento</label>
                  <input
                    type="date"
                    className="form-control"
                    name="dataVencimento"
                    value={formatDateForInput(novaConta.dataVencimento!)}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Valor</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="R$ 0,00"
                    name="valor"
                    value={(novaConta.valor ?? 0).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Tipo</label>
                  <select
                    className="form-control"
                    name="tipoDespesa"
                    value={novaConta.tipoDespesa ?? ""}
                    onChange={(event) =>
                      setNovaConta((prev) => ({
                        ...prev,
                        tipoDespesa: event.target.value as TipoDespesa,
                      }))
                    }
                    required
                  >
                    <option value="" disabled>
                      Selecione...
                    </option>
                    {Object.values(TipoDespesa).map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {tipo}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="text-end">
                  <Button variant="secondary" onClick={handleClose}>
                    Fechar
                  </Button>
                  <Button type="submit" variant="primary" className="ms-2">
                    Inserir
                  </Button>
                </div>
              </form>
            </Modal.Body>
          </Modal>

          <div className="col-12 justify-content-center text-center mt-3 d-flex">
            <h4 className="titulo-conta">Cadastro de Conta a Pagar</h4>
            <button className="btn-adicionar-conta" onClick={handleShow}>
              + Adicionar
            </button>
            <button className="btn-pesquisa-pagar" onClick={handleShowSearch}>
              <FaSearch /> Pesquisar
            </button>
          </div>

          <Modal show={showSearchModal} onHide={handleCloseSearch} centered>
            <Modal.Header closeButton>
              <Modal.Title>Pesquisa de Contas</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              
              <div className="mb-3">
                <label className="form-label">Mês</label>
                <select
                  className="form-control"
                  name="mes"
                  value={filtro.mes}
                  onChange={handleFiltroChange}
                >
                  <option value="0">Anual</option>
                  {[...Array(12)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {new Date(0, i).toLocaleString("pt-BR", {
                        month: "long",
                      })}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Ano</label>
                <select
                  className="form-control"
                  name="ano"
                  value={filtro.ano}
                  onChange={handleFiltroChange}
                >
                  {[2024, 2025, 2026].map((ano) => (
                    <option key={ano} value={ano}>
                      {ano}
                    </option>
                  ))}
                </select>
              </div>
              <div className="text-end">
                <Button variant="secondary" onClick={handleCloseSearch}>
                  Fechar
                </Button>
                <Button
                  variant="primary"
                  className="ms-2"
                  onClick={() => {
                    handlePesquisar();
                    handleCloseSearch();
                  }}
                >
                  Pesquisar
                </Button>
              </div>
            </Modal.Body>
          </Modal>

          <div className="row justify-content-center mt-4">
            <div className="col-md-9 text-right">
              <h3 className="total-pesquisa">
                Total da Pesquisa:{" "}
                <span className="valor-total">
                  {totalPesquisa.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </h3>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-md-12">
              <table className="table table-striped mt-4 conta-pagar-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Lancamento</th>
                    <th>Descrição</th>
                    <th>Valor</th>
                    <th>Status</th>
                    <th></th>
                    <th>Vencimento</th>
                    <th className="text-center">Pagamento</th>
                    <th>Usuário</th>
                    {isAdmin && <th>Criado por</th>} <th>Excluir</th>
                  </tr>
                </thead>
                <tbody>
                  {contas.length > 0 ? (
                    contas.map((conta, index) => (
                      <tr key={conta.id}>
                        <td>{index + 1}</td>
                        <td>
                          {new Date(conta.dataCriacao).toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>
                        <td>{conta.descricaoConta.descricao}</td>
                        <td>
                          R${" "}
                          {conta.valor.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </td>
                        <td
                          style={{
                            color:
                              conta.status === StatusPagamento.ATRASADO
                                ? "#ff3e3e"
                                : "bolder",
                            fontWeight: "bold",
                          }}
                        >
                          {conta.status}
                        </td>
                        <td className="text-center">
                          <button
                            onClick={() =>
                              handleTogglePagamento(conta.id, conta.status)
                            }
                            className={`btn ${
                              conta.status === StatusPagamento.PAGO
                                ? "btn-warning"
                                : "btn-success"
                            } btn-pagar`}
                          >
                            {conta.status === StatusPagamento.PAGO
                              ? "Cancelar "
                              : "Pagar"}
                          </button>
                        </td>
                        <td>
                          {new Date(conta.dataVencimento).toLocaleDateString(
                            "pt-BR"
                          )}
                        </td>
                        <td className="text-center">
                          {conta.dataPagamento
                            ? new Date(conta.dataPagamento).toLocaleDateString(
                                "pt-BR"
                              )
                            : "-"}
                        </td>
                        <td>{conta.createdBy}</td>
                        {isAdmin && <td>{conta.createdByConta}</td>}
                        <td>
                          <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(conta.id)}
                          >
                            <PiTrashFill />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="text-center" colSpan={isAdmin ? 9 : 8}>
                        Nenhuma conta cadastrada
                      </td>
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

export default ContaPagar;
