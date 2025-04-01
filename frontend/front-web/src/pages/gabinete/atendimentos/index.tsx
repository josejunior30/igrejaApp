import { useState, useEffect } from "react";
import { Atendimento } from "../../../models/atendimento";
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
          <div className="col-10">
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
            <select value={filtro.ano || ""} onChange={handleAnoChange}>
              <option value={new Date().getFullYear()}>
                {new Date().getFullYear()}
              </option>
              <option value={new Date().getFullYear() - 1}>
                {new Date().getFullYear() - 1}
              </option>
            </select>
            <button className="btn btn-primary ml-2" onClick={handlePesquisarAnual}>
              Pesquisar Anual
            </button>
            <h2 className="text-2xl font-bold mb-4">
              Atendimentos - {filtro.mes}/{filtro.ano}
            </h2>
            <table className="table table-striped text-center">
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
                    <td>{atendimento.horario}</td>
                    <td>{atendimento.tipoAtendimento}</td>
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