import React, { useEffect, useRef, useState } from "react";
import { alunosDTO } from "../../../models/alunos";
import * as alunosService from "../../../service/alunosService";
import * as projetosService from "../../../service/projetosService"; // Supondo que você tenha esse serviço
import './styles.css';
import { Link } from "react-router-dom";
import Sidebar from "../../../components/sidebar";
import Header from "../../../components/Header";
import { PiPrinterFill } from "react-icons/pi";
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

const Alunos = () => {
  const [searchType, setSearchType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchProjeto, setSearchProjeto] = useState<string>('');
  const [searchHorario, setSearchHorario] = useState<string>('');
  const componentRef = useRef(null);
  const [alunosDTO, setAlunosDTO] = useState<alunosDTO[]>([]);
  const [projetos, setProjetos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchAlunos();
    projetosService.findAll() // Buscar todos os projetos
      .then(response => {
        setProjetos(response.data);
      })
      .catch(error => {
        console.error("Erro ao buscar projetos:", error);
      });
  }, []);

  const fetchAlunos = () => {
    setLoading(true);
    alunosService.findAll()
      .then(response => {
        setAlunosDTO(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      });
  }

  const handleSearch = async () => {
    setLoading(true);
    try {
      let response;
      if (searchType === 'nome') {
        response = await alunosService.findByNome(searchTerm);
      } else if (searchType === 'horario') {
        response = await alunosService.findByHorario(searchHorario);
      } else if (searchType === 'projeto') {
        response = await alunosService.findByProjeto(Number(searchProjeto));
      } else if (searchType === 'projetoAndHorario') {
        response = await alunosService.findByProjetoAndHorario(Number(searchProjeto), searchHorario);
      }

      if (response && response.data) {
        setAlunosDTO(response.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchType('');
    setSearchTerm('');
    setSearchProjeto('');
    setSearchHorario('');
    fetchAlunos();
  };

  const formatHorario = (horario: any) => {
    if (!horario) return '';
    const [hour, minute] = horario;
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
  };

  const handlePrint = () => {
    const doc = new jsPDF();
    //@ts-ignore
    doc.autoTable({
      head: [['Nome', 'Idade', 'Identidade', 'Telefone', 'Projetos', 'Horário']],
      body: alunosDTO.map((aluno) => [
        aluno.nome,
        aluno.idade,
        aluno.rg,
        aluno.telefone,
        aluno.projetos ? aluno.projetos.nome : '',
        formatHorario(aluno.horario)
      ]),
    });

    doc.save('alunos.pdf');
  };

  const formatPhoneNumber = (phoneNumber:any) => {
    return phoneNumber.replace(/\D/g, '');
  };

  return (
    <>
      <Header />
      <Sidebar />
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-11 col-md-10 mt-5 pt-5 offset-1">
            <div className="row pt-3">
              <div className="container col-11 col-md-6 mt-4">

                <div className="row justify-content-center p-3" id="barra-pesquisa-secretaria">
                <div className="col-md-8 col-4 mb-3">
                    <select
                      value={searchType}
                      onChange={(e) => setSearchType(e.target.value)}
                      className="form-control"
                    >
                      <option value="">Selecione o tipo de pesquisa</option>
                      <option value="nome">Nome</option>
                      <option value="horario">Horário</option>
                      <option value="projeto">Curso</option>
                      <option value="projetoAndHorario">Curso e Horário</option>
                    </select>
                  </div>
                  {searchType === 'nome' && (
                    <div className="col-md-5 col-4">
                      <input
                        value={searchTerm}
                        placeholder="Digite um nome"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  )}
                  {searchType === 'horario' && (
                    <div className="col-md-5 col-4">
                      <input
                        value={searchHorario}
                        placeholder="Digite um horário (HH:mm)"
                        onChange={(e) => setSearchHorario(e.target.value)}
                        className="form-control"
                      />
                    </div>
                  )}
                  {searchType === 'projeto' && (
                    <div className="col-md-5 col-4">
                      <select
                        value={searchProjeto}
                        onChange={(e) => setSearchProjeto(e.target.value)}
                        className="form-control"
                      >
                        <option value="">Selecione</option>
                        {projetos.map((projeto) => (
                          <option key={projeto.id} value={projeto.id}>
                            {projeto.nome}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                  {searchType === 'projetoAndHorario' && (
                    <>
                      <div className="col-md-5 col-4 mb-2">
                        <select
                          value={searchProjeto}
                          onChange={(e) => setSearchProjeto(e.target.value)}
                          className="form-control"
                        >
                          <option value="">Selecione </option>
                          {projetos.map((projeto) => (
                            <option key={projeto.id} value={projeto.id}>
                              {projeto.nome}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-5 col-4 mb-2">
                        <input
                          value={searchHorario}
                          placeholder="Digite um horário (HH:mm)"
                          onChange={(e) => setSearchHorario(e.target.value)}
                          className="form-control"
                        />
                      </div>
                    </>
                  )}
                  <div className="col-md-7 col-8" id="botoes">
                    <button type="submit" className="btn btn-primary me-2" id="btn-pesquisa" onClick={handleSearch}>Pesquisar</button>
                    <button className="btn btn-secondary" onClick={handleClear}>Limpar</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="row pt-2 justify-content-center">
              <div className="col-12 offset-10 mt-2" id="btn-add-aluno">
                
              <Link to="/adicionarAlunos">
                      <button className="btn btn-primary">Adicionar Aluno</button>
                    </Link>
                  
              </div>
          
              <div className="col-11 col-md-11">
                <div className="img-print-membro">
                  <Link to="#">
                    <button onClick={handlePrint} className="mr-2"><PiPrinterFill /> Imprimir</button>
                  </Link>
                </div>
                <table className="table table-striped " ref={componentRef} id="col-tab-alunos-2">
                  <thead className="thead">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome</th>
                      <th scope="col">Idade</th>
                      <th scope="col">Telefone</th>
                      <th scope="col">Projeto</th>
                      <th scope="col">Horário</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={6}>Carregando dados...</td>
                      </tr>
                    ) : (
                      alunosDTO.map((aluno, index) => (
                        <tr key={aluno.id}>
                          <td>{index + 1}</td>
                          <td>
                            <Link to={`${aluno.id}`} className="name-link">
                              {aluno.nome}
                            </Link>
                          </td>
                          <td>
                            <Link to={`${aluno.id}`} className="name-link">
                              {aluno.idade}
                            </Link>
                          </td>
                          <td>
                            <Link to={`https://wa.me/${formatPhoneNumber(aluno.telefone)}`} target="_blank" className="name-link">
                            <i className="bi bi-whatsapp"></i> {aluno.telefone}
                            </Link>
                          </td>
                          {aluno.projetos && (
                            <td>
                              <Link to="#" className="name-link">
                                {aluno.projetos.nome}
                              </Link>
                            </td>
                          )}
                          <td>
                            <Link to={`${aluno.id}`} className="name-link">
                              {formatHorario(aluno.horario)}
                            </Link>
                          </td>
                        </tr>
                      ))
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

export default Alunos;
