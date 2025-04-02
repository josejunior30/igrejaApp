import { useState, useEffect } from "react";
import { Atendimento, TipoAtendimento } from "../../../models/atendimento";
import * as AtendimentoService from "../../../service/AtendimentoService";
import Header from "../../../components/Header";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import "./styles.css";

const Atendimentos = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const dataAtual = new Date();
  const mes = dataAtual.getMonth() + 1;
  const ano = dataAtual.getFullYear();
  const [filtro, setFiltro] = useState({
    descricaoConta: "",
    mes: mes,
    ano: ano,
  });

  useEffect(() => {
    if (filtro.ano) {
      AtendimentoService.findByAnoMesAno(filtro.ano, filtro.mes)
        .then((response) => setAtendimentos(response.data))
        .catch((error) => console.error("Erro ao buscar atendimentos:", error));
    }
  }, [filtro.ano, filtro.mes]);

  const formatDiaMes = (data: Date) => {
    const dia = data.getDate();
    const mes = data.getMonth() + 1;
    return `${dia < 10 ? `0${dia}` : dia}/${mes < 10 ? `0${mes}` : mes}`;
  };

  const handleAnoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const novoAno = event.target.value ? Number(event.target.value) : undefined;
    if (novoAno) {
      setFiltro((prev) => ({ ...prev, ano: novoAno }));
    }
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
  const handlePesquisarAnual = () => {
    AtendimentoService.findByAno(filtro.ano)
      .then((response) => setAtendimentos(response.data))
      .catch((error) => console.error("Erro ao buscar atendimentos por ano:", error));
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
  return (
    <>
      <Header />
      <div className="container-fluid mt-5 pt-5">
        <div className="row justify-content-center">
            <span className="meses-atendimento">
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
            <div className="col-12 d-flex justify-content-center mt-5">
            <div className="col-1 offset-3">
            <select value={filtro.ano || ""} onChange={handleAnoChange} className="form-select mx-2">
              <option value={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
              <option value={new Date().getFullYear() - 1}>
                {new Date().getFullYear() - 1}
              </option>
            </select>
           
            </div>
            <div className="col-4 offset-1">
            <button className="btn btn-primary ml-2" onClick={handlePesquisarAnual}>
              Pesquisar Anual
            </button>
            </div>
            </div>
          <div className="col-10">

    
            <table className="table table-striped text-center mt-5">
              <thead className="thead ">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Data</th>
                  <th scope="col">Horário</th>
                  <th scope="col">Tipo</th>
                  <th scope="col">Membros</th>
                  <th scope="col">Visitantes</th>
                  <th scope="col">Outro</th>
                </tr>
              </thead>
              <tbody>
                {atendimentos.map((atendimento) => (
                  <tr key={atendimento.id} className="hover:bg-gray-100">
                    <td>{atendimento.id}</td>
                    <td>{formatDiaMes(new Date(atendimento.data))}</td>
                    <td>{formatHorario(atendimento.horario)}</td>
                    <td>{formatTipoAtendimento(atendimento.tipoAtendimento)}</td>

                    <td>
                      {atendimento.membroNomes.length > 0
                        ? atendimento.membroNomes.join(", ")
                        : "-"}
                    </td>
                    <td>
                      {atendimento.visitanteNomes.length > 0
                        ? atendimento.visitanteNomes.join(", ")
                        : "-"}
                    </td>
                    <td>
                      {atendimento.outro.length > 0
                        ? atendimento.outro.join(", ")
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Atendimentos;