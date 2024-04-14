import { useEffect, useState } from "react";
import { RelatorioDTO } from "../../../models/relatorio";
import { findAll, findAndProjeto, findDataAndProjeto, findByDate } from "../../../service/relatorioService";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";
import { PiPrinterFill } from "react-icons/pi";
import './styles.css';
import { TiArrowBack } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const Relatorio = () => {
  
    const [dataEscolhida, setDataEscolhida] = useState("");
    const [projeto, setProjeto] = useState<number | null>(null); 
    const [relatorio, setRelatorio] = useState<RelatorioDTO[]>([]);
    
    const navigate = useNavigate();
    useEffect(() => {
      fetchRelatorio();
    }, []);
  
    const fetchRelatorio = () => {
      findAll()
        .then((response) => {
          console.log("Relatorio recebidos:", response.data);
          setRelatorio(response.data);
        })
        .catch((error) => {
          console.error("Erro ao buscar relatorios:", error);
        });
    };
  
    const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setDataEscolhida(event.target.value);
    };
  
    const handleProjetoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const projectId = event.target.value === "" ? null : Number(event.target.value);
      setProjeto(projectId);
    };
    
    const buscarPresencasPorDataEProjeto = () => {
        if (projeto === null) {
          console.error("Projeto não especificado.");
          return;
        }
      
        if (!dataEscolhida) {
          console.error("Data não especificada.");
          return;
        }
        const dataFormatada = new Date(dataEscolhida);
        findDataAndProjeto(dataFormatada, projeto ?? -1) 
          .then((response) => {
            console.log("Presenças recebidas:", response.data);
            setRelatorio(response.data);
          })
          .catch((error) => {
            console.error("Erro ao buscar relatorios por data e projeto:", error);
          });
    };

    const buscarRelatorioPorProjeto = () => {
      if (projeto === null) {
        buscarPresencasPorDataEProjeto();
      } else {
        findAndProjeto(projeto)
          .then((response) => {
            console.log("Relatórios recebidos:", response.data);
            setRelatorio(response.data);
          })
          .catch((error) => {
            console.error("Erro ao buscar relatórios por projeto:", error);
          });
      }
    };
      
    const buscarRelatorio = () => {
        if (projeto === null) {
          findByData();
        } else if (dataEscolhida) {
          buscarPresencasPorDataEProjeto();
        } else {
          buscarRelatorioPorProjeto();
        }
      };
      
    const handleLimparData = () => {
      setDataEscolhida(""); 
      setProjeto(null);
    };
    
    const findByData = () => {
      if (dataEscolhida) {
        const dataFormatada = new Date(dataEscolhida);
        findByDate(dataFormatada)
          .then((response) => {
            console.log("Relatorios recebidos:", response.data);
            setRelatorio(response.data);
          })
          .catch((error) => {
            console.error("Erro ao buscar relatorios por data:", error);
          });
      } else {
        console.error("Data não especificada.");
      }
      const handleGoBack = () => {
        navigate(-1); 
      }
    };

    return (
      <>
        <Header />
        
        <div className="voltar-relatorio-pesquisa">
    <Link to="/membro">
      <TiArrowBack />  Voltar
    </Link>
  </div>
        <div className="page-container-relatorio">
          <div className="filtro-data-relatorio">
            <h3>Relatorios</h3>
            <div className="input-container-relatorio">
              <label htmlFor="dataEscolhida">Escolha a data:</label>
              <input
                type="date"
                id="dataEscolhida"
                value={dataEscolhida}
                onChange={handleDataChange}
              />
              <button className="btn-relatorio-clear" onClick={handleLimparData}>Limpar</button>
            </div>
            <div className="input-container-relatorio">       
              <label htmlFor="projeto1">Artesanato</label>
              <input
                type="radio"
                id="projeto1"
                value="1"
                checked={projeto === 1}
                onChange={handleProjetoChange}
              />
              <label htmlFor="projeto2">Jiu-Jitsu</label>
              <input
                type="radio"
                id="projeto2"
                value="2"
                checked={projeto === 2}
                onChange={handleProjetoChange}
              />
              <label htmlFor="projeto3">Musica</label>
              <input
                type="radio"
                id="projeto3"
                value="3"
                checked={projeto === 3}
                onChange={handleProjetoChange}
              />
               <label htmlFor="todos">Todos</label>
              <input
                type="radio"
                id="todos"
                value=""
                checked={projeto === null}
                onChange={handleProjetoChange}
              />
              <button className= "btn-relatorio" onClick={buscarRelatorio}>Buscar</button>
            </div>
          </div>
      
          <table className="relatorio-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Projeto</th>
                
              </tr>
            </thead>
            <tbody>
              {relatorio.length > 0 ? (
                relatorio.map((relatorio:any) => (
                  <tr key={relatorio.id}>
                    <td><Link to={`${relatorio.id}`} className="name-link">
                      {relatorio.data
                        ? new Date(relatorio.data).toLocaleDateString()
                        : "Data de Nascimento Não Disponível"}
                        </Link>
                    </td>
                    <td><Link to={`${relatorio.id}`} className="name-link">{relatorio.projetosRelatorio ? relatorio.projetosRelatorio.nome : 'Projeto não encontrado'}</Link></td>
                  
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Nenhum relatório encontrado</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
};
export default Relatorio;