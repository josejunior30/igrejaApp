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
  const [filterAtivo, setFilterAtivo] = useState<boolean>(false);
  const [filterAfastado, setFilterAfastado] = useState<boolean>(false);

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

  function formatPhoneNumber(phone: string | null | undefined): string {
    if (!phone) {
      return ""; // Retorna uma string vazia se `phone` for `null` ou `undefined`
    }
    // Adicione uma verificação para garantir que `phone` é uma string
    return phone
      .replace(/[^0-9]/g, "")
      .replace(/(\d{2})(\d{4,5})(\d{4})/, "($1) $2-$3");
  }

  const handlePrint = () => {
    const doc = new jsPDF();
    //@ts-ignore
    doc.autoTable({
      head: [["Data de Nascimento", "Nome", "Idade", "Email", "Telefone"]],
      body: MembroDTO.map((membro) => [
        membro.dataNascimento
          ? new Date(membro.dataNascimento).toLocaleDateString()
          : "Data de Nascimento Não Disponível",
        `${membro.nome} ${membro.sobrenome}`,
        membro.idade,
        membro.email,
        membro.telefone,
      ]),
    });
    doc.save("membros.pdf");
  };

  // Função para aplicar os filtros "Ativo" ou "Afastado"
  const applyFilters = (members: MembroDTO[]) => {
    let filtered = members;

    if (filterAtivo) {
      // Exibe apenas membros ativos
      filtered = members.filter((membro) => membro.status === true);
    } else if (filterAfastado) {
      // Exibe apenas membros afastados
      filtered = members.filter((membro) => membro.status === false);
    }

    setFilteredMembroDTO(filtered);
  };

  // Lida com a mudança na checkbox "Ativo" e "Afastado"
  const handleFilterChange = (filterType: string) => {
    if (filterType === "ativo") {
      setFilterAtivo(!filterAtivo); // Alterna o estado do filtro "Ativo"
      setFilterAfastado(false); // Desativa o filtro "Afastado" se "Ativo" for marcado
    } else if (filterType === "afastado") {
      setFilterAfastado(!filterAfastado); // Alterna o estado do filtro "Afastado"
      setFilterAtivo(false); // Desativa o filtro "Ativo" se "Afastado" for marcado
    }

    applyFilters(MembroDTO); // Aplica o filtro imediatamente após a mudança
  };

  useEffect(() => {
    applyFilters(MembroDTO); // Aplica o filtro toda vez que os estados mudarem
  }, [filterAtivo, filterAfastado, MembroDTO]); // Observa as mudanças nos filtros e na lista de membros

  return (
    <>
      <Header />
      <Sidebar />
      <div className="container-fluid">
        <div className="row justify-content-center">
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
                  Membros
                </h3>
                <div className="row justify-content-center">
                  <div className="col-md-10">
                    <div className="form-check form-check-inline mb-3 mt-3">
                      <input
                        type="checkbox"
                        id="filterAtivo"
                        className="form-check-input"
                        checked={filterAtivo}
                        onChange={() => handleFilterChange("ativo")}
                      />
                      <label className="form-check-label" htmlFor="filterAtivo">
                        Mostrar Ativo
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        type="checkbox"
                        id="filterAfastado"
                        className="form-check-input"
                        checked={filterAfastado}
                        onChange={() => handleFilterChange("afastado")}
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterAfastado"
                      >
                        Mostrar Afastado
                      </label>
                    </div>
                  </div>
                </div>
                <table className="table table-striped text-center">
                  <thead className="thead">
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
                        <tr
                          key={membro.id}
                          className={membro.status === false ? "afastado" : ""}
                        >
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
                          <td>
                            <Link to={`${membro.id}`} className="name-link">
                              {membro.status ? "ativo" : "afastado"}
                            </Link>
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
