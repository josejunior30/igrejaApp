import { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import * as CalendarioService from "../../service/CalendarioService";
import { Calendario } from "../../models/calendario";
import Header from "../../components/Header";
import Form from "react-bootstrap/Form";
import "./styles.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";
import jsPDF from "jspdf";
import "jspdf-autotable";

const CalendarioAtividade = () => {
  const [calendarioDTO, setCalendarioDTO] = useState<Calendario[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [titulo, setTitulo] = useState("");
  const [hora, setHora] = useState("");
  const [descricao, setDescricao] = useState("");
  const [responsavel, setResponsavel] = useState("");
  const [mesAtual, setMesAtual] = useState(new Date().getMonth());
  const [anoAtual, setAnoAtual] = useState(new Date().getFullYear());
  const [eventosSelecionados, setEventosSelecionados] = useState<Calendario[]>(
    []
  );
  const [selectedEvento, setSelectedEvento] = useState<Calendario | null>(null);
  const [showEventoModal, setShowEventoModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("titulo"); // Default: pesquisa por título
  const [searchResults, setSearchResults] = useState<Calendario[]>([]);
  useEffect(() => {
    CalendarioService.findAll()
      .then((response) => {
        setCalendarioDTO(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  const handleDateClick = (date: string) => {
    const eventos = calendarioDTO.filter(
      (evento) => new Date(evento.data).toISOString().split("T")[0] === date
    );
    setEventosSelecionados(eventos);
  };
  const handleEventoClick = (date: string) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const handleSubmit = () => {
    if (!selectedDate) return;

    const novoEvento: Calendario = {
      id: Math.random(),
      titulo,
      descricao,
      responsavel,
      data: new Date(selectedDate),
      hora,
    };

    CalendarioService.insertCalendario(novoEvento)
      .then(() => {
        setCalendarioDTO((prev) => [...prev, novoEvento]);
        setShowModal(false);
        setTitulo("");
        setHora("");
        setDescricao("");
        setResponsavel("");
      })
      .catch((error) => {
        console.error("Erro ao adicionar evento:", error);
      });
  };

  const avancarMes = () => {
    if (mesAtual === 11) {
      setMesAtual(0);
      setAnoAtual(anoAtual + 1);
    } else {
      setMesAtual(mesAtual + 1);
    }
  };

  const retrocederMes = () => {
    if (mesAtual === 0) {
      setMesAtual(11);
      setAnoAtual(anoAtual - 1);
    } else {
      setMesAtual(mesAtual - 1);
    }
  };

  const gerarDiasDoMes = () => {
    const dias: JSX.Element[] = [];
    const primeiroDiaSemana = new Date(anoAtual, mesAtual, 1).getDay();
    const totalDias = new Date(anoAtual, mesAtual + 1, 0).getDate();

    // Obtém a data de hoje no formato "YYYY-MM-DD"
    const hoje = new Date();
    const dataHoje = `${hoje.getFullYear()}-${String(
      hoje.getMonth() + 1
    ).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;

    for (let i = 0; i < primeiroDiaSemana; i++) {
      dias.push(<td key={`empty-${i}`} className="empty"></td>);
    }

    for (let dia = 1; dia <= totalDias; dia++) {
      const dataString = `${anoAtual}-${String(mesAtual + 1).padStart(
        2,
        "0"
      )}-${String(dia).padStart(2, "0")}`;

      const eventos = calendarioDTO.filter(
        (evento) =>
          new Date(evento.data).toISOString().split("T")[0] === dataString
      );

      const handleEventoDetalhes = (evento: Calendario) => {
        setSelectedEvento(evento);
        setShowEventoModal(true);
      };

      dias.push(
        <td
          key={dia}
          onClick={() => handleDateClick(dataString)}
          className={`day position-relative ${
            dataString === dataHoje ? "hoje" : ""
          }`}
        >
          <div className="d-flex justify-content-center align-items-start flex-column position-relative">
            <div className="w-100 d-flex justify-content-center align-items-center">
              <strong className="text-center justify-content-center">
                {dia}
              </strong>
              <button
                className="add-evento"
                style={{ position: "relative", zIndex: 10 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleEventoClick(dataString);
                }}
              >
                +
              </button>
            </div>
            {eventos.length > 0 &&
              eventos.map((evento) => (
                <div
                  key={evento.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEventoDetalhes(evento);
                  }}
                  className="event badge bg-primary text-white mt-2 mb-0 w-100"
                >
                  {evento.titulo} - {formatarHora(evento.hora)}
                </div>
              ))}
          </div>
        </td>
      );
    }

    return dias;
  };

  const formatarHora = (hora: string | number[]) => {
    if (typeof hora === "string" && hora.includes(":")) {
      const [horas, minutos] = hora.split(":");
      return `${horas.padStart(2, "0")}:${minutos.padStart(2, "0")}`;
    }

    if (Array.isArray(hora) && hora.length === 2) {
      // Se for um array, converte para "HH:MM"
      const [horas, minutos] = hora;
      return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(
        2,
        "0"
      )}`;
    }

    return "00:00"; // Caso esteja num formato inesperado
  };

  const handleDeleteEvento = (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir este evento?")) return;

    CalendarioService.deleteCalendario(id)
      .then(() => {
        setCalendarioDTO((prev) => prev.filter((evento) => evento.id !== id));
        setShowEventoModal(false);
      })
      .catch((error) => {
        console.error("Erro ao excluir evento:", error);
      });
  };
  const handleSearch = () => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const handleResponse = (response: { data: Calendario[] }) => {
      const sortedResults = response.data.sort(
        (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
      );
      setSearchResults(sortedResults);
    };

    if (searchType === "titulo") {
      CalendarioService.findByTitulo(searchTerm)
        .then(handleResponse)
        .catch((error) => console.error("Erro ao buscar por título:", error));
    } else if (searchType === "responsavel") {
      CalendarioService.findByResponsavel(searchTerm)
        .then(handleResponse)
        .catch((error) =>
          console.error("Erro ao buscar por responsável:", error)
        );
    } else if (searchType === "ano") {
      CalendarioService.findByAno(Number(searchTerm))
        .then(handleResponse)
        .catch((error) => console.error("Erro ao buscar por ano:", error));
    }
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    doc.text("Resultados da Pesquisa", 20, 10);

    const tableColumn = ["Evento", "Responsável", "Data", "Hora"];
    const tableRows = searchResults.map((evento) => [
      evento.titulo,
      evento.responsavel,
      new Date(evento.data).toLocaleDateString(),
      formatarHora(evento.hora),
    ]);
    //@ts-ignore
    doc.autoTable({ head: [tableColumn], body: tableRows });
    doc.save("eventos.pdf");
  };

  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row pt-3">
          <div className="col-12">
            <div className="d-flex justify-content-center align-items-center mb-3">
              <Button className="btn-esquerda" onClick={retrocederMes}>
                <GoChevronLeft />
              </Button>
              <h4 className="mes-atual offset-1">
                {new Date(anoAtual, mesAtual).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {anoAtual}
              </h4>
              <Button className="btn-direita" onClick={avancarMes}>
                <GoChevronRight />
              </Button>

              <div className="col-md-2 offset-1">
                <Form.Control
                  type="text"
                  placeholder={`Buscar por ${
                    searchType === "titulo"
                      ? "título"
                      : searchType === "responsavel"
                      ? "responsável"
                      : "ano"
                  }...`}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="input-calendar"
                />
              </div>
              <div className="col-md-1 seletor-calendario">
                <Form.Select
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                >
                  <option value="titulo">Título</option>
                  <option value="responsavel">Responsável</option>
                  <option value="ano">Ano</option>
                </Form.Select>
              </div>
              <div className="col-md-4">
                <Button variant="primary" onClick={handleSearch}>
                  Pesquisar
                </Button>

                <Button
                  className="btn-limpar"
                  variant="secondary"
                  onClick={() => {
                    setSearchTerm("");
                    setSearchResults([]);
                  }}
                >
                  Limpar
                </Button>
                <Button variant="success" onClick={handleExportPDF}>
                  Imprimir
                </Button>
              </div>
            </div>

            {/* 📌 Resultados da Pesquisa */}
            {searchResults.length > 0 && (
              <div className="resultados-pesquisa col-6 text-center offset-3">
                <h5>Resultados da Pesquisa:</h5>
                <ul className="list-group">
                  {searchResults.map((evento) => (
                    <li key={evento.id} className="list-group-item">
                      <strong>{evento.titulo}</strong> - {evento.responsavel} -{" "}
                      {new Date(evento.data).toLocaleDateString()} -{" "}
                      {formatarHora(evento.hora)}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <Table
              bordered
              className="text-center tabela-calendario justify-content-center"
            >
              <thead>
                <tr className="calendario-th">
                  <th>Dom</th>
                  <th>Seg</th>
                  <th>Ter</th>
                  <th>Qua</th>
                  <th>Qui</th>
                  <th>Sex</th>
                  <th>Sáb</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({
                  length: Math.ceil(gerarDiasDoMes().length / 7),
                }).map((_, i) => (
                  <tr key={i}>{gerarDiasDoMes().slice(i * 7, i * 7 + 7)}</tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      </div>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Adicionar Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Título</Form.Label>
              <Form.Control
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Horário (HH:MM)</Form.Label>
              <Form.Control
                type="time"
                value={hora}
                onChange={(e) => setHora(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Descrição</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Responsável</Form.Label>
              <Form.Control
                type="text"
                value={responsavel}
                onChange={(e) => setResponsavel(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Salvar Evento
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal
        show={showEventoModal}
        onHide={() => setShowEventoModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Detalhes do Evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedEvento && (
            <div>
              <h5 className="titulo-evento">Título: {selectedEvento.titulo}</h5>
              <p>Responsável: {selectedEvento.responsavel}</p>
              <p>Horário: {formatarHora(selectedEvento.hora)}</p>
              <p>Descrição: {selectedEvento.descricao}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEventoModal(false)}>
            Fechar
          </Button>
          {selectedEvento && (
            <Button
              variant="danger"
              onClick={() => handleDeleteEvento(selectedEvento.id)}
            >
              Excluir Evento
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CalendarioAtividade;
