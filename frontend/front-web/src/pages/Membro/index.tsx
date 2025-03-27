import React, { useEffect, useState } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { MembroDTO } from "../../models/membro";
import * as membroService from "../../service/membroService";
import Sidebar from "../../components/sidebar";
import Header from "../../components/Header";
import { PiPrinterFill } from "react-icons/pi";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const Membro = () => {
  const [MembroDTO, setMembroDTO] = useState<MembroDTO[]>([]);
  const [filteredMembroDTO, setFilteredMembroDTO] = useState<MembroDTO[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("");
  const [selectedMonth, setSelectedMonth] = useState<number | "">("");

  useEffect(() => {
    membroService
      .findAll()
      .then((response) => {
        setMembroDTO(response.data);
        setFilteredMembroDTO(response.data); // Mostra todos inicialmente
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  const handleSearch = async () => {
    try {
      const response = await membroService.findByNome(searchTerm);
      setMembroDTO(response.data);
      applyFilters(response.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    }
  };

  const handleMonthFilter = async (month: number) => {
    if (!month) {
    
      setFilteredMembroDTO(MembroDTO);
      return;
    }
    try {
      const response = await membroService.findByMonthOfBirth(month);
      setFilteredMembroDTO(response.data);
    } catch (error) {
      console.error("Erro ao buscar membros por mês:", error);
    }
  };

  function formatPhoneNumber(phone: string | null | undefined): string {
    if (!phone) {
      return ""; 
    }
    return phone
      .replace(/[^0-9]/g, "")
      .replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  }
  const handlePrint = () => {
    const doc = new jsPDF();
    //@ts-ignore
    doc.autoTable({
      head: [["Índice", "Data de Nascimento", "Nome", "Status", "Telefone"]],
      body: filteredMembroDTO.map((membro, index) => [
        index + 1,
        membro.dataNascimento
          ? new Date(membro.dataNascimento).toLocaleDateString()
          : "Data de Nascimento Não Disponível",
        `${membro.nome} ${membro.sobrenome}`,
        membro.membroStatus,
        formatPhoneNumber(membro.telefone),
      ]),
      startY: 20,
    });
    doc.text("Tabela de Membros", 14, 10);
    doc.save("membros_tabela.pdf");
  };

  const handleFilterChange = (status: string) => {
    setFilterStatus((prevStatus) => (prevStatus === status ? "" : status));
  };

  const applyFilters = (members: MembroDTO[]) => {
    let filtered = members;

    if (filterStatus) {
      filtered = members.filter(
        (membro) => membro.membroStatus === filterStatus
      );
    }

    filtered = filtered.sort((a, b) => {
      const nomeA = `${a.nome} ${a.sobrenome}`.toLowerCase();
      const nomeB = `${b.nome} ${b.sobrenome}`.toLowerCase();
      return nomeA.localeCompare(nomeB);
    });

    setFilteredMembroDTO(filtered);
  };

  useEffect(() => {
    applyFilters(MembroDTO);
  }, [filterStatus, MembroDTO]);
  const getColorByTipoCulto = (tipoCulto: string) => {
    switch (tipoCulto) {
      case "AFASTADO":
        return "#fcba03"; 
      case "DESLIGADO":
        return "#c70909"; 
    }
  };
  return (
    <>
      <Header />
      <Sidebar />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-md-10 col-11 mt-5 offset-1">
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
                    <Link to="/membro/adicionar">
                      <button className="btn btn-primary">Adicionar</button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="row pt-2 justify-content-center ">
              <div className="col-11 col-md-11">
                <h3 className="text-center mt-5" id="membros">
                  Lista de Membros
                </h3>
                <div className="row justify-content-center">
                  <div className="col-md-12 text-center pt-3">
                    <div className="form-check form-check-inline mb-3 mt-3">
                      <input
                        type="checkbox"
                        id="filterAtivo"
                        className="form-check-input"
                        checked={filterStatus === "ATIVO"}
                        onChange={() => handleFilterChange("ATIVO")}
                      />
                      <label className="form-check-label" htmlFor="filterAtivo">
                        Ativo
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        id="filterAfastado"
                        className="form-check-input"
                        checked={filterStatus === "AFASTADO"}
                        onChange={() => handleFilterChange("AFASTADO")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterAfastado"
                      >
                        Afastado
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        id="filterDesligado"
                        className="form-check-input"
                        checked={filterStatus === "DESLIGADO"}
                        onChange={() => handleFilterChange("DESLIGADO")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterDesligado"
                      >
                        Desligado
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
                    <button className="btn btn-success" onClick={handlePrint}>
                      <PiPrinterFill /> Imprimir
                    </button>
                  </div>
                </div>
                <table className="table table-striped text-center">
                  <thead className="thead ">
                    <tr>
                      <th scope="col">Índice</th>
                      <th scope="col">Data de Nascimento</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Status</th>
                      <th scope="col">Telefone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembroDTO.length > 0 ? (
                      filteredMembroDTO.map((membro, index) => (
                        <tr key={membro.id}>
                          <td>
                            <Link to={`${membro.id}`} className="name-link">
                              {index + 1}
                            </Link>
                          </td>
                          <td>
                            <Link to={`${membro.id}`} className="name-link">
                              {membro.dataNascimento
                                ? new Date(
                                    membro.dataNascimento
                                  ).toLocaleDateString()
                                : "Data de Nascimento Não Disponível"}
                            </Link>
                          </td>
                          <td>
                            <Link to={`${membro.id}`} className="name-link">
                              {membro.nome} {membro.sobrenome}
                            </Link>
                          </td>
                          <td
                            style={{
                              color: "#fff",
                              backgroundColor: getColorByTipoCulto(
                                membro.membroStatus
                              ),
                              fontWeight: "bold",
                              padding: "8px",
                              borderRadius: "5px",
                            }}
                          >
                            {membro.membroStatus === "AFASTADO"
                              ? "Afastado"
                              : membro.membroStatus === "DESLIGADO"
                              ? "Desligado"
                              : membro.membroStatus}
                          </td>
                          <td>
                            <Link
                              to={`https://wa.me/${formatPhoneNumber(
                                membro.telefone
                              )}`}
                              target="_blank"
                              className="name-link"
                            >
                              <i className="bi bi-whatsapp"></i>{" "}
                              {membro.telefone}
                            </Link>
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

export default Membro;
