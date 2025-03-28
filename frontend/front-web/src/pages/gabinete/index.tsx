import { useEffect, useState } from "react";

import Header from "../../components/Header";
import "./styles.css";
import {
  findByAnoAtual,
  findByAnoMesAtual,
} from "../../service/AtendimentoService";
import { Atendimento } from "../../models/atendimento";

const Gabinete = () => {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [totalAtendimentos, setTotalAtendimentos] = useState(0);
  const [mesAtendimentos, setMesAtendimentos] = useState(0);
  const [liderancaAtendimentos, setLiderancaAtendimentos] = useState(0);

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
        setAtendimentos(response.data);
        setMesAtendimentos(response.data.length);
      })
      .catch((error) => {
        console.error("Erro ao buscar atendimentos:", error);
      });
  }, []);

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

        {/* Lista de atendimentos */}
        <div className="mt-4">
          <h4>Lista de Atendimentos no Ano</h4>
          <ul>
            {atendimentos.map((atendimento) => (
              <li key={atendimento.id}>
                {new Date(atendimento.data).toLocaleDateString()} -
                {atendimento.horario} -{atendimento.tipoAtendimento}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Gabinete;
