import { useEffect, useState } from "react";
import { RelatorioDTO } from "../../../models/relatorio";
import { findAll, findAndProjeto, findDataAndProjeto, findByDate } from "../../../service/relatorioService";
import Header from "../../../components/Header";
import { Link } from "react-router-dom";

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
      <div className="container-fluid mt-5 pt-5">
    <div className="row" id="voltar">
          <div className="col">
          <Link to= "/membro">
            <TiArrowBack />   Voltar
        </Link>
        </div>
  
       
    </div>
  
    <div className="container col-11 col-md-7">
      <div className="row  justify-content-center" id="pesquisa-relatorio" >
        <div className="col-md-4 col-7 ">
            <h3>Relatórios</h3>
            <label htmlFor="dataEscolhida " className="form-label">Escolha a data:</label>
                <input
                  type="date"
                  id="dataEscolhida"
                  value={dataEscolhida}
                  onChange={handleDataChange}
                  className="form-control"
            
                />
        </div>

        <div className="col-md-12 p-4 ">

        <label htmlFor="projeto1" className="form-check-label me-1 " id="artesanato">Artesanato</label>
            <input
              type="radio"
              id="projeto1"
              value="1"
              checked={projeto === 1}
              onChange={handleProjetoChange}
            
            />
            <label htmlFor="projeto2" className="form-check-label me-1">Jiu-Jitsu</label>
            <input
              type="radio"
              id="projeto2"
              value="2"
              checked={projeto === 2}
              onChange={handleProjetoChange}
             
            />
            <label htmlFor="projeto3" className="form-check-label me-1">Teclado/Violão</label>
            <input
              type="radio"
              id="projeto3"
              value="3"
              checked={projeto === 3}
              onChange={handleProjetoChange}
           
            />
            <label htmlFor="projeto4" className="form-check-label me-1">Canto</label>
            <input
              type="radio"
              id="projeto3"
              value="4"
              checked={projeto === 4}
              onChange={handleProjetoChange}
            
            />
            <label htmlFor="projeto5" className="form-check-label me-1">Bateria/Percursão</label>
            <input
              type="radio"
              id="projeto5"
              value="5"
              checked={projeto === 5}
              onChange={handleProjetoChange}
           
            />
             <label htmlFor="todos" className="form-check-label">Todos</label>
            <input
              type="radio"
              id="todos"
              value=""
              checked={projeto === null}
              onChange={handleProjetoChange}
            
            />
        </div>
        <div className="col-md-12 text-center"  id="btn-pesquisa-rel">
            <button className="btn btn-primary " id="btn-pesquisa-limpar" onClick={handleLimparData}>Limpar</button>
              <button className= "btn btn-primary " onClick={buscarRelatorio}>Buscar</button>
          </div>
      </div>

      
      </div>
      
      <div className="row justify-content-center mt-4">
        <div className="col-md-6 col-10">
        <table className="table table-striped text-center">
          <thead className="thead">
            <tr>
              <th scope="col">Data</th>
              <th scope="col">Projeto</th>
              <th scope="col">Professor(a)</th>
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
                <td>{relatorio.projetosRelatorio.lider}</td>
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
       
       
      </div>
      </div>
    </>
  );
};
export default Relatorio;