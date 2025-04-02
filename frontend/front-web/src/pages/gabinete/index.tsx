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
import { MembroDTO } from "../../models/membro";
import { visitante } from "../../models/visitante";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Link } from "react-router-dom";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#A28DFF",
  "#FF6384",
];
const Gabinete = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [membros, setMembros] = useState<MembroDTO[]>([]);
  const [visitantes, setVisitantes] = useState<visitante[]>([]);
  const [dados, setDados] = useState<{ name: string; value: number }[]>([]);
  const [outroNome, setOutroNome] = useState("");
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

  const [novoAtendimento, setNovoAtendimento] = useState({
    data: "",
    horario: "",
    outro: [] as string[],
    tipoAtendimento: TipoAtendimento.FAMILIAR,
    membroIds: [] as number[],
    visitanteIds: [] as number[],
  });
  const handleAddOutro = () => {
    if (outroNome.trim() !== "") {
      setNovoAtendimento((prev) => ({
        ...prev,
        outro: [...prev.outro, outroNome.trim()],
      }));
      setOutroNome(""); // Limpa o input após adicionar
    }
  };
  const handleRemoveOutro = (nome: string) => {
    setNovoAtendimento((prev) => ({
      ...prev,
      outro: prev.outro.filter((n) => n !== nome),
    }));
  };
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
    findByAnoAtual()
      .then((response) => {
        const atendimentos: Atendimento[] = response.data;

        // Contagem dos tipos de atendimento
        const contagem = atendimentos.reduce<Record<TipoAtendimento, number>>(
          (acc, atendimento) => {
            acc[atendimento.tipoAtendimento] =
              (acc[atendimento.tipoAtendimento] || 0) + 1;
            return acc;
          },
          {} as Record<TipoAtendimento, number>
        );

        // Transformar os dados para o formato do gráfico
        const dadosFormatados = Object.entries(contagem).map(
          ([tipo, count]) => ({
            name: tipo,
            value: count,
          })
        );

        setDados(dadosFormatados);
      })
      .catch((error) => console.error("Erro ao buscar atendimentos:", error));
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

  useEffect(() => {
    findByProximos()
      .then((response) => {
        setProximosAtendimentos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar próximos atendimentos:", error);
      });
  }, []);

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
      .then((response) => {
        const membrosOrdenados = response.data.sort(
          (a: { nome: string }, b: { nome: any }) =>
            a.nome.localeCompare(b.nome)
        );
        setMembros(membrosOrdenados);
      })
      .catch((error) => console.error("Erro ao buscar membros:", error));
  }, []);

  useEffect(() => {
    findAllVisitantes()
      .then((response) => {
        const visitantesOrdenados = response.data.sort(
          (a: { nome: string }, b: { nome: any }) =>
            a.nome.localeCompare(b.nome)
        );
        setVisitantes(visitantesOrdenados);
      })
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
    field: "membroIds" | "visitanteIds"
  ) => {
    const selectedIds = Array.from(event.target.selectedOptions, (option) =>
      Number(option.value)
    );

    setNovoAtendimento((prev) => ({
      ...prev,
      [field]: selectedIds,
    }));
  };

  // Submete o formulário
  const handleSubmit = () => {
    console.log(
      "Novo atendimento antes do envio:",
      JSON.stringify(novoAtendimento, null, 2)
    );

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
  const formatHorario = (horario: any) => {
    if (!horario) return "";
    const [hour, minute] = horario;
    return `${String(hour).padStart(2, "0")}:${String(minute).padStart(
      2,
      "0"
    )}`;
  };

  const formatTipoAtendimento = (tipo: TipoAtendimento): string => {
    const tipoMapeado: Record<TipoAtendimento, string> = {
      [TipoAtendimento.PASTORAL]: "Aconselhamento Pastoral",
      [TipoAtendimento.FAMILIAR]: "Aconselhamento Familiar",
      [TipoAtendimento.LIDERES]: "Reunião de Lideres",
      [TipoAtendimento.PREPARACAO_CASAMENTO]: "Preparação para casamento",
      [TipoAtendimento.PSICOSOCIAL]: "Aconselhamento Psicosocial",
      [TipoAtendimento.NOVOS_CONVERTIDOS]: "Novos Convertidos",
    };
    return tipoMapeado[tipo] || tipo;
  };
  const getSelectedNames = (
    ids: number[],
    list: { id: number; nome: string }[]
  ) => {
    return list
      .filter((item) => ids.includes(item.id))
      .map((item) => item.nome)
      .join(", ");
  };
  const handleDoubleClick = (
    id: number,
    field: "membroIds" | "visitanteIds"
  ) => {
    setNovoAtendimento((prev) => {
      const ids = prev[field].includes(id)
        ? prev[field].filter((item) => item !== id)
        : [...prev[field], id];
      return { ...prev, [field]: ids };
    });
  };
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center d-flex">
          <div className="col-12 mt-2 mb-2 text-center">
            <button
              className=" btn-atendimento"
              data-bs-toggle="modal"
              data-bs-target="#atendimentoModal"
            >
              Novo Atendimento
            </button>
            <Link to={"/gabinete-atendimento"}>
            <button
              className="btn-atendimento "
          
            >
             
              Historico
            </button>
            </Link>
          </div>
        </div>
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
 
      <div className="row justify-content-center mb-5">
        <div className="col-4 mt-4">
          <div style={{ width: "100%", height: 300 }}>
            <h4 className="text-center titulo-grafico-atendimento">
              Tipos de Atendimento
            </h4>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dados}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${Math.round(percent * 100)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {dados.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} atendimentos`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="col-3 mt-4">
          <h4 className="ultimos-atendimentos text-center">
            Próximos Atendimentos
          </h4>
          <ul className="list-group">
            {proximosAtendimentos.map((atendimento) => (
              <li key={atendimento.id} className="list-group-item">
                <div className="atendimento-tipo">
                  <span>
                    {formatDiaMes(new Date(atendimento.data))} -{" "}
                    {formatHorario(atendimento.horario)} -{" "}
                    {formatTipoAtendimento(atendimento.tipoAtendimento)}
                  </span>
                </div>
                <div className="nome-atendimento">
                  <ul className="nome-atendimento">
                    {[
                      ...(atendimento.membroNomes || []),
                      ...(atendimento.visitanteNomes || []),
                      ...(atendimento.outro || []),
                    ].map((nome, index) => (
                      <li key={index}>{nome}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-3 mt-4">
          <h4 className="ultimos-atendimentos text-center">
            Últimos Atendimentos
          </h4>
          <ul className="list-group">
            {ultimosAtendimentos.map((atendimento) => (
              <li key={atendimento.id} className="list-group-item">
                <div className="atendimento-tipo">
                  <span>
                    {" "}
                    {formatDiaMes(new Date(atendimento.data))}-{" "}
                    {formatHorario(atendimento.horario)} -{" "}
                    {formatTipoAtendimento(atendimento.tipoAtendimento)}
                  </span>
                </div>
                <div>
                  <ul className="nome-atendimento">
                    {[
                      ...(atendimento.membroNomes || []),
                      ...(atendimento.visitanteNomes || []),
                      ...(atendimento.outro || []),
                    ].map((nome, index) => (
                      <li key={index}>{nome}</li>
                    ))}
                  </ul>
                </div>
                <div></div>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-1"></div>
      </div>

      <div
        className="modal fade modal-container mb-5"
        id="atendimentoModal"
        tabIndex={-1}
        aria-labelledby="modalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-custom">
          <div className="modal-content atendimento-Modal">
            <div className="modal-header">
              <h5 className="modal-title">Novo Atendimento</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>
            <div className="modal-body">
              <div className="col-12 d-flex">
                <div className="col-4 dados-inserir-atendimento">
                  <label className="form-label label-atendimento">Data:</label>
                  <input
                    type="date"
                    className="form-control"
                    name="data"
                    value={novoAtendimento.data}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-2 dados-inserir-atendimento">
                  <label className="form-label label-atendimento">
                    Horário:
                  </label>
                  <input
                    type="time"
                    className="form-control"
                    name="horario"
                    value={novoAtendimento.horario}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-5 dados-inserir-atendimento">
                  <label className="form-label label-atendimento">
                    Tipo de Atendimento:
                  </label>
                  <select
                    className="form-select"
                    name="tipoAtendimento"
                    value={novoAtendimento.tipoAtendimento}
                    onChange={handleChange}
                  >
                    {Object.values(TipoAtendimento).map((tipo) => (
                      <option key={tipo} value={tipo}>
                        {formatTipoAtendimento(tipo)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <label className="form-label label-atendimento">Membros:</label>
              <select className="form-select select-dados-atendimento" multiple>
                {membros.map((membro) => (
                  <option
                    key={membro.id}
                    value={membro.id}
                    onDoubleClick={() =>
                      handleDoubleClick(membro.id, "membroIds")
                    }
                  >
                    {membro.nome} {membro.sobrenome}
                  </option>
                ))}
              </select>
              <p className="selecionados">
                selecionados:{" "}
                <strong>
                  {getSelectedNames(novoAtendimento.membroIds, membros)}
                </strong>
              </p>

              <label className="form-label label-atendimento">
                Visitantes:
              </label>
              <select className="form-select select-dados-atendimento" multiple>
                {visitantes.map((visitante) => (
                  <option
                    key={visitante.id}
                    value={visitante.id}
                    onDoubleClick={() =>
                      handleDoubleClick(visitante.id, "visitanteIds")
                    }
                  >
                    {visitante.nome} {visitante.sobrenome}
                  </option>
                ))}
              </select>
              <p className="selecionados">
                selecionados:{" "}
                <strong>
                  {getSelectedNames(novoAtendimento.visitanteIds, visitantes)}
                </strong>
              </p>
              <div className="modal-body">
                <label className="form-label label-atendimento">
                  Não Cadastrado
                </label>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={outroNome}
                    onChange={(e) => setOutroNome(e.target.value)}
                    placeholder="Digite um nome"
                  />
                  <button className="btn btn-primary" onClick={handleAddOutro}>
                    Adicionar
                  </button>
                </div>

                {novoAtendimento.outro.length > 0 && (
                  <ul className="list-group mt-2">
                    {novoAtendimento.outro.map((nome) => (
                      <li
                        key={nome}
                        className="list-group-item d-flex justify-content-between align-items-center"
                        onDoubleClick={() => handleRemoveOutro(nome)}
                        style={{ cursor: "pointer" }}
                      >
                        {nome} <span className="badge bg-danger">x</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
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
      </div>
    </>
  );
};

export default Gabinete;
