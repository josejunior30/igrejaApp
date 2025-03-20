import { useState, useEffect } from "react";
import { findByMesEAno, findByProximos } from "../../service/CalendarioService";
import { findByMonthOfBirth, findAll, findByProximosAniversarios } from "../../service/membroService";
import { findAllKids } from "../../service/kidsService";
import { findAllVisitante } from "../../service/visitanteService";
import { getMediaTotal } from "../../service/quantidadePorCultoService";
import { Calendario } from "../../models/calendario";
import { MembroDTO } from "../../models/membro";
import "./styles.css";
import Header from "../../components/Header";
import Sidebar from "../../components/sidebar";
import { MdGroups2 } from "react-icons/md";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChartLine,
  faChildren,
  faPeopleGroup,
} from "@fortawesome/free-solid-svg-icons";
import { HiUserGroup } from "react-icons/hi";
import { FaChartSimple } from "react-icons/fa6";
import { TbClockHour5 } from "react-icons/tb";

const MenuSecretaria = () => {
  const [loadingEventos, setLoadingEventos] = useState(true);
  const [loadingAniversariantes, setLoadingAniversariantes] = useState(true);
  const [loadingMembros, setLoadingMembros] = useState(true);
  const [loadingKids, setLoadingKids] = useState(true);
  const [loadingVisitantes, setLoadingVisitantes] = useState(true);
  const [loadingMediaCultoManha, setLoadingMediaCultoManha] = useState(true);
  const [loadingMediaCultoNoite, setLoadingMediaCultoNoite] = useState(true);

  const mesAtual = new Date().getMonth() + 1;
  const anoAtual = new Date().getFullYear();

  const [eventos, setEventos] = useState<Calendario[]>([]);
  const [membros, setMembros] = useState<MembroDTO[]>([]);
  const [totalMembros, setTotalMembros] = useState<number>(0);
  const [totalKids, setTotalKids] = useState<number>(0);
  const [totalVisitantes, setTotalVisitantes] = useState<number>(0);
  const [mediaCultoManha, setMediaCultoManha] = useState<number>(0);
  const [mediaCultoNoite, setMediaCultoNoite] = useState<number>(0);

  useEffect(() => {
    fetchEventos();
    fetchAniversariantes();
    fetchTotalMembros();
    fetchTotalKids();
    fetchTotalVisitantes();
    fetchMediaCultoManha();
    fetchMediaCultoNoite();
  }, []);

  const fetchEventos = async () => {
    try {
      const response = await findByProximos();
      setEventos(response.data);
    } catch (error) {
      console.error("Erro ao buscar eventos:", error);
    } finally {
      setLoadingEventos(false);
    }
  };
  const formatDia = (dia: number) => {
    return dia < 10 ? `0${dia}` : `${dia}`;
  };
  const fetchAniversariantes = async () => {
    try {
      const response = await findByProximosAniversarios();
      setMembros(response.data);
    } catch (error) {
      console.error("Erro ao buscar aniversariantes:", error);
    } finally {
      setLoadingAniversariantes(false);
    }
  };

  const fetchTotalMembros = async () => {
    try {
      const response = await findAll();
      setTotalMembros(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar total de membros:", error);
    } finally {
      setLoadingMembros(false);
    }
  };

  const fetchTotalKids = async () => {
    try {
      const response = await findAllKids();
      setTotalKids(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar total de crianças:", error);
    } finally {
      setLoadingKids(false);
    }
  };

  const fetchTotalVisitantes = async () => {
    try {
      const response = await findAllVisitante();
      setTotalVisitantes(response.data.length);
    } catch (error) {
      console.error("Erro ao buscar total de visitantes:", error);
    } finally {
      setLoadingVisitantes(false);
    }
  };

  const fetchMediaCultoManha = async () => {
    try {
      const response = await getMediaTotal(anoAtual, "CULTO_DA_MANHA");
      setMediaCultoManha(response.data);
    } catch (error) {
      console.error("Erro ao buscar média do culto da manhã:", error);
    } finally {
      setLoadingMediaCultoManha(false);
    }
  };

  const fetchMediaCultoNoite = async () => {
    try {
      const response = await getMediaTotal(anoAtual, "CULTO_DA_NOITE");
      setMediaCultoNoite(response.data);
    } catch (error) {
      console.error("Erro ao buscar média do culto da noite:", error);
    } finally {
      setLoadingMediaCultoNoite(false);
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
  return (
    <>
      <Header />
      <Sidebar />
      <div className="container-fluid mt-5 pt-5">
        <div className="row d-flex pt-4 offset-3">
          <div className="col-2 dados-secretaria">
            <h4>Membros</h4>
            <span>
            <FontAwesomeIcon icon={faPeopleGroup} className="faPeopleGroup"/> {loadingMembros ? "Carregando..." : totalMembros}
            </span>
          </div>
          <div className="col-2 dados-secretaria">
            <h4>Visitantes</h4>
            <span>
              <FontAwesomeIcon icon={faPeopleGroup} className="faPeopleGroup"/>
              {loadingVisitantes ? "Carregando..." : totalVisitantes}
            </span>
          </div>
          <div className="col-2 dados-secretaria">
            <h4>Crianças</h4>
            <span>
              <FontAwesomeIcon icon={faChildren} className="faChildren" />{" "}
              {loadingKids ? "Carregando..." : totalKids}
            </span>
          </div>
          <div className="col-2 dados-secretaria">
            <h4>Média Noite</h4>
            <span>
            <FaChartSimple className="FaChartSimple"/>
     
              {loadingMediaCultoNoite ? "Carregando..." : mediaCultoNoite}
            </span>
          </div>
          <div className="col-2 dados-secretaria">
            <h4>Média Manhã</h4>
            <span>
            <FaChartSimple className="FaChartSimple"/>{" "}
              {loadingMediaCultoManha ? "Carregando..." : mediaCultoManha}
            </span>
          </div>
        </div>
        <div className="row justify-content-center d-flex mt-4 pt-1">
          <div className="col-4 offset-2">
            <h4 className="text-center titulo-mes">Próximos Aniversariantes</h4>
            {loadingAniversariantes ? (
              <p className="text-center">Carregando...</p>
            ) : membros.length === 0 ? (
              <p className="text-center">Nenhum aniversariante encontrado.</p>
            ) : (
              <table className="table table-striped tb-aniversario">
                <thead>
                  <tr>
                    <th>Dia</th>
                    <th>Nome</th>
                    <th>Idade</th>
                  </tr>
                </thead>
                <tbody>
                  {membros.map((membro) => (
                    <tr key={membro.id}>
                    <td>{formatDia(new Date(membro.dataNascimento).getDate())}</td>
                      <td>{membro.nome}</td>
                      <td>{membro.idade} anos</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="col-4">
            <h4 className="titulo-mes-evento text-center">Próximos Eventos</h4>
            <div className="data-container mb-5">
              {loadingEventos ? (
                <p className="text-center">Carregando eventos...</p>
              ) : eventos.length === 0 ? (
                <p className="text-center">Nenhum evento encontrado.</p>
              ) : (
                eventos.map((evento) => (
                  <div key={evento.id} className="data-conteudo mt-3">
                    <div className="data-mes">
                      <span className="mes-sec">
                        {new Date(evento.data).toLocaleString("default", {
                          month: "short",
                        })}
                      </span>
                      <span className="dia-sec">
                        {new Date(evento.data).getDate()}
                      </span>
                    </div>
                    <div >
                    <span className="descricao-data d-flex">{evento.titulo} </span>
                    <span className="descricao-responsavel"><TbClockHour5 className="TbClockHour5"/>
                    {formatHorario(evento.hora)}h</span>

                      <span className="descricao-responsavel">{evento.responsavel}</span>
                    </div>
                   
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuSecretaria;
