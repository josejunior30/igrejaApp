import { PiPrinterFill } from "react-icons/pi";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { useEffect, useState } from "react";
import { visitante } from "../../../models/visitante";
import * as visitanteService from "../../../service/visitanteService";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import "./styles.css";
import Sidebar from "../../../components/sidebar";
const Visitante = () => {
  const [VisitanteDTO, setVisitanteDTO] = useState<visitante[]>([]);
  const [filteredVisitanteDTO, setFilteredVisitanteDTO] = useState<visitante[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<number | "">("");

  useEffect(() => {
    visitanteService
      .findAll()
      .then((response) => {
        setVisitanteDTO(response.data);
        setFilteredVisitanteDTO(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  const handleSearch = async () => {
    try {
      const response = await visitanteService.findByNome(searchTerm);
      setVisitanteDTO(response.data);
      applyFilters(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleMonthFilter = async (month: number) => {
    if (!month) {
      // Se nenhum mês for selecionado, reseta para todos os membros
      setFilteredVisitanteDTO(VisitanteDTO);
      return;
    }
    try {
      const response = await visitanteService.findByMonthOfBirth(month);
      setFilteredVisitanteDTO(response.data);
    } catch (error) {
      console.error("Erro ao buscar membros por mês:", error);
    }
  };

  function formatPhoneNumber(phone: string | null | undefined): string {
    if (!phone) {
      return ""; // Retorna uma string vazia se `phone` for `null` ou `undefined`
    }
    return phone
      .replace(/[^0-9]/g, "")
      .replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  }

  const handleFilterChange = (status: string) => {
    setFilterStatus((prevStatus) => (prevStatus === status ? "" : status));
  };

  const applyFilters = (visitantes: visitante[]) => {
    let filtered = visitantes;

    if (filterStatus) {
      filtered = visitantes.filter(
        (visitante) => visitante.visitanteStatus === filterStatus
      );
    }

    filtered = filtered.sort((a, b) => {
      const nomeA = `${a.nome} ${a.sobrenome}`.toLowerCase();
      const nomeB = `${b.nome} ${b.sobrenome}`.toLowerCase();
      return nomeA.localeCompare(nomeB);
    });

    setFilteredVisitanteDTO(filtered);
  };

  useEffect(() => {
    applyFilters(VisitanteDTO);
  }, [filterStatus, VisitanteDTO]);
  const getColorByTipoCulto = (tipoCulto: string) => {
    switch (tipoCulto) {
      case "NIVEL_1":
        return "#010727";
      case "NIVEL_2":
        return "#0056b3";
      case "NIVEL_3":
        return "#00c2f3";
    }
  };
  return (
    <>
      <Header />
      <Sidebar />
      <div className="container-fluid">
        <div className="row justify-content-center mb-5">
          <div className="col-md-10 col-11 mt-5 pt-5 offset-1">
            <div className="row pt-3">
              <div className="container col-11 col-md-7 mt-5">
                <div
                  className="row justify-content-center p-3"
                  id="barra-pesquisa-secretaria"
                >
                  <div className="col-md-5 col-4">
                    <input
                      value={searchTerm}
                      placeholder="Digite um nome"
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="form-control"
                    />
                  </div>
                  <div className="col-md-7 col-8" id="botoes">
                    <button
                      type="submit"
                      className="btn btn-primary me-2"
                      id="btn-pesquisa"
                      onClick={handleSearch}
                    >
                      Pesquisar
                    </button>
                    <Link to="/visitante/insert">
                      <button className="btn btn-primary">Adicionar</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-3">
              <div className="container col-11 col-md-10 mt-3">
                <div className="row justify-content-center p-3">
                  <div className="col-md-8 col-8">
                    <div className="d-flex">
                      {" "}
                      <button className="cor1"></button>
                      <span className="legenda  d-block">
                        Nivel 1 : pessoa esta autorizada a trabalhar emoutro
                        ministerio
                      </span>
                    </div>
                    <div className="d-flex">
                      <button className="cor2"></button>
                      <span className="legenda d-block">
                        Nivel 2 : pessoa que tem o desejo de se filiar a igreja
                      </span>
                    </div>
                    <div className="d-flex">
                      <button className="cor3"></button>
                      <span className="legenda d-block">
                        Nivel 3 : pessoa esta autorizada a trabalhar emoutro
                        ministeio
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-2 justify-content-center ">
              <div className="col-11 col-md-11">
                <div className="row justify-content-center">
                  <div className="col-md-12 text-center pt-3">
                    <div className="form-check form-check-inline mb-3 mt-3">
                      <input
                        type="checkbox"
                        id="filterAtivo"
                        className="form-check-input"
                        checked={filterStatus === "NIVEL_1"}
                        onChange={() => handleFilterChange("NIVEL_1")}
                      />
                      <label className="form-check-label" htmlFor="filterAtivo">
                        Nível 1
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        id="filterAfastado"
                        className="form-check-input"
                        checked={filterStatus === "NIVEL_2"}
                        onChange={() => handleFilterChange("NIVEL_2")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterAfastado"
                      >
                        Nível 2
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        id="filterDesligado"
                        className="form-check-input"
                        checked={filterStatus === "NIVEL_3"}
                        onChange={() => handleFilterChange("NIVEL_3")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterDesligado"
                      >
                        Nível 3
                      </label>
                    </div>
                    <div className="form-check form-check-inline dataNascimento">
                      <label htmlFor="monthFilter">
                        Filtrar por Mês de Aniversário
                      </label>
                      <select
                        id="monthFilter"
                        className="form-control"
                        value={selectedMonth}
                        onChange={(e) => {
                          const value =
                            e.target.value === ""
                              ? ""
                              : parseInt(e.target.value);
                          setSelectedMonth(value);
                          handleMonthFilter(value as number);
                        }}
                      >
                        <option value="">Todos os meses</option>
                        <option value="1">Janeiro</option>
                        <option value="2">Fevereiro</option>
                        <option value="3">Março</option>
                        <option value="4">Abril</option>
                        <option value="5">Maio</option>
                        <option value="6">Junho</option>
                        <option value="7">Julho</option>
                        <option value="8">Agosto</option>
                        <option value="9">Setembro</option>
                        <option value="10">Outubro</option>
                        <option value="11">Novembro</option>
                        <option value="12">Dezembro</option>
                      </select>
                    </div>
                    <button className="btn btn-success">
                      <PiPrinterFill /> Imprimir Tabela
                    </button>
                  </div>
                </div>
                <table className="table table-striped text-center">
                  <thead className="thead ">
                    <tr>
                      <th scope="col">Índice</th>
                      <th scope="col">Data de Nascimento</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Telefone</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredVisitanteDTO.length > 0 ? (
                      filteredVisitanteDTO.map((visitante, index) => (
                        <tr key={visitante.id}>
                          <td>
                            <Link to={`${visitante.id}`} className="name-link">
                              {index + 1}
                            </Link>
                          </td>
                          <td>
                            <Link to={`${visitante.id}`} className="name-link">
                              {visitante.dataNascimento
                                ? new Date(
                                    visitante.dataNascimento
                                  ).toLocaleDateString()
                                : "Data de Nascimento Não Disponível"}
                            </Link>
                          </td>
                          <td>
                            <Link to={`${visitante.id}`} className="name-link">
                              {visitante.nome} {visitante.sobrenome}
                            </Link>
                          </td>

                          <td>
                            <Link
                              to={`https://wa.me/${formatPhoneNumber(
                                visitante.telefone
                              )}`}
                              target="_blank"
                              className="name-link"
                            >
                              <i className="bi bi-whatsapp"></i>{" "}
                              {visitante.telefone}
                            </Link>
                          </td>
                          <td
                            style={{
                              color: "#fff",
                              backgroundColor: getColorByTipoCulto(
                                visitante.visitanteStatus
                              ),
                              fontWeight: "bold",
                              padding: "8px",
                              borderRadius: "5px",
                            }}
                          >
                            {visitante.visitanteStatus === "NIVEL_1"
                              ? "Nivel 1"
                              : visitante.visitanteStatus === "NIVEL_2"
                              ? "Nivel 2"
                              : visitante.visitanteStatus === "NIVEL_3"
                              ? "Nivel 3"
                              : visitante.visitanteStatus}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={5}>Carregando dados...</td>
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

export default Visitante;
