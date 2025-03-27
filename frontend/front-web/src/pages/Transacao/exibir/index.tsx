import { useEffect, useState } from "react";
import { DescricaoReceita, TransacaoDTO } from "../../../models/transacao";
import * as TransacaoService from "../../../service/TransacaoService";
import Header from "../../../components/Header";
import "./styles.css";
import Transacao from "../inserir";
import { FaSearch } from "react-icons/fa";
import { PiTrashFill } from "react-icons/pi";
import { Button, Modal } from "react-bootstrap";
import { deleteTransacao } from "../../../service/TransacaoService";
import Botoes from "../../../components/botoes";

const TransacaoExibir = () => {
  const [transacao, setTransacao] = useState<TransacaoDTO[]>([]);
  const [filteredTransacao, setFilteredTransacao] = useState<TransacaoDTO[]>(
    []
  );
  const [totalPesquisa, setTotalPesquisa] = useState<number>(0);
  const [termoPesquisa, setTermoPesquisa] = useState<string>("");
  const [descricaoReceita, setDescricaoReceita] = useState<DescricaoReceita[]>(
    []
  );
  const [selectedDescricao, setSelectedDescricao] = useState<string>("");
  const [mes, setMes] = useState<number>(new Date().getMonth() + 1);
  const [ano, setAno] = useState<number>(new Date().getFullYear());

  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);

  useEffect(() => {
    TransacaoService.findByMesAno(mes, ano)
      .then((response) => {
        setTransacao(response.data);
        aplicarFiltros(response.data);
      })
      .catch((error) => console.error("Erro ao buscar dados:", error));
  }, [mes, ano]);

  const handleSearch = () => {
    if (selectedDescricao.trim() === "") return;
  
    TransacaoService.findBybuscarPorDescricao(selectedDescricao, mes, ano)
      .then((response) => {
        aplicarFiltros(response.data);
        setShowSearchModal(false);
      })
      .catch((error) => console.error("Erro ao buscar transações:", error));
  };
  
  useEffect(() => {
    async function fetchDescricaoContas() {
      try {
        const response = await TransacaoService.findAllDescricaoReceita();
        setDescricaoReceita(response.data);
        if (response.data.length > 0) {
          setSelectedDescricao(response.data[0].descricao); // Seleciona a primeira opção automaticamente
        }
      } catch (error) {
        console.error("Erro ao buscar descrições de receitas:", error);
      }
    }
    fetchDescricaoContas();
  }, []);
  const aplicarFiltros = (lista: TransacaoDTO[]) => {
    const filtrado = lista.filter((t) => t.isReceita);
    setFilteredTransacao(filtrado);
    calcularTotal(filtrado);
  };

  const calcularTotal = (lista: TransacaoDTO[]) => {
    const total = lista.reduce((acc, t) => acc + t.valor, 0);
    setTotalPesquisa(total);
  };
  const handleDelete = (id: number) => {
    const confirmed = window.confirm("Tem certeza que deseja excluir ?");
    if (confirmed) {
      deleteTransacao(id)
        .then(() => {
          setTransacao((prevState) => prevState.filter((req) => req.id !== id));
          alert(" excluído com sucesso!");
        })
        .catch((error) => {
          console.error("Erro ao excluir :", error);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-3">
        <div className="row justify-content-center">
          <Botoes />
          <div className="col-md-12 text-center mt-3 mb-3">
            <button
              className="btn-pesquisa-ganho"
              onClick={() => setShowModal(true)}
            >
              + Inserir
            </button>

            <button
              className="btn-pesquisa-ganho"
              onClick={() => setShowSearchModal(true)}
            >
              <FaSearch /> Pesquisar
            </button>

            <Transacao show={showModal} onHide={() => setShowModal(false)} />
            <Modal
              show={showSearchModal}
              onHide={() => setShowSearchModal(false)}
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title>Pesquisar </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="mb-3">
                  <label className="form-label">Descrição</label>
                  <select
                    className="form-control"
                    value={selectedDescricao}
                    onChange={(e) => setSelectedDescricao(e.target.value)}
                    required
                  >
                    {descricaoReceita.map((item, index) => (
                      <option key={index} value={item.descricao}>
                        {item.descricao}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Mês</label>
                  <select
                    className="form-control"
                    value={mes}
                    onChange={(e) => setMes(Number(e.target.value))}
                  >
                    <option>Por Ano</option> {/* 🔹 Opção de busca por ano */}
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
                    value={ano}
                    onChange={(e) => setAno(Number(e.target.value))}
                  >
                    {[...Array(5)].map((_, i) => (
                      <option key={i} value={new Date().getFullYear() - i}>
                        {new Date().getFullYear() - i}
                      </option>
                    ))}
                  </select>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowSearchModal(false)}
                >
                  Fechar
                </Button>
                <Button variant="primary" onClick={handleSearch}>
                  Pesquisar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>

        {filteredTransacao.length > 0 && (
          <div className="text-center mt-2 totalFiltro">
            <h5>Total Receita no Mês:</h5>
            <p className="total-transacao">
              <strong>
                {totalPesquisa.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </strong>
            </p>
          </div>
        )}

        <div className="row justify-content-center">
          <div className="col-8">
            <table className="table table-striped text-center mt-4">
              <thead className="thead">
                <tr>
                  <th scope="col">Data</th>
                  <th scope="col">Descrição</th>
                  <th scope="col">Valor</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransacao.length > 0 ? (
                  filteredTransacao.map((t) => (
                    <tr key={t.id}>
                      <td>{new Date(t.data).toLocaleDateString()}</td>
                      <td>{t.descricaoReceita.descricao}</td>
                      <td>
                        R${" "}
                        {t.valor.toLocaleString("pt-BR", {
                          minimumFractionDigits: 2,
                        })}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(t.id)}
                        >
                          <PiTrashFill />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3}>Nenhuma transação encontrada</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransacaoExibir;
