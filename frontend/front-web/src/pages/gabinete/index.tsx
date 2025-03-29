import { useEffect, useState } from "react";
import Header from "../../components/Header";
import "./styles.css";
import {
  findAllMembros,
  findAllVisitantes,
  findByAnoAtual,
  findByAnoMesAtual,
  findByProximos,
  findByUltimos,
  insertAtendimento,
} from "../../service/AtendimentoService";
import { Atendimento, TipoAtendimento } from "../../models/atendimento";

const Gabinete = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [membros, setMembros] = useState<string[]>([]);
  const [visitantes, setVisitantes] = useState<string[]>([]);
  const [proximosAtendimentos, setProximosAtendimentos] = useState<
    Atendimento[]
  >([]);
  const [ultimosAtendimentos, setUltimosAtendimentos] = useState<Atendimento[]>(
    []
  );
  const [totalAtendimentos, setTotalAtendimentos] = useState(0);
  const [mesAtendimentos, setMesAtendimentos] = useState(0);
  const [liderancaAtendimentos, setLiderancaAtendimentos] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Estado para o novo atendimento
  const [novoAtendimento, setNovoAtendimento] = useState({
    data: "",
    horario: "",
    tipoAtendimento: TipoAtendimento.FAMILIAR,
    membroNomes: [],
    visitanteNomes: [],
  });

  useEffect(() => {
    findByAnoAtual()
      .then((response) => {
        setAtendimentos(response.data);
        setTotalAtendimentos(response.data.length);

        const lideresCount = response.data.filter(
          (atendimento: Atendimento) =>
            atendimento.tipoAtendimento === "LIDERES"
        ).length;

        setLiderancaAtendimentos(lideresCount);
      })
      .catch((error) => {
        console.error("Erro ao buscar atendimentos:", error);
      });
  }, []);

  useEffect(() => {
    findByAnoMesAtual()
      .then((response) => {
        setMesAtendimentos(response.data.length);
      })
      .catch((error) => {
        console.error("Erro ao buscar atendimentos:", error);
      });
  }, []);

  // Busca os próximos 5 atendimentos
  useEffect(() => {
    findByProximos()
      .then((response) => {
        setProximosAtendimentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar próximos atendimentos:", error);
      });
  }, []);

  // Busca os últimos 5 atendimentos
  useEffect(() => {
    findByUltimos()
      .then((response) => {
        setUltimosAtendimentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar últimos atendimentos:", error);
      });
  }, []);

  // Abre o modal
  const abrirModal = () => {
    setShowModal(true);
  };

  // Fecha o modal
  const fecharModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    findAllMembros()
      .then((response) => setMembros(response.data))
      .catch((error) => console.error("Erro ao buscar membros:", error));

    findAllVisitantes()
      .then((response) => setVisitantes(response.data))
      .catch((error) => console.error("Erro ao buscar visitantes:", error));
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setNovoAtendimento({
      ...novoAtendimento,
      [event.target.name]: event.target.value,
    });
  };
  const handleSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
    field: "membros" | "visitantes"
  ) => {
    const selectedOptions = Array.from(event.target.selectedOptions).map(
      (option) => option.value as string
    );

    setNovoAtendimento((prev) => ({
      ...prev,
      [field]: selectedOptions,
    }));
  };
  // Submete o formulário
  const handleSubmit = () => {
    insertAtendimento(novoAtendimento)
      .then(() => {
        alert("Atendimento criado com sucesso!");
        fecharModal();
      })
      .catch((error) => {
        console.error("Erro ao criar atendimento:", error);
      });
  };
  const formatDiaMes = (data: Date) => {
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    return `${dia < 10 ? `0${dia}` : dia}/${mes < 10 ? `0${mes}` : mes}`;
  };
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-2 dados-atendimento">
            <span>Atendimentos no mês</span>
            <span>{mesAtendimentos}</span>
          </div>
          <div className="col-2 dados-atendimento">
            <span>Total Atendimentos</span>
            <span>{totalAtendimentos}</span>
          </div>
          <div className="col-2 dados-atendimento">
            <span>Reunião Liderança</span>
            <span>{liderancaAtendimentos}</span>
          </div>
        </div>
        <button
          className="btn btn-primary mt-3"
          data-bs-toggle="modal"
          data-bs-target="#atendimentoModal"
        >
          Novo Atendimento
        </button>
      </div>
      <div className="row">
        <div className="col-5 mt-4">
          <h4>Próximos Atendimentos</h4>
          <ul className="list-group">
            {proximosAtendimentos.map((atendimento) => (
              <li key={atendimento.id} className="list-group-item">
                {atendimento.data.toString()} - {atendimento.horario} -{" "}
                {atendimento.tipoAtendimento}
                <div>
                  <strong>Membros:</strong> {atendimento.membroNomes.join(", ")}
                </div>
                <div>
                  <strong>Visitantes:</strong>{" "}
                  {atendimento.visitanteNomes.join(", ")}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Seção de Últimos Atendimentos */}
        <div className="col-5 mt-4">
          <h4>Últimos Atendimentos</h4>
          <ul className="list-group">
            {ultimosAtendimentos.map((atendimento) => (
              <li key={atendimento.id} className="list-group-item">
                {atendimento.data.toString()} - {atendimento.horario} -{" "}
                {atendimento.tipoAtendimento}
                <div>
                  <strong>Membros:</strong> {atendimento.membroNomes.join(", ")}
                </div>
                <div>
                  <strong>Visitantes:</strong>{" "}
                  {atendimento.visitanteNomes.join(", ")}
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Botão para abrir o modal */}
      </div>
      {/* Modal para adicionar novo atendimento */}
      <div
        className="modal fade"
        id="atendimentoModal"
        tabIndex={-1}
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Novo Atendimento</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <label>Data:</label>
              <input
                type="date"
                className="form-control"
                name="data"
                value={novoAtendimento.data}
                onChange={handleChange}
              />

              <label>Horário:</label>
              <input
                type="time"
                className="form-control"
                name="horario"
                value={novoAtendimento.horario}
                onChange={handleChange}
              />

              <label>Tipo de Atendimento:</label>
              <select
                className="form-select"
                name="tipoAtendimento"
                value={novoAtendimento.tipoAtendimento}
                onChange={handleChange}
              >
                {Object.values(TipoAtendimento).map((tipo) => (
                  <option key={tipo} value={tipo}>
                    {tipo}
                  </option>
                ))}
              </select>

              <label>Membros:</label>
              <select
                className="form-select"
                multiple
                value={novoAtendimento.membroNomes}
                onChange={(event) => handleSelectChange(event, "membros")}
              >
                {membros.map((membro) => (
                  <option key={membro} value={membro}>
                    {membro}
                  </option>
                ))}
              </select>

              <label>Visitantes:</label>
              <select
                className="form-select"
                multiple
                value={novoAtendimento.visitanteNomes}
                onChange={(event) => handleSelectChange(event, "visitantes")}
              >
                {visitantes.map((visitante) => (
                  <option key={visitante} value={visitante}>
                    {visitante}
                  </option>
                ))}
              </select>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Fechar
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleSubmit}
              >
                Criar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gabinete;
