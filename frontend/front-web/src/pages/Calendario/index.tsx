import { useEffect, useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";
import * as CalendarioService from "../../service/CalendarioService";
import { Calendario } from "../../models/calendario";
import Header from "../../components/Header";
import Form from "react-bootstrap/Form";
import "./styles.css";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

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
    const dataHoje = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, "0")}-${String(hoje.getDate()).padStart(2, "0")}`;
  
    for (let i = 0; i < primeiroDiaSemana; i++) {
      dias.push(<td key={`empty-${i}`} className="empty"></td>);
    }
  
    for (let dia = 1; dia <= totalDias; dia++) {
      const dataString = `${anoAtual}-${String(mesAtual + 1).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  
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
          className={`day position-relative ${dataString === dataHoje ? "hoje" : ""}`}
        >
          <div className="d-flex justify-content-center align-items-start flex-column position-relative">
            <div className="w-100 d-flex justify-content-center align-items-center">
              <strong className="text-center justify-content-center">{dia}</strong>
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
    console.log("Hora recebida:", hora);
  
    if (Array.isArray(hora) && hora.length === 2) {
      // Se for um array, converte para "HH:MM"
      const [horas, minutos] = hora;
      return `${String(horas).padStart(2, "0")}:${String(minutos).padStart(2, "0")}`;
    }
  
    if (typeof hora === "string" && hora.includes(":")) {
      const [horas, minutos] = hora.split(":");
      return `${horas.padStart(2, "0")}:${minutos.padStart(2, "0")}`;
    }
  
    return "00:00"; // Caso esteja num formato inesperado
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
              <h4 className="mes-atual">
                {new Date(anoAtual, mesAtual).toLocaleString("default", {
                  month: "long",
                })}{" "}
                {anoAtual}
              </h4>
              <Button className="btn-direita" onClick={avancarMes}>
                <GoChevronRight />
              </Button>
            </div>
            <Table bordered className="text-center ">
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
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default CalendarioAtividade;
